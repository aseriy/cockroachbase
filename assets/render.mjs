import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import pngToIco from 'png-to-ico'

const here = dirname(fileURLToPath(import.meta.url))
const out = join(here, 'out')
mkdirSync(out, { recursive: true })

const markSvg = readFileSync(join(here, 'mark.svg'), 'utf8')
const pathD = markSvg.match(/ d="([^"]+)"/)[1]
const VIEW_W = 161.31
const VIEW_H = 166.68

const fonts = {
  loadSystemFonts: false,
  fontFiles: [join(here, 'fonts', 'Geist[wght].ttf'), join(here, 'fonts', 'GeistMono[wght].ttf')],
  defaultFontFamily: 'Geist',
}

const written = []
const write = (name, data) => {
  writeFileSync(join(out, name), data)
  written.push(name)
}
const png = (svg, width) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: fonts }).render().asPng()

// 1. Marks: one fill per theme.
write('mark-dark.svg', markSvg.replace('fill="currentColor"', 'fill="#ffffff"'))
write('mark-light.svg', markSvg.replace('fill="currentColor"', 'fill="#000000"'))

// 2. Icon tile: black square, white mark filling 80% of the side, centered.
const TILE = 1024
const tileScale = (TILE * 0.8) / Math.max(VIEW_W, VIEW_H)
const tileX = (TILE - VIEW_W * tileScale) / 2
const tileY = (TILE - VIEW_H * tileScale) / 2
const tile = `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE}" height="${TILE}" viewBox="0 0 ${TILE} ${TILE}">
  <rect width="${TILE}" height="${TILE}" fill="#000000"/>
  <path transform="translate(${tileX} ${tileY}) scale(${tileScale})" d="${pathD}" fill="#ffffff"/>
</svg>`

const icons = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['favicon-48x48.png', 48],
  ['favicon-96x96.png', 96],
  ['favicon-128.png', 128],
  ['favicon-180x180.png', 180],
  ['favicon-196x196.png', 196],
  ['android-icon-36x36.png', 36],
  ['android-icon-48x48.png', 48],
  ['android-icon-72x72.png', 72],
  ['android-icon-96x96.png', 96],
  ['android-icon-144x144.png', 144],
  ['android-icon-192x192.png', 192],
  ['apple-icon-57x57.png', 57],
  ['apple-icon-60x60.png', 60],
  ['apple-icon-72x72.png', 72],
  ['apple-icon-76x76.png', 76],
  ['apple-icon-114x114.png', 114],
  ['apple-icon-120x120.png', 120],
  ['apple-icon-144x144.png', 144],
  ['apple-icon-152x152.png', 152],
  ['apple-icon-180x180.png', 180],
  ['apple-icon.png', 192],
  ['apple-icon-precomposed.png', 192],
  ['ms-icon-70x70.png', 70],
  ['ms-icon-144x144.png', 144],
  ['ms-icon-150x150.png', 150],
  ['ms-icon-310x310.png', 310],
]
for (const [name, size] of icons) write(name, png(tile, size))

const ico = await pngToIco([
  join(out, 'favicon-16x16.png'),
  join(out, 'favicon-32x32.png'),
  join(out, 'favicon-48x48.png'),
])
write('favicon.ico', ico)

// 3. Preview image: black canvas, mark on the left, name and motto on the right.
const OG_W = 1200
const OG_H = 630
const MARK_H = 280
const markScale = MARK_H / VIEW_H
const markW = VIEW_W * markScale
const markX = 90
const markY = (OG_H - MARK_H) / 2
const textX = markX + markW + 70
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <rect width="${OG_W}" height="${OG_H}" fill="#000000"/>
  <path transform="translate(${markX} ${markY}) scale(${markScale})" d="${pathD}" fill="#ffffff"/>
  <text x="${textX}" y="290" font-family="Geist" font-size="88" fill="#ffffff">CockroachBase</text>
  <text x="${textX}" y="362" font-family="Geist" font-size="34" fill="#939188">Start small. Move fast. Grow huge.</text>
  <text x="${textX}" y="412" font-family="Geist" font-size="34" fill="#939188">Don't change horses midstream.</text>
</svg>`
write('og.png', png(og, OG_W))

console.log(written.join('\n'))
