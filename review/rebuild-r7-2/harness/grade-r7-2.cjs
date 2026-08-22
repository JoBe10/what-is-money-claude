// R7.2 — the dark-field grade gate (§9.4.9, brief §2.2).
//
// The two-register amendment fixes a grade: "pure black ground (no environment,
// no horizon), a single warm key light (≈2700–3200K), the subject emerging from
// darkness with soft falloff, no text baked in, one consistent look across
// every image as if from a single shoot."
//
// That paragraph is a judgment, but three quarters of it is measurable, and the
// measurable quarters are exactly the ones a human eye grades inconsistently
// across nine images at nine different sizes. This gate measures them; the
// contact sheet (contact-r7-2.cjs) carries the quarter that stays visual —
// single-key-light consistency and the absence of baked text.
//
// What it measures, per image:
//
//   corners      mean luminance of four corner patches (6% of the short side).
//                The ground has to be black *where the frame ends*, which is
//                where an environment or a cut-out edge shows itself first.
//   border       mean luminance of the outer 2% ring, all the way round. A
//                corner check alone passes an image with a lit wall across the
//                middle of one edge.
//   darkFrac     fraction of the frame below luminance 16. "Emerging from
//                darkness" is a statement about how much of the frame is
//                darkness.
//   warmth       among highlight pixels (luminance ≥ 128): mean R − mean B, and
//                the fraction of them that are individually warm (R > B). A
//                single warm key at 2700–3200K cannot produce a cool highlight
//                population; a second, cooler source can and does.
//   keyAzimuth   the highlight centroid relative to frame center, in degrees.
//                Reported, not enforced: the master prompt asks for upper-left,
//                but a subject can be lit from upper-left and still put its
//                brightest pixels elsewhere (a specular kick, a rim). It is
//                evidence for the visual read, not a rule.
//   spread       the share of highlight mass inside one radius of the centroid.
//                Two lights at opposite sides of the frame split this; one key
//                does not. Reported alongside keyAzimuth for the same reason.
//
// Thresholds are calibrated in THRESHOLDS below, each with the reason it sits
// where it sits. Run with --measure to get the numbers without the verdict —
// which is how they were set in the first place.
//
// AMENDED AT R7.3, in one respect and with the reason: `--out` was added so a
// later phase can run this gate — unchanged, because the grade itself has not
// changed — and file its evidence under its own review directory instead of
// overwriting R7.2's. The default is R7.2's own directory, so nothing about the
// original run moves. Duplicating three hundred lines to change an output path
// would have left two gates to keep in step, which is how a gate stops
// describing the system.
//
// Usage: node grade-r7-2.cjs [--measure] [--dir <path>] [--out <dir>] [--name <file>]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i > -1 ? args[i + 1] : fallback;
};
const MEASURE_ONLY = args.includes('--measure');
const REPO = path.join(__dirname, '..', '..', '..');
const DIR = path.resolve(flag('--dir', path.join(REPO, 'assets', 'dark-field')));
const OUT = path.resolve(flag('--out', path.join(__dirname, '..')));
const RESULT_FILE = flag('--name', 'grade-r7-2.json');

// ---------------------------------------------------------------- thresholds
//
// The two ground limits are derived from the *stage*, not from the sample. The
// deck's background is pure black, and a dark-field image is composited onto
// it: the criterion that matters is whether the image's own frame edge is
// visible against the slide. On sRGB in a dark room a large flat area separates
// from black at roughly 5–6/255, so that is where the ground limits sit. The
// two failures below miss by 3.5× and 5.5×, and the seven passes clear by 2.6×
// or better — the limits were not placed between them, they landed there.
//
// Measured 1 August 2026 against the nine restored renders (`--measure`;
// the full table is in review/rebuild-r7-2/grade-r7-2.json).
const THRESHOLDS = {
  // Corner patches on the seven clean renders run 0.08–2.28. The steak sits on
  // a lit stone surface that fills the frame (20.86) and the surgeon is in an
  // operating theater with the lamp in shot (33.17).
  cornerMax: 6,
  // The border ring is the more sensitive instrument — it catches a lit edge
  // the four corner patches miss. Clean set 0.07–1.12; steak 8.98,
  // surgeon 21.67.
  borderMax: 6,
  // Clean set 0.69–0.96. A frame less than half darkness is not a subject
  // emerging from darkness, whatever else it is. Set at half deliberately: the
  // rule is about the ground, and the ground is either most of the frame or it
  // is a backdrop.
  darkFracMin: 0.50,
  // R−B across highlight pixels. A 2700–3200K key lands well positive; a
  // neutral white key lands near 0 and daylight goes negative. The set runs
  // +56 to +181, so +18 admits a restrained warm key without demanding amber.
  warmthMin: 18,
  // 0.95–1.00 across the set. One warm key cannot make a tenth of its own
  // highlights cool; a second, cooler source can and does.
  warmFracMin: 0.90
};

// The framing rule: scale each render so the subject's longer relative axis
// reaches this fraction of the box's matching axis. It is the icon grid's
// 40-of-48 live area, applied to photography — one rule for every subject, so
// the row reads as one shoot instead of as seven separate crops.
const FRAME_TARGET = 0.88;

const measureInPage = () => {
  const c = document.getElementById('c');
  const img = window.__img;
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const { width: W, height: H } = c;
  const d = ctx.getImageData(0, 0, W, H).data;

  const lum = (i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
  const at = (x, y) => (y * W + x) * 4;

  // Corners: a patch 6% of the short side, in each of the four corners.
  const p = Math.max(8, Math.round(Math.min(W, H) * 0.06));
  const patch = (x0, y0) => {
    let s = 0;
    for (let y = y0; y < y0 + p; y += 1) for (let x = x0; x < x0 + p; x += 1) s += lum(at(x, y));
    return s / (p * p);
  };
  const corners = {
    tl: patch(0, 0),
    tr: patch(W - p, 0),
    bl: patch(0, H - p),
    br: patch(W - p, H - p)
  };

  // Border ring: the outer 2% of the frame, all the way round.
  const t = Math.max(2, Math.round(Math.min(W, H) * 0.02));
  let ringSum = 0;
  let ringN = 0;
  for (let y = 0; y < H; y += 1) {
    const edgeRow = y < t || y >= H - t;
    for (let x = 0; x < W; x += 1) {
      if (!edgeRow && x >= t && x < W - t) { x = W - t - 1; continue; }
      ringSum += lum(at(x, y));
      ringN += 1;
    }
  }

  // Whole-frame statistics, plus the highlight population.
  let dark = 0;
  let hiN = 0;
  let hiR = 0;
  let hiG = 0;
  let hiB = 0;
  let hiWarm = 0;
  let hiX = 0;
  let hiY = 0;
  let hiMass = 0;
  const hi = [];
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      const i = at(x, y);
      const L = lum(i);
      if (L < 16) dark += 1;
      if (L >= 128) {
        hiN += 1;
        hiR += d[i]; hiG += d[i + 1]; hiB += d[i + 2];
        if (d[i] > d[i + 2]) hiWarm += 1;
        hiX += x * L; hiY += y * L; hiMass += L;
        if (hi.length < 240000) hi.push(x, y, L);
      }
    }
  }

  // The subject's own bounding box: the extent of everything the key light
  // actually reaches. Trimmed at the 0.4th percentile on each axis so a stray
  // hot pixel or a dust speck cannot define the frame. This is what "one
  // consistent look, as if from a single shoot" means at the level a viewer
  // notices first — not the grade, the framing. Two images can both be
  // perfectly graded and still read as two shoots if one subject fills its
  // frame and the next occupies a third of it.
  const LIT = 24;
  const colHits = new Uint32Array(W);
  const rowHits = new Uint32Array(H);
  let litTotal = 0;
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      if (lum(at(x, y)) >= LIT) { colHits[x] += 1; rowHits[y] += 1; litTotal += 1; }
    }
  }
  const span = (hits, n) => {
    if (!litTotal) return [0, n - 1];
    const trim = litTotal * 0.004;
    let acc = 0;
    let lo = 0;
    let hi = n - 1;
    for (let i = 0; i < n; i += 1) { acc += hits[i]; if (acc >= trim) { lo = i; break; } }
    acc = 0;
    for (let i = n - 1; i >= 0; i -= 1) { acc += hits[i]; if (acc >= trim) { hi = i; break; } }
    return [lo, hi];
  };
  const [sx0, sx1] = span(colHits, W);
  const [sy0, sy1] = span(rowHits, H);

  const total = W * H;
  let keyAzimuth = null;
  let keyOffset = null;
  let spread = null;
  if (hiN > 0) {
    const cx = hiX / hiMass;
    const cy = hiY / hiMass;
    // Screen y grows downward; negate so 90° reads as "above center".
    keyAzimuth = Math.round((Math.atan2(-(cy - H / 2), cx - W / 2) * 180) / Math.PI);
    keyOffset = Number((Math.hypot(cx - W / 2, cy - H / 2) / Math.hypot(W / 2, H / 2)).toFixed(3));
    // Share of highlight mass within a quarter-diagonal of the centroid.
    const r = Math.hypot(W, H) * 0.25;
    let near = 0;
    for (let k = 0; k < hi.length; k += 3) {
      if (Math.hypot(hi[k] - cx, hi[k + 1] - cy) <= r) near += hi[k + 2];
    }
    let sampled = 0;
    for (let k = 2; k < hi.length; k += 3) sampled += hi[k];
    spread = Number((near / (sampled || 1)).toFixed(3));
  }

  return {
    width: W,
    height: H,
    corners: {
      tl: Number(corners.tl.toFixed(2)),
      tr: Number(corners.tr.toFixed(2)),
      bl: Number(corners.bl.toFixed(2)),
      br: Number(corners.br.toFixed(2))
    },
    cornerMax: Number(Math.max(corners.tl, corners.tr, corners.bl, corners.br).toFixed(2)),
    border: Number((ringSum / ringN).toFixed(2)),
    darkFrac: Number((dark / total).toFixed(3)),
    // Subject extent as a fraction of the frame, on each axis, plus how far its
    // center sits from the frame's — the master prompt asks for a centered
    // composition, and an off-center subject scaled up walks out of its box.
    subjectW: Number(((sx1 - sx0 + 1) / W).toFixed(3)),
    subjectH: Number(((sy1 - sy0 + 1) / H).toFixed(3)),
    subjectDX: Number((((sx0 + sx1) / 2 - W / 2) / W).toFixed(3)),
    subjectDY: Number((((sy0 + sy1) / 2 - H / 2) / H).toFixed(3)),
    highlightFrac: Number((hiN / total).toFixed(4)),
    warmth: hiN ? Number(((hiR - hiB) / hiN).toFixed(1)) : null,
    highlightRGB: hiN ? [Math.round(hiR / hiN), Math.round(hiG / hiN), Math.round(hiB / hiN)] : null,
    warmFrac: hiN ? Number((hiWarm / hiN).toFixed(3)) : null,
    keyAzimuth,
    keyOffset,
    spread
  };
};

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  if (!ok) console.log(`FAIL  ${name} :: ${detail}`);
}

(async () => {
  if (!fs.existsSync(DIR)) {
    console.log(`no dark-field directory at ${DIR}`);
    process.exit(0);
  }
  const files = fs.readdirSync(DIR).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
  const incomingDir = path.join(DIR, 'incoming');
  const incoming = fs.existsSync(incomingDir)
    ? fs.readdirSync(incomingDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort()
    : [];

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent('<canvas id="c"></canvas>');

  const rows = [];
  for (const [dir, list, zone] of [[DIR, files, 'integrated'], [incomingDir, incoming, 'incoming']]) {
    for (const f of list) {
      const buf = fs.readFileSync(path.join(dir, f));
      const ext = path.extname(f).slice(1).toLowerCase();
      const mime = ext === 'jpg' ? 'jpeg' : ext;
      await page.evaluate((src) => new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => { window.__img = img; res(); };
        img.onerror = rej;
        img.src = src;
      }), `data:image/${mime};base64,${buf.toString('base64')}`);
      const m = await page.evaluate(measureInPage);
      rows.push({ file: f, zone, bytes: buf.length, ...m });
    }
  }
  await browser.close();

  console.log('\n| image | zone | px | cornerMax | border | dark% | R−B | warm% | key° | spread | subject w×h |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|');
  rows.forEach((r) => {
    console.log(`| ${r.file} | ${r.zone} | ${r.width}×${r.height} | ${r.cornerMax} | ${r.border} | ${(r.darkFrac * 100).toFixed(1)} | ${r.warmth} | ${r.warmFrac == null ? '—' : (r.warmFrac * 100).toFixed(1)} | ${r.keyAzimuth == null ? '—' : r.keyAzimuth} | ${r.spread == null ? '—' : r.spread} | ${r.subjectW}×${r.subjectH} |`);
  });

  // The framing table `src/dark-field.js` carries. One rule, applied to every
  // subject: scale the render so the subject's longer relative axis reaches
  // FRAME_TARGET of the box's matching axis, exactly as the icon grid's 40-of-48
  // live area normalizes glyph silhouettes. The numbers are measured, never
  // eyeballed — which is what makes this a rule rather than the five per-asset
  // corrections R7 recorded as never converging.
  const framing = Object.fromEntries(rows
    .filter((r) => r.zone === 'integrated')
    .map((r) => [
      r.file.replace(/\.[a-z]+$/i, ''),
      [
        Number((FRAME_TARGET / Math.max(r.subjectW, r.subjectH)).toFixed(3)),
        Number((-r.subjectDX * 100).toFixed(1)),
        Number((-r.subjectDY * 100).toFixed(1))
      ]
    ]));
  console.log('\nframing scales (paste into src/dark-field.js FRAMING):');
  console.log(JSON.stringify(framing, null, 2));

  if (!MEASURE_ONLY) {
    rows.forEach((r) => {
      const label = `${r.file}${r.zone === 'incoming' ? ' (incoming)' : ''}`;
      check(`grade: ${label} — frame corners are black (≤ ${THRESHOLDS.cornerMax})`,
        r.cornerMax <= THRESHOLDS.cornerMax,
        `max corner ${r.cornerMax} (tl ${r.corners.tl} tr ${r.corners.tr} bl ${r.corners.bl} br ${r.corners.br})`);
      check(`grade: ${label} — no environment reaches the border (≤ ${THRESHOLDS.borderMax})`,
        r.border <= THRESHOLDS.borderMax, `border ring ${r.border}`);
      check(`grade: ${label} — the subject emerges from darkness (≥ ${THRESHOLDS.darkFracMin * 100}% below L16)`,
        r.darkFrac >= THRESHOLDS.darkFracMin, `${(r.darkFrac * 100).toFixed(1)}% dark`);
      check(`grade: ${label} — the key is warm (R−B ≥ ${THRESHOLDS.warmthMin})`,
        r.warmth != null && r.warmth >= THRESHOLDS.warmthMin,
        r.warmth == null ? 'no highlights at all' : `R−B ${r.warmth} on ${(r.highlightFrac * 100).toFixed(2)}% of the frame, mean highlight rgb(${r.highlightRGB.join(', ')})`);
      check(`grade: ${label} — the highlight population is warm throughout (≥ ${THRESHOLDS.warmFracMin * 100}%)`,
        r.warmFrac != null && r.warmFrac >= THRESHOLDS.warmFracMin,
        r.warmFrac == null ? 'no highlights at all' : `${(r.warmFrac * 100).toFixed(1)}% of highlight pixels warm`);
    });
  }

  const failures = results.filter((x) => !x.ok);
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, RESULT_FILE), JSON.stringify({
    phase: 'R7.2',
    dir: path.relative(REPO, DIR).replace(/\\/g, '/'),
    thresholds: THRESHOLDS,
    images: rows.length,
    checks: results.length,
    failures: failures.length,
    frameTarget: FRAME_TARGET,
    framing,
    rows,
    results
  }, null, 2));

  console.log(`\nR7.2 dark-field grade: ${rows.length} images, ${results.length} checks, ${failures.length} failures`);
  process.exit(failures.length ? 1 : 0);
})();
