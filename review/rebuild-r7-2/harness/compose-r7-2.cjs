// R7.2 composition audit — §9.4.4 measured, extended to the dark-field
// register.
//
// The R7.1 sweep (review/rebuild-r7-1/harness/compose-r7-1.cjs) measured ink:
// for text it took a Range over the glyphs rather than the element box, because
// a centered line in a `left:0/right:0` container has a box that spans the
// stage. This adds the same correction for photographs, which need it for the
// opposite reason.
//
// A dark-field render is an <img> carrying a measured scale transform
// (src/dark-field.js FRAMING) inside a `.df` box with `overflow: hidden`. The
// img's own bounding rect is therefore *larger* than what the viewer sees —
// the surplus is black margin, clipped. Measuring it would report an edge
// violation that does not exist on screen. So `.df` is the ink element for the
// register, and everything inside one is skipped.
//
// Scope: Section 4 and the close, as at R7.1, plus the two Section 2 slides
// R7.2 touches. The two Section 2 slides take the edge check and are exempt
// from the centering check — the Evolution Rail composes its own frames to a
// documented rule (every text block inside the viewport with ≥28 world px of
// padding, labels centered under their stops) and vertical centering of the
// union box is not one of that rule's criteria. Recorded, not enforced.
//
// Usage: node compose-r7-2.cjs [--port 4318]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i > -1 ? args[i + 1] : fallback;
};
const PORT = flag('--port', '4318');
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, '..');

const STAGE_W = 1920;
const STAGE_H = 1080;
const EDGE_MIN = 100;
const CENTER_TOLERANCE = 90;

const measureInPage = () => {
  const root = document.querySelector('.deck-slide[data-active="true"]') ||
    document.querySelector('.deck-slide');
  if (!root) return null;
  const stage = root.getBoundingClientRect();
  const scale = stage.width / 1920;
  let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity;
  let counted = 0;

  const visible = (el) => {
    const cs = getComputedStyle(el);
    if (Number(cs.opacity) < 0.06 || cs.visibility === 'hidden' || cs.display === 'none') return false;
    let p = el.parentElement;
    while (p && p !== root) {
      const pcs = getComputedStyle(p);
      if (Number(pcs.opacity) < 0.06 || pcs.visibility === 'hidden' || pcs.display === 'none') return false;
      p = p.parentElement;
    }
    return true;
  };

  const take = (r) => {
    if (!r || r.width <= 0 || r.height <= 0) return;
    if (r.width >= stage.width * 0.98 && r.height >= stage.height * 0.98) return;
    counted += 1;
    minX = Math.min(minX, (r.left - stage.left) / scale);
    maxX = Math.max(maxX, (r.right - stage.left) / scale);
    minY = Math.min(minY, (r.top - stage.top) / scale);
    maxY = Math.max(maxY, (r.bottom - stage.top) / scale);
  };

  // The dark-field register: the `.df` box is what the viewer sees, because it
  // clips the framing transform's surplus black margin. Kept separately as
  // well, so a camera-composed frame can be gated on its renders alone.
  const dfBoxes = [];
  root.querySelectorAll('.df').forEach((el) => {
    if (!visible(el)) return;
    const r = el.getBoundingClientRect();
    take(r);
    dfBoxes.push({
      subject: el.dataset.subject || '?',
      left: Math.round((r.left - stage.left) / scale),
      right: Math.round((r.right - stage.left) / scale),
      top: Math.round((r.top - stage.top) / scale),
      bottom: Math.round((r.bottom - stage.top) / scale)
    });
  });

  root.querySelectorAll('*').forEach((el) => {
    if (el.closest('.df')) return; // measured above, as one box
    const isLeaf = el.children.length === 0;
    const text = (el.textContent || '').trim();
    const hasInk = isLeaf && (text.length > 0 || el.tagName === 'svg' ||
      el.tagName === 'IMG' || el.tagName === 'CANVAS' ||
      getComputedStyle(el).backgroundImage !== 'none');
    if (!hasInk) return;
    if (!visible(el)) return;

    let r;
    if (text.length > 0 && el.tagName !== 'svg') {
      const range = document.createRange();
      range.selectNodeContents(el);
      r = range.getBoundingClientRect();
      range.detach();
      if (!r || r.width <= 0 || r.height <= 0) r = el.getBoundingClientRect();
    } else {
      r = el.getBoundingClientRect();
    }
    take(r);
  });

  if (!counted) return { empty: true, dfBoxes };
  return {
    empty: false,
    counted,
    dfBoxes,
    left: Math.round(minX),
    right: Math.round(maxX),
    top: Math.round(minY),
    bottom: Math.round(maxY)
  };
};

// 4.23's frame is frozen by the R7 argument freeze and R7.1 C4 says to touch
// nothing on it. Its kicker sits at the retired header's 78px and its
// composition predates §9.4, so it fails both checks — permanently and by
// design.
const FROZEN = new Set(['4-23-investment-case-from-first-principles']);
// The rail slides compose their own frames (see the header note).
const CAMERA_COMPOSED = new Set(['2-04-the-competition-record', '2-05-two-survivors']);
const EXTRA = ['2-04-the-competition-record', '2-05-two-survivors'];

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  if (!ok) console.log(`FAIL  ${name} :: ${detail}`);
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  let page = await context.newPage();

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  const manifest = await page.evaluate((extra) => window.__deck.slides
    .filter((s) => s.section === 'ideal-store' || s.section === 'close' || extra.includes(s.id))
    .map((s) => ({ id: s.id, builds: s.totalBuildSteps || 0 })), EXTRA);

  const rows = [];
  let nav = 0;
  for (const slide of manifest) {
    for (let b = 0; b <= slide.builds; b += 1) {
      if (nav && nav % 12 === 0) {
        const old = page;
        page = await context.newPage();
        await old.close();
      }
      nav += 1;
      await page.goto(`${BASE}/?slide=${slide.id}`, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
      await page.evaluate(({ id, k }) => {
        const n = window.__deck.slides.findIndex((s) => s.id === id) + 1;
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
      }, { id: slide.id, k: b });
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(900);

      const m = await page.evaluate(measureInPage);
      if (!m || m.empty) {
        rows.push({ id: slide.id, build: b, empty: true });
        continue;
      }
      const centerY = Math.round((m.top + m.bottom) / 2);
      const offset = centerY - STAGE_H / 2;
      const edge = Math.min(m.left, STAGE_W - m.right, m.top, STAGE_H - m.bottom);
      rows.push({ id: slide.id, build: b, ...m, centerY, offset, edge });

      if (FROZEN.has(slide.id)) {
        results.push({
          name: `${slide.id} b${b}: exempt — frozen frame (R7 freeze, R7.1 C4)`,
          ok: true,
          detail: `edge ${Math.round(edge)}px, center ${centerY} (${offset > 0 ? '+' : ''}${offset}) — recorded, not enforced`
        });
        continue;
      }

      if (CAMERA_COMPOSED.has(slide.id)) {
        // The rail runs off both frame edges on purpose — the record continues
        // past the viewport, and the extension into dark is the point at 2.8.
        // So the union box is meaningless here and is recorded rather than
        // enforced; what R7.2 added to these slides is the contender renders,
        // and those are gated exactly.
        const dfEdge = (m.dfBoxes || []).map((d) => ({
          subject: d.subject,
          edge: Math.min(d.left, STAGE_W - d.right, d.top, STAGE_H - d.bottom)
        }));
        const tight = dfEdge.filter((d) => d.edge < EDGE_MIN);
        if (dfEdge.length) {
          check(`${slide.id} b${b}: every dark-field render clears ${EDGE_MIN}px of frame edge`,
            tight.length === 0,
            tight.map((d) => `${d.subject} at ${Math.round(d.edge)}px`).join(', ') ||
            dfEdge.map((d) => `${d.subject} ${Math.round(d.edge)}`).join(' · '));
        }
        results.push({
          name: `${slide.id} b${b}: union box recorded — camera-composed frame (rail FRAMES rule)`,
          ok: true,
          detail: `edge ${Math.round(edge)}px, center ${centerY} (${offset > 0 ? '+' : ''}${offset}) — recorded, not enforced`
        });
        continue;
      }

      check(`${slide.id} b${b}: nothing within ${EDGE_MIN}px of a frame edge`,
        edge >= EDGE_MIN, `nearest edge ${Math.round(edge)}px (l${m.left} r${STAGE_W - m.right} t${m.top} b${STAGE_H - m.bottom})`);

      if (b === slide.builds) {
        check(`${slide.id}: the settled frame is vertically centered within ${CENTER_TOLERANCE}px`,
          Math.abs(offset) <= CENTER_TOLERANCE, `center ${centerY}, off by ${offset > 0 ? '+' : ''}${offset}`);
      }
    }
  }

  const failures = results.filter((r) => !r.ok);
  fs.writeFileSync(path.join(OUT, 'compose-r7-2.json'),
    JSON.stringify({ phase: 'R7.2', stage: [STAGE_W, STAGE_H], edgeMin: EDGE_MIN, centerTolerance: CENTER_TOLERANCE, checks: results.length, failures: failures.length, rows, results }, null, 2));

  console.log('\n| slide | build | top | bottom | center | off | edge |');
  console.log('|---|---|---|---|---|---|---|');
  rows.forEach((r) => {
    if (r.empty) { console.log(`| ${r.id} | ${r.build} | — | — | — | — | (authored black) |`); return; }
    console.log(`| ${r.id} | ${r.build} | ${r.top} | ${r.bottom} | ${r.centerY} | ${r.offset > 0 ? '+' : ''}${r.offset} | ${Math.round(r.edge)} |`);
  });
  console.log(`\nR7.2 composition: ${results.length} checks, ${failures.length} failures`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
