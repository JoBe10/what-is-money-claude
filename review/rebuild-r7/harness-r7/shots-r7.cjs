// R7 frame capture. Direct-enters a list of `slideId:build` pairs (or every
// build of a slide with `slideId:*`), waits for the frame to settle, and writes
// a PNG per build. Direct entry seeds sessionStorage and reloads, which is the
// refresh path the deck must reconstruct exactly.
//
// Usage (the brief §F.5 names the destination: review/rebuild-r7/screenshots/):
//   node shots-r7.cjs 4-20-...:* 5-01-thank-you:1
//   node shots-r7.cjs --rm --out screenshots-rm 4-16-the-comparison:*
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i > -1 ? args[i + 1] : fallback;
};
const PORT = flag('--port', '4312');
const OUT_NAME = flag('--out', 'screenshots');
const REDUCED = args.includes('--rm');
const BASE = `http://localhost:${PORT}`;
const targets = args.filter((a) => a.includes(':'));

const OUT = path.join(__dirname, '..', OUT_NAME);
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    reducedMotion: REDUCED ? 'reduce' : 'no-preference'
  });
  const page = await context.newPage();
  const lines = [];
  page.on('console', (m) => {
    if ((m.type() === 'error' || m.type() === 'warning') && !m.text().startsWith('[vite]')) {
      lines.push(`[${m.type()}] ${m.text()}`);
    }
  });
  page.on('pageerror', (e) => lines.push(`[pageerror] ${e.message}`));

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 25000 });
  const index = await page.evaluate(() => Object.fromEntries(
    window.__deck.slides.map((s, i) => [s.id, { n: i + 1, builds: s.totalBuildSteps || 0 }])
  ));

  const jobs = [];
  targets.forEach((t) => {
    const [id, build] = t.split(':');
    const meta = index[id];
    if (!meta) { console.log(`unknown slide: ${id}`); return; }
    if (build === '*') {
      for (let b = 0; b <= meta.builds; b += 1) jobs.push({ id, n: meta.n, b });
    } else {
      jobs.push({ id, n: meta.n, b: Number(build) });
    }
  });

  for (const job of jobs) {
    await page.goto(`${BASE}/?slide=${job.id}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 25000 });
    await page.evaluate(({ n, k }) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
    }, { n: job.n, k: job.b });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 25000 });
    await page.evaluate(() => {
      const chrome = document.querySelector('.deck-chrome');
      if (chrome) chrome.style.display = 'none';
    });
    await page.waitForTimeout(REDUCED ? 500 : 1900);
    const landed = await page.evaluate(() => ({
      id: window.__deck.slides[window.__deck.index].id,
      build: window.__deck.buildStep
    }));
    const ok = landed.id === job.id && landed.build === job.b;
    const file = path.join(OUT, `${job.id}-b${job.b}.png`);
    await page.screenshot({ path: file });
    console.log(`${ok ? '  ' : 'XX'} ${job.id} b${job.b}${ok ? '' : ` -> landed ${landed.id} b${landed.build}`}`);
  }

  console.log(`console: ${lines.length}`);
  lines.forEach((l) => console.log('  ' + l));
  await browser.close();
})();
