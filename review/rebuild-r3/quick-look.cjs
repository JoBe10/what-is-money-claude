// R3 iteration tool: direct-enter every build of the nine Section 3 slides
// and screenshot each frame. Usage: node review/rebuild-r3/quick-look.cjs [slideId ...]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:4311';
const OUT = path.join(__dirname, 'quick-look');

const SLIDES = [
  { id: '3-00-waypoint-function', builds: 2 },
  { id: '3-01-the-three-functions', builds: 5 },
  { id: '3-02-the-functions-separate', builds: 3 },
  { id: '3-03-the-order-of-monetization', builds: 6 },
  { id: '3-04-stage-signatures', builds: 2 },
  { id: '3-05-the-palladium-test', builds: 5 },
  { id: '3-06-what-your-money-is', builds: 6 },
  { id: '3-07-where-bitcoin-is', builds: 5 },
  { id: '3-08-waypoint-judge', builds: 2 }
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv.slice(2);
  const list = only.length ? SLIDES.filter((s) => only.includes(s.id)) : SLIDES;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      errors.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

  for (const slide of list) {
    for (let b = 0; b <= slide.builds; b += 1) {
      await page.goto(`${BASE}/?slide=${slide.id}`, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.__deck);
      if (b > 0) {
        await page.evaluate((step) => {
          sessionStorage.setItem('deck-state', JSON.stringify({
            slideIndex: window.__deck.index, buildStep: step
          }));
        }, b);
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck);
      }
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(OUT, `${slide.id}-b${b}.png`) });
    }
  }

  fs.writeFileSync(path.join(OUT, 'console.txt'), errors.join('\n'));
  console.log(`done; console lines: ${errors.length}`);
  await browser.close();
})();
