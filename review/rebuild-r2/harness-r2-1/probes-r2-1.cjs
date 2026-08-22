// Per-slide, per-build state probes for the R2.1 verification suite.
// Each probe runs in page context and returns { ok, detail } — asserting the
// exact reconstructed state of that build, not merely "something rendered".

const CAMERA = {
  row: { cx: 520, s: 1.6, cy: 560 },
  early: { cx: 430, s: 1.42, cy: 640 },
  metals: { cx: 770, s: 1.3, cy: 640 },
  gold: { cx: 1620, s: 1.22, cy: 640 },
  severance: { cx: 1620, s: 1.16, cy: 640 },
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

  // The rail root; slides that share the scene layer have it plus an overlay.
  const rail = q('.s2o-rail');

  // Overlay/step root: prefer the slide's own overlay; S1 slides use .s1q.
  const s2root = qa('.deck-slide .s2o--overlay').find((el) => !el.dataset.exiting) ||
    q('.deck-slide .s2o');
  const s1root = qa('.deck-slide .s1q--overlay').find((el) => !el.dataset.exiting) ||
    q('.deck-slide .s1q');

  function stepOf(root) {
    return root ? root.dataset.step : 'no-root';
  }

  switch (id) {
    case '1-01-eighty-thousand-hours': {
      if (stepOf(s1root) !== String(build)) return fail(`step ${stepOf(s1root)}`);
      const counter = q('.s1q-hours__counter');
      const line = q('.s1q-hours__line');
      if ((build >= 1) !== (counter.dataset.visible === 'true')) return fail('counter state');
      if ((build >= 2) !== vis(line)) return fail('line state');
      if (build >= 1) {
        const litErr = canvasLit('.s1q-fieldscene canvas', 400);
        if (litErr) return fail(litErr);
        if (counter.textContent !== '80,000') return fail(`counter ${counter.textContent}`);
      }
      return pass('ok');
    }

    case '1-02-the-conversion': {
      if (stepOf(s1root) !== String(build)) return fail(`step ${stepOf(s1root)}`);
      const token = q('.s1q-token');
      const lines = qa('.s1q-conversion__line');
      if ((build >= 1) !== vis(token)) return fail('token state');
      if ((build === 2) !== vis(lines[0])) return fail('line one state');
      if ((build >= 3) !== vis(lines[1])) return fail('line two state');
      if (build === 0) {
        const litErr = canvasLit('.s1q-fieldscene canvas', 400);
        if (litErr) return fail(litErr);
      }
      return pass('ok');
    }

    case '1-05-the-promise': {
      if (stepOf(s1root) !== String(build)) return fail(`step ${stepOf(s1root)}`);
      const question = q('.s1q-promise__question');
      const railline = q('.s1q-promise__railline');
      const wps = qa('.s1q-promise__wp');
      if ((build >= 1) !== vis(question)) return fail('question state');
      if ((build >= 2) !== vis(railline)) return fail('railline state');
      for (let i = 0; i < 3; i += 1) {
        if ((build >= i + 2) !== vis(wps[i])) return fail(`wp${i} state`);
      }
      const dot0 = q('.s1q-promise__wp[data-index="0"] .s1q-promise__dot');
      const text0 = q('.s1q-promise__wp[data-index="0"] .s1q-promise__wptext');
      const dot1 = q('.s1q-promise__wp[data-index="1"] .s1q-promise__dot');
      const ignited = isAccent(getComputedStyle(dot0).backgroundColor);
      if ((build >= 6) !== ignited) return fail(`ignition=${ignited} at b${build}`);
      if (build >= 6) {
        // The ignition standard: the active marker at ~2× the inactive ones,
        // its label at warm white, the others dimmed a step further.
        const m = /matrix\(([-\d.]+),/.exec(getComputedStyle(dot0).transform);
        const scale = m ? parseFloat(m[1]) : 1;
        if (Math.abs(scale - 2) > 0.05) return fail(`ignited scale ${scale}`);
        if (!getComputedStyle(text0).color.includes('254')) return fail('label not warm white');
        if (isAccent(getComputedStyle(dot1).backgroundColor)) return fail('wp1 ignited');
      }
      return pass('ok');
    }

    case '2-01-the-world-without-it': {
      if (stepOf(s2root) !== String(build)) return fail(`step ${stepOf(s2root)}`);
      const nodes = {
        f: q('.s2o-triad__node[data-node="fisherman"]'),
        s: q('.s2o-triad__node[data-node="sandal-maker"]'),
        fa: q('.s2o-triad__node[data-node="farmer"]')
      };
      const fsEdge = q('.s2o-triad__edge[data-edge="fs"]');
      const arcs = qa('.s2o-triad__cyclearc');
      const wall = q('.s2o-world__wall');
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
      const fish = q('.s2o-triad__good[data-good="fish"]');
      const grain = q('.s2o-triad__good[data-good="grain"]');
      const hold = q('.s2o-discovery__hold');
      const birth = q('.s2o-discovery__birth');
      const sal = q('.s2o-discovery__salability');
      const wall = q('.s2o-discovery__wall');
      const fishDist = fish.style.offsetDistance;
      // Leg 1 starts at the fisherman's shelf (M 500 308); leg 2 at the
      // sandal-maker's (M 1420 308).
      const fishPathLeg2 = fish.style.offsetPath.includes('M 1420 308');
      if (build === 0) {
        if (fishDist !== '0%') return fail(`fish at ${fishDist}`);
        if (!vis(wall)) return fail('wall missing');
        return pass('rest');
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
      // The receipt replaces the contender wound on the shells stop (b7+).
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
      // The FIAT resolution (§D.2): the paper rung departs; the floating
      // marker stands, no connector.
      const fiat = q('.s2o-rail__fiat');
      const paper = q('.s2o-rail__riser[data-riser="paper"]');
      if ((build >= 2) !== (fiat.dataset.visible === 'true')) return fail('fiat state');
      if (build >= 2) {
        if (opacity(fiat) < 0.9) return fail(`fiat opacity ${opacity(fiat)}`);
        if (opacity(paper) > 0.05) return fail('paper rung still standing');
        const noteC = q('.s2o-rail__risernote[data-riser="coinage"]');
        if (opacity(noteC) > 0.05) return fail('riser notes not yielded');
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
      // §F.4: at the full-rail frame nothing sits below the line but the
      // stop labels and the floating FIAT mark — the wounds settle away.
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
        // §D.1: the entrant is named, with the entrant build.
        if (entrantLabel.textContent !== 'BITCOIN') return fail('entrant label text');
        if (opacity(entrantLabel) < 0.9) return fail(`BITCOIN opacity ${opacity(entrantLabel)}`);
      }
      if ((build >= 6) !== (lim.dataset.visible === 'true')) return fail('limitation state');
      if (build >= 4 && opacity(qm) < 0.9) return fail(`qmark opacity ${opacity(qm)}`);
      return pass('ok');
    }

    default:
      return fail(`no probe for ${id}`);
  }
}

// Symmetry probes (§G.6): the icon-grammar placement rules measured from
// live geometry — node anchors identical across nodes, rail columns
// centered on their dots, one shared label baseline.
function symmetryProbeInPage(which) {
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => Array.from(document.querySelectorAll(sel));
  const fail = (detail) => ({ ok: false, detail });
  const center = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  if (which === 'triad-goods') {
    // 2.2 build 0: every resting good centered directly above its node dot
    // at one fixed offset (§C.1), and all label rows on one baseline grid
    // relative to their dots (§C.3).
    const nodes = ['fisherman', 'sandal-maker', 'farmer'];
    const goods = { fisherman: 'fish', 'sandal-maker': 'sandals', farmer: 'grain' };
    const offsets = [];
    const nameOffsets = [];
    for (const n of nodes) {
      const dot = q(`.s2o-triad__node[data-node="${n}"] .s2o-triad__dot`);
      const good = q(`.s2o-triad__good[data-good="${goods[n]}"]`);
      const name = q(`.s2o-triad__node[data-node="${n}"] .s2o-triad__name`);
      const d = center(dot);
      const g = center(good);
      const nm = name.getBoundingClientRect();
      if (Math.abs(g.x - d.x) > 1.5) return fail(`${n}: good dx ${(g.x - d.x).toFixed(1)}`);
      offsets.push(g.y - d.y);
      nameOffsets.push(nm.top - d.y);
    }
    const spread = Math.max(...offsets) - Math.min(...offsets);
    const nameSpread = Math.max(...nameOffsets) - Math.min(...nameOffsets);
    if (spread > 1.5) return fail(`good offsets differ by ${spread.toFixed(1)}px`);
    if (nameSpread > 1.5) return fail(`name baselines differ by ${nameSpread.toFixed(1)}px`);
    return { ok: true, detail: `lift ${offsets[0].toFixed(1)}px identical ×3; name row identical ×3` };
  }

  if (which === 'rail-stops') {
    // Rail stops: glyph centered above the marker, label centered below,
    // one vertical rhythm across stops (§C.4 / §F.2). Measured at a camera
    // where no §F.1 clamp is active — a clamped edge column deliberately
    // trades marker-centering for staying inside the frame, so any stop
    // carrying a nonzero --clamp is excluded here.
    const stops = qa('.s2o-rail__stop').filter((s) => {
      if (['hidden', 'upcoming'].includes(s.dataset.state)) return false;
      const label = s.querySelector('.s2o-rail__label');
      const clamp = parseFloat(getComputedStyle(label).getPropertyValue('--clamp')) || 0;
      return Math.abs(clamp) < 0.5;
    });
    if (stops.length < 4) return fail(`only ${stops.length} unclamped composed stops`);
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
    const gs = Math.max(...glyphDy) - Math.min(...glyphDy);
    const ls = Math.max(...labelDy) - Math.min(...labelDy);
    if (gs > 1.5) return fail(`glyph offsets differ by ${gs.toFixed(1)}px`);
    if (ls > 1.5) return fail(`label rows differ by ${ls.toFixed(1)}px`);
    return { ok: true, detail: `${stops.length} stops: glyph/label offsets identical` };
  }

  return fail(`unknown symmetry probe ${which}`);
}

module.exports = { probeInPage, symmetryProbeInPage, CAMERA };
