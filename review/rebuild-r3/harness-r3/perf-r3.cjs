// R3 performance matrix: requestAnimationFrame delta collection across the
// section's heavier animation windows (all CSS transitions — no canvas
// work in Section 3). Usage: node perf-r3.cjs
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4311';
const OUT = path.join(__dirname, '..');

// [name, id, 1-based slide no, startBuild, windowMs]
const SCENARIOS = [
  ['waypoint ignition pulse (3-00 b1→b2)', '3-00-waypoint-function', 14, 1, 1500],
  ['functions: token + spoke draw (3-01 b0→b1)', '3-01-the-three-functions', 15, 0, 1800],
  ['ladder: the line draws (3-03 b0→b1)', '3-03-the-order-of-monetization', 17, 0, 1800],
  ['ladder: foundation ignites (3-03 b5→b6)', '3-03-the-order-of-monetization', 17, 5, 1300],
  ['ladder handoff 3-03 b6 → 3-04 b0', '3-03-the-order-of-monetization', 17, 6, 1300],
  ['palladium: chart draw + hook lift (3-05 b1→b2)', '3-05-the-palladium-test', 19, 1, 2200],
  ['layer tower completes (3-06 b2→b3)', '3-06-what-your-money-is', 20, 2, 1600],
  ['bitcoin placement settles (3-07 b1→b2)', '3-07-where-bitcoin-is', 21, 1, 1500]
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const ready = () => page.waitForFunction(() => window.__deck, null, { timeout: 25000 });
  const lines = [];

  for (const [name, id, slideNo, startBuild, windowMs] of SCENARIOS) {
    await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(({ n, k }) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
    }, { n: slideNo, k: startBuild });
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await page.waitForTimeout(1600);

    const collect = page.evaluate((ms) => new Promise((resolve) => {
      const deltas = [];
      let last = performance.now();
      const t0 = last;
      function tick(now) {
        deltas.push(now - last);
        last = now;
        if (now - t0 < ms) requestAnimationFrame(tick);
        else resolve(deltas.slice(1));
      }
      requestAnimationFrame(tick);
    }), windowMs);
    await page.keyboard.press('ArrowRight');
    const deltas = await collect;

    const avg = deltas.reduce((a, b) => a + b, 0) / deltas.length;
    const sorted = [...deltas].sort((a, b) => a - b);
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    const over = deltas.filter((d) => d > 20).length;
    const line = `${name} :: avg ${(1000 / avg).toFixed(1)}fps · p95 ${p95.toFixed(1)}ms · >20ms ${over}/${deltas.length}`;
    lines.push(line);
    console.log(line);
  }

  fs.writeFileSync(path.join(OUT, 'performance-matrix-r3.txt'), lines.join('\n') + '\n');
  await browser.close();
})();
