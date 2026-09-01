// Act III states — the FAST-scope per-cell checks (the Act III states brief §4).
//
// The measured cell discipline every sheet in this project carries, plus the
// checks that make this brief's own rules checkable rather than asserted. The
// measured four are the dark-field gate's own terms (docs/dark-field-manifest.md):
//   1. corner patches (6% of the short side) mean luminance ≤ 6/255;
//   2. outer 2% border ring mean luminance ≤ 6/255 — nothing reaches the edge;
//   3. content present — some pixels above luminance 32;
//   4. the cell is 1920 × 1080.
//
// And the sheet-level rules, gated:
//
//   MAP AGREEMENT — every cell's class is the class docs/act-3-provenance.md
//   rules for its frame, no cell is unclassified, every PORT/ADAPT names its
//   legacy source.
//
//   BEAT COVERAGE — all 25 beats of the frozen map, once each, at the frozen
//   per-scene counts.
//
//   NO CANDIDATES ANYWHERE — the ruled map has no live NEW frame, and the
//   brief says "no candidates, no design": every cell is a beat cell, no cell
//   is a candidate or on file, and no beat carries more than one cell.
//
//   THE THREAD — the ClaimObject appears in exactly one builder, s15-b6's
//   (the held question), and in no other cell.
//
//   THE REGISTER BOUNDARY, AT THE SOURCE — the ladder builder removes the
//   grammar glyphs and stands renders in stops (the one ruled change); the
//   tower cells (a structural diagram) put no dark-field render inside the
//   diagram — the only DOM the tower builder adds beyond the mounted legacy
//   component and its own copy rows is the ruled disc return.
//
// Usage: node check-cells.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(__dirname, '..', 'states');

const FROZEN = { S11: 5, S12: 4, S13: 6, S14: 4, S15: 6 };
const TOTAL_BEATS = 25;

// The ruled map, transcribed. The MAP AGREEMENT check compares this against
// docs/act-3-provenance.md itself as well as against the cells, so a
// transcription drift here fails rather than passes quietly.
const RULED = {
  'S11-F1': 'PORT',
  'S12-F1': 'ADAPT',
  'S13-F1': 'ADAPT',
  'S14-F1': 'ADAPT',
  'S15-F1': 'PORT',
  'S15-F2': 'PORT'
};

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
}

(async () => {
  const record = JSON.parse(fs.readFileSync(path.join(OUT, 'states.json'), 'utf8'));
  const cells = record.cells;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 300 } });
  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'domcontentloaded' });

  // ---- the measured cell checks ---------------------------------------------
  const measured = [];
  let cellFailures = 0;
  for (const c of cells) {
    const m = await page.evaluate(async (src) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, w, h).data;
      const lum = (i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];

      const patch = Math.round(Math.min(w, h) * 0.06);
      const corners = [[0, 0], [w - patch, 0], [0, h - patch], [w - patch, h - patch]];
      let cSum = 0; let cN = 0;
      for (const [px0, py0] of corners) {
        for (let y = py0; y < py0 + patch; y += 1) {
          for (let x = px0; x < px0 + patch; x += 1) { cSum += lum((y * w + x) * 4); cN += 1; }
        }
      }
      const ring = Math.max(1, Math.round(Math.min(w, h) * 0.02));
      let rSum = 0; let rN = 0;
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          if (x >= ring && x < w - ring && y >= ring && y < h - ring) continue;
          rSum += lum((y * w + x) * 4); rN += 1;
        }
      }
      let above32 = 0; let max = 0; let warm = 0;
      for (let i = 0; i < d.length; i += 4) {
        const L = lum(i);
        if (L > max) max = L;
        if (L > 32) above32 += 1;
        if (L > 24 && d[i] - d[i + 2] > 40) warm += 1;
      }
      return { w, h, cornerMean: cSum / cN, borderMean: rSum / rN, above32, maxLum: max, warm };
    }, `/review/act-3/states/${c.file}`);

    const checks = {
      corner: m.cornerMean <= 6,
      border: m.borderMean <= 6,
      content: m.above32 > 200,
      size: m.w === 1920 && m.h === 1080
    };
    const pass = Object.values(checks).every(Boolean);
    if (!pass) cellFailures += 1;
    measured.push({
      id: c.id, pass, checks,
      cornerMean: Number(m.cornerMean.toFixed(2)),
      borderMean: Number(m.borderMean.toFixed(2)),
      maxLum: Number(m.maxLum.toFixed(1)),
      pxAbove32: m.above32,
      warmPixelsReported: m.warm
    });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${c.id.padEnd(10)} corner ${m.cornerMean.toFixed(2)}  border ${m.borderMean.toFixed(2)}  max ${m.maxLum.toFixed(0)}  lit ${String(m.above32).padStart(7)}`);
  }
  await browser.close();
  check(`CELLS: ${cells.length} measured — corner ≤ 6, border ≤ 6, content present, 1920×1080`,
    cellFailures === 0, cellFailures ? `${cellFailures} failing` : `${cells.length}/${cells.length}`);

  // ---- MAP AGREEMENT --------------------------------------------------------
  {
    const map = fs.readFileSync(path.join(REPO, 'docs', 'act-3-provenance.md'), 'utf8')
      .replace(/\r\n/g, '\n');
    const drift = Object.entries(RULED).filter(([frame, klass]) => {
      const row = new RegExp(`\\*\\*${frame}[^|]*\\|\\s*\\*\\*${klass}\\*\\*`);
      return !row.test(map);
    }).map(([f]) => f);
    check('MAP: the ruled classes transcribed here are the classes docs/act-3-provenance.md states',
      drift.length === 0, drift.join(', ') || `${Object.keys(RULED).length}/${Object.keys(RULED).length} rows agree`);

    const notBuilt = /coordination scales[^|]*\|\s*\*\*NEW — not built\*\*/.test(map);
    check('MAP: the coordination-scales NEW row is recorded as not built',
      notBuilt, notBuilt ? 'recorded' : 'MISSING');

    const bad = cells
      .filter((c) => c.frame && RULED[c.frame])
      .filter((c) => c.klass !== RULED[c.frame])
      .map((c) => `${c.id} is ${c.klass}, ${c.frame} is ${RULED[c.frame]}`);
    check('MAP: every cell’s class is the class the map rules for its frame',
      bad.length === 0, bad.join(' · ') || 'every framed cell agrees with the map');

    const unclassed = cells.filter((c) => !c.klass || !c.frame).map((c) => c.id);
    check('MAP: no cell is unclassified', unclassed.length === 0,
      unclassed.join(', ') || `${cells.length}/${cells.length} carry a frame and a class`);

    const sourceless = cells
      .filter((c) => (c.klass === 'PORT' || c.klass === 'ADAPT') && !c.source)
      .map((c) => c.id);
    check('MAP: every PORT and ADAPT cell names its legacy source',
      sourceless.length === 0, sourceless.join(', ') || 'all named');
  }

  // ---- BEAT COVERAGE --------------------------------------------------------
  {
    const bad = [];
    let total = 0;
    const detail = [];
    Object.entries(FROZEN).forEach(([scene, n]) => {
      const live = cells.filter((c) => c.scene === scene && c.beat);
      const beats = new Set(live.map((c) => c.beat));
      if (live.length !== beats.size) bad.push(`${scene}: ${live.length} cells over ${beats.size} beats — a beat is covered twice`);
      total += beats.size;
      detail.push(`${scene} ${beats.size}`);
      if (beats.size !== n) bad.push(`${scene}: ${beats.size} beats vs the frozen ${n}`);
      for (let b = 1; b <= n; b += 1) if (!beats.has(b)) bad.push(`${scene} b${b} missing`);
    });
    if (total !== TOTAL_BEATS) bad.push(`total ${total} vs ${TOTAL_BEATS}`);
    check(`BEATS: every beat of the frozen map is on the sheet exactly once, and Act III is ${TOTAL_BEATS}`,
      bad.length === 0, bad.join(' · ') || `${detail.join(' · ')} = ${total}`);
  }

  // ---- NO CANDIDATES ANYWHERE ----------------------------------------------
  {
    const nonBeat = cells.filter((c) => !c.beat || c.review === 'on-file' ||
      c.review === 'pending-selection' || c.system).map((c) => c.id);
    check('NO CANDIDATES: every cell is a beat cell — nothing on file, nothing pending selection, no candidate systems',
      nonBeat.length === 0, nonBeat.join(', ') || `${cells.length}/${cells.length} beat cells, 0 candidates`);

    const reviews = new Set(cells.map((c) => c.review));
    const allowed = ['pending-review', 'determined', 'approved-port'];
    const stray = [...reviews].filter((r) => !allowed.includes(r));
    check('NO CANDIDATES: the only review classes on the sheet are pending-review, determined and approved-port',
      stray.length === 0, stray.join(', ') || allowed.join(' · '));

    const flagless = cells.filter((c) => c.review === 'pending-review' && !c.flag && c.klass === 'PORT')
      .map((c) => c.id);
    check('FLAGS: every pending-review PORT carries its plain-English flag',
      flagless.length === 0, flagless.join(', ') || 'every flagged port says why');
  }

  // ---- SOURCE CHECKS --------------------------------------------------------
  {
    const src = fs.readFileSync(path.join(__dirname, 'states.mjs'), 'utf8');

    // The thread: the ClaimObject is imported once and constructed exactly
    // once, inside the tower builder's disc branch — s15-b6's return.
    const constructions = (src.match(/ClaimObject\(\)/g) || []).length;
    const discGated = /if \(disc\) \{[\s\S]{0,400}ClaimObject\(\)/.test(src);
    const b6Disc = /cell\('s15-b6'[\s\S]{0,2400}\{ disc: true \}/.test(src);
    const noOtherDisc = !/disc: true/.test(src.replace(/cell\('s15-b6'[\s\S]{0,2400}\{ disc: true \}/, ''));
    check('THREAD: the ClaimObject is built exactly once, gated behind the disc return, and only s15-b6 asks for it',
      constructions === 1 && discGated && b6Disc && noOtherDisc,
      `${constructions} construction(s) · gated ${discGated} · s15-b6 ${b6Disc} · nowhere else ${noOtherDisc}`);

    // The one ruled change, at the source: the ladder builder removes the
    // grammar glyph from every stop and stands a DarkFieldImage in it.
    const ladderStart = src.indexOf('function ladder(');
    const ladderBody = src.slice(ladderStart, src.indexOf('function orderOverlay(', ladderStart));
    check('LADDER: the builder removes the stop glyphs and stands renders in the stops (the one ruled change)',
      /__glyph'\)/.test(ladderBody) && /g\.remove\(\)/.test(ladderBody) && /DarkFieldImage\(/.test(ladderBody),
      'glyphs removed · DarkFieldImage in the stop · the component’s state machine drives presence');

    // The band box: both axes capped at 188 — the rails-law box as amended.
    check('BAND: the stage marks use the 188×188 contain box (the rails law, r2.5)',
      /const BAND = 188/.test(src) && /Math\.min\(BAND, BAND \/ ar\)/.test(src),
      '188 cap on both axes, each render in a box of its own aspect');

    // The tower is a structural diagram: its builder mounts the legacy
    // component and adds only the copy rows and the ruled disc — no photo()
    // and no DarkFieldImage inside the tower world.
    const towerBody = src.slice(src.indexOf('function tower('), src.indexOf('// ====', src.indexOf('function tower(')));
    check('REGISTER: no dark-field render enters the tower diagram — the disc return is the only addition',
      !/photo\(/.test(towerBody) && !/DarkFieldImage\(/.test(towerBody) && /ClaimObject\(\)/.test(towerBody),
      'tower builder carries the mounted diagram, the copy rows, and the disc only');

    // The stage-mark assignments are the recorded ones.
    const assigns = ['single_cowrie', "sov: { subject: 'gold'", "moe: { subject: 'coinage'", "uoa: { subject: 'ledger'"];
    const missing = assigns.filter((a) => !src.includes(a));
    check('ASSIGNMENTS: collectible = single_cowrie (ruled) · gold / coinage / ledger (honest, flagged)',
      missing.length === 0, missing.join(', ') || 'as recorded in docs/act-3-provenance.md §2');
  }

  fs.writeFileSync(path.join(__dirname, 'check-cells.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-3-states',
    limits: { cornerMean: 6, borderMean: 6 },
    frozenBeatMap: { ...FROZEN, total: TOTAL_BEATS },
    ruledClasses: RULED,
    reportedNotGated: 'warmPixelsReported — the act carries the accent by design at the ladder’s foundation state, the tower’s base and the disc’s return, so warmth is evidence here rather than a gate.',
    cells: measured,
    checks: results.length,
    failures: results.filter((r) => !r.ok).length,
    results
  }, null, 2));

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} sheet checks green`);
  process.exit(failed.length ? 1 : 0);
})();
