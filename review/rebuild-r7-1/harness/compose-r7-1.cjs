// R7.1 composition audit — §9.4.4 measured rather than eyeballed.
//
// For every build of every Section 4 slide it computes the union bounding box
// of what is actually visible on stage and reports two things the standard
// cares about: whether the frame's content is vertically centered, and whether
// anything comes closer to an edge than the deck's margin.
//
// This exists because retiring the header convention (A2) moved the top of
// every de-headered frame, and "does it look centered" is not a thing to
// decide by eye nineteen times.
//
// Usage: node compose-r7-1.cjs [--port 4312] [--json]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i > -1 ? args[i + 1] : fallback;
};
const PORT = flag('--port', '5199');
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, '..');

const STAGE_W = 1920;
const STAGE_H = 1080;
// The deck's own margin: nothing in Sections 1-3 comes nearer an edge.
const EDGE_MIN = 100;
// How far off center a frame may sit before it reads as top- or bottom-heavy.
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

  root.querySelectorAll('*').forEach((el) => {
    // Leaf-ish elements only: containers inherit their children's extent and
    // full-bleed wrappers would swamp the measurement.
    const isLeaf = el.children.length === 0;
    const text = (el.textContent || '').trim();
    const hasInk = isLeaf && (text.length > 0 || el.tagName === 'svg' ||
      el.tagName === 'IMG' || el.tagName === 'CANVAS' ||
      getComputedStyle(el).backgroundImage !== 'none');
    if (!hasInk) return;
    if (!visible(el)) return;

    // Measure ink, not boxes. A centered line in a left:0/right:0 container
    // has a box that spans the stage and glyphs that sit nowhere near it —
    // measuring the box would report every centered line as touching an edge.
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
    if (r.width <= 0 || r.height <= 0) return;
    // Skip anything that spans the whole stage — a backdrop, not content.
    if (r.width >= stage.width * 0.98 && r.height >= stage.height * 0.98) return;
    counted += 1;
    minX = Math.min(minX, (r.left - stage.left) / scale);
    maxX = Math.max(maxX, (r.right - stage.left) / scale);
    minY = Math.min(minY, (r.top - stage.top) / scale);
    maxY = Math.max(maxY, (r.bottom - stage.top) / scale);
  });

  if (!counted) return { empty: true };
  return {
    empty: false,
    counted,
    left: Math.round(minX),
    right: Math.round(maxX),
    top: Math.round(minY),
    bottom: Math.round(maxY)
  };
};

// 4.23's frame is frozen by the R7 argument freeze and R7.1 C4 says to touch
// nothing on it. Its kicker sits at the retired header's 78px and its
// composition predates §9.4, so it fails both checks — permanently and by
// design. Exempted here with the reason attached, rather than carried as two
// standing failures that would teach the next reader to ignore this gate.
const FROZEN = new Set(['4-23-investment-case-from-first-principles']);

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
  const manifest = await page.evaluate(() => window.__deck.slides
    .filter((s) => s.section === 'ideal-store' || s.section === 'close')
    .map((s, i) => ({ id: s.id, builds: s.totalBuildSteps || 0 })));

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

      check(`${slide.id} b${b}: nothing within ${EDGE_MIN}px of a frame edge`,
        edge >= EDGE_MIN, `nearest edge ${Math.round(edge)}px (l${m.left} r${STAGE_W - m.right} t${m.top} b${STAGE_H - m.bottom})`);

      // Centering is judged on the settled frame only. A slide that accumulates
      // downward is *designed* around its last build and legitimately sits high
      // before it — demanding a centered b1 on a five-build argument would be
      // demanding the wrong thing.
      if (b === slide.builds) {
        check(`${slide.id}: the settled frame is vertically centered within ${CENTER_TOLERANCE}px`,
          Math.abs(offset) <= CENTER_TOLERANCE, `center ${centerY}, off by ${offset > 0 ? '+' : ''}${offset}`);
      }
    }
  }

  const failures = results.filter((r) => !r.ok);
  fs.writeFileSync(path.join(OUT, 'compose-r7-1.json'),
    JSON.stringify({ phase: 'R7.1', stage: [STAGE_W, STAGE_H], edgeMin: EDGE_MIN, centerTolerance: CENTER_TOLERANCE, checks: results.length, failures: failures.length, rows, results }, null, 2));

  console.log('\n| slide | build | top | bottom | center | off | edge |');
  console.log('|---|---|---|---|---|---|---|');
  rows.forEach((r) => {
    if (r.empty) { console.log(`| ${r.id} | ${r.build} | — | — | — | — | (authored black) |`); return; }
    console.log(`| ${r.id} | ${r.build} | ${r.top} | ${r.bottom} | ${r.centerY} | ${r.offset > 0 ? '+' : ''}${r.offset} | ${Math.round(r.edge)} |`);
  });
  console.log(`\nR7.1 composition: ${results.length} checks, ${failures.length} failures`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
