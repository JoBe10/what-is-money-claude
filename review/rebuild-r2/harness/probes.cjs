// Per-slide, per-build state probes for the R2 verification suite.
// Each probe runs in page context and returns { ok, detail } — asserting the
// exact reconstructed state of that build, not merely "something rendered".

const CAMERA = {
  early: { cx: 430, s: 1.42 },
  metals: { cx: 850, s: 1.3 },
  gold: { cx: 1620, s: 1.22 },
  severance: { cx: 1620, s: 1.16 },
  full: { cx: 1270, s: 0.68 }
};

// Serialized into the page; keep self-contained (no outer closures).
function probeInPage({ id, build, camera }) {
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => Array.from(document.querySelectorAll(sel));
  const vis = (el) => el && el.dataset.visible === 'true';
  const opacity = (el) => (el ? parseFloat(getComputedStyle(el).opacity) : -1);
  const fail = (detail) => ({ ok: false, detail });
  const pass = (detail) => ({ ok: true, detail });

  const root = q('.deck-slide[data-active="true"] .s2o');
  if (!root) return fail('no active s2o root');
  const step = root.dataset.step;
  if (String(build) !== step) return fail(`data-step=${step}, want ${build}`);

  const containers = qa('.deck-slide');
  if (containers.length !== 1) return fail(`${containers.length} mounted containers`);

  function checkCamera(frame) {
    const world = q('.s2o-rail__world');
    if (!world) return 'no rail world';
    const m = /translate\((-?[\d.]+)px, (-?[\d.]+)px\) scale\(([\d.]+)\)/.exec(world.style.transform);
    if (!m) return `unparsable transform ${world.style.transform}`;
    const wantTx = 960 - frame.cx * frame.s;
    if (Math.abs(parseFloat(m[1]) - wantTx) > 0.5) return `tx ${m[1]} want ~${wantTx.toFixed(1)}`;
    if (Math.abs(parseFloat(m[3]) - frame.s) > 0.005) return `scale ${m[3]} want ${frame.s}`;
    return null;
  }

  function stopState(stop) {
    const el = q(`.s2o-rail__stop[data-stop="${stop}"]`);
    return el ? { state: el.dataset.state, wound: el.dataset.wound } : null;
  }

  function canvasLit(selector, minLit) {
    const canvas = q(selector);
    if (!canvas) return 'no canvas';
    // Read through a willReadFrequently copy so the probe never provokes a
    // readback warning on the deck's own canvas context.
    const copy = document.createElement('canvas');
    copy.width = canvas.width;
    copy.height = canvas.height;
    const ctx = copy.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(canvas, 0, 0);
    const w = copy.width;
    const h = copy.height;
    const data = ctx.getImageData(0, 0, w, h).data;
    let lit = 0;
    for (let i = 0; i < data.length; i += 160) {
      if (data[i] > 24 || data[i + 1] > 24 || data[i + 2] > 24) lit += 1;
    }
    return lit >= minLit ? null : `only ${lit} lit samples (< ${minLit})`;
  }

  const accentDot = (el) => {
    const bg = getComputedStyle(el).backgroundColor;
    return bg.includes('247') && bg.includes('147');
  };

  switch (id) {
    case '2-00-waypoint-origin': {
      const device = q('.s2o-waypoint__device');
      if (!vis(device) || opacity(device) < 0.95) return fail(`device opacity ${opacity(device)}`);
      const dots = qa('.s2o-waypoint__dot');
      if (dots.length !== 3) return fail('waypoint count');
      const ignited = accentDot(dots[0]);
      if (build >= 1 && !ignited) return fail('wp0 not ignited');
      if (build === 0 && ignited) return fail('wp0 ignited early');
      return pass(`ignited=${ignited}`);
    }

    case '2-01-the-world-without-it': {
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
      const fish = q('.s2o-triad__good[data-good="fish"]');
      const grain = q('.s2o-triad__good[data-good="grain"]');
      const hold = q('.s2o-discovery__hold');
      const birth = q('.s2o-discovery__birth');
      const sal = q('.s2o-discovery__salability');
      const wall = q('.s2o-discovery__wall');
      const fishDist = fish.style.offsetDistance;
      const fishPathLeg2 = fish.style.offsetPath.includes('1330');
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

    case '2-04-the-competition': {
      const items = qa('.s2o-competition__contender');
      if (root.dataset.entered !== 'true' && opacity(items[0]) < 0.9) return fail('row not entered');
      const wounded = items.map((el) => el.dataset.wounded === 'true');
      const wantWounded = [1, 2, 3, 4].map((k) => build >= k);
      if (wounded.join() !== wantWounded.join()) return fail(`wounded ${wounded.join()}`);
      const law = q('.s2o-competition__law');
      if (build >= 5 && !vis(law)) return fail('law missing');
      if (build < 5 && vis(law)) return fail('law early');
      return pass('ok');
    }

    case '2-05-the-rail-rises': {
      const wrap = q('.s2o-railwrap');
      if (build === 0) {
        if (wrap.dataset.visible !== 'false') return fail('rail visible at b0');
        return pass('dark');
      }
      if (wrap.dataset.visible !== 'true' || opacity(wrap) < 0.95) return fail('rail not visible');
      const camErr = checkCamera(build >= 3 ? camera.metals : camera.early);
      if (camErr) return fail(camErr);
      const shells = stopState('shells');
      const metals = stopState('metals');
      if (build === 1 && shells.state !== 'lit') return fail(`shells ${shells.state}`);
      if (build >= 2 && (shells.state !== 'defeated' || shells.wound !== 'true')) {
        return fail(`shells ${shells.state}/${shells.wound}`);
      }
      if (build >= 3) {
        if (metals.state !== 'active') return fail(`metals ${metals.state}`);
        const cattle = stopState('cattle');
        if (cattle.state !== 'defeated' || cattle.wound !== 'true') return fail('cattle not settled');
      } else if (metals.state !== 'upcoming') return fail(`metals early ${metals.state}`);
      return pass('ok');
    }

    case '2-06-two-survivors': {
      const wrap = q('.s2o-survivors__grid');
      const kicker = q('.s2o-survivors__kicker');
      if (build === 0) return wrap.dataset.visible === 'true' ? fail('grid early') : pass('dark');
      if (wrap.dataset.visible !== 'true' || !vis(kicker)) return fail('grid/kicker hidden');
      const cell = (sym) =>
        qa('.s2o-elements__cell').find((c) => c.textContent === sym);
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

    case '2-07-the-abstraction-ladder': {
      const camErr = checkCamera(camera.gold);
      if (camErr) return fail(camErr);
      const gold = stopState('gold');
      if (gold.state !== 'active') return fail(`gold ${gold.state}`);
      if ((build >= 1) !== (gold.wound === 'true')) return fail(`gold wound ${gold.wound}`);
      const coin = q('.s2o-rail__riser[data-riser="coinage"]');
      const paper = q('.s2o-rail__riser[data-riser="paper"]');
      if ((build >= 2) !== (coin.dataset.visible === 'true')) return fail('coinage state');
      if ((build >= 3) !== (paper.dataset.visible === 'true')) return fail('paper state');
      const law = q('.s2o-ladder__law');
      if ((build >= 4) !== vis(law)) return fail('law state');
      return pass('ok');
    }

    case '2-08-the-severance': {
      const rail = q('.s2o-rail');
      const date = q('.s2o-severance__date');
      const decree = q('.s2o-severance__decree');
      const chart = q('.s2o-severance__chart');
      const balance = q('.s2o-severance__balance');
      const severed = rail.dataset.severed === 'true';
      if ((build >= 2) !== severed) return fail(`severed=${severed}`);
      const gold = stopState('gold');
      if (build >= 2 && gold.state !== 'defeated') return fail(`gold ${gold.state}`);
      if (build < 2 && gold.state !== 'active') return fail(`gold ${gold.state}`);
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

    case '2-09-the-pattern': {
      const camErr = checkCamera(build >= 1 ? camera.full : camera.severance);
      if (camErr) return fail(camErr);
      const rail = q('.s2o-rail');
      if (rail.dataset.severed !== 'true') return fail('not severed');
      const lines = qa('.s2o-pattern__thesisline');
      for (let i = 0; i < 3; i += 1) {
        if ((build >= i + 2) !== vis(lines[i])) return fail(`thesis ${i}`);
      }
      const ext = q('.s2o-rail__extension');
      const qm = q('.s2o-rail__qmark');
      const entrant = q('.s2o-rail__entrant');
      const lim = q('.s2o-rail__limitation');
      if ((build >= 4) !== (ext.dataset.visible === 'true')) return fail('extension state');
      if ((build >= 4) !== (qm.dataset.visible === 'true')) return fail('qmark state');
      if ((build >= 5) !== (entrant.dataset.visible === 'true')) return fail('entrant state');
      if ((build >= 6) !== (lim.dataset.visible === 'true')) return fail('limitation state');
      if (build >= 4 && opacity(qm) < 0.9) return fail(`qmark opacity ${opacity(qm)}`);
      return pass('ok');
    }

    default:
      return fail(`no probe for ${id}`);
  }
}

module.exports = { probeInPage, CAMERA };
