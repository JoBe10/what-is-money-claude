// Act IV states — the FAST-scope per-cell checks (the Act IV kickoff brief,
// Session 2: "per-cell checks").
//
// The measured cell discipline every sheet in this project carries, plus the
// checks that make the sheet's own rules checkable rather than asserted.
// The measured four are the dark-field gate's own terms:
//   1. corner patches (6% of the short side) mean luminance ≤ 6/255;
//   2. outer 2% border ring mean luminance ≤ 6/255 — nothing reaches the edge;
//   3. content present — some pixels above luminance 32;
//   4. the cell is 1920 × 1080.
//
// And the sheet-level rules, gated against the RULED MAP and the FROZEN BEAT
// MAP (master §13, 3 Sep 2026):
//
//   MAP AGREEMENT — the map is RULED; every cell's frame is a PORT or ADAPT
//   row of docs/act-4-provenance.md and the cell carries its row's class
//   (S19-F1 ADAPT since the Batch D ruling 1, 3 Sep 2026 — the carrier
//   arrives at beat 2; S22-F2 ADAPT since ruling 2 — the ten properties in
//   one advance, S22 = 3, the act = 42); no ARGUABLE class survives in the
//   map's table; the two retired rows are recorded; every cell names its
//   source.
//
//   BEAT COVERAGE — all 43 beats of the frozen map, each exactly once; 43
//   cells; no candidate system anywhere (the map names no NEW frame).
//
//   THE APPROVED SET — the sheet is presenter-approved in full (3 Sep 2026,
//   the Batch D implementation brief §1.3): no cell is pending; the only
//   review classes are approved-port, approved-ruled and approved-as-
//   rendered; every approved-as-rendered cell carries its closed flag, every
//   approved-ruled cell its ruling; states.json records the approval and the
//   approved set is every cell.
//
//   THE PROBES — every cell has at least one probe and every probe passed at
//   capture: the still shows the state it claims (the fifty revealed scores,
//   the ten mapped rows, the released claim, the shell's future focus …).
//
//   NOTHING DESIGNED — at the source: states.mjs creates exactly one element
//   (the stage container), imports only the twelve legacy Section 4 modules
//   and the Act I stage, and every builder is a mount of a legacy module at
//   a build or the homecoming; no DarkFieldImage, no glyph, no text, no
//   innerHTML, no style beyond the stage's.
//
//   THE HOMECOMING — s16-b1's recorded Act I state is Scene 4's approved save
//   state by the stage's own law (markSaveB · roads.save · fadeSaveB, read
//   from _exchangeStage.js rather than transcribed), and the cell's pixels
//   are compared with the approved s4-b4-b (review/gate-2/states) — the
//   differing-pixel count reported, zero gated.
//
//   THE FROZEN DATA — the two data files' committed blob ids are the ids the
//   ruled map records (§3.1), and the working tree carries no change to them.
//
//   THE SPLICE — the deck smoke on file is green at 38 slides.
//
// Usage: node check-cells.cjs [--port 5273]
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(__dirname, '..', 'states');

// S22 4 → 3 and 43 → 42 by the Batch D ruling 2 (3 Sep 2026, master §13).
const FROZEN = { S16: 8, S17: 5, S18: 8, S19: 2, S20: 5, S21: 5, S22: 3, S23: 6 };
const TOTAL_BEATS = 42;
const TOTAL_CELLS = 42;

// The ruled map's PORT rows (docs/act-4-provenance.md §1), transcribed. The
// MAP AGREEMENT check compares this against the map itself as well as
// against the cells, so a transcription drift here fails rather than passes.
const PORT_FRAMES = [
  'S16-F1', 'S16-F2', 'S16-F3', 'S16-F4', 'S16-F5', 'S16-F6',
  'S17-F1', 'S17-F2',
  'S18-F1', 'S18-F2', 'S18-F3', 'S18-F4', 'S18-F5',
  'S19-F2',
  'S20-F1', 'S21-F1',
  'S22-F1',
  'S23-F1', 'S23-F2', 'S23-F3'
];
// The ADAPT rows — each a presenter ruling on a proven treatment, the one
// change named in the map (the Batch D implementation brief §1, 3 Sep 2026).
const ADAPT_FRAMES = ['S19-F1', 'S22-F2'];
const CLASS_OF = Object.fromEntries([
  ...PORT_FRAMES.map((f) => [f, 'PORT']), ...ADAPT_FRAMES.map((f) => [f, 'ADAPT'])]);

// The frozen data, by committed blob id (docs/act-4-provenance.md §3.1).
const FROZEN_BLOBS = {
  'src/slides/section-4-ideal-store/_comparison-data.js': '3a6440aa274260924ae6b83d896d60f37a5f1154',
  'src/slides/section-4-ideal-store/_failure-property-data.js': 'c1eb13d4d22eebedf4600d708e6f61c7a7cd0bc0'
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
    }, `/review/act-4/states/${c.file}`);

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
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${c.id.padEnd(8)} corner ${m.cornerMean.toFixed(2)}  border ${m.borderMean.toFixed(2)}  max ${m.maxLum.toFixed(0)}  lit ${String(m.above32).padStart(7)}`);
  }
  check(`CELLS: ${cells.length} measured — corner ≤ 6, border ≤ 6, content present, 1920×1080`,
    cellFailures === 0, cellFailures ? `${cellFailures} failing` : `${cells.length}/${cells.length}`);
  check(`CELLS: the sheet carries exactly ${TOTAL_CELLS} cells — one per beat of the frozen map`,
    cells.length === TOTAL_CELLS, `${cells.length}`);

  // ---- THE HOMECOMING: pixels against the approved s4-b4-b -----------------
  let homecomingPixels = null;
  {
    const approved = path.join(REPO, 'review', 'gate-2', 'states', 's4-b4-b.png');
    const exists = fs.existsSync(approved) && fs.existsSync(path.join(OUT, 's16-b1.png'));
    check('HOMECOMING: the approved s4-b4-b and the s16-b1 cell are both on disk', exists);
    if (exists) {
      homecomingPixels = await page.evaluate(async ([a, b]) => {
        const load = async (src) => {
          const img = new Image(); img.src = src; await img.decode();
          const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
          const ctx = c.getContext('2d', { willReadFrequently: true }); ctx.drawImage(img, 0, 0);
          return { w: c.width, h: c.height, d: ctx.getImageData(0, 0, c.width, c.height).data };
        };
        const A = await load(a); const B = await load(b);
        if (A.w !== B.w || A.h !== B.h) return { sameSize: false, differing: null };
        let differing = 0; let maxDelta = 0;
        for (let i = 0; i < A.d.length; i += 4) {
          const delta = Math.max(Math.abs(A.d[i] - B.d[i]), Math.abs(A.d[i + 1] - B.d[i + 1]), Math.abs(A.d[i + 2] - B.d[i + 2]));
          if (delta > 0) differing += 1;
          if (delta > maxDelta) maxDelta = delta;
        }
        return { sameSize: true, differing, maxDelta, pixels: A.w * A.h };
      }, ['/review/gate-2/states/s4-b4-b.png', '/review/act-4/states/s16-b1.png']);
      check('HOMECOMING: s16-b1 is the approved s4-b4-b at zero differing pixels',
        homecomingPixels.sameSize && homecomingPixels.differing === 0,
        homecomingPixels.sameSize ? `${homecomingPixels.differing} of ${homecomingPixels.pixels} pixels differ (max channel delta ${homecomingPixels.maxDelta})` : 'SIZE MISMATCH');
    }
  }
  await browser.close();

  // ---- MAP AGREEMENT --------------------------------------------------------
  {
    const map = fs.readFileSync(path.join(REPO, 'docs', 'act-4-provenance.md'), 'utf8').replace(/\r\n/g, '\n');
    check('MAP: docs/act-4-provenance.md is RULED (3 September 2026)', /\*\*Status: RULED, 3 September 2026\*\*/.test(map));

    const drift = PORT_FRAMES.filter((frame) => !new RegExp(`\\*\\*${frame}\\*\\*[^|]*\\|\\s*\\*\\*PORT\\*\\*`).test(map));
    check('MAP: every PORT frame transcribed here is a PORT row of the ruled map',
      drift.length === 0, drift.join(', ') || `${PORT_FRAMES.length}/${PORT_FRAMES.length} rows agree`);
    const adaptDrift = ADAPT_FRAMES.filter((frame) => !new RegExp(`\\*\\*${frame}\\*\\*[^|]*\\|\\s*\\*\\*ADAPT\\*\\*`).test(map));
    check('MAP: every ADAPT frame transcribed here is an ADAPT row of the ruled map (the Batch D rulings, 3 Sep 2026)',
      adaptDrift.length === 0, adaptDrift.join(', ') || `${ADAPT_FRAMES.length}/${ADAPT_FRAMES.length} rows agree`);

    const table = map.slice(map.indexOf('# 1. The proposed map'), map.indexOf('# 2. The ARGUABLE rows'));
    const arguable = (table.match(/\|\s*\*\*ARGUABLE\*\*/g) || []).length;
    check('MAP: no ARGUABLE class survives in the map’s table (the three rows ruled A · A · A)', arguable === 0, `${arguable} left`);

    const retiredRows = (table.match(/\|\s*\*\*retired\*\*/g) || []).length;
    check('MAP: the two retired rows are recorded (the 4-01 lens; the 4-04 goods band)', retiredRows === 2, `${retiredRows}`);

    const bad = cells.filter((c) => !CLASS_OF[c.frame] || c.klass !== CLASS_OF[c.frame]).map((c) => `${c.id}: ${c.frame} ${c.klass}`);
    check('MAP: every cell names a frame of the ruled map and carries that frame’s class — PORT, or ADAPT where a ruling named one change', bad.length === 0, bad.join(' · ') || `${cells.length}/${cells.length}`);

    const sourceless = cells.filter((c) => !c.source || !c.frame).map((c) => c.id);
    check('MAP: every cell names its legacy source (slide and build)', sourceless.length === 0, sourceless.join(', ') || 'all named');
  }

  // ---- BEAT COVERAGE + NO CANDIDATES ----------------------------------------
  {
    const bad = [];
    let total = 0;
    const detail = [];
    Object.entries(FROZEN).forEach(([scene, n]) => {
      const live = cells.filter((c) => c.scene === scene && c.beat);
      const beats = new Set(live.map((c) => c.beat));
      total += beats.size;
      detail.push(`${scene} ${beats.size}`);
      if (live.length !== beats.size) bad.push(`${scene}: ${live.length} cells over ${beats.size} beats — a beat is covered twice`);
      if (beats.size !== n) bad.push(`${scene}: ${beats.size} beats vs the frozen ${n}`);
      for (let b = 1; b <= n; b += 1) if (!beats.has(b)) bad.push(`${scene} b${b} missing`);
    });
    if (total !== TOTAL_BEATS) bad.push(`total ${total} vs ${TOTAL_BEATS}`);
    check(`BEATS: every beat of the frozen map exactly once — Act IV is ${TOTAL_BEATS}`,
      bad.length === 0, bad.join(' · ') || `${detail.join(' · ')} = ${total}`);

    // A candidate id carries a system letter after its beat (s15-b1-a); a
    // plain beat id ends at the beat.
    const candidates = cells.filter((c) => c.system || !/^s\d+-b\d+$/.test(c.id)).map((c) => c.id);
    check('CANDIDATES: no cell carries a candidate system — the map names no NEW frame', candidates.length === 0, candidates.join(', ') || 'none');
  }

  // ---- THE PENDING SET ------------------------------------------------------
  {
    const reviews = new Set(cells.map((c) => c.review));
    const allowed = ['approved-port', 'approved-ruled', 'approved-as-rendered'];
    const stray = [...reviews].filter((r) => !allowed.includes(r));
    check('REVIEW: the only review classes are approved-port, approved-ruled and approved-as-rendered — no cell is pending (the sheet approved in full, 3 Sep 2026)', stray.length === 0, stray.join(', ') || allowed.join(' · '));
    const renderedNoFlag = cells.filter((c) => c.review === 'approved-as-rendered' && !c.flag).map((c) => c.id);
    const flagNotRendered = cells.filter((c) => c.flag && c.review !== 'approved-as-rendered').map((c) => c.id);
    const ruledNoRuling = cells.filter((c) => c.review === 'approved-ruled' && !c.ruling).map((c) => c.id);
    const rulingNotRuled = cells.filter((c) => c.ruling && c.review !== 'approved-ruled').map((c) => c.id);
    check('REVIEW: every approved-as-rendered cell carries its closed flag, every flag is on such a cell, and every approved-ruled cell carries its ruling',
      renderedNoFlag.length === 0 && flagNotRendered.length === 0 && ruledNoRuling.length === 0 && rulingNotRuled.length === 0,
      [...renderedNoFlag.map((id) => `${id} approved as rendered without its flag`), ...flagNotRendered.map((id) => `${id} flagged but not approved-as-rendered`),
        ...ruledNoRuling.map((id) => `${id} ruled without ruling`), ...rulingNotRuled.map((id) => `${id} carries a ruling but is not approved-ruled`)].join(' · ')
        || `${cells.filter((c) => c.review === 'approved-as-rendered').length} approved as rendered, each with its closed flag · ${cells.filter((c) => c.review === 'approved-ruled').length} ruled, each with its ruling`);
    const approvedOk = typeof record.approval === 'string' && /approved in full/.test(record.approval) &&
      Array.isArray(record.approvedSet) && record.approvedSet.length === cells.length &&
      cells.every((c) => record.approvedSet.includes(c.id)) &&
      record.flags.every((f) => /^closed/.test(f.status));
    check('APPROVAL: states.json records the presenter’s approval, the approved set is every cell, and every flag is closed',
      approvedOk, approvedOk ? `${record.approvedSet.length} cells approved` : 'NOT RECORDED');
  }

  // ---- THE PROBES -----------------------------------------------------------
  {
    const noProbe = cells.filter((c) => !c.probes || !c.probes.results || c.probes.results.length === 0).map((c) => c.id);
    const failed = cells.filter((c) => c.probes && !c.probes.ok)
      .map((c) => `${c.id}: ${c.probes.results.filter((r) => !r.ok).map((r) => `${r.sel} got ${r.got} expected ${r.expected}`).join('; ')}`);
    const totalProbes = cells.reduce((n, c) => n + (c.probes?.results?.length || 0), 0);
    check('PROBES: every cell carries at least one probe, and every probe passed at capture — the still shows the state it claims',
      noProbe.length === 0 && failed.length === 0,
      [...noProbe.map((id) => `${id} unprobed`), ...failed].join(' · ') || `${totalProbes} probes over ${cells.length} cells`);
    const fifty = cells.filter((c) => c.scene === 'S23' && c.beat >= 5)
      .every((c) => c.probes.results.some((r) => r.sel === '.s4-dot-rating[data-revealed="true"]' && r.got === 50 && r.ok));
    check('PROBES: the fifty scores are revealed at once at S23 b5 and stand at b6', fifty);
  }

  // ---- NOTHING DESIGNED — at the source --------------------------------------
  {
    const src = fs.readFileSync(path.join(__dirname, 'states.mjs'), 'utf8');
    const code = src.split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
    const created = (code.match(/document\.createElement\(/g) || []).length;
    const createdNS = (code.match(/createElementNS\(/g) || []).length;
    const styled = (code.match(/style\.cssText/g) || []).length;
    // The call and property forms — a caption may name a component in prose;
    // the code may not construct or write one.
    const forbidden = ['DarkFieldImage(', 'glyph(', '.innerHTML', '.textContent', 'appendChild(', 'ClaimObject(', 'LuminousDisc(', 'ClaimMark(']
      .filter((w) => code.split(w).length - 1 > (w === 'appendChild(' ? 1 : 0));
    check('SOURCE: states.mjs creates exactly one element — the stage container — and draws nothing',
      created === 1 && createdNS === 0 && styled === 1 && forbidden.length === 0,
      `createElement ${created} · createElementNS ${createdNS} · cssText ${styled}${forbidden.length ? ` · FORBIDDEN: ${forbidden.join(', ')}` : ''}`);

    const imports = [...code.matchAll(/^import .* from '([^']+)';/gm)].map((m) => m[1]);
    const legacy = imports.filter((p) => p.startsWith('/src/slides/section-4-ideal-store/'));
    const act1 = imports.filter((p) => p === '/src/scenes/act-1-the-unfinished-exchange/_exchangeStage.js');
    const other = imports.filter((p) => !legacy.includes(p) && !act1.includes(p));
    check('SOURCE: the only imports are the twelve legacy Section 4 slide modules and the Act I stage',
      legacy.length === 12 && act1.length === 1 && other.length === 0,
      `legacy ${legacy.length} · act1 ${act1.length}${other.length ? ` · OTHER: ${other.join(', ')}` : ''}`);

    const builders = (code.match(/\}, \(st\) => (mount\(st, s4\d\d, \d\)|homecoming\(st, 3\)|mount\(st, s41[12], n\))\);/g) || []).length;
    const cellCalls = (code.match(/^\s*cell\(/gm) || []).length;
    check('SOURCE: every cell builder mounts a legacy module at a build, or the homecoming — 34 cell() calls, 34 such builders (the two failure loops cover ten cells; 35 until the S22 merge)',
      builders === 34 && cellCalls === 34, `builders ${builders} · cell() ${cellCalls}`);

    const homecomingOnce = (code.match(/applyState\('spend-or-save', build\)/g) || []).length === 1 &&
      (code.match(/ensureStage\(st\)/g) || []).length === 1;
    check('SOURCE: the homecoming is the Act I stage’s own applyState, built in exactly one place', homecomingOnce);
  }

  // ---- THE HOMECOMING — the state law ----------------------------------------
  {
    const stageSrc = fs.readFileSync(path.join(REPO, 'src', 'scenes', 'act-1-the-unfinished-exchange', '_exchangeStage.js'), 'utf8');
    const num = (re) => stageSrc.match(re).slice(1).map(Number);
    const [mx, my, ms] = num(/markSaveB: \[(\d+), (\d+), (\d+)\]/);
    const [rl, rr, rld, rrd] = num(/save: \{ left: ([\d.]+), right: ([\d.]+), leftDot: ([\d.]+), rightDot: ([\d.]+) \}/);
    const [fx1, fx2, fy, fo, fw] = num(/fadeSaveB: \[(\d+), (\d+), (\d+), ([\d.]+), ([\d.]+)\]/);
    const s = cells.find((c) => c.id === 's16-b1')?.probes?.act1;
    const rgba = (o) => `rgba(255,255,255,${o})`;
    const markOk = s && s.scene === 'spend-or-save' && s.build === 3 &&
      s.mark[0] === `${mx}px` && s.mark[1] === `${my}px` && s.mark[2] === '1' && Number(s.mark[3]) === 1 && s.mark[4] === `${ms}px`;
    const roadsOk = s && s.roads[0][0] === rgba(rl) && s.roads[1][0] === rgba(rr) &&
      s.roadDots[0][2] === rgba(rld) && s.roadDots[1][3] === '0';
    const fadeOk = s && s.fades[0] && s.fades[0].x1 === fx1 && s.fades[0].x2 === fx2 && s.fades[0].y === fy && s.fades[0].o === fo && s.fades[0].w === fw;
    const quietOk = s && s.stmts.every((t) => t[2] === '0') && s.kickers.every((k) => k[2] === '0') &&
      s.goods.every((g) => g[4] === '0') && s.surgeon[4] === '0' && s.patient[4] === '0';
    check('HOMECOMING: s16-b1’s recorded Act I state is Scene 4’s save state by the stage’s own law — the claim at markSaveB, the roads at roads.save, the continuation at fadeSaveB, no words, no goods, no people',
      markOk && roadsOk && fadeOk && quietOk,
      s ? `mark ${markOk} (${s.mark.join(', ')}) · roads ${roadsOk} · fade ${fadeOk} · quiet ${quietOk}` : 'NO ACT I STATE RECORDED');
  }

  // ---- THE FROZEN DATA ------------------------------------------------------
  {
    const bad = [];
    Object.entries(FROZEN_BLOBS).forEach(([file, blob]) => {
      const committed = execSync(`git rev-parse HEAD:${file}`, { cwd: REPO }).toString().trim();
      if (committed !== blob) bad.push(`${file}: HEAD ${committed.slice(0, 8)} vs recorded ${blob.slice(0, 8)}`);
      const dirty = execSync(`git status --porcelain -- ${file}`, { cwd: REPO }).toString().trim();
      if (dirty) bad.push(`${file}: working tree differs (${dirty})`);
    });
    check('FROZEN: the two data files’ committed blob ids are the ids the ruled map records (§3.1), and the working tree carries no change to them',
      bad.length === 0, bad.join(' · ') || '3a6440aa… and c1eb13d4… — untouched');
  }

  // ---- THE SPLICE -----------------------------------------------------------
  {
    const smokePath = path.join(__dirname, '..', 'smoke-deck.json');
    const smoke = fs.existsSync(smokePath) ? JSON.parse(fs.readFileSync(smokePath, 'utf8')) : null;
    const ok = smoke && smoke.pass === true && smoke.deck && smoke.deck.slides === 38 && smoke.retirement?.absent === true &&
      smoke.boundary?.forwardOk && smoke.boundary?.backwardArrowOk && smoke.boundary?.backwardJumpOk && smoke.exit?.ok;
    check('SPLICE: the deck smoke on file is green — 38 slides, 3-08 absent, the 3-04 → 4-01 boundary both ways, the act’s exit unchanged',
      ok, smoke ? `${smoke.deck?.slides} slides · pass ${smoke.pass}` : 'NO SMOKE ON FILE');
    const recorded = record.splice && record.splice.was === 39 && record.splice.now === 38 && record.splice.retired === '3-08-waypoint-judge';
    check('SPLICE: states.json records the splice — 39 → 38, the retired id, the file on disk', recorded);
  }

  fs.writeFileSync(path.join(__dirname, 'check-cells.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-4-states',
    limits: { cornerMean: 6, borderMean: 6 },
    frozenBeatMap: { ...FROZEN, total: TOTAL_BEATS, cells: TOTAL_CELLS },
    portFrames: PORT_FRAMES,
    adaptFrames: ADAPT_FRAMES,
    frozenBlobs: FROZEN_BLOBS,
    homecomingPixels,
    reportedNotGated: 'warmPixelsReported — the act carries the accent by design (the claim, the carrier shell, the accent in the definition), so warmth is evidence here rather than a gate.',
    cells: measured,
    checks: results.length,
    failures: results.filter((r) => !r.ok).length,
    results
  }, null, 2));

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} sheet checks green`);
  process.exit(failed.length ? 1 : 0);
})();
