// Baseline comparison: measure achieved fps on Section 1's UnitField fill
// (R1's 59.8fps headed reference) and on the murmuration, same session.
const { chromium } = require('playwright');

async function fps(page, ms) {
  return page.evaluate((windowMs) => new Promise((resolve) => {
    const deltas = [];
    let last = performance.now();
    const start = last;
    function tick(now) {
      deltas.push(now - last);
      last = now;
      if (now - start < windowMs) requestAnimationFrame(tick);
      else {
        deltas.shift();
        const total = deltas.reduce((a, b) => a + b, 0);
        const sorted = [...deltas].sort((a, b) => a - b);
        resolve({
          avgFps: +(1000 / (total / deltas.length)).toFixed(1),
          p95: +sorted[Math.floor(sorted.length * 0.95)].toFixed(1)
        });
      }
    }
    requestAnimationFrame(tick);
  }), ms);
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  // Idle page baseline (what does rAF alone achieve?)
  await page.goto('http://localhost:4310/?slide=1', { waitUntil: 'networkidle' });
  await page.evaluate(() => sessionStorage.clear());
  await page.waitForTimeout(1200);
  console.log('idle 1-01 b0 (black):', JSON.stringify(await fps(page, 2000)));

  // UnitField fill (R1's reference animation).
  const [fill] = await Promise.all([
    fps(page, 5000),
    page.keyboard.press('ArrowRight')
  ]);
  console.log('unitfield fill:', JSON.stringify(fill));

  // Murmuration — measured after the entry fade AND the chrome idle-fade
  // have fully settled, so the window contains only the flock itself.
  await page.goto('http://localhost:4310/?slide=2-03-the-convergence', { waitUntil: 'networkidle' });
  await page.evaluate(() => sessionStorage.clear());
  await page.waitForTimeout(1200);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(4500);
  console.log('murmuration ambient (settled):', JSON.stringify(await fps(page, 3000)));

  await browser.close();
})();
