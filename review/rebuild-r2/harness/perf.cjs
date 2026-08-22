// R2 performance measurements (§4.4): murmuration phases, elimination waves,
// rail camera moves — rAF delta collection over each animation window.
// Usage: node perf.js [--headed]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4310';
const HEADED = process.argv.includes('--headed');
const OUT = path.join(__dirname, '..', 'performance-matrix.txt');

async function collect(page, ms) {
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
          frames: deltas.length,
          avgFps: 1000 / (total / deltas.length),
          p95ms: sorted[Math.floor(sorted.length * 0.95)],
          maxMs: sorted[sorted.length - 1],
          over20ms: deltas.filter((d) => d > 20).length
        });
      }
    }
    requestAnimationFrame(tick);
  }), ms);
}

(async () => {
  const browser = await chromium.launch({ headless: !HEADED });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const rows = [];

  async function scenario(name, id, advancesBefore, windowMs, preWait = 1600) {
    await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(preWait);
    for (let i = 0; i < advancesBefore; i += 1) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(2600);
    }
    const [metrics] = await Promise.all([
      collect(page, windowMs),
      (async () => { await page.keyboard.press('ArrowRight'); })()
    ]);
    rows.push({ name, ...metrics });
    console.log(name, JSON.stringify(metrics));
  }

  // Ambient phase-1 murmuration (no advance — measure the running flock).
  await page.goto(`${BASE}/?slide=2-03-the-convergence`, { waitUntil: 'networkidle' });
  await page.evaluate(() => sessionStorage.clear());
  await page.waitForTimeout(1500);
  await page.keyboard.press('ArrowRight'); // b1: flock
  await page.waitForTimeout(2200);
  rows.push({ name: 'murmuration phase 1 (ambient flock)', ...(await collect(page, 3000)) });
  // The convergence runs from here (b2).
  const [conv] = await Promise.all([
    collect(page, 5600),
    (async () => { await page.keyboard.press('ArrowRight'); })()
  ]);
  rows.push({ name: 'murmuration phase 2 (convergence, 5.2s)', ...conv });
  console.log('murmuration done');

  await scenario('elimination: gases drift-off', '2-06-two-survivors', 1, 2700);
  await scenario('elimination: corrosion wave', '2-06-two-survivors', 2, 2700);
  await scenario('elimination: radioactive pulse-out', '2-06-two-survivors', 3, 2200);
  await scenario('elimination: impractical settle + survivors', '2-06-two-survivors', 4, 2400);
  await scenario('rail camera: 05 b2→b3 ease to metals', '2-05-the-rail-rises', 2, 2100);
  await scenario('rail camera: 09 b0→b1 full-rail pull-back', '2-09-the-pattern', 0, 2100);

  const label = HEADED ? 'HEADED (GPU-composited)' : 'HEADLESS';
  const lines = [`\n=== ${label} · ${new Date().toISOString()} ===`];
  for (const r of rows) {
    lines.push(
      `${r.name.padEnd(46)} avg ${r.avgFps.toFixed(1)} fps · p95 ${r.p95ms.toFixed(1)}ms · max ${r.maxMs.toFixed(0)}ms · >20ms: ${r.over20ms}/${r.frames}`
    );
  }
  fs.appendFileSync(OUT, lines.join('\n') + '\n');
  console.log(lines.join('\n'));
  await browser.close();
})();
