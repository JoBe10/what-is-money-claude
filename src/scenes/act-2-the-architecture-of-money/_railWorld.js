// Act II — the rail world, wired into the deck.
//
// THE GEOMETRY IS LAW, NOT DESIGN. Every coordinate, style string, rounding
// and append order below is transcribed from `review/act-2/harness/rail.mjs`,
// the builders that rendered the presenter-approved r2 cells
// (`review/act-2/rail/states.json` — `approval`, `approvedSet`, 1 September
// 2026). The landed-state proof compares this against those PNGs pixel by
// pixel, so a value that is not the sheet's is a defect, not a variation.
//
// WHAT THIS IS. Act II's visual anchor is one continuous rail that never fully
// leaves the screen and extends right as history advances (the staging
// amendment, master §13). The sheet renders each beat by rebuilding the whole
// world; the deck cannot, because a deck has to MOVE between those states. So
// the same world is built ONCE here as persistent elements, and every state
// writes its geometry onto them from the sheet's own camera math. That is what
// makes a camera move possible: tween `cam` and re-apply, which is exactly what
// `EvolutionRail` does with its own camera.
//
// The six r2 rulings live in this file's data, not in its code paths:
//   r2.1  X below — narrative order is spatial order; SHELLS stands first and
//         the rail fills strictly left to right. The legacy STOP_X positions
//         are unchanged; only which station stands at which stop moved.
//   r2.2  VIRTUE / NOTE / WOUND share the +64 row slot — every station carries
//         a line beneath it, always: the virtue at its own station's voice
//         while it stands, the wound at the dimmed-prior step once it falls.
//   r2.3  there is no ClaimObject in this file. The claim is off the Act II
//         rail; station illumination and the spoken narrative carry it.
//   r2.4  `depLine` — the certificate's dependency arc back to GOLD, through
//         the corridor between the band and the line that the traveler left.
//   r2.5  bandBox() — one shared 188 × 188 world box, both axes capped, every
//         render in a box of its own aspect scaled to fit inside it.
//   r2.6  `lit` — the one station that rides outside the recession (Session 2's
//         network seam; built here because the world is one world).
//
// MOTION IS TRANSCRIBED, NOT AUTHORED. The gestures a scene plays over this
// world are the legacy rail's own, and their durations are the legacy CSS's,
// named at each call site in the scene modules:
//   the camera        gsap 1.7s power2.inOut — EvolutionRail's own tween
//   a station arriving   opacity 800ms ease-out — `.s2o-rail__stop`
//   a line landing       opacity 900ms + rise from 6px over 1100ms —
//                        `.s2o-rail__wound`, which lands by translating up 6px
//   the rail growing     1500ms after a 300ms hold — `.s2o-rail__line`'s own
//                        scaleX transition, here the head's own extent
//   recede / return      opacity 800ms ease-out — `.s2o-rail`
// GSAP eases stand in for the CSS timing functions (`power1.out` for
// `ease-out`, `power4.out` for `cubic-bezier(0.22, 1, 0.36, 1)`), which is the
// same substitution Batch B's scenes already ship.

import { DarkFieldImage } from '../../components/DarkField.js';

const svgNS = 'http://www.w3.org/2000/svg';

// ============================================================ the world model

// EvolutionRail's STOP_X verbatim, extended at the metals→gold pitch, under the
// fill-order ruling's assignment (r2.1).
export const X = {
  shells: 170, cattle: 400, salt: 635, iron: 870, metals: 1210, gold: 1620,
  coinage: 2030, claim: 2440, ledger: 2850, bitcoin: 3260
};
export const ORDER = ['shells', 'cattle', 'salt', 'iron', 'metals', 'gold',
  'coinage', 'claim', 'ledger', 'bitcoin'];
const MINOR_MARKS = [90, 320, 555, 790, 1025];   // EvolutionRail verbatim
const LINE_START = -60;                           // EvolutionRail verbatim
const HEAD_FADE = 280;                            // LINE_END − STOP_X.gold

// The band, under the equal-visual-weight ruling (r2.5).
const BAND_W = 188;
const BAND_H = 188;
const BAND_BOTTOM = -52;     // EvolutionRail RENDER_BOTTOM

function bandBox(ar) {
  const h = Math.min(BAND_H, BAND_W / ar);
  return [h * ar, h];
}

const STATION = {
  shells: { label: 'SHELLS', subject: 'cowrie_shells', ar: 1122 / 1402, alt: 'A cluster of cowrie shells' },
  cattle: { label: 'CATTLE', subject: 'cattle', ar: 1122 / 1402, alt: 'A single ox' },
  salt: { label: 'SALT', subject: 'salt', ar: 1122 / 1402, alt: 'A block of rock salt' },
  iron: { label: 'IRON', subject: 'iron', ar: 1122 / 1402, alt: 'A rough iron bloom' },
  metals: { label: 'METALS', subject: 'metals', ar: 1672 / 941, alt: 'A stack of cast metal ingots' },
  gold: { label: 'GOLD', subject: 'gold', ar: 1672 / 941, alt: 'A cast gold bar' },
  coinage: { label: 'COINAGE', subject: 'coinage', ar: 1672 / 941, alt: 'A small stack of ancient hammered coins' },
  claim: { label: 'CLAIM ON GOLD', subject: 'gold_certificate', ar: 1122 / 1402, alt: 'The gold certificate — a claim on gold' },
  ledger: { label: 'LEDGER', subject: 'ledger_glow', ar: 1536 / 1024, alt: 'A glowing ledger entry' },
  bitcoin: { label: 'BITCOIN', subject: 'bitcoin', ar: 1448 / 1086, alt: 'The bitcoin coin' }
};

// The legacy rail's own wound strings, verbatim; the coinage limit is the
// installed S7 script's own clause.
const WOUND = {
  cattle: 'Cannot be divided. Half a cow is no cow.',
  salt: 'Dissolves in a rainstorm.',
  iron: 'Rusts. And anyone with a furnace can make more.',
  shells: 'West Africa, 1800s: shiploads of cheaper Zanzibar cowries collapsed the shell rate. Local savings, out-supplied.',
  coinage: 'solves the market stall, not the merchant fleet'
};

// The virtues (r2.2) — the installed S5 script's own words, beats 1 and 5.
const VIRTUE = {
  shells: 'Beautiful. Scarce. Hard to fake.',
  metals: 'Hard to make more of. Slow to decay. Divisible without dying.'
};

// A landed sentence settled into the rail's own row register — S7's claim
// station keeps the vault line the beat landed on it (r2.4).
const NOTE = {
  claim: 'A claim on gold in a vault. Trust required: the vault.'
};

// The strip's recorded gain/dependency pairs, verbatim.
const PAIR = {
  gold: { gain: 'SCARCITY IN MATTER', dep: 'as value grows, weight grows' },
  claim: { gain: 'PORTABILITY', dep: 'trust moved to the issuer' },
  ledger: { gain: 'INSTANT TRANSFER', dep: 'the window closed' },
  bitcoin: { gain: 'NON-DISCRETIONARY SUPPLY', dep: 'not yet twenty years into a hundred-year question' }
};

// live (this beat's subject) · alive (arrived, undefeated — the
// survival-brightness ruling) · prior (superseded or fallen).
const S_VOICE = {
  live: { render: 1, label: 1, dot: 0.9, dotR: 6, row: 1 },
  alive: { render: 0.9, label: 0.75, dot: 0.85, dotR: 6, row: 0.75 },
  prior: { render: 0.58, label: 0.58, dot: 0.5, dotR: 4.7, row: 0.55 }
};

export const RECEDE = { none: 1, statement: 0.35, deep: 0.08 };

const VOICE_LINE = 0.35;
const VOICE_DOT = 0.7;

// ------------------------------------------------------------------- camera

export const w2s = (cam, wx, wy = 0) => [960 + (wx - cam.cx) * cam.s, cam.cy + wy * cam.s];

export function frame(leftId, rightId, { cap = 1.6, cy = 640, rightAir = 210 } = {}) {
  const L = X[leftId] - 210;
  const R = X[rightId] + rightAir;
  const s = Math.min(cap, 1720 / (R - L));
  return { cx: (L + R) / 2, s, cy };
}

/** A station-anchored stage block, clamped to the title-safe margin. */
export function anchorX(cam, id, blockW) {
  const [sx] = w2s(cam, X[id]);
  return Math.max(60 + blockW / 2, Math.min(sx, 1860 - blockW / 2));
}

// ------------------------------------------------------------ the registers

const CAPS = (a = 0.75, size = 26) => `font-size:${size}px; font-weight:560;` +
  `letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,${a});`;
const STATEMENT = (a = 1, size = 46) => `font-size:${size}px; font-weight:540;` +
  `letter-spacing:-0.012em; line-height:1.3; color:rgba(255,255,255,${a});`;
const KICKER = (a = 0.5) => 'font-size:20px; font-weight:500; letter-spacing:0.32em;' +
  `text-indent:0.32em; text-transform:uppercase; color:rgba(255,255,255,${a});`;

// The rail's own row registers, at world size scaled by the camera.
const rowLabel = (s, a) => `font-size:${(25 * s).toFixed(1)}px; font-weight:500;` +
  ` letter-spacing:0.16em; color:rgba(255,255,255,${a});`;
const rowText = (s, a) => `font-size:${(17 * s).toFixed(1)}px; font-weight:420;` +
  ` line-height:1.45; color:rgba(255,255,255,${a});`;
const rowGain = (s, a) => `font-size:${(20 * s).toFixed(1)}px; font-weight:560;` +
  ` letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,${a});`;

/** The sheet's stage-register blocks, as [copy, styles] the stage can write. */
export const RAIL_TEXT = {
  landing: (copy, cam, id, { y, size = 36, w = 760, reg = 'statement', a = 1 } = {}) => {
    const cx = anchorX(cam, id, w);
    const style = reg === 'caps' ? CAPS(a, size) : STATEMENT(a, size);
    return [copy,
      `left:${(cx - w / 2).toFixed(1)}px; top:${y}px; width:${w}px; text-align:center; text-indent:0;` + style];
  },
  statement: (copy, { top, size = 46, a = 1 } = {}) => [copy,
    `left:240px; right:240px; top:${top}px; text-align:center; text-indent:0;` + STATEMENT(a, size)],
  // The question register (1.03's own big-question type), as the sheet writes it.
  question: (copy, top) => [copy,
    `left:240px; right:240px; top:${top}px; text-align:center; text-indent:0;` +
    'font-size:64px; font-weight:560; line-height:1.35; letter-spacing:-0.015em; color:#fff;'],
  // The dated-fact grammar (S5-F3, approved) anchored at a station: the type is
  // the legacy's to the value; only the anchor is the sheet's wiring.
  datedFact: (spec, cam, id, y0) => {
    const w = 760;
    const cx = anchorX(cam, id, w);
    const left = `left:${(cx - w / 2).toFixed(1)}px;`;
    let y = y0;
    const out = { place: null, date: null, fact: null };
    if (spec.place) {
      out.place = [spec.place,
        `${left} top:${y}px; width:${w}px; text-align:center; text-indent:0.32em;` + KICKER(0.5)];
      y += 52;
    }
    out.date = [spec.date,
      `${left} top:${y}px; width:${w}px; text-align:center; text-indent:0;` +
      ' font-size:128px; font-weight:650; letter-spacing:-0.02em;' +
      ' font-variant-numeric:tabular-nums; color:rgba(255,255,255,1);'];
    y += 210;
    out.fact = [spec.fact,
      `${left} top:${y}px; width:${w}px; text-align:center; text-indent:0;` +
      ' font-size:33px; font-weight:460; line-height:1.45; letter-spacing:-0.008em;' +
      ' color:rgba(255,255,255,1);'];
    return out;
  }
};

// ================================================================ the world

let gradSeq = 0;

/**
 * The rail world as persistent DOM. `apply(spec)` writes the complete geometry
 * of one state; the refs it exposes are what a gesture tweens.
 *
 * spec — the sheet's own cell spec, unchanged:
 *   head      rightmost arrived station (fixes the line's extent)
 *   cam       { cx, s, cy }
 *   st        { stationId: 'live' | 'alive' | 'prior' } — absent = hidden
 *   rows      { stationId: { virtue?, wound?, note?, gain?, dep? } }
 *             true = the station's own voice · 'latest' = full voice
 *   recede    'none' | 'statement' | 'deep'
 *   depLine   true — the certificate's dependency arc back to GOLD
 *   lit       a station id riding outside the recession, its dot left to the
 *             mesh's hub (r2.6 — Session 2's network seam)
 */
export function RailWorld() {
  const el = document.createElement('div');
  el.style.cssText = 'position:absolute; inset:0;';

  // The receded layer: its own svg first, then the stations' HTML — the sheet's
  // own stacking, which is what puts the drawn dependency arc beneath the
  // photographs.
  const layer = document.createElement('div');
  layer.style.cssText = 'position:absolute; inset:0;';
  const lsvg = document.createElementNS(svgNS, 'svg');
  lsvg.setAttribute('viewBox', '0 0 1920 1080');
  lsvg.setAttribute('width', '1920');
  lsvg.setAttribute('height', '1080');
  lsvg.style.cssText = 'position:absolute; inset:0;';
  layer.appendChild(lsvg);
  el.appendChild(layer);

  // The lit layer (r2.6): one station outside the recession. Built empty; only
  // the network seam fills it.
  const top = document.createElement('div');
  top.style.cssText = 'position:absolute; inset:0;';
  const tsvg = document.createElementNS(svgNS, 'svg');
  tsvg.setAttribute('viewBox', '0 0 1920 1080');
  tsvg.setAttribute('width', '1920');
  tsvg.setAttribute('height', '1080');
  tsvg.style.cssText = 'position:absolute; inset:0;';
  top.appendChild(tsvg);
  el.appendChild(top);

  // ---- the line, with the sheet's own faded-end gradient ----
  gradSeq += 1;
  const gradId = `railgrad-world-${gradSeq}`;
  const defs = document.createElementNS(svgNS, 'defs');
  const grad = document.createElementNS(svgNS, 'linearGradient');
  grad.setAttribute('id', gradId);
  [[0, 0], [4, 0.3], [92, 0.3], [100, 0.3 * 0.2]].forEach(([off, a]) => {
    const stop = document.createElementNS(svgNS, 'stop');
    stop.setAttribute('offset', `${off}%`);
    stop.setAttribute('stop-color', `rgba(255,255,255,${a})`);
    grad.appendChild(stop);
  });
  defs.appendChild(grad);
  lsvg.appendChild(defs);

  const lineRect = document.createElementNS(svgNS, 'rect');
  lineRect.setAttribute('fill', `url(#${gradId})`);
  lsvg.appendChild(lineRect);

  const ticks = MINOR_MARKS.map(() => {
    const t = document.createElementNS(svgNS, 'rect');
    t.setAttribute('fill', 'rgba(255,255,255,0.2)');
    lsvg.appendChild(t);
    return t;
  });

  // ---- the stations ----
  //
  // Each station is one `<g>` for its dot and one `<div>` for its photograph,
  // label and rows. The wrapper is `position:absolute; inset:0`, so its children
  // resolve against exactly the layer's box and land on the sheet's own
  // coordinates; at full opacity it composites to nothing. Both exist so a
  // gesture can bring a whole station up at once — the legacy's own
  // `.s2o-rail__stop` opacity transition, which is per-stop.
  const mkText = (parent) => {
    const p = document.createElement('p');
    p.style.cssText = 'position:absolute; margin:0; display:none;';
    parent.appendChild(p);
    return p;
  };
  const stations = {};
  ORDER.forEach((id) => {
    const info = STATION[id];
    const g = document.createElementNS(svgNS, 'g');
    lsvg.appendChild(g);
    const dot = document.createElementNS(svgNS, 'circle');
    g.appendChild(dot);

    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute; inset:0;';
    const df = DarkFieldImage({
      name: info.subject, width: BAND_W, height: BAND_H, alt: info.alt, stubSize: 96
    });
    df.el.dataset.visible = 'true';
    df.el.style.transition = 'none';
    df.el.style.position = 'absolute';
    wrap.appendChild(df.el);
    const label = mkText(wrap);
    const row64 = mkText(wrap);
    const row146 = mkText(wrap);
    layer.appendChild(wrap);

    stations[id] = { g, dot, wrap, photo: df.el, label, row64, row146, lit: false };
  });

  // ---- the dependency arc (r2.4), last in the drawn layer ----
  const depPath = document.createElementNS(svgNS, 'path');
  depPath.setAttribute('fill', 'none');
  depPath.setAttribute('stroke-linecap', 'round');
  lsvg.appendChild(depPath);
  const depDots = [0, 1].map(() => {
    const c = document.createElementNS(svgNS, 'circle');
    lsvg.appendChild(c);
    return c;
  });

  // Writing a row rewrites its whole cssText, which is what keeps a settled
  // frame exact — but a camera move repaints every frame, and a line that is
  // MID-LANDING while the camera moves would have its fade and its rise wiped
  // sixty times a second. So the two properties a gesture owns are carried
  // across the repaint; `clearGestureProps` is what ends them, at the settle.
  const setText = (p, copy, styles) => {
    const o = p.style.opacity;
    const t = p.style.transform;
    p.textContent = copy;
    p.style.cssText = 'position:absolute; margin:0; ' + styles;
    if (o) p.style.opacity = o;
    if (t) p.style.transform = t;
  };
  const hide = (p) => { p.style.cssText = 'position:absolute; margin:0; display:none;'; };

  let current = null;

  function apply(spec) {
    current = spec;
    const cam = spec.cam;
    // `recedeValue` overrides the named recession while the record is fading
    // out from under a statement or coming back — the legacy `.s2o-rail`
    // opacity transition, driven as a number so a repaint cannot wipe it.
    layer.style.opacity = String(
      spec.recedeValue == null ? RECEDE[spec.recede || 'none'] : spec.recedeValue
    );

    // `headX` overrides the head's own world x while the rail is GROWING: the
    // line's right end and the minor marks it has reached are one scalar, so a
    // tween on it is the legacy line's own scaleX, in world terms.
    const headX = spec.headX == null ? X[spec.head] : spec.headX;
    const [lx1] = w2s(cam, LINE_START);
    const [lx2] = w2s(cam, headX + HEAD_FADE);
    const [, ly] = w2s(cam, 0, 0);
    const lh = Math.max(1.2, 2 * cam.s);
    lineRect.setAttribute('x', lx1);
    lineRect.setAttribute('y', ly - lh / 2);
    lineRect.setAttribute('width', Math.max(0, lx2 - lx1));
    lineRect.setAttribute('height', lh);

    // The minor marks arrive with the line — the record's texture of small
    // monies. Only those the head has reached exist on the frame.
    MINOR_MARKS.forEach((mx, i) => {
      const t = ticks[i];
      if (mx > headX) { t.style.display = 'none'; return; }
      t.style.display = '';
      const [sx] = w2s(cam, mx);
      t.setAttribute('x', sx - cam.s);
      t.setAttribute('y', ly - 5 * cam.s);
      t.setAttribute('width', 2 * cam.s);
      t.setAttribute('height', 10 * cam.s);
    });

    ORDER.forEach((id) => {
      const S = stations[id];
      const state = spec.st[id];
      if (!state) {
        S.wrap.style.display = 'none';
        S.g.style.display = 'none';
        return;
      }
      S.wrap.style.display = '';
      S.g.style.display = '';
      const v = S_VOICE[state];
      const info = STATION[id];
      const [sx] = w2s(cam, X[id]);
      const isLit = spec.lit === id;
      // The lit station rides the un-receded layer; its dot is left to the
      // mesh's hub, which is what "the hub dissolves" means on a still.
      const host = isLit ? top : layer;
      if (S.wrap.parentNode !== host) host.appendChild(S.wrap);
      const gHost = isLit ? tsvg : lsvg;
      if (S.g.parentNode !== gHost) gHost.appendChild(S.g);
      S.lit = isLit;

      // The band: the render in a box of its own aspect inside the shared box,
      // bottom-aligned on the band's baseline.
      const [bw, bh] = bandBox(info.ar);
      const w = bw * cam.s;
      const h = bh * cam.s;
      S.photo.style.setProperty('--df-w', `${w}px`);
      S.photo.style.setProperty('--df-h', `${h}px`);
      S.photo.style.left = `${sx - w / 2}px`;
      S.photo.style.top = `${ly + BAND_BOTTOM * cam.s - h}px`;
      S.photo.style.opacity = String(v.render);

      S.dot.setAttribute('cx', sx);
      S.dot.setAttribute('cy', ly);
      S.dot.setAttribute('r', v.dotR * cam.s);
      S.dot.setAttribute('fill', `rgba(255,255,255,${v.dot})`);
      S.dot.style.display = isLit ? 'none' : '';

      const lw = 340 * cam.s;
      setText(S.label, info.label,
        `left:${(sx - lw / 2).toFixed(1)}px; top:${(ly + 26 * cam.s).toFixed(1)}px;` +
        ` width:${lw.toFixed(1)}px; text-align:center; text-indent:0.16em;` + rowLabel(cam.s, v.label));

      const rows = (spec.rows && spec.rows[id]) || {};
      const rw = 218 * cam.s;
      const gw = 340 * cam.s;
      const rowVoice = (mode, base) => (mode === 'latest' ? 1 : base * v.row);
      const at64 = `top:${(ly + 64 * cam.s).toFixed(1)}px;`;
      // One line per station in the +64 slot (r2.2): the virtue while it
      // stands, the wound once it falls, the settled note where a landing
      // became the record — or the gain, at the architecture stations.
      if (rows.virtue) {
        setText(S.row64, VIRTUE[id],
          `left:${(sx - rw / 2).toFixed(1)}px; ${at64}` +
          ` width:${rw.toFixed(1)}px; text-align:center; text-indent:0;` +
          rowText(cam.s, rowVoice(rows.virtue, 1)));
      } else if (rows.wound) {
        setText(S.row64, WOUND[id],
          `left:${(sx - rw / 2).toFixed(1)}px; ${at64}` +
          ` width:${rw.toFixed(1)}px; text-align:center; text-indent:0;` +
          rowText(cam.s, rowVoice(rows.wound, 0.58)));
      } else if (rows.note) {
        setText(S.row64, NOTE[id],
          `left:${(sx - rw / 2).toFixed(1)}px; ${at64}` +
          ` width:${rw.toFixed(1)}px; text-align:center; text-indent:0;` +
          rowText(cam.s, rowVoice(rows.note, 0.58)));
      } else if (rows.gain) {
        setText(S.row64, PAIR[id].gain,
          `left:${(sx - gw / 2).toFixed(1)}px; ${at64}` +
          ` width:${gw.toFixed(1)}px; text-align:center; text-indent:0;` +
          rowGain(cam.s, rowVoice(rows.gain, 0.75)));
      } else hide(S.row64);

      if (rows.dep) {
        setText(S.row146, PAIR[id].dep,
          `left:${(sx - rw / 2).toFixed(1)}px; top:${(ly + 146 * cam.s).toFixed(1)}px;` +
          ` width:${rw.toFixed(1)}px; text-align:center; text-indent:0;` +
          rowText(cam.s, rowVoice(rows.dep, 0.58)));
      } else hide(S.row146);
    });

    // The dependency arc: from the CLAIM ON GOLD station back to GOLD, through
    // the corridor between the band's baseline and the rail line — the airspace
    // the traveler vacated when the claim stepped off (r2.3/r2.4). Its terminals
    // sit at each render's bottom centre; the curve peaks at world −20, clear of
    // every render and clear of the line.
    if (spec.depLine) {
      const [cx1, cy1] = w2s(cam, X.claim, BAND_BOTTOM);
      const [gx1, gy1] = w2s(cam, X.gold, BAND_BOTTOM);
      const [, apex] = w2s(cam, 0, -20);
      const ctrlY = 2 * apex - (cy1 + gy1) / 2;
      depPath.setAttribute('d',
        `M ${cx1.toFixed(1)} ${cy1.toFixed(1)} Q ${((cx1 + gx1) / 2).toFixed(1)} ${ctrlY.toFixed(1)} ${gx1.toFixed(1)} ${gy1.toFixed(1)}`);
      depPath.setAttribute('stroke', `rgba(255,255,255,${VOICE_LINE})`);
      depPath.setAttribute('stroke-width', Math.max(1, 1.5 * cam.s));
      depPath.style.display = '';
      [[cx1, cy1], [gx1, gy1]].forEach(([dx, dy], i) => {
        depDots[i].setAttribute('cx', dx);
        depDots[i].setAttribute('cy', dy);
        depDots[i].setAttribute('r', 3.5 * cam.s);
        depDots[i].setAttribute('fill', `rgba(255,255,255,${VOICE_DOT})`);
        depDots[i].style.display = '';
      });
    } else {
      depPath.style.display = 'none';
      depDots.forEach((d) => { d.style.display = 'none'; });
    }
  }

  /** Re-apply the current state at a new camera — what a camera tween drives. */
  function camTo(cam) {
    if (current) apply({ ...current, cam });
  }

  /** The settled contract: no gesture's leftovers survive a reconstruction. */
  function clearGestureProps() {
    ORDER.forEach((id) => {
      const S = stations[id];
      S.wrap.style.opacity = '';
      S.wrap.style.transform = '';
      S.g.removeAttribute('opacity');
      [S.label, S.row64, S.row146].forEach((p) => {
        p.style.opacity = '';
        p.style.transform = '';
      });
    });
    depPath.removeAttribute('stroke-dasharray');
    depPath.removeAttribute('stroke-dashoffset');
    depPath.removeAttribute('opacity');
    depDots.forEach((d) => d.removeAttribute('opacity'));
    layer.style.transform = '';
    top.style.opacity = '';
  }

  return {
    el, layer, top, lineRect, ticks, stations, depPath, depDots,
    apply, camTo, clearGestureProps,
    state: () => current
  };
}

export default RailWorld;
