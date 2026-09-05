// Prototype Gate 1 — capture the Claim Mark contact sheet (batch package §4).
//
// Drives the dev server: loads the scratch index (styles and fonts, no engine),
// imports the sheet builder (gate1-sheet.mjs, served and transformed by Vite),
// and screenshots the full sheet plus each candidate's section. Output under
// review/frames-a/gate-1-claim-mark/.
//
// Usage: node capture-gate1.cjs [--port 5173]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5173');
const OUT = path.join(__dirname, '..', 'gate-1-claim-mark');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1800, height: 1200 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'networkidle' });
  const cells = await page.evaluate(async () => {
    const { buildSheet } = await import('/review/frames-a/harness/gate1-sheet.mjs');
    return buildSheet();
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);

  await page.screenshot({ path: path.join(OUT, 'contact-sheet.png'), fullPage: true });
  for (const cand of ['a', 'b', 'c']) {
    const el = await page.$(`.g1-candidate[data-candidate="${cand}"]`);
    await el.screenshot({ path: path.join(OUT, `candidate-${cand}.png`) });
  }

  fs.writeFileSync(path.join(OUT, 'sheet.json'), JSON.stringify({
    date: new Date().toISOString(),
    cells: cells.length,
    perCandidate: cells.length / 3,
    consoleErrors: errors
  }, null, 2));

  console.log(`gate 1 sheet → review/frames-a/gate-1-claim-mark/contact-sheet.png (+3 candidate sections)`);
  console.log(`${cells.length} cells rendered; console errors: ${errors.length}`);
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
