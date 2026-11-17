document.addEventListener("DOMContentLoaded", function () {
  var article = document.querySelector("article.md-content__inner.md-typeset");
  if (!article) return;

  var navCallout = article.querySelector(".admonition.nav");
  if (navCallout) {
    var navParas = navCallout.querySelectorAll(":scope > p:not(.admonition-title)");
    var navSlot = document.querySelector(".landing-header__nav");
    var actionsSlot = document.querySelector(".landing-header__actions");
    if (navParas[0] && navSlot) {
      navParas[0].querySelectorAll("a").forEach(function (a) { navSlot.appendChild(a); });
    }
    if (navParas[1] && actionsSlot) {
      var actionLinks = navParas[1].querySelectorAll("a");
      actionLinks.forEach(function (a) { actionsSlot.appendChild(a); });
      if (actionLinks.length) actionLinks[actionLinks.length - 1].classList.add("landing-header__cta");
    }
    navCallout.parentNode.removeChild(navCallout);
  }

  var hero = document.createElement("section");
  hero.className = "landing-hero";
  var current = hero;
  var sections = [hero];
  Array.prototype.slice.call(article.childNodes).forEach(function (node) {
    if (node.nodeType === 1 && node.tagName === "H2") {
      current = document.createElement("section");
      current.className = "landing-section";
      sections.push(current);
    }
    current.appendChild(node);
  });
  sections.forEach(function (section) {
    article.appendChild(section);
  });

  article.querySelectorAll("section.landing-section").forEach(function (section) {
    var h2 = section.firstElementChild;
    var intro = h2 && h2.nextElementSibling;
    if (!intro || intro.tagName !== "P") return;
    var wrap = document.createElement("div");
    wrap.className = "landing-heading";
    section.insertBefore(wrap, h2);
    wrap.appendChild(h2);
    wrap.appendChild(intro);
  });

  article.querySelectorAll("ul").forEach(function (ul) {
    var items = Array.prototype.slice.call(ul.children);
    if (!items.length) return;
    var allStrong = items.every(function (li) {
      return li.children.length === 1 &&
        li.children[0].tagName === "STRONG" &&
        li.textContent.trim() === li.children[0].textContent.trim();
    });
    if (!allStrong) return;
    var grid = document.createElement("div");
    grid.className = "landing-stats";
    items.forEach(function (li) {
      var text = li.textContent.trim();
      var match = text.match(/\d+(?:[–-]\d+)?%/);
      var tile = document.createElement("div");
      tile.className = "landing-stat";
      if (match) {
        var value = document.createElement("div");
        value.className = "landing-stat__value";
        value.textContent = match[0];
        tile.appendChild(value);
      }
      var label = document.createElement("div");
      label.className = "landing-stat__label";
      label.textContent = text;
      tile.appendChild(label);
      grid.appendChild(tile);
    });
    ul.parentNode.replaceChild(grid, ul);
  });

  article.querySelectorAll("section").forEach(function (section) {
    var run = [];
    function flush() {
      if (run.length >= 2) {
        var grid = document.createElement("div");
        grid.className = "landing-cards";
        run[0].parentNode.insertBefore(grid, run[0]);
        run.forEach(function (p) {
          var card = document.createElement("div");
          card.className = "landing-card";
          var title = document.createElement("div");
          title.className = "landing-card__title";
          title.appendChild(p.firstElementChild);
          card.appendChild(title);
          var body = document.createElement("div");
          body.className = "landing-card__body";
          while (p.firstChild) body.appendChild(p.firstChild);
          card.appendChild(body);
          grid.appendChild(card);
          p.parentNode.removeChild(p);
        });
      }
      run = [];
    }
    Array.prototype.slice.call(section.children).forEach(function (el) {
      var isLead = el.tagName === "P" &&
        el.firstElementChild &&
        el.firstElementChild.tagName === "STRONG" &&
        el.firstChild === el.firstElementChild;
      if (isLead) {
        run.push(el);
      } else {
        flush();
      }
    });
    flush();
  });

  article.querySelectorAll("section.landing-section").forEach(function (section) {
    var children = Array.prototype.slice.call(section.children);
    function isTab(el) {
      return el.classList.contains("admonition") && el.classList.contains("tab");
    }
    var groups = [];
    var i = 0;
    while (i < children.length && !isTab(children[i])) i++;
    while (i < children.length && isTab(children[i])) {
      groups.push(children[i]);
      i++;
    }
    if (groups.length < 2) return;

    var tabs = document.createElement("div");
    tabs.className = "landing-tabs";
    var rail = document.createElement("div");
    rail.className = "landing-tabs__rail";
    var panels = document.createElement("div");
    panels.className = "landing-tabs__panels";
    section.insertBefore(tabs, groups[0]);
    tabs.appendChild(rail);
    tabs.appendChild(panels);

    var buttons = [];
    var panelEls = [];
    function activate(k) {
      buttons.forEach(function (b, m) {
        b.classList.toggle("is-active", m === k);
        b.setAttribute("aria-selected", m === k ? "true" : "false");
      });
      panelEls.forEach(function (p, m) {
        p.classList.toggle("is-active", m === k);
        p.hidden = m !== k;
      });
    }
    groups.forEach(function (callout, n) {
      var titleEl = callout.querySelector(":scope > .admonition-title");
      var button = document.createElement("button");
      button.type = "button";
      button.className = "landing-tabs__tab";
      var index = document.createElement("span");
      index.className = "landing-tabs__index";
      index.textContent = String(n + 1).padStart(2, "0");
      var label = document.createElement("span");
      label.className = "landing-tabs__label";
      label.textContent = titleEl ? titleEl.textContent.trim() : "";
      button.appendChild(index);
      button.appendChild(label);
      button.addEventListener("click", function () { activate(n); });
      if (titleEl) callout.removeChild(titleEl);
      var panel = document.createElement("div");
      panel.className = "landing-tabs__panel";
      var lead = document.createElement("div");
      lead.className = "landing-tabs__lead";
      var body = document.createElement("div");
      body.className = "landing-tabs__body";
      var heading = callout.querySelector(":scope > h3");
      if (heading) lead.appendChild(heading);
      while (callout.firstChild) body.appendChild(callout.firstChild);
      callout.parentNode.removeChild(callout);
      panel.appendChild(lead);
      panel.appendChild(body);
      rail.appendChild(button);
      panels.appendChild(panel);
      buttons.push(button);
      panelEls.push(panel);
    });
    activate(0);
  });

  document.querySelectorAll(".md-typeset .admonition.cta a, .landing-header__cta").forEach(function (a) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 10 10");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    ["M0.62501 4.99999H9.375", "M5.00001 9.37499L9.375 4.99999L5.00001 0.625"].forEach(function (d) {
      var path = document.createElementNS(ns, "path");
      path.setAttribute("d", d);
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-width", "1.25");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      svg.appendChild(path);
    });
    a.appendChild(svg);
  });
});
