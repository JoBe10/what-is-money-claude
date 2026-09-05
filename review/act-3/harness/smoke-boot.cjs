// Act III states — the one boot smoke (the Act III states brief §4).
//
// Nothing in the deck changed this session — the work is docs, the ruled
// records, and the review sheet — so the deck owes exactly one proof: it
// boots, 39 slides in the spliced order, 0 console errors, proving zero deck
// impact. No traversal, no matrices: adding unrequested checks is a defect
// this session, same as skipping requested ones.
//
// Usage: node smoke-boot.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const EXPECTED_SLIDES = 39;

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  const deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id,
    sections: window.__deck.sections.map((s) => `${s.id}:${s.slides.length}`)
  }));
  await page.waitForTimeout(600);

  const slidesOk = deck.slides === EXPECTED_SLIDES;
  const clean = errors.length === 0;
  console.log(`deck boots: ${deck.slides} slides (${slidesOk ? 'ok' : `EXPECTED ${EXPECTED_SLIDES}`}) — ${deck.sections.join(' · ')}`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));

  fs.writeFileSync(path.join(__dirname, '..', 'smoke-boot.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-3-states',
    expectedSlides: EXPECTED_SLIDES,
    deck,
    consoleErrors: errors,
    pass: slidesOk && clean
  }, null, 2));

  await browser.close();
  process.exit(slidesOk && clean ? 0 : 1);
})();
