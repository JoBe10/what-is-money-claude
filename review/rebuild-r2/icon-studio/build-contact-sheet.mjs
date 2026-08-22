// Icon Studio (R2.2 §D) — generates the contact sheet and the standalone
// candidate .svg files from assets/icons/candidates/candidates.js.
// Usage: node review/rebuild-r2/icon-studio/build-contact-sheet.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CANDIDATES, GLYPH_ORDER, candidateSvg, STROKE
} from '../../../assets/icons/candidates/candidates.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../../..');
const candidatesDir = path.join(repo, 'assets', 'icons', 'candidates');

// ----- Standalone .svg files (one per candidate, swappable by eye) -----
for (const name of GLYPH_ORDER) {
  for (const letter of ['a', 'b', 'c']) {
    const c = CANDIDATES[name][letter];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="96" height="96" fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round" style="color:#e9e4da">
<!-- ${name} ${letter.toUpperCase()} — ${c.title}: ${c.idea} -->
${c.body.trim()}
</svg>\n`;
    fs.writeFileSync(path.join(candidatesDir, `${name}-${letter}.svg`), svg);
  }
}

// ----- The contact sheet: one HTML page, all candidates, on black -----
const cell = (name, letter) => {
  const c = CANDIDATES[name][letter];
  return `
    <div class="cand" data-glyph="${name}" data-letter="${letter}">
      <div class="cand__head"><span class="cand__letter">${letter.toUpperCase()}</span> ${c.title}</div>
      <div class="cand__display">${candidateSvg(name, letter, 96)}</div>
      <div class="cand__scales">
        <span class="scale scale--rail">${candidateSvg(name, letter, 40)}</span>
        <span class="scale scale--riser">${candidateSvg(name, letter, 22)}</span>
      </div>
      <p class="cand__idea">${c.idea}</p>
    </div>`;
};

const rows = GLYPH_ORDER.map((name) => `
  <section class="glyph-row" id="${name}">
    <h2>${name}</h2>
    <div class="cands">${cell(name, 'a')}${cell(name, 'b')}${cell(name, 'c')}</div>
  </section>`).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>WIM Icon Studio — contact sheet (R2.2 §D)</title>
<style>
  :root { color-scheme: dark; }
  body {
    margin: 0; padding: 36px 44px 60px;
    background: #0a0a0a; color: #e9e4da;
    font: 15px/1.45 "Helvetica Neue", Arial, sans-serif;
  }
  h1 { font-size: 21px; font-weight: 600; letter-spacing: 0.04em; margin: 0 0 6px; }
  .sub { color: #8d877c; margin: 0 0 28px; max-width: 880px; }
  .glyph-row { border-top: 1px solid #26241f; padding: 22px 0 10px; }
  .glyph-row h2 {
    font-size: 15px; font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: #b5aea1; margin: 0 0 14px;
  }
  .cands { display: grid; grid-template-columns: repeat(3, 340px); gap: 26px; }
  .cand { border: 1px solid #211f1b; border-radius: 4px; padding: 14px 16px 12px; }
  .cand__head { color: #b5aea1; font-size: 13.5px; letter-spacing: 0.03em; margin-bottom: 10px; }
  .cand__letter {
    display: inline-block; width: 20px; height: 20px; line-height: 20px;
    text-align: center; border: 1px solid #3a372f; border-radius: 50%;
    font-size: 11px; margin-right: 6px; color: #d8d2c6;
  }
  .cand__display { display: flex; align-items: center; gap: 22px; }
  .cand__display svg { filter: drop-shadow(0 0 10px rgba(253, 233, 212, 0.22)); }
  .cand__scales { display: flex; align-items: center; gap: 18px; margin: 10px 0 8px; height: 44px; }
  .scale svg { filter: drop-shadow(0 0 10px rgba(253, 233, 212, 0.22)); }
  .scale--rail { color: rgba(255, 255, 255, 0.75); }
  .scale--riser { color: rgba(255, 255, 255, 0.55); }
  .cand__idea { color: #7d776c; font-size: 12.5px; line-height: 1.5; margin: 0; }
</style>
</head>
<body>
<h1>WIM Icon Studio — contact sheet</h1>
<p class="sub">Three candidate constructions per glyph on the primitives grammar
(48u grid, one ${STROKE}u stroke, round caps and joins, dot terminals, open
linework). Each candidate rendered at display size (96), rail size (40), and
riser size (22), on black, carrying the unit-warm luminance treatment.</p>
${rows}
</body>
</html>\n`;

fs.writeFileSync(path.join(here, 'contact-sheet.html'), html);
console.log(`contact-sheet.html + ${GLYPH_ORDER.length * 3} candidate svgs written`);
