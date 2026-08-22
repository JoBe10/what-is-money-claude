const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (msg) => console.log(`[${msg.type()}]`, msg.text()));
  page.on('pageerror', (err) => console.log('[pageerror]', err.message));
  await page.goto('http://localhost:4311/?slide=3-00-waypoint-function', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 15000 });
  await page.evaluate(() => {
    sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: window.__deck.index, buildStep: 1 }));
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  try {
    await page.waitForFunction(() => window.__deck, null, { timeout: 15000 });
    console.log('reload ok, step:', await page.evaluate(() => window.__deck.buildStep));
  } catch (e) {
    console.log('reload FAILED:', e.message);
    console.log('body snippet:', (await page.content()).slice(0, 600));
  }
  await browser.close();
})();
