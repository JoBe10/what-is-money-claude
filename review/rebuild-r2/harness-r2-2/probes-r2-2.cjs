// Per-slide, per-build state probes for the R2.2 verification suite.
// Each probe runs in page context and returns { ok, detail } — asserting the
// exact reconstructed state of that build, not merely "something rendered".
// New for R2.2: the rail-geometry probe (marker-on-line assertion, §C.1;
// camera-stable label centering, §C.2; the clipping sweep) and the triangle
// outside-rule probe (§A).

const CAMERA = {
  row: { cx: 520, s: 1.6, cy: 560 },
  early: { cx: 430, s: 1.42, cy: 640 },
  metals: { cx: 770, s: 1.3, cy: 640 },
  gold: { cx: 1680, s: 1.5, cy: 640 },
  severance: { cx: 1790, s: 1.3, cy: 640 },
  full: { cx: 1270, s: 0.68, cy: 670 }
};

// Serialized into the page; keep self-contained (no outer closures).
function probeInPage({ id, build, camera }) {
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => Array.from(document.querySelectorAll(sel));
  const vis = (el) => el && el.dataset.visible === 'true';
  const opacity = (el) => (el ? parseFloat(getComputedStyle(el).opacity) : -1);
  const fail = (detail) => ({ ok: false, detail });
  const pass = (detail) => ({ ok: true, detail });

  const containers = qa('.deck-slide');
  if (containers.length !== 1) return fail(`${containers.length} mounted containers`);

  const isAccent = (color) => color.includes('247') && color.includes('147');

  function checkCamera(frame) {
    const world = q('.s2o-rail__world');
    if (!world) return 'no rail world';
    const m = /translate\((-?[\d.]+)px, (-?[\d.]+)px\) scale\(([\d.]+)\)/.exec(world.style.transform);
    if (!m) return `unparsable transform ${world.style.transform}`;
    const wantTx = 960 - frame.cx * frame.s;
    const wantTy = frame.cy - 640;
    if (Math.abs(parseFloat(m[1]) - wantTx) > 0.5) return `tx ${m[1]} want ~${wantTx.toFixed(1)}`;
    if (Math.abs(parseFloat(m[2]) - wantTy) > 0.5) return `ty ${m[2]} want ~${wantTy.toFixed(1)}`;
    if (Math.abs(parseFloat(m[3]) - frame.s) > 0.005) return `scale ${m[3]} want ${frame.s}`;
    return null;
  }

  function stop(stopId) {
    const el = q(`.s2o-rail__stop[data-stop="${stopId}"]`);
    return el ? { el, state: el.dataset.state, wound: el.dataset.wound } : null;
  }

  function canvasLit(selector, minLit) {
    const canvas = q(selector);
    if (!canvas) return 'no canvas';
    const copy = document.createElement('canvas');
    copy.width = canvas.width;
    copy.height = canvas.height;
    const ctx = copy.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(canvas, 0, 0);
    const data = ctx.getImageData(0, 0, copy.width, copy.height).data;
    let lit = 0;
    for (let i = 0; i < data.length; i += 160) {
      if (data[i] > 24 || data[i + 1] > 24 || data[i + 2] > 24) lit += 1;
    }
    return lit >= minLit ? null : `only ${lit} lit samples (< ${minLit})`;
  }

  const rail = q('.s2o-rail');
  const scene = q('.s2o-triadscene');

  const s2root = qa('.deck-slide .s2o--overlay').find((el) => !el.dataset.exiting && !el.classList.contains('s2o-triadscene')) ||
    q('.deck-slide .s2o');
  const s1root = qa('.deck-slide .s1q--overlay').find((el) => !el.dataset.exiting) ||
    q('.deck-slide .s1q');

  function stepOf(root) {
    return root ? root.dataset.step : 'no-root';
  }

  switch (id) {
    case '1-03-what-is-money': {
      // The scripted black beat: build 5 clears everything to black but the
      // title (R2.2 §B — black is a beat; this one must survive).
      if (stepOf(s1root) !== String(build)) return fail(`step ${stepOf(s1root)}`);
      const title = q('.s1q-what__title');
      const token = q('.s1q-token');
      if (build === 5) {
        if (!vis(title)) return fail('title missing at b5');
        if (vis(token)) return fail('token not cleared at b5');
      }
      return pass('ok');
    }

    case '2-01-the-world-without-it': {
      if (stepOf(s2root) !== String(build)) return fail(`step ${stepOf(s2root)}`);
      if (!scene) return fail('no triad scene');
      if (scene.dataset.mode !== 'world') return fail(`scene mode ${scene.dataset.mode}`);
      if (scene.dataset.step !== String(build)) return fail(`scene step ${scene.dataset.step}`);
      const nodes = {
        f: q('.s2o-triad__node[data-node="fisherman"]'),
        s: q('.s2o-triad__node[data-node="sandal-maker"]'),
        fa: q('.s2o-triad__node[data-node="farmer"]')
      };
      const fsEdge = q('.s2o-triad__edge[data-edge="fs"]');
      const arcs = qa('.s2o-triad__cyclearc');
      const wall = q('.s2o-world__wall');
      const goods = qa('.s2o-triad__good');
      if (Math.max(...goods.map(opacity)) > 0.05) return fail('goods visible in world mode');
      if (build === 0) {
        if (opacity(nodes.f) > 0.05) return fail('fisherman visible at b0');
        return pass('black');
      }
      if (opacity(nodes.f) < 0.95 || opacity(nodes.s) < 0.95) return fail('pair not visible');
      if (opacity(fsEdge) < 0.9) return fail(`fs edge opacity ${opacity(fsEdge)}`);
      if (build >= 2) {
        if (opacity(nodes.fa) < 0.95) return fail('farmer not visible');
        const dim = arcs.map(opacity);
        if (Math.min(...dim) < 0.25) return fail(`arcs ${dim.join(',')}`);
      } else if (opacity(nodes.fa) > 0.05) return fail('farmer early');
      if (build >= 3 && !vis(wall)) return fail('wall missing');
      if (build < 3 && vis(wall)) return fail('wall early');
      return pass('ok');
    }

    case '2-02-the-discovery': {
      if (stepOf(s2root) !== String(build)) return fail(`step ${stepOf(s2root)}`);
      if (!scene) return fail('no triad scene');
      if (scene.dataset.mode !== 'discovery') return fail(`scene mode ${scene.dataset.mode}`);
      const fish = q('.s2o-triad__good[data-good="fish"]');
      const grain = q('.s2o-triad__good[data-good="grain"]');
      const hold = q('.s2o-discovery__hold');
      const birth = q('.s2o-discovery__birth');
      const sal = q('.s2o-discovery__salability');
      const wall = q('.s2o-discovery__wall');
      if (opacity(fish) < 0.9) return fail('goods not visible in discovery mode');
      const fishDist = fish.style.offsetDistance;
      // Leg 1 starts at the fisherman's shelf (M 500 308); leg 2 at the
      // sandal-maker's (M 1420 308).
      const fishPathLeg2 = fish.style.offsetPath.includes('M 1420 308');
      if (build === 0) {
        if (fishDist !== '0%') return fail(`fish at ${fishDist}`);
        if (!vis(wall)) return fail('wall missing');
        return pass('rest — goods arrived');
      }
      if (build === 1) {
        if (fishDist !== '100%' || fishPathLeg2) return fail(`fish ${fishDist} leg2=${fishPathLeg2}`);
        if (opacity(hold) < 0.9) return fail('hold ring missing');
        return pass('held');
      }
      if (!fishPathLeg2 || fishDist !== '100%') return fail('fish not at farmer');
      if (grain.style.offsetDistance !== '100%') return fail('grain not delivered');
      if (opacity(hold) > 0.05) return fail('hold ring lingering');
      if (build >= 3 && !vis(birth)) return fail('birth line missing');
      if (build >= 4 && !vis(sal)) return fail('salability missing');
      if (vis(wall)) return fail('wall still standing');
      return pass('cycle clear');
    }

    case '2-03-the-convergence': {
      if (stepOf(s2root) !== String(build)) return fail(`step ${stepOf(s2root)}`);
      const wrap = q('.s2o-convergence__field');
      const token = q('.s2o-convergence__token');
      const line = q('.s2o-convergence__line');
      if (build === 0) return vis(wrap) ? fail('field visible at b0') : pass('black');
      if (!vis(wrap)) return fail('field hidden');
      const litErr = canvasLit('.s2o-convergence__field canvas', 40);
      if (litErr) return fail(litErr);
      if (build === 1 && vis(token)) return fail('token early');
      if (build >= 2 && !vis(token)) return fail('token missing');
      if (build >= 3 && !vis(line)) return fail('line missing');
      return pass('flock lit');
    }

    case '2-04-the-competition-record': {
      if (stepOf(s2root) !== String(build)) return fail(`step ${stepOf(s2root)}`);
      if (!rail) return fail('no rail');
      const contenders = rail.dataset.contenders === 'true';
      const line = rail.dataset.line === 'true';
      if ((build <= 5) !== contenders) return fail(`contenders=${contenders}`);
      if ((build >= 6) !== line) return fail(`line=${line}`);
      const camErr = checkCamera(build <= 5 ? camera.row : build <= 7 ? camera.early : camera.metals);
      if (camErr) return fail(camErr);
      const order = ['cattle', 'salt', 'shells', 'iron'];
      for (let k = 0; k < 4; k += 1) {
        const s = stop(order[k]);
        const wantState = build <= 5 ? 'lit' : 'defeated';
        if (s.state !== wantState) return fail(`${order[k]} ${s.state} want ${wantState}`);
        const wounded = build >= k + 1;
        const wantWound = !wounded ? 'false'
          : (order[k] === 'shells' && build >= 7) ? 'receipt' : 'wound';
        if (s.wound !== wantWound) return fail(`${order[k]} wound ${s.wound} want ${wantWound}`);
      }
      const metals = stop('metals');
      const gold = stop('gold');
      if (build <= 5) {
        if (metals.state !== 'hidden' || gold.state !== 'hidden') return fail('metals/gold not hidden');
      } else if (build <= 7) {
        if (metals.state !== 'upcoming') return fail(`metals ${metals.state}`);
      } else {
        if (metals.state !== 'active') return fail(`metals ${metals.state}`);
        const dot = metals.el.querySelector('.s2o-rail__dot');
        if (!isAccent(getComputedStyle(dot).backgroundColor)) return fail('metals dot not accent');
      }
      const law = q('.s2o-competition__law');
      if ((build === 5) !== vis(law)) return fail(`law state at b${build}`);
      if (build >= 7) {
        const receiptEl = q('.s2o-rail__stop[data-stop="shells"] .s2o-rail__receipt');
        if (opacity(receiptEl) < 0.5) return fail('receipt not visible');
      }
      return pass('ok');
    }

    case '2-05-two-survivors': {
      if (stepOf(s2root) !== String(build)) return fail(`step ${stepOf(s2root)}`);
      if (!rail) return fail('no rail (scene torn down)');
      const wantDim = build === 0 ? 'true' : 'deep';
      if (rail.dataset.dimmed !== wantDim) return fail(`dimmed=${rail.dataset.dimmed} want ${wantDim}`);
      const camErr = checkCamera(camera.metals);
      if (camErr) return fail(camErr);
      const metals = stop('metals');
      if (metals.state !== 'active') return fail(`metals ${metals.state} under table`);
      const wrap = q('.s2o-survivors__grid');
      const kicker = q('.s2o-survivors__kicker');
      if (build === 0) return wrap.dataset.visible === 'true' ? fail('grid early') : pass('dimmed rail');
      if (wrap.dataset.visible !== 'true' || !vis(kicker)) return fail('grid/kicker hidden');
      const cell = (sym) => qa('.s2o-elements__cell').find((c) => c.textContent === sym);
      const st = (sym) => cell(sym).dataset.state;
      const expectations = {
        1: { He: 'lit', Fe: 'lit', U: 'lit', Pt: 'lit', Au: 'lit' },
        2: { He: 'out', Fe: 'lit', U: 'lit', Pt: 'lit', Au: 'lit' },
        3: { He: 'out', Fe: 'out', U: 'lit', Pt: 'lit', Au: 'lit' },
        4: { He: 'out', Fe: 'out', U: 'out', Pt: 'lit', Au: 'lit' },
        5: { He: 'out', Fe: 'out', U: 'out', Pt: 'out', Au: 'alone', Ag: 'alone' }
      }[build];
      for (const [sym, want] of Object.entries(expectations)) {
        if (st(sym) !== want) return fail(`${sym}=${st(sym)} want ${want}`);
      }
      const lines = qa('.s2o-survivors__waveline').filter(vis).length;
      const verdict = q('.s2o-survivors__verdict');
      if (build >= 2 && build <= 4 && lines !== 1) return fail(`${lines} wave lines`);
      if (build === 5 && (!vis(verdict) || lines !== 0)) return fail('verdict state');
      return pass('ok');
    }

    case '2-06-the-abstraction-ladder': {
      if (stepOf(s2root) !== String(build)) return fail(`step ${stepOf(s2root)}`);
      if (!rail) return fail('no rail (scene torn down)');
      if (rail.dataset.dimmed !== 'false') return fail('rail dimmed');
      const camErr = checkCamera(camera.gold);
      if (camErr) return fail(camErr);
      const gold = stop('gold');
      if (gold.state !== 'active') return fail(`gold ${gold.state}`);
      if ((build >= 1) !== (gold.wound === 'wound')) return fail(`gold wound ${gold.wound}`);
      const shells = stop('shells');
      if (shells.wound !== 'receipt') return fail(`shells ${shells.wound}`);
      const coin = q('.s2o-rail__riser[data-riser="coinage"]');
      const paper = q('.s2o-rail__riser[data-riser="paper"]');
      if ((build >= 2) !== (coin.dataset.visible === 'true')) return fail('coinage state');
      if ((build >= 3) !== (paper.dataset.visible === 'true')) return fail('paper state');
      if (build >= 3 && opacity(paper) < 0.9) return fail('paper rung not standing');
      const law = q('.s2o-ladder__law');
      if ((build >= 4) !== vis(law)) return fail('law state');
      return pass('ok');
    }

    case '2-07-the-severance': {
      if (stepOf(s2root) !== String(build)) return fail(`step ${stepOf(s2root)}`);
      if (!rail) return fail('no rail (scene torn down)');
      const date = q('.s2o-severance__date');
      const decree = q('.s2o-severance__decree');
      const chart = q('.s2o-severance__chart');
      const balance = q('.s2o-severance__balance');
      const severed = rail.dataset.severed === 'true';
      if ((build >= 2) !== severed) return fail(`severed=${severed}`);
      const gold = stop('gold');
      if (build >= 2 && gold.state !== 'defeated') return fail(`gold ${gold.state}`);
      if (build < 2 && gold.state !== 'active') return fail(`gold ${gold.state}`);
      const fiat = q('.s2o-rail__fiat');
      const paper = q('.s2o-rail__riser[data-riser="paper"]');
      if ((build >= 2) !== (fiat.dataset.visible === 'true')) return fail('fiat state');
      if (build >= 2) {
        if (opacity(fiat) < 0.9) return fail(`fiat opacity ${opacity(fiat)}`);
        if (opacity(paper) > 0.05) return fail('paper rung still standing');
        const noteC = q('.s2o-rail__risernote[data-riser="coinage"]');
        if (opacity(noteC) > 0.05) return fail('riser notes not yielded');
        // R2.2 §D: the fiat float carries its glyph — the severed tether.
        const fiatGlyph = fiat.querySelector('.s2o-rail__glyph svg');
        if (!fiatGlyph) return fail('fiat glyph missing');
      }
      if ((build === 1 || build === 2) !== vis(date)) return fail('date state');
      if ((build === 2) !== vis(decree)) return fail('decree state');
      if ((build >= 3) !== vis(chart)) return fail('chart state');
      if (build >= 3) {
        if (rail.dataset.dimmed !== 'true') return fail('rail not dimmed');
        const series = qa('.s2o-severance__series');
        const drawn = series.every((p) => parseFloat(getComputedStyle(p).strokeDashoffset) < 2);
        if (!drawn) return fail('series not drawn');
      }
      if ((build >= 4) !== vis(balance)) return fail('balance state');
      const camErr = checkCamera(camera.severance);
      if (camErr) return fail(camErr);
      return pass('ok');
    }

    case '2-08-the-pattern': {
      if (stepOf(s2root) !== String(build)) return fail(`step ${stepOf(s2root)}`);
      if (!rail) return fail('no rail (scene torn down)');
      const camErr = checkCamera(build >= 1 ? camera.full : camera.severance);
      if (camErr) return fail(camErr);
      if (rail.dataset.severed !== 'true') return fail('not severed');
      const fiat = q('.s2o-rail__fiat');
      if (fiat.dataset.visible !== 'true') return fail('fiat missing');
      const shells = stop('shells');
      if (build === 0 && shells.wound !== 'receipt') return fail(`b0 shells ${shells.wound}`);
      if (build >= 1 && shells.wound !== 'false') return fail(`wounds not settled (${shells.wound})`);
      const lines = qa('.s2o-pattern__thesisline');
      for (let i = 0; i < 3; i += 1) {
        if ((build >= i + 2) !== vis(lines[i])) return fail(`thesis ${i}`);
      }
      const ext = q('.s2o-rail__extension');
      const qm = q('.s2o-rail__qmark');
      const entrant = q('.s2o-rail__entrant');
      const entrantLabel = q('.s2o-rail__entrantlabel');
      const lim = q('.s2o-rail__limitation');
      if ((build >= 4) !== (ext.dataset.visible === 'true')) return fail('extension state');
      if ((build >= 4) !== (qm.dataset.visible === 'true')) return fail('qmark state');
      if ((build >= 5) !== (entrant.dataset.visible === 'true')) return fail('entrant state');
      if (build >= 5) {
        if (entrantLabel.textContent !== 'BITCOIN') return fail('entrant label text');
        if (opacity(entrantLabel) < 0.9) return fail(`BITCOIN opacity ${opacity(entrantLabel)}`);
        // R2.2 §D: the entrant carries the ₿ glyph in the set's hand.
        const eg = entrant.querySelector('.s2o-rail__glyph');
        if (!eg || !eg.querySelector('svg')) return fail('entrant glyph missing');
        if (opacity(eg) < 0.9) return fail(`entrant glyph opacity ${opacity(eg)}`);
      }
      if ((build >= 6) !== (lim.dataset.visible === 'true')) return fail('limitation state');
      if (build >= 4 && opacity(qm) < 0.9) return fail(`qmark opacity ${opacity(qm)}`);
      return pass('ok');
    }

    default:
      return fail(`no probe for ${id}`);
  }
}

// ----- R2.2 §C: rail geometry — markers on the line, labels centered, and
// the clipping sweep. Runs on any settled rail frame. -----
function railGeometryProbeInPage() {
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => Array.from(document.querySelectorAll(sel));
  const fail = (detail) => ({ ok: false, detail });
  const opacity = (el) => (el ? parseFloat(getComputedStyle(el).opacity) : 0);
  const rail = q('.s2o-rail');
  if (!rail) return fail('no rail');
  const canvas = q('.deck-canvas').getBoundingClientRect();
  const world = q('.s2o-rail__world');
  const sm = /scale\(([\d.]+)\)/.exec(world.style.transform);
  const scale = sm ? parseFloat(sm[1]) : 1;

  const center = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, r };
  };

  const lineEl = q('.s2o-rail__line');
  const lineY = center(lineEl).y;
  const hasLine = rail.dataset.line !== 'false';
  const contenders = rail.dataset.contenders === 'true';

  const problems = [];

  // 1. Marker-on-line (§C.1): every visible stop dot center sits on the
  //    line, exactly, at this camera. The entrant dot joins when visible;
  //    the FIAT dot is asserted OFF the line at its designed float.
  if (hasLine && !contenders) {
    qa('.s2o-rail__stop').forEach((s) => {
      const dot = s.querySelector('.s2o-rail__dot');
      if (s.dataset.state === 'hidden' || opacity(dot) < 0.05 || opacity(s) < 0.05) return;
      const dy = center(dot).y - lineY;
      if (Math.abs(dy) > 0.75) problems.push(`${s.dataset.stop} dot off line by ${dy.toFixed(2)}px`);
    });
    const entrant = q('.s2o-rail__entrant');
    if (entrant && entrant.dataset.visible === 'true') {
      const dy = center(entrant.querySelector('.s2o-rail__entrantdot')).y - lineY;
      if (Math.abs(dy) > 0.75) problems.push(`entrant dot off line by ${dy.toFixed(2)}px`);
    }
    const fiat = q('.s2o-rail__fiat');
    if (fiat && fiat.dataset.visible === 'true' && opacity(fiat) > 0.5) {
      const dy = center(fiat.querySelector('.s2o-rail__fiatdot')).y - lineY;
      const want = -150 * scale; // FIAT_Y — the designed float, §D.2
      if (Math.abs(dy - want) > 2) problems.push(`fiat float ${dy.toFixed(1)}px want ${want.toFixed(1)}px`);
    }
  }

  // 2. Camera-stable centering (§C.2): every visible stop text block is
  //    horizontally centered on its own stop.
  qa('.s2o-rail__stop').forEach((s) => {
    if (s.dataset.state === 'hidden' || opacity(s) < 0.05) return;
    const dotX = center(s.querySelector('.s2o-rail__dot')).x;
    [['label', '.s2o-rail__label'], ['wound', '.s2o-rail__wound'], ['receipt', '.s2o-rail__receipt'], ['glyph', '.s2o-rail__glyph']]
      .forEach(([name, sel]) => {
        const el = s.querySelector(sel);
        if (!el || opacity(el) < 0.05) return;
        const dx = center(el).x - dotX;
        if (Math.abs(dx) > 0.75) problems.push(`${s.dataset.stop} ${name} off center by ${dx.toFixed(2)}px`);
      });
  });

  // 3. The clipping sweep: every visible rail text block sits fully inside
  //    the frame or fully outside it — never sliced at a frame edge.
  let minMargin = Infinity;
  const textSel = [
    '.s2o-rail__label', '.s2o-rail__wound', '.s2o-rail__receipt',
    '.s2o-rail__riserlabel', '.s2o-rail__risernote',
    '.s2o-rail__fiatlabel', '.s2o-rail__fiatline',
    '.s2o-rail__entrantlabel', '.s2o-rail__entrantline',
    '.s2o-rail__limitation', '.s2o-rail__qmark'
  ].join(', ');
  qa(textSel).forEach((el) => {
    if (opacity(el) < 0.05) return;
    let p = el.parentElement;
    let effOpacity = opacity(el);
    while (p && !p.classList.contains('s2o-rail')) { effOpacity *= opacity(p); p = p.parentElement; }
    if (effOpacity < 0.05) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    const fullyOut = r.right <= canvas.left + 0.5 || r.left >= canvas.right - 0.5 ||
      r.bottom <= canvas.top + 0.5 || r.top >= canvas.bottom - 0.5;
    if (fullyOut) return;
    const margin = Math.min(
      r.left - canvas.left, canvas.right - r.right,
      r.top - canvas.top, canvas.bottom - r.bottom
    );
    if (margin < 2) {
      problems.push(`"${(el.textContent || '').slice(0, 18)}…" sliced at frame edge (margin ${margin.toFixed(1)}px)`);
    } else if (margin < minMargin) minMargin = margin;
  });

  if (problems.length) return fail(problems.slice(0, 4).join(' | '));
  return { ok: true, detail: `on-line ✓ centered ✓ sweep ✓ (min margin ${minMargin === Infinity ? 'n/a' : minMargin.toFixed(0) + 'px'})` };
}

// ----- R2.2 §A: the outside rule on the exchange triangle. -----
function triadOutsideProbeInPage() {
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => Array.from(document.querySelectorAll(sel));
  const fail = (detail) => ({ ok: false, detail });
  const opacity = (el) => (el ? parseFloat(getComputedStyle(el).opacity) : 0);
  const scene = q('.s2o-triadscene');
  if (!scene) return fail('no triad scene');
  const canvas = q('.deck-canvas').getBoundingClientRect();
  const sx = canvas.width / 1920;

  const nodeInfo = {};
  ['fisherman', 'sandal-maker', 'farmer'].forEach((n) => {
    const node = q(`.s2o-triad__node[data-node="${n}"]`);
    const dot = node.querySelector('.s2o-triad__dot');
    const card = node.querySelector('.s2o-triad__card');
    const d = dot.getBoundingClientRect();
    nodeInfo[n] = {
      visible: opacity(node) > 0.5,
      dot: { x: d.left + d.width / 2, y: d.top + d.height / 2 },
      card: card.getBoundingClientRect()
    };
  });

  const f = nodeInfo.fisherman;
  const s = nodeInfo['sandal-maker'];
  const fa = nodeInfo.farmer;

  if (f.visible) {
    if (f.card.right >= f.dot.x) return fail(`fisherman card not left of dot (${(f.card.right - f.dot.x).toFixed(1)})`);
  }
  if (s.visible) {
    if (s.card.left <= s.dot.x) return fail(`sandal-maker card not right of dot`);
  }
  if (f.visible && s.visible) {
    // Mirror symmetry: same vertical offset, mirrored horizontal gap.
    const fMid = (f.card.top + f.card.bottom) / 2 - f.dot.y;
    const sMid = (s.card.top + s.card.bottom) / 2 - s.dot.y;
    if (Math.abs(fMid - sMid) > 1.5) return fail(`side blocks vertical offsets differ ${(fMid - sMid).toFixed(1)}px`);
    const gapL = f.dot.x - f.card.right;
    const gapR = s.card.left - s.dot.x;
    if (Math.abs(gapL - gapR) > 1.5) return fail(`side gaps differ (${gapL.toFixed(1)} vs ${gapR.toFixed(1)})`);
  }
  if (fa.visible) {
    const mid = (fa.card.left + fa.card.right) / 2;
    if (Math.abs(mid - fa.dot.x) > 1.5) return fail('farmer card not centered');
    if (fa.card.top <= fa.dot.y) return fail('farmer card not below dot');
  }

  // No label card may cross any drawn edge (visible edges only).
  const segRect = (x1, y1, x2, y2, r) => {
    // Liang–Barsky: does segment intersect rect (expanded 2px)?
    const L = r.left - 2, R = r.right + 2, T = r.top - 2, B = r.bottom + 2;
    let t0 = 0, t1 = 1;
    const dx = x2 - x1, dy = y2 - y1;
    const clip = (p, qv) => {
      if (p === 0) return qv >= 0;
      const t = qv / p;
      if (p < 0) { if (t > t1) return false; if (t > t0) t0 = t; }
      else { if (t < t0) return false; if (t < t1) t1 = t; }
      return true;
    };
    return clip(-dx, x1 - L) && clip(dx, R - x1) && clip(-dy, y1 - T) && clip(dy, B - y1) && t0 <= t1;
  };
  const edges = qa('.s2o-triad__edge').filter((e) => opacity(e) > 0.05);
  for (const e of edges) {
    const x1 = canvas.left + parseFloat(e.getAttribute('x1')) * sx;
    const y1 = canvas.top + parseFloat(e.getAttribute('y1')) * sx;
    const x2 = canvas.left + parseFloat(e.getAttribute('x2')) * sx;
    const y2 = canvas.top + parseFloat(e.getAttribute('y2')) * sx;
    for (const n of ['fisherman', 'sandal-maker', 'farmer']) {
      const info = nodeInfo[n];
      if (!info.visible) continue;
      if (segRect(x1, y1, x2, y2, info.card)) {
        return fail(`${n} card crosses edge ${e.dataset.edge}`);
      }
    }
  }

  return { ok: true, detail: `outside rule holds; ${edges.length} visible edges clear of all cards` };
}

// Symmetry probes (carried from R2.1 §G.6, clamp filter removed — no clamp
// exists anymore; every composed stop must measure centered).
function symmetryProbeInPage(which) {
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => Array.from(document.querySelectorAll(sel));
  const fail = (detail) => ({ ok: false, detail });
  const center = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  if (which === 'triad-goods') {
    const nodes = ['fisherman', 'sandal-maker', 'farmer'];
    const goods = { fisherman: 'fish', 'sandal-maker': 'sandals', farmer: 'grain' };
    const offsets = [];
    for (const n of nodes) {
      const dot = q(`.s2o-triad__node[data-node="${n}"] .s2o-triad__dot`);
      const good = q(`.s2o-triad__good[data-good="${goods[n]}"]`);
      const d = center(dot);
      const g = center(good);
      if (Math.abs(g.x - d.x) > 1.5) return fail(`${n}: good dx ${(g.x - d.x).toFixed(1)}`);
      offsets.push(g.y - d.y);
    }
    const spread = Math.max(...offsets) - Math.min(...offsets);
    if (spread > 1.5) return fail(`good offsets differ by ${spread.toFixed(1)}px`);
    return { ok: true, detail: `lift ${offsets[0].toFixed(1)}px identical ×3` };
  }

  if (which === 'rail-stops') {
    const stops = qa('.s2o-rail__stop').filter((s) => !['hidden', 'upcoming'].includes(s.dataset.state));
    if (stops.length < 4) return fail(`only ${stops.length} composed stops`);
    const glyphDy = [];
    const labelDy = [];
    for (const s of stops) {
      const d = center(s.querySelector('.s2o-rail__dot'));
      const g = center(s.querySelector('.s2o-rail__glyph'));
      const l = s.querySelector('.s2o-rail__label').getBoundingClientRect();
      const lc = l.left + l.width / 2;
      if (Math.abs(g.x - d.x) > 1.5) return fail(`${s.dataset.stop}: glyph dx ${(g.x - d.x).toFixed(1)}`);
      if (Math.abs(lc - d.x) > 1.5) return fail(`${s.dataset.stop}: label dx ${(lc - d.x).toFixed(1)}`);
      glyphDy.push(g.y - d.y);
      labelDy.push(l.top - d.y);
    }
    const spread = (a) => Math.max(...a) - Math.min(...a);
    // Defeated stops settle their text +4px vs lit/active 0 — measure within
    // same-state groups.
    const byState = {};
    stops.forEach((s, i) => {
      (byState[s.dataset.state] = byState[s.dataset.state] || []).push(i);
    });
    for (const [st, idxs] of Object.entries(byState)) {
      if (idxs.length < 2) continue;
      const g = spread(idxs.map((i) => glyphDy[i]));
      const l = spread(idxs.map((i) => labelDy[i]));
      if (g > 1.5) return fail(`${st} glyph offsets differ by ${g.toFixed(1)}px`);
      if (l > 1.5) return fail(`${st} label rows differ by ${l.toFixed(1)}px`);
    }
    return { ok: true, detail: `${stops.length} stops: one rhythm per state group` };
  }

  return fail(`unknown symmetry probe ${which}`);
}

module.exports = {
  probeInPage, railGeometryProbeInPage, triadOutsideProbeInPage,
  symmetryProbeInPage, CAMERA
};
