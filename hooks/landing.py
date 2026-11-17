import logging
import re
from typing import Any, List, Optional

from bs4 import BeautifulSoup, Tag


logger = logging.getLogger(__name__)

PARSER = "html.parser"
PERCENT_PATTERN = re.compile(r"\d+(?:[–-]\d+)?%")
ARROW_PATHS = (
    "M0.62501 4.99999H9.375",
    "M5.00001 9.37499L9.375 4.99999L5.00001 0.625",
)


def on_page_content(html: str, page: Any, config: Any, files: Any) -> str:
    soup = BeautifulSoup(html, PARSER)

    # 0. Header items from the [!NAV] callout
    _collect_header(soup, page)

    # 1. Buttons from [!CTA] callouts
    _build_buttons(soup)

    # 2. Hero and sections split on h2
    _build_sections(soup)

    # 3. Stats tiles from all-bold lists
    _build_stats(soup)

    # 4. Tabs from [!TAB] callouts
    _build_tabs(soup)

    logger.debug(f"landing hook processed {page.file.src_uri}")
    return str(soup)


def _new(soup: BeautifulSoup, name: str, **attrs: str) -> Tag:
    return soup.new_tag(name, attrs=attrs)


def _links(paragraph: Optional[Tag]) -> List[dict]:
    if paragraph is None:
        return []
    # end if
    return [
        {"title": a.get_text(strip=True), "url": a.get("href", "#")}
        for a in paragraph.find_all("a")
    ]


def _collect_header(soup: BeautifulSoup, page: Any) -> None:
    callout = soup.select_one("div.admonition.nav")
    if callout is None:
        return
    # end if
    paragraphs = [
        p for p in callout.find_all("p", recursive=False)
        if "admonition-title" not in p.get("class", [])
    ]
    nav = _links(paragraphs[0] if len(paragraphs) > 0 else None)
    actions = _links(paragraphs[1] if len(paragraphs) > 1 else None)
    cta = actions.pop() if actions else None
    page.meta["landing_header"] = {"nav": nav, "actions": actions, "cta": cta}
    callout.decompose()


def _rebuild_button(soup: BeautifulSoup, anchor: Tag) -> None:
    text = anchor.get_text(strip=True)
    classes = anchor.get("class", [])
    anchor.clear()
    anchor["class"] = list(classes) + ["landing-button"]

    outline = _new(soup, "span")
    outline["data-continuum-button-outline"] = ""
    outline["aria-hidden"] = "true"
    anchor.append(outline)

    label = _new(soup, "div")
    label["data-continuum-button-label"] = ""
    label.string = text
    anchor.append(label)

    arrow = _new(soup, "div")
    arrow["data-continuum-button-arrow"] = ""
    frame = _new(soup, "div")
    glyph = _new(soup, "span")
    svg = _new(soup, "svg", viewBox="0 0 10 10", fill="none", focusable="false")
    svg["aria-hidden"] = "true"
    svg["data-continuum-button-icon"] = ""
    for d in ARROW_PATHS:
        svg.append(_new(soup, "path", d=d))
    # end for
    glyph.append(svg)
    frame.append(glyph)
    arrow.append(frame)
    anchor.append(arrow)


def _build_buttons(soup: BeautifulSoup) -> None:
    for callout in soup.select("div.admonition.cta"):
        cta = _new(soup, "div")
        cta["class"] = "landing-cta"
        row = _new(soup, "div")
        row["class"] = "landing-cta__row"
        for anchor in callout.select("a"):
            _rebuild_button(soup, anchor)
            row.append(anchor.extract())
        # end for
        cta.append(row)
        callout.replace_with(cta)
    # end for


def _build_sections(soup: BeautifulSoup) -> None:
    hero = _new(soup, "section")
    hero["class"] = "landing-hero"
    current = hero
    sections: List[Tag] = [hero]

    for node in list(soup.contents):
        if isinstance(node, Tag) and node.name == "h2":
            current = _new(soup, "section")
            current["class"] = "landing-section"
            sections.append(current)
        # end if
        current.append(node.extract())
    # end for

    for section in sections:
        soup.append(section)
    # end for


def _is_all_strong(items: List[Tag]) -> bool:
    for li in items:
        children = li.find_all(True, recursive=False)
        if len(children) != 1 or children[0].name != "strong":
            return False
        # end if
        if li.get_text(strip=True) != children[0].get_text(strip=True):
            return False
        # end if
    # end for
    return True


def _build_stats(soup: BeautifulSoup) -> None:
    for ul in soup.select("ul"):
        items = ul.find_all("li", recursive=False)
        if not items or not _is_all_strong(items):
            continue
        # end if
        grid = _new(soup, "div")
        grid["class"] = "landing-stats"
        for li in items:
            text = li.get_text(strip=True)
            match = PERCENT_PATTERN.search(text)
            tile = _new(soup, "div")
            tile["class"] = "landing-stat"
            if match:
                value = _new(soup, "div")
                value["class"] = "landing-stat__value"
                value.string = match.group(0)
                tile.append(value)
            # end if
            label = _new(soup, "div")
            label["class"] = "landing-stat__label"
            label.string = text
            tile.append(label)
            grid.append(tile)
        # end for
        ul.replace_with(grid)
    # end for


def _is_tab(el: Tag) -> bool:
    classes = el.get("class", [])
    return el.name == "div" and "admonition" in classes and "tab" in classes


def _build_tabs(soup: BeautifulSoup) -> None:
    for section in soup.select("section.landing-section"):
        children = section.find_all(True, recursive=False)
        i = 0
        while i < len(children) and not _is_tab(children[i]):
            i += 1
        # end while
        groups: List[Tag] = []
        while i < len(children) and _is_tab(children[i]):
            groups.append(children[i])
            i += 1
        # end while
        if len(groups) < 2:
            continue
        # end if

        tabs = _new(soup, "div")
        tabs["class"] = "landing-tabs"
        rail = _new(soup, "div")
        rail["class"] = "landing-tabs__rail"
        panels = _new(soup, "div")
        panels["class"] = "landing-tabs__panels"
        groups[0].insert_before(tabs)
        tabs.append(rail)
        tabs.append(panels)

        for n, callout in enumerate(groups):
            title_el: Optional[Tag] = callout.find("p", class_="admonition-title", recursive=False)
            button = _new(soup, "button", type="button")
            button["class"] = "landing-tabs__tab" + (" is-active" if n == 0 else "")
            button["aria-selected"] = "true" if n == 0 else "false"
            index = _new(soup, "span")
            index["class"] = "landing-tabs__index"
            index.string = f"{n + 1:02d}"
            label = _new(soup, "span")
            label["class"] = "landing-tabs__label"
            label.string = title_el.get_text(strip=True) if title_el is not None else ""
            button.append(index)
            button.append(label)
            if title_el is not None:
                title_el.decompose()
            # end if

            panel = _new(soup, "div")
            panel["class"] = "landing-tabs__panel" + (" is-active" if n == 0 else "")
            if n != 0:
                panel["hidden"] = ""
            # end if
            lead = _new(soup, "div")
            lead["class"] = "landing-tabs__lead"
            body = _new(soup, "div")
            body["class"] = "landing-tabs__body"
            heading = callout.find("h3", recursive=False)
            if heading is not None:
                lead.append(heading.extract())
            # end if
            for child in list(callout.contents):
                body.append(child.extract())
            # end for
            callout.decompose()
            panel.append(lead)
            panel.append(body)
            rail.append(button)
            panels.append(panel)
        # end for
    # end for
