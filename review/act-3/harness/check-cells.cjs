// Act III states r2 — the FAST-scope per-cell checks (the r2 brief §4).
//
// The measured cell discipline every sheet in this project carries, plus the
// checks that make the r2 brief's own rules checkable rather than asserted.
// The measured four are the dark-field gate's own terms:
//   1. corner patches (6% of the short side) mean luminance ≤ 6/255;
//   2. outer 2% border ring mean luminance ≤ 6/255 — nothing reaches the edge;
//   3. content present — some pixels above luminance 32;
//   4. the cell is 1920 × 1080.
//
// And the sheet-level rules, gated against the FIVE R2 RULINGS:
//
//   MAP AGREEMENT — every cell's class is the class the amended
//   docs/act-3-provenance.md rules for its frame (S11 ADAPT · S12 PORT ·
//   S13 ADAPT · S14 ADAPT · S15 NEW, presenter-reopened).
//
//   BEAT COVERAGE — all 25 beats of the frozen map; S15's six beats exactly
//   twice, once per candidate system; every other beat exactly once. 31 cells.
//
//   CANDIDATES ONLY WHERE REOPENED — S15's cells are the two ruled systems
//   (one A and one B per beat, pending-selection); no other cell carries a
//   system or a selection class.
//
//   THE THREAD (ruling 1) — the disc is the triad's center: the legacy token
//   (luminous-disc s1q-token s1q-token--small s3f-functions__token) is built
//   in exactly one place, inside the triad builder's hub branch; ClaimObject
//   appears nowhere; no token and no render enters either tower candidate.
//
//   THE NEUTRAL MARKS (ruling 3) — the stage marks are collectible / store /
//   medium / unit; the triad's job objects are store / medium / unit; NO
//   MONETARY ASSET IS A STAGE MARK — monetary renders reach the ladder only
//   through the berths (the climbers).
//
//   CARRIED BYTES (the brief §4) — s14-b1.png is byte-identical to r1,
//   proven against the recorded sha256, and the retired r1 stagings are on
//   file under their retired names.
//
// Usage: node check-cells.cjs [--port 5273]
const { chromium } = require('playwright');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(__dirname, '..', 'states');

const FROZEN = { S11: 5, S12: 4, S13: 6, S14: 4, S15: 6 };
const TOTAL_BEATS = 25;
const TOTAL_CELLS = 31;

// The ruled map as amended 2 September 2026 (the r2 rulings), transcribed.
// The MAP AGREEMENT check compares this against docs/act-3-provenance.md
// itself as well as against the cells, so a transcription drift here fails
// rather than passes quietly.
const RULED = {
  'S11-F1': 'ADAPT',
  'S12-F1': 'PORT',
  'S13-F1': 'ADAPT',
  'S14-F1': 'ADAPT',
  'S15-F1': 'NEW',
  'S15-F2': 'NEW'
};

// The carried cell's r1 bytes (the brief §4's byte-identity proof).
const CARRIED_SHA = {
  's14-b1.png': 'e7cc6fff9a1142573f5a30878505e8625f1c57ca1cac1b95f881167458821081'
};

// The retired r1 stagings, on file under the aesthetic law.
const RETIRED_FILES = [
  's12-b3-block.png',
  's15-b1-boxes.png', 's15-b2-boxes.png', 's15-b3-boxes.png',
  's15-b4-boxes.png', 's15-b5-boxes.png', 's15-b6-boxes.png'
];

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
  check(`CELLS: the sheet carries exactly ${TOTAL_CELLS} cells (25 beats; S15 twice, once per candidate)`,
    cells.length === TOTAL_CELLS, `${cells.length}`);

  // ---- MAP AGREEMENT --------------------------------------------------------
  {
    const map = fs.readFileSync(path.join(REPO, 'docs', 'act-3-provenance.md'), 'utf8')
      .replace(/\r\n/g, '\n');
    const drift = Object.entries(RULED).filter(([frame, klass]) => {
      const row = new RegExp(`\\*\\*${frame}[^|]*\\|\\s*\\*\\*${klass}\\*\\*`);
      return !row.test(map);
    }).map(([f]) => f);
    check('MAP: the ruled classes transcribed here are the classes the amended docs/act-3-provenance.md states',
      drift.length === 0, drift.join(', ') || `${Object.keys(RULED).length}/${Object.keys(RULED).length} rows agree`);

    const notBuilt = /coordination scales[^|]*\|\s*\*\*NEW — not built\*\*/.test(map);
    check('MAP: the coordination-scales NEW row is recorded as not built',
      notBuilt, notBuilt ? 'recorded' : 'MISSING');

    const reopened = /S15[^|]*presenter-reopened|Presenter-reopened by name/i.test(map);
    check('MAP: Scene 15 is recorded as presenter-reopened by name (ruling 4)',
      reopened, reopened ? 'recorded' : 'MISSING');

    const bad = cells
      .filter((c) => c.frame && RULED[c.frame])
      .filter((c) => c.klass !== RULED[c.frame])
      .map((c) => `${c.id} is ${c.klass}, ${c.frame} is ${RULED[c.frame]}`);
    check('MAP: every cell’s class is the class the map rules for its frame',
      bad.length === 0, bad.join(' · ') || 'every framed cell agrees with the map');

    const unclassed = cells.filter((c) => !c.klass || !c.frame).map((c) => c.id);
    check('MAP: no cell is unclassified', unclassed.length === 0,
      unclassed.join(', ') || `${cells.length}/${cells.length} carry a frame and a class`);

    const sourceless = cells.filter((c) => !c.source).map((c) => c.id);
    check('MAP: every cell names its source (legacy slide, or the ruling that opened it)',
      sourceless.length === 0, sourceless.join(', ') || 'all named');
  }

  // ---- BEAT COVERAGE --------------------------------------------------------
  {
    const bad = [];
    let total = 0;
    const detail = [];
    Object.entries(FROZEN).forEach(([scene, n]) => {
      const live = cells.filter((c) => c.scene === scene && c.beat);
      const per = scene === 'S15' ? 2 : 1;
      const beats = new Set(live.map((c) => c.beat));
      total += beats.size;
      detail.push(`${scene} ${beats.size}×${per}`);
      if (beats.size !== n) bad.push(`${scene}: ${beats.size} beats vs the frozen ${n}`);
      if (live.length !== n * per) bad.push(`${scene}: ${live.length} cells vs ${n * per}`);
      for (let b = 1; b <= n; b += 1) {
        const at = live.filter((c) => c.beat === b);
        if (at.length !== per) bad.push(`${scene} b${b}: ${at.length} cells vs ${per}`);
        if (scene === 'S15') {
          const systems = at.map((c) => c.system).sort().join('');
          if (systems !== 'AB') bad.push(`S15 b${b}: systems [${systems}] vs one A and one B`);
        }
      }
    });
    if (total !== TOTAL_BEATS) bad.push(`total ${total} vs ${TOTAL_BEATS}`);
    check(`BEATS: every beat of the frozen map is covered — S15 once per candidate, all others once, Act III is ${TOTAL_BEATS}`,
      bad.length === 0, bad.join(' · ') || `${detail.join(' · ')} = ${total} beats, ${cells.length} cells`);
  }

  // ---- CANDIDATES ONLY WHERE REOPENED ---------------------------------------
  {
    const strayCandidate = cells
      .filter((c) => c.scene !== 'S15')
      .filter((c) => c.system || c.review === 'pending-selection')
      .map((c) => c.id);
    check('CANDIDATES: no cell outside the reopened Scene 15 carries a system or a selection class',
      strayCandidate.length === 0, strayCandidate.join(', ') || `${cells.filter((c) => c.scene !== 'S15').length} non-S15 cells clean`);

    const s15Bad = cells
      .filter((c) => c.scene === 'S15')
      .filter((c) => !['A', 'B'].includes(c.system) || c.review !== 'pending-selection')
      .map((c) => c.id);
    check('CANDIDATES: every S15 cell is one of the two ruled systems and stands pending the presenter’s selection',
      s15Bad.length === 0, s15Bad.join(', ') || '12/12 candidate cells, A and B');

    const reviews = new Set(cells.map((c) => c.review));
    const allowed = ['pending-review', 'determined', 'pending-selection'];
    const stray = [...reviews].filter((r) => !allowed.includes(r));
    check('CANDIDATES: the only review classes on the sheet are pending-review, determined and pending-selection',
      stray.length === 0, stray.join(', ') || allowed.join(' · '));
  }

  // ---- SOURCE CHECKS --------------------------------------------------------
  {
    const src = fs.readFileSync(path.join(__dirname, 'states.mjs'), 'utf8');

    // THE THREAD (ruling 1): the disc is the legacy token, built exactly once,
    // inside the triad builder's hub branch; ClaimObject appears nowhere.
    // Constructions are className assignments — the header comment naming the
    // classes is documentation, not a build site.
    const tokenAssign = "className = 'luminous-disc s1q-token s1q-token--small s3f-functions__token'";
    const tokenCount = src.split(tokenAssign).length - 1;
    const hubGated = new RegExp(`if \\(hub\\) \\{[\\s\\S]{0,600}${tokenAssign.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(src);
    const noClaimObject = !/ClaimObject/.test(src);
    check('THREAD: the disc (the legacy token) is built exactly once, inside the triad hub — and ClaimObject appears nowhere',
      tokenCount === 1 && hubGated && noClaimObject,
      `token constructions ${tokenCount} · hub-gated ${hubGated} · ClaimObject absent ${noClaimObject}`);

    // The disc is NOT on the tower: neither candidate builder touches the
    // token, a photo, or a DarkFieldImage — line grammar only (ruling 4).
    const aBody = src.slice(src.indexOf('function candidateA('), src.indexOf('// ---- CANDIDATE B'));
    const bBody = src.slice(src.indexOf('function candidateB('), src.indexOf('// ====', src.indexOf('function candidateB(')));
    const clean = (body) => !/DarkFieldImage\(|photo\(|luminous-disc|s1q-token/.test(body);
    check('REGISTER: no render and no disc enters either tower candidate — line grammar throughout',
      clean(aBody) && clean(bBody), `candidate A clean ${clean(aBody)} · candidate B clean ${clean(bBody)}`);

    // The one ruled change, at the source: the ladder builder removes the
    // grammar glyph from every stop and stands a DarkFieldImage in it.
    const ladderStart = src.indexOf('function ladder(');
    const ladderBody = src.slice(ladderStart, src.indexOf('// `3-03`', ladderStart));
    check('LADDER: the builder removes the stop glyphs and stands renders in the stops (the standing ruled change)',
      /__glyph'\)/.test(ladderBody) && /g\.remove\(\)/.test(ladderBody) && /DarkFieldImage\(/.test(ladderBody),
      'glyphs removed · DarkFieldImage in the stop · the component’s state machine drives presence');

    // The band box: both axes capped at 188 — the rails-law box as amended.
    check('BAND: the stage and job marks use the 188×188 contain box (the rails law, r2.5)',
      /const BAND = 188/.test(src) && /Math\.min\(BAND, BAND \/ ar\)/.test(src),
      '188 cap on both axes, each render in a box of its own aspect');

    // THE NEUTRAL MARKS (ruling 3): the four stage marks and the three job
    // objects are the presenter's neutral set, and no monetary asset stands
    // as a stage mark — monetary renders reach the ladder only as climbers.
    const assigns = ["collectible: { subject: 'collectible'", "sov: { subject: 'store'",
      "moe: { subject: 'medium'", "uoa: { subject: 'unit'"];
    const missing = assigns.filter((a) => !src.includes(a));
    const stageBlock = src.slice(src.indexOf('const STAGE_RENDERS'), src.indexOf('const BAND_CLEAR'));
    const monetary = ['gold', 'coinage', 'ledger', 'single_cowrie', 'bitcoin', 'gold_certificate', 'fiat', 'metals']
      .filter((s) => new RegExp(`'${s}'`).test(stageBlock));
    check('ASSIGNMENTS: the stage marks are the presenter’s neutral set — collectible · store · medium · unit — and no monetary asset is a stage mark',
      missing.length === 0 && monetary.length === 0,
      (missing.length ? `missing ${missing.join(', ')}` : 'all four recorded') + (monetary.length ? ` · MONETARY IN STAGES: ${monetary.join(', ')}` : ' · stages carry no monetary asset'));

    const jobAssigns = ["subject: 'store'", "subject: 'medium'", "subject: 'unit'"];
    const jobsBlock = src.slice(src.indexOf('const JOBS'), src.indexOf('const CONTINUITY'));
    const jobsOk = jobAssigns.every((a) => jobsBlock.includes(a));
    check('ASSIGNMENTS: the triad’s job objects are the same three marks (store · medium · unit) — one family for jobs and stages',
      jobsOk, jobsOk ? 'the three job objects match the stage marks' : 'JOB OBJECTS DRIFTED');

    // The climbers: bitcoin appears only as a berth subject (s14-b3's coin).
    const berthOnly = !/STAGE_RENDERS[^}]*bitcoin/.test(src) && /subject: 'bitcoin'/.test(src);
    check('CLIMBERS: the coin reaches the ladder only through a berth — S14 b3 is the only monetary object in sight',
      berthOnly, 'bitcoin at the sov berth only, never a stage mark');
  }

  // ---- CARRIED BYTES + RETIRED FILES ---------------------------------------
  {
    const bad = [];
    Object.entries(CARRIED_SHA).forEach(([file, sha]) => {
      const now = crypto.createHash('sha256').update(fs.readFileSync(path.join(OUT, file))).digest('hex');
      if (now !== sha) bad.push(`${file}: ${now.slice(0, 16)}… vs r1 ${sha.slice(0, 16)}…`);
    });
    check('CARRIED: s14-b1.png is byte-identical to its r1 bytes (sha256 proven)',
      bad.length === 0, bad.join(' · ') || 'e7cc6fff… matches');

    const carriedRecorded = (record.carried || []).some((c) => c.id === 's14-b1');
    check('CARRIED: states.json records the carried cell and its hash',
      carriedRecorded, carriedRecorded ? 'recorded' : 'MISSING');

    const missingRetired = RETIRED_FILES.filter((f) => !fs.existsSync(path.join(OUT, f)));
    check('RETIRED: the superseded r1 stagings are on file under their retired names (s12-b3-block, s15-b*-boxes)',
      missingRetired.length === 0, missingRetired.join(', ') || `${RETIRED_FILES.length}/${RETIRED_FILES.length} on file`);
  }

  fs.writeFileSync(path.join(__dirname, 'check-cells.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-3-states-r2',
    limits: { cornerMean: 6, borderMean: 6 },
    frozenBeatMap: { ...FROZEN, total: TOTAL_BEATS, cells: TOTAL_CELLS },
    ruledClasses: RULED,
    carriedSha: CARRIED_SHA,
    retiredFiles: RETIRED_FILES,
    reportedNotGated: 'warmPixelsReported — the act carries the accent by design at the ladder’s foundation state, both candidates’ foundation scopes and the disc at the triad’s center, so warmth is evidence here rather than a gate.',
    cells: measured,
    checks: results.length,
    failures: results.filter((r) => !r.ok).length,
    results
  }, null, 2));

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} sheet checks green`);
  process.exit(failed.length ? 1 : 0);
})();
