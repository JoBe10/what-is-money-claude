// Stage 0 smoke: the deck still boots on film-rebuild, and the scratch route
// answers on ?proto= without touching the deck. FAST-mode scope: the two
// surfaces this stage changed.
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://127.0.0.1:4173';
const browser = await chromium.launch();
const results = [];

async function visit(path, check) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const out = await check(page);
  results.push({ path, errors, ...out });
  await page.close();
}

// 1. The deck.
await visit('/', async (page) => ({
  deckMounted: await page.locator('.deck-shell').count(),
  slideCount: await page.evaluate(() => window.__deck?.slides.length ?? null),
  firstSlideId: await page.evaluate(() => window.__deck?.slides[0]?.id ?? null),
  counter: (await page.locator('.deck-counter').textContent().catch(() => ''))?.trim(),
}));

// 2. Deep link still works (the engine reads ?slide= as before).
await visit('/?slide=23', async (page) => ({
  index: await page.evaluate(() => window.__deck?.index ?? null),
  id: await page.evaluate(() => window.__deck?.slides[window.__deck.index]?.id ?? null),
}));

// 3. The scratch route, empty registry.
await visit('/?proto=', async (page) => ({
  indexShown: await page.locator('.scratch-index').count(),
  deckMounted: await page.locator('.deck-shell').count(),
  text: (await page.locator('.scratch-index__note').textContent().catch(() => ''))?.trim(),
  backHref: await page.locator('.scratch-index__back').getAttribute('href').catch(() => null),
}));

// 4. An unknown prototype id falls through to the same index, not to a blank page.
await visit('/?proto=claim-mark', async (page) => ({
  indexShown: await page.locator('.scratch-index').count(),
  text: (await page.locator('.scratch-index__note').textContent().catch(() => ''))?.trim(),
}));

await browser.close();
console.log(JSON.stringify(results, null, 2));
const failed = results.some((r) => r.errors.length);
process.exit(failed ? 1 : 0);
