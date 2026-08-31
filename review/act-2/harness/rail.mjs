// Act II — the rail-states builders (docs/act-2-rail-states-brief.md §2).
//
// THE STAGING AMENDMENT, RENDERED (docs/act-2-staging-amendment.md, presenter-
// approved verbatim, 1 September 2026 — master §13). Act II's visual anchor is
// one continuous rail that never fully leaves the screen and extends right as
// history advances. Every settled state of the act's 37 beats renders from ONE
// world model through one camera — one grammar, one rhythm, one scale
// discipline from S5 b1 to S10 b5.
//
// THE GRAMMAR IS TRANSCRIBED, NOT INVENTED — every value names its source:
//
//   the spine     `EvolutionRail.js` STOP_X verbatim for the six legacy
//                 stations; the extension continues at the metals→gold pitch
//                 (410 world px): COINAGE 2030 · CLAIM ON GOLD 2440 ·
//                 LEDGER 2850 · BITCOIN 3260.
//   the line      `.s2o-rail__line` — 2px, alpha 0.3, faded ends; minor marks
//                 2×10 at the legacy positions; the head fades into dark at
//                 +280 past the newest station (the legacy's LINE_END − gold).
//   stations      the 12px marker centred ON the line; the label row at +26 in
//                 25px/500/0.16em; the wound/annotation rows at +64 and +146
//                 on the 218px measure at 17px/1.45 — the rail's own two-row
//                 rhythm, identical row heights, no staggered baselines (icon
//                 grammar §4.5). Station dots stay monochrome as on the
//                 approved strip cells; the film's accent belongs to the
//                 traveler.
//   the band      the rails law (AGENTS.md §6): renders above the line at the
//                 band's shared height (RENDER_H 188 world, bottom −52 — the
//                 component's own baseline), each box the render's OWN aspect
//                 under the framing rule. GOLD takes the regenerated render's
//                 1672×941 (this session's §1.3 ingest); LEDGER is
//                 `ledger_glow` and BITCOIN the coin per their recorded
//                 assignments; COINAGE has no study in the register and shows
//                 its grammar-glyph stub, data-pending — flagged in the
//                 report, never improvised (§4.4).
//   brightness    the survival-brightness ruling (AGENTS.md §6, recorded this
//                 session): an undefeated station holds full voice; fallen
//                 stations dim with their wounds — SHELLS reads as alive until
//                 Zanzibar lands. §9.4 rule 10 governs the rows beneath: the
//                 latest-landed sentence at full voice, the prior ones at the
//                 dimmed-prior step.
//   the traveler  the ClaimObject disc rides the line at its current carrier's
//                 station — never a station (the CERTIFICATE ruling). 44 world
//                 px, centred between the line and the band's baseline.
//   overlays      the six interludes enter over the deep-dimmed rail — the
//                 legacy table-over-rail treatment (`.s2o-rail[data-dimmed=
//                 "deep"]`, opacity 0.08) — built by THE APPROVED CELLS' OWN
//                 BUILDERS imported from ./states.mjs, so the overlay content
//                 cannot drift from what the presenter approved. Only the two
//                 seam states per overlay render here; interior overlay states
//                 are carried byte-identical by the capture.
//   statements    the approved lines over the receded rail (the chart-dim
//                 register, `.s2o-rail[data-dimmed="true"]` 0.16 — lifted to
//                 0.35 here so a still, which has no motion to carry the
//                 recession, keeps the rail readable beneath the line; the
//                 wiring note below).
//   landings      a beat's own sentence lands in the deck's stage registers
//                 (CAPS / STATEMENT / the dated-fact grammar) anchored at its
//                 station; the rail keeps the condensed record in its world
//                 rows afterward — the strip's recorded gain/dependency pairs
//                 and the legacy wounds, all strings verbatim from the record.
//
// WIRING, NAMED (the only latitude taken): per-state cameras (computed from
// the amendment's history-so-far rule: every settled frame shows station one
// to the newest arrival), the 0.35 receded voice for stills, the stage-y of
// statement and landing blocks, and the clamp that keeps a station-anchored
// block inside the frame. Each is marked WIRING at its call site.

import { DarkFieldImage } from '/src/components/DarkField.js';
import { ClaimObject } from '/src/components/section-4/ClaimObject.js';
import {
  VOICE, dot, text, KICKER, CAPS, STATEMENT, PLAIN
} from './systems.mjs';
import { CELLS as STATE_CELLS, SPECIMEN, ENTRANT } from './states.mjs';

const svgNS = 'http://www.w3.org/2000/svg';
const STAGE_ID = 'act2-rail-stage';

let cleanup = [];

export const CELLS = {};
function cell(id, meta, build) {
  CELLS[id] = { ...meta, build };
}

function stage() {
  const prev = document.getElementById(STAGE_ID);
  if (prev) prev.remove();
  cleanup.forEach((fn) => { try { fn(); } catch { /* torn down with the DOM */ } });
  cleanup = [];

  const el = document.createElement('div');
  el.id = STAGE_ID;
  // `.s2o`/`.s3f` are the legacy section roots — carrying them is what lets
  // the overlay builders rebuild legacy DOM and have the legacy stylesheet
  // place it (states.mjs §stage, verbatim).
  el.className = 's2o s3f s4-opening';
  el.style.cssText = 'position:fixed; left:0; top:0; width:1920px; height:1080px;' +
    'background:#000; overflow:hidden; z-index:9999; font-family:Inter,sans-serif;';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 1920 1080');
  svg.setAttribute('width', '1920');
  svg.setAttribute('height', '1080');
  svg.style.cssText = 'position:absolute; inset:0;';
  el.appendChild(svg);
  document.body.appendChild(el);
  return { el, svg };
}

// ============================================================ the world model

// EvolutionRail's STOP_X verbatim, extended at the metals→gold pitch.
const X = {
  cattle: 170, salt: 400, shells: 635, iron: 870, metals: 1210, gold: 1620,
  coinage: 2030, claim: 2440, ledger: 2850, bitcoin: 3260
};
const ORDER = ['cattle', 'salt', 'shells', 'iron', 'metals', 'gold',
  'coinage', 'claim', 'ledger', 'bitcoin'];
const MINOR_MARKS = [90, 320, 555, 790, 1025];   // EvolutionRail verbatim
const LINE_START = -60;                           // EvolutionRail verbatim
const HEAD_FADE = 280;                            // LINE_END − STOP_X.gold

// The band (the rails law): shared height, bottom baseline, own aspects.
const BAND_H = 188;          // EvolutionRail RENDER_H
const BAND_BOTTOM = -52;     // EvolutionRail RENDER_BOTTOM

const STATION = {
  cattle: { label: 'CATTLE', subject: 'cattle', ar: 4 / 5, alt: 'A single ox' },
  salt: { label: 'SALT', subject: 'salt', ar: 4 / 5, alt: 'A block of rock salt' },
  shells: { label: 'SHELLS', subject: 'cowrie_shells', ar: 4 / 5, alt: 'A cluster of cowrie shells' },
  iron: { label: 'IRON', subject: 'iron', ar: 4 / 5, alt: 'A rough iron bloom' },
  metals: { label: 'METALS', subject: 'metals', ar: 1672 / 941, alt: 'A stack of cast metal ingots' },
  gold: { label: 'GOLD', subject: 'gold', ar: 1672 / 941, alt: 'A cast gold bar' },
  // DARK-FIELD PENDING: no coinage study exists in the register (manifest §6).
  // The station shows its grammar-glyph stub per the pipeline, flagged in the
  // report; a graded render landing at `coinage` completes it with no change.
  coinage: { label: 'COINAGE', subject: 'coinage', ar: 4 / 3, alt: 'Standard coins — render pending' },
  claim: { label: 'CLAIM ON GOLD', subject: 'gold_certificate', ar: 4 / 5, alt: 'The gold certificate — a claim on gold' },
  ledger: { label: 'LEDGER', subject: 'ledger_glow', ar: 3 / 2, alt: 'A glowing ledger entry' },
  bitcoin: { label: 'BITCOIN', subject: 'bitcoin', ar: 4 / 3, alt: 'The bitcoin coin' }
};

// The wound rows — the legacy rail's own strings, verbatim (EvolutionRail
// STOPS; the coinage limit is the installed S7 script's own clause).
const WOUND = {
  cattle: 'Cannot be divided. Half a cow is no cow.',
  salt: 'Dissolves in a rainstorm.',
  iron: 'Rusts. And anyone with a furnace can make more.',
  shells: 'West Africa, 1800s: shiploads of cheaper Zanzibar cowries collapsed the shell rate. Local savings, out-supplied.',
  coinage: 'solves the market stall, not the merchant fleet'
};

// The gain/dependency pairs — the strip's recorded STATIONS, verbatim
// (systems.mjs; the CERTIFICATE ruling's relabel already applied above).
const PAIR = {
  gold: { gain: 'SCARCITY IN MATTER', dep: 'as value grows, weight grows' },
  claim: { gain: 'PORTABILITY', dep: 'trust moved to the issuer' },
  ledger: { gain: 'INSTANT TRANSFER', dep: 'the window closed' },
  bitcoin: { gain: 'NON-DISCRETIONARY SUPPLY', dep: 'not yet twenty years into a hundred-year question' }
};

// Station voices: live (this beat's subject) · alive (arrived, undefeated —
// the survival-brightness ruling) · prior (superseded or fallen — the
// dimmed-prior step). Rows scale with their station exactly as the strip
// scales them (a = 1 live · 0.75 alive · 0.55 prior).
const S_VOICE = {
  live: { render: 1, label: 1, dot: 0.9, dotR: 6, row: 1 },
  alive: { render: 0.9, label: 0.75, dot: 0.85, dotR: 6, row: 0.75 },
  prior: { render: 0.58, label: 0.58, dot: 0.5, dotR: 4.7, row: 0.55 }
};

// The recession voices. Deep is the legacy table-over-rail dim
// (`.s2o-rail[data-dimmed="deep"]`, 0.08). WIRING: the statement-beat
// recession is 0.35 rather than the chart's 0.16 — a still has no motion to
// carry "the rail receded and returned", so the receded rail must stay
// readable as the ground the statement stands on; the implementation session
// recedes to the recorded 0.16 in motion.
const RECEDE = { none: 1, statement: 0.35, deep: 0.08 };

// The traveler: 44 world px, centred in the gap between the line and the
// band's baseline (−52 … 0), riding at its current carrier's station. Never a
// station — the CERTIFICATE ruling; the rails law names it the traveler.
const DISC_W = 44;
const DISC_CY = -27;

// ------------------------------------------------------------------- camera

// world → stage. The camera is {cx, s, cy}: world x `cx` lands at stage 960,
// the rail line (world y 0) at stage `cy` — EvolutionRail's own camera math.
const w2s = (cam, wx, wy = 0) => [960 + (wx - cam.cx) * cam.s, cam.cy + wy * cam.s];

// WIRING: per-state cameras. The amendment's history-so-far rule fixes the
// span (station one to the newest arrival, 210 world px of air past each
// outermost station); the zoom is the fit, capped at 1.6 — the legacy row
// camera's own maximum — and cy composes the stage per state.
function frame(leftId, rightId, { cap = 1.6, cy = 640 } = {}) {
  const L = X[leftId] - 210;
  const R = X[rightId] + 210;
  const s = Math.min(cap, 1720 / (R - L));
  return { cx: (L + R) / 2, s, cy };
}

// ------------------------------------------------------------------ drawing

function gradLine(st, x1, x2, y, alpha, h = 2) {
  // The rail line's own faded ends (.s2o-rail__line's gradient, transcribed).
  const id = `railgrad-${Math.round(x1)}-${Math.round(x2)}-${Math.round(alpha * 100)}`;
  const defs = document.createElementNS(svgNS, 'defs');
  const grad = document.createElementNS(svgNS, 'linearGradient');
  grad.setAttribute('id', id);
  [[0, 0], [4, alpha], [92, alpha], [100, alpha * 0.2]].forEach(([off, a]) => {
    const stop = document.createElementNS(svgNS, 'stop');
    stop.setAttribute('offset', `${off}%`);
    stop.setAttribute('stop-color', `rgba(255,255,255,${a})`);
    grad.appendChild(stop);
  });
  defs.appendChild(grad);
  st.svg.appendChild(defs);
  const rect = document.createElementNS(svgNS, 'rect');
  rect.setAttribute('x', x1);
  rect.setAttribute('y', y - h / 2);
  rect.setAttribute('width', Math.max(0, x2 - x1));
  rect.setAttribute('height', h);
  rect.setAttribute('fill', `url(#${id})`);
  st.svg.appendChild(rect);
  return rect;
}

function photo(st, { subject, box: [x, y, w, h], alt, o = 1, stubSize }) {
  const df = DarkFieldImage({ name: subject, width: w, height: h, alt, stubSize });
  df.el.dataset.visible = 'true';
  df.el.style.transition = 'none';
  df.el.style.position = 'absolute';
  df.el.style.left = `${x}px`;
  df.el.style.top = `${y}px`;
  df.el.style.opacity = String(o);
  st.el.appendChild(df.el);
  return df.el;
}

// The rail's own row registers, at world size scaled by the camera.
const rowLabel = (s, a) => `font-size:${(25 * s).toFixed(1)}px; font-weight:500;` +
  ` letter-spacing:0.16em; color:rgba(255,255,255,${a});`;
const rowText = (s, a, italic = false) => `font-size:${(17 * s).toFixed(1)}px; font-weight:420;` +
  ` line-height:1.45; color:rgba(255,255,255,${a});${italic ? ' font-style:italic; letter-spacing:0.02em;' : ''}`;
const rowGain = (s, a) => `font-size:${(20 * s).toFixed(1)}px; font-weight:560;` +
  ` letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,${a});`;

// ---------------------------------------------------------------- the rail

// One rail state. spec:
//   head        rightmost arrived station (fixes the line's extent)
//   st          { stationId: 'live' | 'alive' | 'prior' } — absent = hidden
//   rows        { stationId: { wound?, gain?, dep? } } — true shows the row at
//               its station's voice; 'latest' at full voice (§9.4 rule 10)
//   claimAt     the traveler's station (null = no disc)
//   recede      'none' | 'statement' | 'deep'
//   depLine     true — S7's dependency line, claim station back to gold
//   cam         {cx, s, cy}
function rail(st, spec) {
  const cam = spec.cam;
  const layer = document.createElement('div');
  layer.style.cssText = 'position:absolute; inset:0;';
  const lsvg = document.createElementNS(svgNS, 'svg');
  lsvg.setAttribute('viewBox', '0 0 1920 1080');
  lsvg.setAttribute('width', '1920');
  lsvg.setAttribute('height', '1080');
  lsvg.style.cssText = 'position:absolute; inset:0;';
  layer.appendChild(lsvg);
  layer.style.opacity = String(RECEDE[spec.recede || 'none']);
  st.el.appendChild(layer);
  const L = { el: layer, svg: lsvg };

  const headX = X[spec.head];
  const [lx1] = w2s(cam, LINE_START);
  const [lx2] = w2s(cam, headX + HEAD_FADE);
  const [, ly] = w2s(cam, 0, 0);
  gradLine(L, lx1, lx2, ly, 0.3, Math.max(1.2, 2 * cam.s));

  // Minor marks arrive with the line (the record's texture of small monies).
  MINOR_MARKS.filter((mx) => mx <= headX).forEach((mx) => {
    const [sx] = w2s(cam, mx);
    const tick = document.createElementNS(svgNS, 'rect');
    tick.setAttribute('x', sx - cam.s);
    tick.setAttribute('y', ly - 5 * cam.s);
    tick.setAttribute('width', 2 * cam.s);
    tick.setAttribute('height', 10 * cam.s);
    tick.setAttribute('fill', 'rgba(255,255,255,0.2)');
    L.svg.appendChild(tick);
  });

  ORDER.forEach((id) => {
    const state = spec.st[id];
    if (!state) return;
    const v = S_VOICE[state];
    const info = STATION[id];
    const [sx] = w2s(cam, X[id]);

    // The band: the render in a box of its own aspect at the shared height,
    // bottom-aligned on the band baseline (the rails law).
    const w = BAND_H * info.ar * cam.s;
    const h = BAND_H * cam.s;
    photo(L, {
      subject: info.subject, alt: info.alt, o: v.render,
      box: [sx - w / 2, ly + BAND_BOTTOM * cam.s - h, w, h],
      stubSize: Math.round(96 * cam.s)
    });

    dot(L.svg, sx, ly, v.dotR * cam.s, v.dot);

    const lw = 340 * cam.s;
    text(L, info.label,
      `left:${(sx - lw / 2).toFixed(1)}px; top:${(ly + 26 * cam.s).toFixed(1)}px;` +
      ` width:${lw.toFixed(1)}px; text-align:center; text-indent:0.16em;` + rowLabel(cam.s, v.label));

    const rows = (spec.rows && spec.rows[id]) || {};
    const rw = 218 * cam.s;
    const rowVoice = (mode, base) => (mode === 'latest' ? 1 : base * v.row);
    if (rows.wound) {
      text(L, WOUND[id],
        `left:${(sx - rw / 2).toFixed(1)}px; top:${(ly + 64 * cam.s).toFixed(1)}px;` +
        ` width:${rw.toFixed(1)}px; text-align:center; text-indent:0;` +
        rowText(cam.s, rowVoice(rows.wound, 0.58)));
    }
    if (rows.gain) {
      const gw = 340 * cam.s;
      text(L, PAIR[id].gain,
        `left:${(sx - gw / 2).toFixed(1)}px; top:${(ly + 64 * cam.s).toFixed(1)}px;` +
        ` width:${gw.toFixed(1)}px; text-align:center; text-indent:0;` +
        rowGain(cam.s, rowVoice(rows.gain, 0.75)));
    }
    if (rows.dep) {
      text(L, PAIR[id].dep,
        `left:${(sx - rw / 2).toFixed(1)}px; top:${(ly + 146 * cam.s).toFixed(1)}px;` +
        ` width:${rw.toFixed(1)}px; text-align:center; text-indent:0;` +
        rowText(cam.s, rowVoice(rows.dep, 0.58)));
    }
  });

  // S7's dependency line: the certificate still owes the vaulted gold — the
  // service path's grammar (stroke 1.5 at 0.35, dot terminals 3.5 at 0.7),
  // drawn in the band's airspace from the claim render back to the gold
  // render, clearing each box (the s7-b4 restage's own values).
  if (spec.depLine) {
    // Routed through the lower band airspace (−78 → −92) so it passes beneath
    // the COINAGE station's pending stub rather than through it.
    const [gx] = w2s(cam, X.gold + (BAND_H * STATION.gold.ar) / 2 + 46);
    const [cx] = w2s(cam, X.claim - (BAND_H * STATION.claim.ar) / 2 - 46);
    const [, gy] = w2s(cam, 0, -78);
    const [, cy2] = w2s(cam, 0, -92);
    const p = document.createElementNS(svgNS, 'line');
    p.setAttribute('x1', gx); p.setAttribute('y1', gy);
    p.setAttribute('x2', cx); p.setAttribute('y2', cy2);
    p.setAttribute('stroke', `rgba(255,255,255,${VOICE.line})`);
    p.setAttribute('stroke-width', Math.max(1, 1.5 * cam.s));
    p.setAttribute('stroke-linecap', 'round');
    L.svg.appendChild(p);
    dot(L.svg, gx, gy, 3.5 * cam.s, VOICE.dot);
    dot(L.svg, cx, cy2, 3.5 * cam.s, VOICE.dot);
  }

  // The traveler. Rides outside the recession layer so the through-line keeps
  // its own voice over a receded rail (it dims only under a full overlay).
  if (spec.claimAt) {
    const [sx] = w2s(cam, X[spec.claimAt]);
    const [, sy] = w2s(cam, 0, DISC_CY);
    const size = DISC_W * cam.s;
    const wrap = document.createElement('div');
    const o = spec.recede === 'deep' ? RECEDE.deep
      : spec.recede === 'statement' ? 0.85 : 1;
    wrap.style.cssText = `position:absolute; left:${(sx - size / 2).toFixed(1)}px;` +
      ` top:${(sy - size / 2).toFixed(1)}px; width:${size.toFixed(1)}px;` +
      ` height:${size.toFixed(1)}px; opacity:${o};`;
    const claim = ClaimObject({ size });
    claim.el.style.transition = 'none';
    claim.applyState({ visible: true });
    wrap.appendChild(claim.el);
    st.el.appendChild(wrap);
  }

  return L;
}

// ------------------------------------------------- stage-register landings

// WIRING: a station-anchored stage block stays inside the frame — anchored on
// the station's stage x, clamped to the title-safe margin (the legacy's
// frame-edge rule: padding may compress spacing, never de-center a label
// under its stop; a stage block is not a stop label, so it clamps).
function anchorX(cam, id, blockW) {
  const [sx] = w2s(cam, X[id]);
  return Math.max(60 + blockW / 2, Math.min(sx, 1860 - blockW / 2));
}

// A beat's own sentence, landed at its station in the deck's registers.
function landing(st, copy, cam, id, { y, size = 36, w = 760, reg = 'statement', a = 1 } = {}) {
  const cx = anchorX(cam, id, w);
  const style = reg === 'caps' ? CAPS(a, size) : STATEMENT(a, size);
  return text(st, copy,
    `left:${(cx - w / 2).toFixed(1)}px; top:${y}px; width:${w}px; text-align:center; text-indent:0;` + style);
}

// The dated-fact grammar (S5-F3, approved) anchored at a station: the type is
// the legacy's to the value — 128px/650/−0.02em tabular date, 33px/460/1.45/
// −0.008em fact, the kicker place — only the anchor is this sheet's wiring.
function datedFact(st, spec, cam, id, y0) {
  const w = 760;
  const cx = anchorX(cam, id, w);
  let y = y0;
  if (spec.place) {
    text(st, spec.place, `left:${(cx - w / 2).toFixed(1)}px; top:${y}px; width:${w}px;` +
      ' text-align:center; text-indent:0.32em;' + KICKER(0.5));
    y += 52;
  }
  text(st, spec.date, `left:${(cx - w / 2).toFixed(1)}px; top:${y}px; width:${w}px;` +
    ' text-align:center; text-indent:0; font-size:128px; font-weight:650;' +
    ' letter-spacing:-0.02em; font-variant-numeric:tabular-nums; color:rgba(255,255,255,1);');
  y += 210;
  text(st, spec.fact, `left:${(cx - w / 2).toFixed(1)}px; top:${y}px; width:${w}px;` +
    ' text-align:center; text-indent:0; font-size:33px; font-weight:460; line-height:1.45;' +
    ' letter-spacing:-0.008em; color:rgba(255,255,255,1);');
}

// The deck's statement slot over the receded rail.
function statement(st, copy, { top, size = 46, a = 1 } = {}) {
  return text(st, copy,
    `left:240px; right:240px; top:${top}px; text-align:center; text-indent:0;` + STATEMENT(a, size));
}

// ------------------------------------------------------- the state timeline

// Shorthand for the cumulative station states + rows at each era. Wounds and
// pairs are shown from the beat they land; 'latest' rides the newest sentence
// (§9.4 rule 10); station voices follow the survival-brightness ruling.
const stAt = (obj) => obj;

const EARLY_FALLEN = { cattle: 'prior', salt: 'prior', iron: 'prior' };
const EARLY_WOUNDS = (latest) => ({
  cattle: { wound: latest === 'cattle' ? 'latest' : true },
  salt: { wound: latest === 'salt' ? 'latest' : true },
  iron: { wound: latest === 'iron' ? 'latest' : true }
});

// =========================================================== SCENE 5 (8)

const S5_CAM_BAND = frame('cattle', 'metals');           // s ≈ 1.18

cell('s5-b1', {
  scene: 'S5', beat: 1, ord: 1, kind: 'rail',
  source: 'the amendment S5 b1 · EvolutionRail’s world · the rails law',
  caption: 'Beat 1 · the rail begins. The claim enters from Scene 4’s world and finds its first carrier: SHELLS, station one, its render in the band above the line, the traveler riding at its station. The track runs on into darkness to the right — the history has not happened yet.'
}, (st) => {
  rail(st, {
    head: 'shells', cam: frame('shells', 'shells'),
    st: stAt({ shells: 'live' }), claimAt: 'shells'
  });
});

cell('s5-b2', {
  scene: 'S5', beat: 2, ord: 2, kind: 'rail',
  source: 'the amendment S5 b2 · the legacy wound, verbatim · the survival-brightness ruling',
  caption: 'Beat 2 · CATTLE arrives and falls — its wound at full voice beneath it, the station dimmed with it. SHELLS holds full brightness: undefeated reads as alive, not blank (the survival-brightness ruling). The claim stays with its carrier.'
}, (st) => {
  rail(st, {
    head: 'shells', cam: frame('cattle', 'shells'),
    st: stAt({ cattle: 'prior', shells: 'alive' }),
    rows: { cattle: { wound: 'latest' } }, claimAt: 'shells'
  });
});

cell('s5-b3', {
  scene: 'S5', beat: 3, ord: 3, kind: 'rail',
  source: 'the amendment S5 b3 · the legacy wound, verbatim',
  caption: 'Beat 3 · SALT falls. The landed wound speaks at full voice; CATTLE’s recedes to the dimmed-prior step (§9.4 rule 10). SHELLS still alive.'
}, (st) => {
  rail(st, {
    head: 'shells', cam: frame('cattle', 'shells'),
    st: stAt({ cattle: 'prior', salt: 'prior', shells: 'alive' }),
    rows: { cattle: { wound: true }, salt: { wound: 'latest' } }, claimAt: 'shells'
  });
});

cell('s5-b4', {
  scene: 'S5', beat: 4, ord: 4, kind: 'rail',
  source: 'the amendment S5 b4 · the legacy wound, verbatim',
  caption: 'Beat 4 · IRON falls. Three wounds on the record, the newest at full voice. SHELLS — the claim’s own carrier — is the one still standing.'
}, (st) => {
  rail(st, {
    head: 'iron', cam: frame('cattle', 'iron', { cap: 1.5 }),
    st: stAt({ ...EARLY_FALLEN, shells: 'alive' }),
    rows: EARLY_WOUNDS('iron'), claimAt: 'shells'
  });
});

cell('s5-b5', {
  scene: 'S5', beat: 5, ord: 5, kind: 'rail',
  source: 'the amendment S5 b5 · the rails law · the metals render at the band’s shared height',
  caption: 'Beat 5 · METALS rises out of the wreckage, at full voice on the band in its render’s own near-16:9 box. The three wounds have all receded — no sentence is being spoken beneath the line; the rising family is the sentence. SHELLS still alive, still carrying the claim.'
}, (st) => {
  rail(st, {
    head: 'metals', cam: S5_CAM_BAND,
    st: stAt({ ...EARLY_FALLEN, shells: 'alive', metals: 'live' }),
    rows: EARLY_WOUNDS(null), claimAt: 'shells'
  });
});

cell('s5-b6', {
  scene: 'S5', beat: 6, ord: 6, kind: 'featured',
  source: 'the amendment S5 b6 · the S5-F3 dated-fact grammar (approved) staged at the SHELLS station · the survival-brightness ruling',
  caption: 'Beat 6 · ZANZIBAR, the featured moment at the SHELLS station. The dated-fact block lands under the shells — place, date, fact, in the approved evidence typography — and the station dims to defeated as its wound lands. This is the frame where the survival-brightness ruling pays: the station that read as alive for five beats goes dark in front of you. Replaces the standalone slide.'
}, (st) => {
  const cam = frame('cattle', 'metals', { cy: 400 });
  rail(st, {
    head: 'metals', cam,
    st: stAt({ ...EARLY_FALLEN, shells: 'prior', metals: 'alive' }),
    rows: EARLY_WOUNDS(null), claimAt: 'shells'
  });
  datedFact(st, SPECIMEN.zanzibar, cam, 'shells', 620);
});

cell('s5-b7', {
  scene: 'S5', beat: 7, ord: 7, kind: 'statement',
  source: 'the amendment S5 b7 · the installed S5 script, verbatim · statement over the receded rail',
  caption: 'Beat 7 · “The function stayed. The carrier changed.” — the act’s thesis over the receded rail. Five bodies have been and gone on the record above; the traveler — the one thing that did not change — rides on at the metals, at its own voice. The shells’ dated defeat has condensed into their wound row.'
}, (st) => {
  rail(st, {
    head: 'metals', cam: frame('cattle', 'metals', { cy: 470 }),
    st: stAt({ ...EARLY_FALLEN, shells: 'prior', metals: 'alive' }),
    rows: { ...EARLY_WOUNDS(null), shells: { wound: true } },
    claimAt: 'metals', recede: 'statement'
  });
  statement(st, 'The function stayed. The carrier changed.', { top: 800 });
});

cell('s5-b8', {
  scene: 'S5', beat: 8, ord: 8, kind: 'statement',
  source: 'the amendment S5 b8 · the installed S5 script, verbatim · the question register (1.03)',
  caption: 'Beat 8 · the exit question, the claim held on the rail. The record stands receded; the traveler holds at full voice — the question is about it.'
}, (st) => {
  rail(st, {
    head: 'metals', cam: frame('cattle', 'metals', { cy: 470 }),
    st: stAt({ ...EARLY_FALLEN, shells: 'prior', metals: 'alive' }),
    rows: { ...EARLY_WOUNDS(null), shells: { wound: true } },
    claimAt: 'metals', recede: 'statement'
  });
  text(st, 'Why did the carrier keep changing?',
    'left:240px; right:240px; top:790px; text-align:center; text-indent:0;' +
    'font-size:64px; font-weight:560; line-height:1.35; letter-spacing:-0.015em; color:#fff;');
});

// =========================================================== SCENE 6 (9)

const S6_STATIONS = stAt({ ...EARLY_FALLEN, shells: 'prior', metals: 'prior', gold: 'live' });
const S6_ROWS = { ...EARLY_WOUNDS(null), shells: { wound: true } };

cell('s6-b1', {
  scene: 'S6', beat: 1, ord: 9, kind: 'rail',
  source: 'the amendment S6 b1 · the regenerated gold render (§1.3) · the strip’s recorded gain, verbatim',
  caption: 'Beat 1 · GOLD arrives — the regenerated render, full voice, in a box of its own near-16:9 aspect at the band’s shared height. SCARCITY IN MATTER lands as its annotation, at the station. The metals recede into the family’s champion; the claim moves to its strongest body yet.'
}, (st) => {
  const cam = frame('cattle', 'gold', { cy: 520 });
  rail(st, { head: 'gold', cam, st: S6_STATIONS, rows: S6_ROWS, claimAt: 'gold' });
  landing(st, 'SCARCITY IN MATTER', cam, 'gold', { y: 790, size: 40, reg: 'caps', a: 0.92 });
});

cell('s6-b2', {
  scene: 'S6', beat: 2, ord: 10, kind: 'seam',
  source: 'the amendment S6 b2–b7 · the approved s6-b2 builder (states.mjs) over the deep-dimmed rail — the legacy table-over-rail treatment',
  caption: 'Beat 2 · the periodic-table overlay enters: the rail recedes to the legacy deep dim and the table rises over it — the approved restored cell’s own builder, unchanged. Beats 3–7 play the elimination exactly as approved (carried byte-identical on this sheet); the rail waits beneath.'
}, (st) => {
  rail(st, {
    head: 'gold', cam: frame('cattle', 'gold'),
    st: S6_STATIONS, rows: S6_ROWS, claimAt: 'gold', recede: 'deep'
  });
  STATE_CELLS['s6-b2'].build(st);
});

// s6-b3 … s6-b7 — CARRIED byte-identical from the approved states sheet (the
// restored elimination, legacy builds 2–6). Registered for the record; the
// capture copies the approved bytes and never re-renders them.
[3, 4, 5, 6, 7].forEach((b, i) => {
  cell(`s6-b${b}`, {
    scene: 'S6', beat: b, ord: 11 + i, kind: 'carried',
    carriedFrom: `review/act-2/states/s6-b${b}.png`,
    source: 'the amendment S6 b2–b7 — the overlay’s interior states, the approved cells unchanged',
    caption: `Beat ${b} · the elimination, wave ${b - 2} of the restored legacy pacing — carried byte-identical from the approved states sheet. The rail holds deep-dimmed beneath the overlay in the film; the approved cell is the overlay’s own content, unchanged.`
  }, () => { throw new Error('carried cell — never re-rendered'); });
});

cell('s6-b8', {
  scene: 'S6', beat: 8, ord: 16, kind: 'rail',
  source: 'the amendment S6 b8 · the installed S6 script, verbatim · the overlay’s return seam',
  caption: 'Beat 8 · the rail returns, GOLD crowned — the overlay’s answer landed. “Hard to create. Hard to destroy.” lands at the station; SCARCITY IN MATTER has settled into gold’s gain row. The claim wears gold.'
}, (st) => {
  const cam = frame('cattle', 'gold', { cy: 520 });
  rail(st, {
    head: 'gold', cam, st: S6_STATIONS,
    rows: { ...S6_ROWS, gold: { gain: true } }, claimAt: 'gold'
  });
  landing(st, 'Hard to create. Hard to destroy.', cam, 'gold', { y: 790, size: 40 });
});

cell('s6-b9', {
  scene: 'S6', beat: 9, ord: 17, kind: 'seam',
  source: 'the amendment S6 b9 · the selected counted load (approved s6-b9 builder) over the deep-dimmed rail',
  caption: 'Beat 9 · the mass-state overlay enters: the rail recedes and the counted load — the presenter’s selected system, the approved builder unchanged — rises over it. Gold’s weakness, weight growing with value.'
}, (st) => {
  rail(st, {
    head: 'gold', cam: frame('cattle', 'gold'),
    st: S6_STATIONS, rows: { ...S6_ROWS, gold: { gain: true } },
    claimAt: 'gold', recede: 'deep'
  });
  STATE_CELLS['s6-b9'].build(st);
});

cell('s6-b9-return', {
  scene: 'S6', beat: 9, ord: 18, kind: 'return',
  source: 'the amendment S6 b9 — “the rail returns carrying it as GOLD’s dependency note” · the strip’s recorded dependency, verbatim',
  caption: 'Beat 9, the return seam · the rail comes back carrying the overlay’s answer: “as value grows, weight grows” lands as GOLD’s dependency note, at full voice — the strip’s own recorded row. The station now shows the whole trade: the gain above, the cost beneath.'
}, (st) => {
  rail(st, {
    head: 'gold', cam: frame('cattle', 'gold'),
    st: S6_STATIONS,
    rows: { ...S6_ROWS, gold: { gain: true, dep: 'latest' } }, claimAt: 'gold'
  });
});

// =========================================================== SCENE 7 (5)

cell('s7-b1', {
  scene: 'S7', beat: 1, ord: 19, kind: 'rail',
  source: 'the amendment S7 b1 · the rail’s own riser note, verbatim · the register’s coinage gap flagged (§4.4)',
  caption: 'Beat 1 · COINAGE arrives. Its annotation is the rail’s own recorded note: “Solves verification and division. Trust required: the mint.” The station’s render is PENDING — no coinage study exists in the register, so the station carries its grammar-glyph stub, exactly as the pipeline stages a missing render; the report flags it. Gold stays alive behind it — undefeated, its trade recorded.'
}, (st) => {
  const cam = frame('cattle', 'coinage', { cy: 520 });
  rail(st, {
    head: 'coinage', cam,
    st: stAt({ ...S6_STATIONS, gold: 'alive', coinage: 'live' }),
    rows: { ...S6_ROWS, gold: { gain: true, dep: true } }, claimAt: 'coinage'
  });
  landing(st, 'Solves verification and division. Trust required: the mint.', cam, 'coinage', { y: 780, size: 36 });
});

cell('s7-b2', {
  scene: 'S7', beat: 2, ord: 20, kind: 'rail',
  source: 'the amendment S7 b2 · the installed S7 script’s own clause as the limit row',
  caption: 'Beat 2 · the fleet problem is spoken over the rail, and the station’s limit is noted beneath COINAGE at full voice: “solves the market stall, not the merchant fleet” — the installed script’s own clause in the wound register. Nothing else moves.'
}, (st) => {
  rail(st, {
    head: 'coinage', cam: frame('cattle', 'coinage'),
    st: stAt({ ...S6_STATIONS, gold: 'alive', coinage: 'live' }),
    rows: { ...S6_ROWS, gold: { gain: true, dep: true }, coinage: { wound: 'latest' } },
    claimAt: 'coinage'
  });
});

cell('s7-b3', {
  scene: 'S7', beat: 3, ord: 21, kind: 'seam',
  source: 'the amendment S7 b3 · the approved photographic vault restage (s7-b4 builder) over the deep-dimmed rail · CLAIM ON GOLD arrives beneath',
  caption: 'Beat 3 · CLAIM ON GOLD arrives on the rail — the certificate render takes its station — and the vault overlay rises over the receded record: the photographic vault holding the gold, the certificate traveled outward, one thin dependency line back. The approved restage, unchanged.'
}, (st) => {
  rail(st, {
    head: 'claim', cam: frame('cattle', 'claim'),
    st: stAt({ ...S6_STATIONS, gold: 'alive', coinage: 'prior', claim: 'live' }),
    rows: { ...S6_ROWS, gold: { gain: true, dep: true }, coinage: { wound: true } },
    claimAt: 'claim', recede: 'deep'
  });
  STATE_CELLS['s7-b4'].build(st);
});

cell('s7-b4', {
  scene: 'S7', beat: 4, ord: 22, kind: 'return',
  source: 'the amendment S7 b4 — “the rail returns; the dependency line persists at the station” · the riser note, verbatim · the service path’s grammar',
  caption: 'Beat 4 · the rail returns, and the overlay’s answer stays drawn on it: the thin dependency line runs from the certificate’s station back to the vaulted gold — the service path’s own grammar — and the station’s note lands: “A claim on gold in a vault. Trust required: the vault.” Coinage dims with its limit; the claim rides its new paper body.'
}, (st) => {
  rail(st, {
    head: 'claim', cam: frame('cattle', 'claim'),
    st: stAt({ ...S6_STATIONS, gold: 'alive', coinage: 'prior', claim: 'live' }),
    rows: {
      ...S6_ROWS, gold: { gain: true, dep: true }, coinage: { wound: true },
      claim: { wound: false } // the note lands as a landing line below; the pair settles at S8
    },
    claimAt: 'claim', depLine: true
  });
  const cam = frame('cattle', 'claim');
  landing(st, 'A claim on gold in a vault. Trust required: the vault.', cam, 'claim', { y: 770, size: 33, w: 960 });
});

cell('s7-b5', {
  scene: 'S7', beat: 5, ord: 23, kind: 'statement',
  source: 'the amendment S7 b5 · the installed S7 script, verbatim — both pairs',
  caption: 'Beat 5 · the trade named honestly, over the receded rail: “The gold stayed. The claim moved.” and “Portability improved. Trust moved to the issuer.” The dependency line still hangs in the record behind the words.'
}, (st) => {
  rail(st, {
    head: 'claim', cam: frame('cattle', 'claim', { cy: 470 }),
    st: stAt({ ...S6_STATIONS, gold: 'alive', coinage: 'prior', claim: 'alive' }),
    rows: { ...S6_ROWS, gold: { gain: true, dep: true }, coinage: { wound: true } },
    claimAt: 'claim', depLine: true, recede: 'statement'
  });
  statement(st, 'The gold stayed. The claim moved.', { top: 690, size: 50 });
  statement(st, 'Portability improved. Trust moved to the issuer.', { top: 790, size: 50 });
});

// =========================================================== SCENE 8 (5)

const S8_STATIONS = stAt({
  ...S6_STATIONS, gold: 'alive', coinage: 'prior', claim: 'alive', ledger: 'live'
});
const S8_ROWS = {
  ...S6_ROWS,
  gold: { gain: true, dep: true },
  coinage: { wound: true },
  claim: { gain: true, dep: true }
};

cell('s8-b1', {
  scene: 'S8', beat: 1, ord: 24, kind: 'rail',
  source: 'the amendment S8 b1 · ledger_glow per its recorded assignment · the annotation at the station',
  caption: 'Beat 1 · LEDGER arrives — the glowing entry, the register’s one 3:2 render, in its own box at the band’s height. MONEY BECAME INFORMATION lands as its annotation. The claim’s paper trade — portability for issuer trust — has settled into the certificate station’s pair; the claim itself dematerializes onto the ledger.'
}, (st) => {
  const cam = frame('cattle', 'ledger', { cy: 520 });
  rail(st, { head: 'ledger', cam, st: S8_STATIONS, rows: S8_ROWS, claimAt: 'ledger' });
  landing(st, 'MONEY BECAME INFORMATION', cam, 'ledger', { y: 780, size: 40, reg: 'caps', a: 0.92 });
});

cell('s8-b2', {
  scene: 'S8', beat: 2, ord: 25, kind: 'rail',
  source: 'the amendment S8 b2 · the legacy severance’s honest strength line, verbatim',
  caption: 'Beat 2 · the honest strengths land at the station: “The most universally accepted medium of exchange in history.” — the legacy’s own sentence, at the ledger, at full voice.'
}, (st) => {
  const cam = frame('cattle', 'ledger', { cy: 520 });
  rail(st, {
    head: 'ledger', cam, st: S8_STATIONS,
    rows: { ...S8_ROWS, ledger: { gain: true } }, claimAt: 'ledger'
  });
  landing(st, 'The most universally accepted medium of exchange in history.', cam, 'ledger', { y: 780, size: 36 });
});

cell('s8-b3', {
  scene: 'S8', beat: 3, ord: 26, kind: 'featured',
  source: 'the amendment S8 b3 · the S5-F3 dated-fact grammar staged at the LEDGER station · the severance decree, verbatim',
  caption: 'Beat 3 · 1971, the featured moment at the LEDGER station — the severance’s decree in the approved dated-fact typography, landed under the station. Gold and its claim dim together: captured, not beaten — the redemption they stood on is cancelled. The ledger reigns alone from here.'
}, (st) => {
  const cam = frame('cattle', 'ledger', { cy: 420 });
  rail(st, {
    head: 'ledger', cam,
    st: stAt({ ...S8_STATIONS, gold: 'prior', claim: 'prior' }),
    rows: { ...S8_ROWS, ledger: { gain: true } }, claimAt: 'ledger'
  });
  datedFact(st, SPECIMEN.severance, cam, 'ledger', 600);
});

cell('s8-b4', {
  scene: 'S8', beat: 4, ord: 27, kind: 'seam',
  source: 'the amendment S8 b4 · the ported four-currency chart (approved s8-b4 builder) over the deep-dimmed rail',
  caption: 'Beat 4 · the chart overlay enters: the rail recedes and the ported severance chart — the frozen data, every draw rule — rises over it, unchanged.'
}, (st) => {
  rail(st, {
    head: 'ledger', cam: frame('cattle', 'ledger'),
    st: stAt({ ...S8_STATIONS, gold: 'prior', claim: 'prior' }),
    rows: { ...S8_ROWS, ledger: { gain: true } },
    claimAt: 'ledger', recede: 'deep'
  });
  STATE_CELLS['s8-b4'].build(st);
});

cell('s8-b4-return', {
  scene: 'S8', beat: 4, ord: 28, kind: 'return',
  source: 'the amendment S8 b4 — “the rail returns with the residue noted” · the strip’s recorded dependency, verbatim',
  caption: 'Beat 4, the return seam · the rail comes back with the residue noted at the LEDGER station: “the window closed” — the strip’s recorded dependency row, at full voice. The chart’s slope has become one line of the record.'
}, (st) => {
  rail(st, {
    head: 'ledger', cam: frame('cattle', 'ledger'),
    st: stAt({ ...S8_STATIONS, gold: 'prior', claim: 'prior' }),
    rows: { ...S8_ROWS, ledger: { gain: true, dep: 'latest' } }, claimAt: 'ledger'
  });
});

cell('s8-b5', {
  scene: 'S8', beat: 5, ord: 29, kind: 'statement',
  source: 'the amendment S8 b5 · the installed S8 script, verbatim',
  caption: 'Beat 5 · the measured wound, over the receded rail: “Extraordinary at moving value. Measurably poor at storing it.”'
}, (st) => {
  rail(st, {
    head: 'ledger', cam: frame('cattle', 'ledger', { cy: 470 }),
    st: stAt({ ...S8_STATIONS, gold: 'prior', claim: 'prior', ledger: 'alive' }),
    rows: { ...S8_ROWS, ledger: { gain: true, dep: true } },
    claimAt: 'ledger', recede: 'statement'
  });
  statement(st, 'Extraordinary at moving value. Measurably poor at storing it.', { top: 720, size: 50 });
});

// =========================================================== SCENE 9 (5)

const S9_STATIONS = stAt({
  ...S6_STATIONS, gold: 'prior', coinage: 'prior', claim: 'prior',
  ledger: 'alive', bitcoin: 'live'
});
const S9_ROWS = {
  ...S6_ROWS,
  gold: { gain: true, dep: true }, coinage: { wound: true },
  claim: { gain: true, dep: true }, ledger: { gain: true, dep: true }
};

cell('s9-b1', {
  scene: 'S9', beat: 1, ord: 30, kind: 'seam',
  source: 'the amendment S9 b1 · the selected network formation (approved s9-b1 builder) over the deep-dimmed rail',
  caption: 'Beat 1 · the network overlay enters: the rail recedes and the hub dissolves into the mesh — the presenter’s selected system, the approved builder unchanged. The return with the answer landed is beat 2: the arrival itself.'
}, (st) => {
  rail(st, {
    head: 'ledger', cam: frame('cattle', 'ledger'),
    st: stAt({ ...S8_STATIONS, gold: 'prior', claim: 'prior', ledger: 'alive' }),
    rows: { ...S8_ROWS, ledger: { gain: true, dep: true } },
    claimAt: 'ledger', recede: 'deep'
  });
  STATE_CELLS['s9-b1'].build(st);
});

cell('s9-b2', {
  scene: 'S9', beat: 2, ord: 31, kind: 'rail',
  source: 'the amendment S9 b2 · the entrant’s facts block, verbatim · the C1 coin render',
  caption: 'Beat 2 · BITCOIN arrives on the rail — the coin render per the C1 ruling, full voice — and the facts land as its entrant annotation, in the deck’s most neutral register. The claim does not move: it still rides the reigning ledger. Description, never argument.'
}, (st) => {
  const cam = frame('cattle', 'bitcoin', { cy: 430 });
  rail(st, { head: 'bitcoin', cam, st: S9_STATIONS, rows: S9_ROWS, claimAt: 'ledger' });
  landing(st, ENTRANT.facts, cam, 'bitcoin', { y: 620, size: 33 });
});

cell('s9-b3', {
  scene: 'S9', beat: 3, ord: 32, kind: 'rail',
  source: 'the amendment S9 b3 · the entrant block’s capabilities, verbatim · §9.4 rule 10',
  caption: 'Beat 3 · the three capabilities that had never coexisted land at the station, each in the caps register at full voice, while the facts recede to the dimmed-prior step.'
}, (st) => {
  const cam = frame('cattle', 'bitcoin', { cy: 430 });
  rail(st, { head: 'bitcoin', cam, st: S9_STATIONS, rows: S9_ROWS, claimAt: 'ledger' });
  landing(st, ENTRANT.facts, cam, 'bitcoin', { y: 590, size: 27, a: 0.42 });
  ENTRANT.capabilities.forEach((copy, i) => {
    landing(st, copy, cam, 'bitcoin', { y: 668 + i * 52, size: 26, reg: 'caps' });
  });
});

cell('s9-b4', {
  scene: 'S9', beat: 4, ord: 33, kind: 'rail',
  source: 'the amendment S9 b4 · the entrant block’s limitation, verbatim — its own advance at full voice',
  caption: 'Beat 4 · the honest line, in the same breath: the limitation takes its own advance at full voice while everything above it recedes — the legacy entrant treatment’s whole point, on the rail.'
}, (st) => {
  const cam = frame('cattle', 'bitcoin', { cy: 430 });
  rail(st, { head: 'bitcoin', cam, st: S9_STATIONS, rows: S9_ROWS, claimAt: 'ledger' });
  ENTRANT.capabilities.forEach((copy, i) => {
    landing(st, copy, cam, 'bitcoin', { y: 590 + i * 44, size: 24, reg: 'caps', a: 0.42 });
  });
  const cam2 = frame('cattle', 'bitcoin', { cy: 430 });
  landing(st, ENTRANT.limitation, cam2, 'bitcoin', { y: 770, size: 27, w: 860 });
});

cell('s9-b5', {
  scene: 'S9', beat: 5, ord: 34, kind: 'statement',
  source: 'the amendment S9 b5 · the approved s9-b5 pair, verbatim',
  caption: 'Beat 5 · the stability distinction, over the receded rail: the market’s valuation of a young asset and the architecture of the claim are two different questions. Volatility is a stage, not a verdict.'
}, (st) => {
  rail(st, {
    head: 'bitcoin', cam: frame('cattle', 'bitcoin', { cy: 430 }),
    st: stAt({ ...S9_STATIONS, bitcoin: 'alive' }),
    rows: { ...S9_ROWS, bitcoin: { gain: true, dep: true } },
    claimAt: 'ledger', recede: 'statement'
  });
  statement(st, 'The market’s valuation of a young asset, and the architecture of the claim, are two different questions.',
    { top: 660, size: 44 });
  statement(st, 'Volatility is a stage, not a verdict.', { top: 830, size: 38, a: 0.72 });
});

// ========================================================== SCENE 10 (5)

const S10_STATIONS = stAt({ ...S9_STATIONS, bitcoin: 'live' });
const S10_ROWS = {
  ...S6_ROWS, coinage: { wound: true },
  gold: { gain: true, dep: true }, claim: { gain: true, dep: true },
  ledger: { gain: true, dep: true }, bitcoin: { gain: true, dep: true }
};

cell('s10-b1', {
  scene: 'S10', beat: 1, ord: 35, kind: 'rail',
  source: 'the amendment S10 b1 — “no second strip: this is the same rail” · the strip’s recorded pairs, verbatim',
  caption: 'Beat 1 · the rail, complete, read again as argument. The gain-and-dependency pairs stand lit at the four architecture stations — the strip’s own recorded rows on the same rail the act has been building since station one. The wounds of the fallen carriers stay beneath them. No second strip exists.'
}, (st) => {
  rail(st, {
    head: 'bitcoin', cam: frame('cattle', 'bitcoin', { cy: 470 }),
    st: S10_STATIONS, rows: S10_ROWS, claimAt: 'ledger'
  });
});

cell('s10-b2', {
  scene: 'S10', beat: 2, ord: 36, kind: 'rail',
  source: 'the amendment S10 b2 · the installed S10 script, verbatim — the line lands on the rail',
  caption: 'Beat 2 · “The history of money is a history of changing trade-offs.” — landed on the complete rail, not over a receded one: the sentence and its evidence share the frame.'
}, (st) => {
  rail(st, {
    head: 'bitcoin', cam: frame('cattle', 'bitcoin', { cy: 470 }),
    st: S10_STATIONS, rows: S10_ROWS, claimAt: 'ledger'
  });
  statement(st, 'The history of money is a history of changing trade-offs.', { top: 780, size: 44 });
});

cell('s10-b3', {
  scene: 'S10', beat: 3, ord: 37, kind: 'seam',
  source: 'the amendment S10 b3 · the ported palladium frame (approved s10-b3 builder) over the deep-dimmed extended rail',
  caption: 'Beat 3 · the palladium overlay, against the extended rail: the record recedes to the deep dim and the ported frame — the hook, the two panels, the real figures — rises over it, unchanged. Beat 4, the insufficiency line, is the approved cell carried byte-identical.'
}, (st) => {
  rail(st, {
    head: 'bitcoin', cam: frame('cattle', 'bitcoin'),
    st: S10_STATIONS, rows: S10_ROWS, claimAt: 'ledger', recede: 'deep'
  });
  STATE_CELLS['s10-b3'].build(st);
});

cell('s10-b4', {
  scene: 'S10', beat: 4, ord: 38, kind: 'carried',
  carriedFrom: 'review/act-2/states/s10-b4.png',
  source: 'the amendment S10 b4 — the insufficiency line inside the approved palladium frame, unchanged',
  caption: 'Beat 4 · THE BAR — “Marginally better is structurally insufficient.” — landing inside the ported palladium frame exactly as approved; carried byte-identical from the states sheet.'
}, () => { throw new Error('carried cell — never re-rendered'); });

cell('s10-b5', {
  scene: 'S10', beat: 5, ord: 39, kind: 'statement',
  source: 'the amendment S10 b5 · the question register (1.03) over the receded rail',
  caption: 'Beat 5 · “Better for what job?” — the pivot that opens Act III, over the receded complete record. The rail has returned beneath the question; the traveler still rides the money the world actually uses.'
}, (st) => {
  rail(st, {
    head: 'bitcoin', cam: frame('cattle', 'bitcoin', { cy: 420 }),
    st: S10_STATIONS, rows: S10_ROWS, claimAt: 'ledger', recede: 'statement'
  });
  text(st, 'Better for what job?',
    'left:240px; right:240px; top:640px; text-align:center; text-indent:0;' +
    'font-size:64px; font-weight:560; line-height:1.35; letter-spacing:-0.015em; color:#fff;');
});

// ---- runtime ---------------------------------------------------------------

export const CELL_IDS = Object.keys(CELLS);

export function buildCell(id) {
  const c = CELLS[id];
  if (!c) throw new Error(`no cell builder for "${id}"`);
  const st = stage();
  c.build(st);
  return id;
}

export function cellMeta() {
  return Object.fromEntries(Object.keys(CELLS).map((id) => {
    const { build, ...meta } = CELLS[id];
    return [id, meta];
  }));
}

export function teardown() {
  const prev = document.getElementById(STAGE_ID);
  if (prev) prev.remove();
  cleanup.forEach((fn) => { try { fn(); } catch { /* torn down with the DOM */ } });
  cleanup = [];
}

export default buildCell;
