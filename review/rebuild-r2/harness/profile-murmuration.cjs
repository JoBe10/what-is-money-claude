// Instruments the murmuration's frame loop from outside: wraps RAF, then
// samples how long the deck's own frame callback takes (step+draw combined),
// headed, over ~4s of phase 1.
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: !process.argv.includes('--headed') });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:4310/?slide=2-03-the-convergence', { waitUntil: 'networkidle' });
  await page.evaluate(() => sessionStorage.clear());
  await page.waitForTimeout(1500);
  await page.keyboard.press('ArrowRight'); // b1: the flock
  await page.waitForTimeout(1500);

  const out = await page.evaluate(() => new Promise((resolve) => {
    const rawRaf = window.requestAnimationFrame.bind(window);
    const samples = [];
    window.requestAnimationFrame = (cb) => rawRaf((t) => {
      const a = performance.now();
      cb(t);
      samples.push(performance.now() - a);
    });
    setTimeout(() => {
      window.requestAnimationFrame = rawRaf;
      samples.sort((x, y) => x - y);
      resolve({
        frames: samples.length,
        median: samples[Math.floor(samples.length / 2)],
        p95: samples[Math.floor(samples.length * 0.95)],
        max: samples[samples.length - 1]
      });
    }, 4000);
  }));
  console.log('deck frame callback cost (step+draw):', JSON.stringify(out));
  await browser.close();
})();
