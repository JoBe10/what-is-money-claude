// Prologue — render one beat-state cell through the states pipeline
// (states.mjs on the dev server page), full-size, into review/prologue/states/.
// The single-cell path of capture-states.cjs, for markup re-renders that must
// not disturb the archived sheet. Carried cells (carriedFrom in the meta) are
// refused here — a carried approval ships as the approved bytes, and replacing
// one is a re-render decision the brief reserves for changed inputs.
//
// Usage: node render-cell.cjs --cell p1-b8-b [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const CELL = flag('--cell', null);
const OUT = path.join(__dirname, '..', 'states');
if (!CELL) { console.error('pass --cell <id>'); process.exit(1); }

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(async () => {
    window.__states = await import('/review/prologue/harness/states.mjs');
  });
  const meta = await page.evaluate(() => window.__states.cellMeta());
  if (meta[CELL] && meta[CELL].carriedFrom) {
    console.error(`cell ${CELL} is carried (${meta[CELL].carriedFrom}) — it ships as the approved bytes`);
    await browser.close();
    process.exit(1);
  }
  await page.evaluate((id) => window.__states.buildCell(id), CELL);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, `${CELL}.png`), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  console.log(`cell ${CELL} -> states/${CELL}.png`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
