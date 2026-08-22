// Captures the contact sheet plus per-glyph row PNGs for the R7 studio pass
// (the comparison set's productive assets and the ledger).
const { chromium } = require('playwright');
const path = require('path');

const STUDIO = __dirname;
const NEW_GLYPHS = ['real-estate', 'shares', 'ledger'];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1180, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('file:///' + path.join(STUDIO, 'contact-sheet.html').replace(/\\/g, '/'));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(STUDIO, 'contact-sheet.png'), fullPage: true });
  for (const name of NEW_GLYPHS) {
    await page.locator(`section[id="${name}"]`).screenshot({ path: path.join(STUDIO, `row-${name}.png`) });
  }
  await browser.close();
  console.log('captured contact sheet + ' + NEW_GLYPHS.length + ' rows');
})();
