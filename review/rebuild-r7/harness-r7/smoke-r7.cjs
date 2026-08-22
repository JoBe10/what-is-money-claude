// R7 working smoke check — boots the deck, prints the manifest for Section 4
// and the close, and flags any slide whose `[→]` count disagrees with its build
// count. Kept in the harness directory so it runs against the repo's own
// Playwright install; the graded suites live beside it.
//
// Usage: node smoke-r7.cjs [--port 4312]
const { chromium } = require('playwright');

const portArg = process.argv.indexOf('--port');
const PORT = portArg > -1 ? process.argv[portArg + 1] : '4312';
const BASE = `http://localhost:${PORT}`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const lines = [];
  page.on('console', (m) => {
    if ((m.type() === 'error' || m.type() === 'warning') && !m.text().startsWith('[vite]')) {
      lines.push(`[${m.type()}] ${m.text()}`);
    }
  });
  page.on('pageerror', (e) => lines.push(`[pageerror] ${e.message}`));

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 25000 });

  const manifest = await page.evaluate(() => window.__deck.slides.map((s, i) => ({
    n: i + 1,
    id: s.id,
    section: s.section,
    builds: s.totalBuildSteps || 0,
    arrows: (String(s.notes || '').match(/\[→\]/g) || []).length
  })));

  console.log(`slides: ${manifest.length}`);
  let mismatches = 0;
  manifest
    .filter((s) => s.section === 'ideal-store' || s.section === 'close')
    .forEach((s) => {
      const bad = s.builds !== s.arrows;
      if (bad) mismatches += 1;
      console.log(
        `${String(s.n).padStart(2)} ${s.id.padEnd(46)} builds=${String(s.builds).padStart(2)} arrows=${String(s.arrows).padStart(2)}${bad ? '   <-- MISMATCH' : ''}`
      );
    });

  console.log(`pacing mismatches: ${mismatches}`);
  console.log(`console: ${lines.length}`);
  lines.forEach((l) => console.log('  ' + l));
  await browser.close();
})();
