const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (msg) => console.log(`[${msg.type()}]`, msg.text()));
  page.on('pageerror', (err) => console.log('[pageerror]', err.message));
  await page.goto('http://localhost:4311/?slide=3-01-the-three-functions', { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  console.log('deck:', await page.evaluate(() => Boolean(window.__deck)));
  await browser.close();
})();
