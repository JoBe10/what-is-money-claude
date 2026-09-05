// Prologue states session — FAST-scope smoke: the deck still boots untouched
// (this session adds only review/ harness files and docs — zero deck impact).
// Usage: node smoke-prologue.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  const result = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id
  }));
  result.consoleErrors = errors;
  fs.writeFileSync(path.join(__dirname, 'smoke-prologue.json'), JSON.stringify(result, null, 2));
  console.log(`deck boots: ${result.slides} slides, first ${result.firstId}, console errors: ${errors.length}`);
  await browser.close();
  process.exit(errors.length || result.slides !== 45 ? 1 : 0);
})();
