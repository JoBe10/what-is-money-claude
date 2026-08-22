// Captures the contact sheet plus per-glyph row PNGs for the R7.1 studio pass:
// the surgeon's delivered service and the three final goods, which replace
// photographs and so have to survive the legibility rule (R3.1) at riser scale.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SHEET = path.join(__dirname, '..', '..', 'rebuild-r2', 'icon-studio', 'contact-sheet.html');
const OUT = __dirname;
const NEW_GLYPHS = ['operation', 'shoe', 'meal', 'wine'];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1180, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('file:///' + SHEET.replace(/\\/g, '/'));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, 'contact-sheet.png'), fullPage: true });
  for (const name of NEW_GLYPHS) {
    await page.locator(`section[id="${name}"]`).screenshot({ path: path.join(OUT, `row-${name}.png`) });
  }
  await browser.close();
  console.log('captured contact sheet + ' + NEW_GLYPHS.length + ' rows');
})();
