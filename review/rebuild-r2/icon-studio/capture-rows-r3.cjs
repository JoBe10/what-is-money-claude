// Captures the contact sheet plus per-glyph row PNGs for the R3 studio pass.
const { chromium } = require('playwright');
const path = require('path');

const REPO = 'C:/Users/benne/OneDrive/Desktop/Bitcoin/what-is-money-v3/.claude/worktrees/opus-5-review';
const STUDIO = path.join(REPO, 'review', 'rebuild-r2', 'icon-studio');
const NEW_GLYPHS = [
  'through-time', 'between-people', 'measure', 'collectible',
  'palladium', 'dollar', 'peso', 'brick', 'gate', 'tie'
];

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
