// Act II — the rail-states builders (docs/act-2-rail-states-brief.md §2),
// AMENDED BY THE r2 RULINGS (docs/act-2-rail-r2-brief.md §1, ruled against
// this sheet on 1 September 2026; the record is the staging amendment's r2
// section and AGENTS.md §6).
//
// THE STAGING AMENDMENT, RENDERED (docs/act-2-staging-amendment.md, presenter-
// approved verbatim, 1 September 2026 — master §13). Act II's visual anchor is
// one continuous rail that never fully leaves the screen and extends right as
// history advances. Every settled state of the act's 37 beats renders from ONE
// world model through one camera — one grammar, one rhythm, one scale
// discipline from S5 b1 to S10 b5.
//
// THE SIX r2 RULINGS, AND WHERE EACH ONE LIVES IN THIS FILE:
//
//   r2.1 fill order      X below — narrative order IS spatial order. SHELLS
//                        stands first; the rail fills strictly left to right
//                        and nothing lands to the left of a station already
//                        standing. The legacy STOP_X positions are unchanged;
//                        only which station stands at which stop changes.
//   r2.2 arrival lines   VIRTUE/NOTE below and the `virtue`/`note` row modes —
//                        every station arrives with a line beneath it, always.
//                        Standing = the virtue at the station's own voice, in
//                        the installed script's own words; fallen = the wound
//                        at the dimmed-prior step.
//   r2.3 the claim off   the ClaimObject is gone from this file. No Act II
//                        rail beat carries the traveler; station illumination
//                        and the spoken narrative carry the claim's position.
//   r2.4 the vault       s7-b3/s7-b4 — the standalone vault overlay is retired
//                        to file; CLAIM ON GOLD arrives on the rail, the
//                        dependency line arcs back to GOLD, and the vault line
//                        lands as the featured line at full voice.
//   r2.5 the band box    bandBox() — one shared box, height AND width capped
//                        at 188 world; every render scaled to fit inside it in
//                        a box of its own aspect. One family, one weight.
//   r2.6 the network     s9-b1 — the mesh forms out of the LEDGER station
//                        itself, at the approved geometry, anchored where the
//                        ledger stood.
//
// THE GRAMMAR IS TRANSCRIBED, NOT INVENTED — every value names its source:
//
//   the spine     `EvolutionRail.js` STOP_X verbatim for the six legacy stop
//                 positions; the extension continues at the metals→gold pitch
//                 (410 world px): COINAGE 2030 · CLAIM ON GOLD 2440 ·
//                 LEDGER 2850 · BITCOIN 3260. Which station stands at which
//                 stop is the fill-order ruling's (r2.1).
//   the line      `.s2o-rail__line` — 2px, alpha 0.3, faded ends; minor marks
//                 2×10 at the legacy positions; the head fades into dark at
//                 +280 past the newest station (the legacy's LINE_END − gold).
//   stations      the 12px marker centred ON the line; the label row at +26 in
//                 25px/500/0.16em; the wound/virtue/note rows at +64 and the
//                 dependency row at +146, on the 218px measure at 17px/1.45 —
//                 the rail's own two-row rhythm, identical row heights, no
//                 staggered baselines (icon grammar §4.5). Station dots stay
//                 monochrome as on the approved strip cells.
//   the band      the rails law (AGENTS.md §6) as amended by r2.5: renders
//                 above the line in ONE SHARED BOX, 188 × 188 world, each in a
//                 box of its own aspect scaled to fit inside it, bottom-
//                 aligned on the component's own baseline (−52). GOLD, METALS
//                 and COINAGE take the near-16:9 renders' 1672×941; LEDGER is
//                 `ledger_glow` and BITCOIN the coin per their recorded
//                 assignments. COINAGE's study was ingested at this session
//                 (r2.7) and the station's PENDING stub is gone.
//   brightness    the survival-brightness ruling (AGENTS.md §6): an undefeated
//                 station holds full voice; fallen stations dim with their
//                 wounds — SHELLS reads as alive until Zanzibar lands. §9.4
//                 rule 10 governs the sentences beneath: the latest-landed at
//                 full voice, the prior ones at the dimmed-prior step. The
//                 arrival-line rule (r2.2) governs the standing line, which
//                 rides at its own station's voice and so never competes with
//                 the sentence landing on the beat.
//   overlays      the FIVE remaining interludes (the vault left at r2.4) enter
//                 over the deep-dimmed rail — the legacy table-over-rail
//                 treatment (`.s2o-rail[data-dimmed="deep"]`, opacity 0.08) —
//                 built by THE APPROVED CELLS' OWN BUILDERS imported from
//                 ./states.mjs, so the overlay content cannot drift from what
//                 the presenter approved. Only the seam states render here;
//                 interior overlay states are carried byte-identical.
//   statements    the approved lines over the receded rail (the chart-dim
//                 register, `.s2o-rail[data-dimmed="true"]` 0.16 — lifted to
//                 0.35 here so a still, which has no motion to carry the
//                 recession, keeps the rail readable beneath the line; the
//                 wiring note below).
//   landings      a beat's own sentence lands in the deck's stage registers
//                 (CAPS / STATEMENT / the dated-fact grammar) anchored at its
//                 station; the rail keeps the condensed record in its world
//                 rows afterward — the strip's recorded gain/dependency pairs,
//                 the legacy wounds, the scripts' own virtues, all verbatim.
//
// WIRING, NAMED (the only latitude taken): per-state cameras (computed from
// the amendment's history-so-far rule: every settled frame shows station one
// to the newest arrival), the 0.35 receded voice for stills, the stage-y of
// statement and landing blocks, the clamp that keeps a station-anchored block
// inside the frame, the dependency line's route through the corridor the
// traveler vacated, and the one lit station at the network seam. Each is
// marked WIRING at its call site.

import { DarkFieldImage } from '/src/components/DarkField.js';
import {
  VOICE, dot, text, KICKER, CAPS, STATEMENT, lcg
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

// EvolutionRail's STOP_X verbatim, extended at the metals→gold pitch. THE
// FILL-ORDER RULING (r2.1): narrative order is spatial order, so SHELLS — the
// first carrier the film names — takes the first stop and the others follow in
// the order the story reaches them. The stop POSITIONS are the legacy's,
// unchanged; only the assignment moved.
const X = {
  shells: 170, cattle: 400, salt: 635, iron: 870, metals: 1210, gold: 1620,
  coinage: 2030, claim: 2440, ledger: 2850, bitcoin: 3260
};
const ORDER = ['shells', 'cattle', 'salt', 'iron', 'metals', 'gold',
  'coinage', 'claim', 'ledger', 'bitcoin'];
const MINOR_MARKS = [90, 320, 555, 790, 1025];   // EvolutionRail verbatim
const LINE_START = -60;                           // EvolutionRail verbatim
const HEAD_FADE = 280;                            // LINE_END − STOP_X.gold

// The band (the rails law as amended by r2.5 — equal visual weight): ONE
// SHARED BOX, both axes capped, each render in a box of its own aspect scaled
// to fit inside it. The height cap is EvolutionRail's own RENDER_H; the width
// cap is the icon grid's square live-area normalization, applied to
// photography. Measured, this drops the band's width spread from 2.220× to
// 1.250× — the wide renders stop dominating the tall subjects.
const BAND_W = 188;
const BAND_H = 188;
const BAND_BOTTOM = -52;     // EvolutionRail RENDER_BOTTOM

/** A render's box in world units: contain-fit into BAND_W × BAND_H. */
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
  // Ingested 1 September 2026 (r2.7) — the register's last gap, created by the
  // spine itself, closed by the presenter's study through the standard
  // harness. 1672×941, the near-16:9 family; the PENDING stub is gone.
  coinage: { label: 'COINAGE', subject: 'coinage', ar: 1672 / 941, alt: 'A small stack of ancient hammered coins' },
  claim: { label: 'CLAIM ON GOLD', subject: 'gold_certificate', ar: 1122 / 1402, alt: 'The gold certificate — a claim on gold' },
  ledger: { label: 'LEDGER', subject: 'ledger_glow', ar: 1536 / 1024, alt: 'A glowing ledger entry' },
  bitcoin: { label: 'BITCOIN', subject: 'bitcoin', ar: 1448 / 1086, alt: 'The bitcoin coin' }
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

// THE VIRTUE ROWS (r2.2 — the arrival-line rule). A standing station is never
// blank: it carries its own recorded reason for being money, in the INSTALLED
// S5 SCRIPT'S OWN WORDS (src/scenes/act-2-the-architecture-of-money/
// 05-the-function-stayed.js, notes beats 1 and 5), at its station's own voice.
// Shells' virtue is replaced by the Zanzibar wound the moment it falls; metals
// is never defeated — it is absorbed into its champion — so its virtue stands
// for the rest of the act, which is also the r1 report's flag 8 answered.
const VIRTUE = {
  shells: 'Beautiful. Scarce. Hard to fake.',
  metals: 'Hard to make more of. Slow to decay. Divisible without dying.'
};

// THE STATION NOTES — a landed sentence settled into the rail's own row
// register, the systematic translation the map underdetermined and the r1
// report recorded. CLAIM ON GOLD's beat-3 featured line becomes its standing
// line at b4–b5, until the trade is named at S8 and the pair takes over.
const NOTE = {
  claim: 'A claim on gold in a vault. Trust required: the vault.'
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

// ------------------------------------------------------------------- camera

// world → stage. The camera is {cx, s, cy}: world x `cx` lands at stage 960,
// the rail line (world y 0) at stage `cy` — EvolutionRail's own camera math.
const w2s = (cam, wx, wy = 0) => [960 + (wx - cam.cx) * cam.s, cam.cy + wy * cam.s];

// WIRING: per-state cameras. The amendment's history-so-far rule fixes the
// span (station one to the newest arrival, 210 world px of air past each
// outermost station); the zoom is the fit, capped at 1.6 — the legacy row
// camera's own maximum — and cy composes the stage per state. `rightAir` is
// widened at one state only (the network seam, r2.6), where the mesh anchored
// at the head station needs its own radius of room.
function frame(leftId, rightId, { cap = 1.6, cy = 640, rightAir = 210 } = {}) {
  const L = X[leftId] - 210;
  const R = X[rightId] + rightAir;
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

function svgLayer(st, opacity = 1) {
  const layer = document.createElement('div');
  layer.style.cssText = 'position:absolute; inset:0;';
  const lsvg = document.createElementNS(svgNS, 'svg');
  lsvg.setAttribute('viewBox', '0 0 1920 1080');
  lsvg.setAttribute('width', '1920');
  lsvg.setAttribute('height', '1080');
  lsvg.style.cssText = 'position:absolute; inset:0;';
  layer.appendChild(lsvg);
  layer.style.opacity = String(opacity);
  st.el.appendChild(layer);
  return { el: layer, svg: lsvg };
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
//   rows        { stationId: { virtue?, wound?, note?, gain?, dep? } } — true
//               shows the row at its station's voice; 'latest' at full voice
//               (§9.4 rule 10). `virtue` and `note` are r2.2's arrival lines.
//   recede      'none' | 'statement' | 'deep'
//   depLine     true — S7's dependency line, claim station back to gold
//   lit         a station id that rides OUTSIDE the recession at its own
//               voice, its dot left to the mesh (r2.6, the network seam only)
//   cam         {cx, s, cy}
function rail(st, spec) {
  const cam = spec.cam;
  const L = svgLayer(st, RECEDE[spec.recede || 'none']);
  // WIRING (r2.6): one station may ride outside the recession, so the mesh can
  // be seen forming out of a station that is still lit while the rest of the
  // record recedes. The mechanism is the one the traveler used before it
  // stepped off the rail (r2.3); only its occupant changed.
  const T = spec.lit ? svgLayer(st, 1) : null;

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
    const isLit = spec.lit === id;
    const M = isLit ? T : L;      // the station's mark: render, dot, label

    // The band: the render in a box of its own aspect inside the shared box,
    // bottom-aligned on the band baseline (the rails law, r2.5).
    const [bw, bh] = bandBox(info.ar);
    const w = bw * cam.s;
    const h = bh * cam.s;
    photo(M, {
      subject: info.subject, alt: info.alt, o: v.render,
      box: [sx - w / 2, ly + BAND_BOTTOM * cam.s - h, w, h],
      stubSize: Math.round(96 * cam.s)
    });

    // The lit station's own dot is omitted: the mesh's hub takes its place,
    // which is what "the station's hub dissolves" means on the frame (r2.6).
    if (!isLit) dot(M.svg, sx, ly, v.dotR * cam.s, v.dot);

    const lw = 340 * cam.s;
    text(M, info.label,
      `left:${(sx - lw / 2).toFixed(1)}px; top:${(ly + 26 * cam.s).toFixed(1)}px;` +
      ` width:${lw.toFixed(1)}px; text-align:center; text-indent:0.16em;` + rowLabel(cam.s, v.label));

    const rows = (spec.rows && spec.rows[id]) || {};
    const rw = 218 * cam.s;
    const rowVoice = (mode, base) => (mode === 'latest' ? 1 : base * v.row);
    // The +64 slot holds the station's one standing line: its virtue while it
    // stands, its wound once it falls, its settled note where a landing became
    // the record — or the gain, for the architecture stations. A station never
    // holds two of them at once (r2.2).
    if (rows.virtue) {
      text(L, VIRTUE[id],
        `left:${(sx - rw / 2).toFixed(1)}px; top:${(ly + 64 * cam.s).toFixed(1)}px;` +
        ` width:${rw.toFixed(1)}px; text-align:center; text-indent:0;` +
        rowText(cam.s, rowVoice(rows.virtue, 1)));
    }
    if (rows.wound) {
      text(L, WOUND[id],
        `left:${(sx - rw / 2).toFixed(1)}px; top:${(ly + 64 * cam.s).toFixed(1)}px;` +
        ` width:${rw.toFixed(1)}px; text-align:center; text-indent:0;` +
        rowText(cam.s, rowVoice(rows.wound, 0.58)));
    }
    if (rows.note) {
      text(L, NOTE[id],
        `left:${(sx - rw / 2).toFixed(1)}px; top:${(ly + 64 * cam.s).toFixed(1)}px;` +
        ` width:${rw.toFixed(1)}px; text-align:center; text-indent:0;` +
        rowText(cam.s, rowVoice(rows.note, 0.58)));
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

  // S7's dependency line (r2.4): the certificate still owes the vaulted gold —
  // the service path's own grammar (stroke 1.5 at 0.35, dot terminals 3.5 at
  // 0.7), now drawn ON the rail rather than inside a retired overlay.
  //
  // WIRING — the route. It arcs from the CLAIM ON GOLD station back to the
  // GOLD station through the corridor between the band's baseline (−52) and
  // the rail line (0): the airspace the traveler vacated when the claim
  // stepped off the rail (r2.3). That corridor is what lets the tie clear the
  // COINAGE render standing between the two stations — the r1 route ran at
  // −78…−92, through the band, which was passable only while coinage was a
  // small pending stub and is not now that its study has landed.
  if (spec.depLine) {
    const [cx1, cy1] = w2s(cam, X.claim, BAND_BOTTOM);
    const [gx1, gy1] = w2s(cam, X.gold, BAND_BOTTOM);
    const [, apex] = w2s(cam, 0, -20);
    // Quadratic control placed so the drawn curve peaks at world −20: still
    // clear of the line, still clear of every render's lower edge.
    const ctrlY = 2 * apex - (cy1 + gy1) / 2;
    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', `M ${cx1.toFixed(1)} ${cy1.toFixed(1)} Q ${((cx1 + gx1) / 2).toFixed(1)} ${ctrlY.toFixed(1)} ${gx1.toFixed(1)} ${gy1.toFixed(1)}`);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', `rgba(255,255,255,${VOICE.line})`);
    p.setAttribute('stroke-width', Math.max(1, 1.5 * cam.s));
    p.setAttribute('stroke-linecap', 'round');
    L.svg.appendChild(p);
    dot(L.svg, cx1, cy1, 3.5 * cam.s, VOICE.dot);
    dot(L.svg, gx1, gy1, 3.5 * cam.s, VOICE.dot);
  }

  return L;
}

// ------------------------------------------------------- the network mesh

// THE APPROVED NETWORK FORMATION (`s9-b1-a` — system A, the hub dissolving,
// selected 31 August 2026), its geometry transcribed from systems.mjs
// verbatim: twelve nodes on a ring, the spokes to the centre at 0.2, the
// peer-to-peer chords from the same seeded draw (lcg(0x9F1A), rand() > 0.34
// skipped) at the full line voice, the hub at r 7 / 0.3 and the nodes at
// r 4.5 / 0.8.
//
// r2.6 CHANGES ONLY ITS ORIGIN AND ITS ANCHORING: it forms at the LEDGER
// station's own point on the rail instead of at the middle of the stage, and
// it rides the rail's camera scale, because a thing anchored to the rail is
// drawn at the rail's scale. Nothing about the shape, the draw order, the
// chord set or the voices moved.
const MESH_R = 330;
const MESH_N = 12;
function mesh(st, cx, cy, k) {
  const M = svgLayer(st, 1);
  const R = MESH_R * k;
  const pt = (i) => [cx + R * Math.cos((i / MESH_N) * Math.PI * 2 - Math.PI / 2),
    cy + R * Math.sin((i / MESH_N) * Math.PI * 2 - Math.PI / 2)];
  const stroke = Math.max(1, 1.5 * k);
  const seg = (x1, y1, x2, y2, a) => {
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('x1', x1); l.setAttribute('y1', y1);
    l.setAttribute('x2', x2); l.setAttribute('y2', y2);
    l.setAttribute('stroke', `rgba(255,255,255,${a})`);
    l.setAttribute('stroke-width', stroke);
    l.setAttribute('stroke-linecap', 'round');
    M.svg.appendChild(l);
  };
  for (let i = 0; i < MESH_N; i += 1) {
    const [x, y] = pt(i);
    seg(cx, cy, x, y, 0.2);                  // receding, not gone: the two
  }                                           // weights are the whole argument
  const rand = lcg(0x9F1A);
  for (let i = 0; i < MESH_N; i += 1) {
    for (let j = i + 1; j < MESH_N; j += 1) {
      if (rand() > 0.34) continue;
      const [x1, y1] = pt(i); const [x2, y2] = pt(j);
      seg(x1, y1, x2, y2, VOICE.line);
    }
  }
  dot(M.svg, cx, cy, 7 * k, 0.3);
  for (let i = 0; i < MESH_N; i += 1) {
    const [x, y] = pt(i);
    dot(M.svg, x, y, 4.5 * k, 0.8);
  }
  return M;
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
// (§9.4 rule 10); station voices follow the survival-brightness ruling; the
// standing lines follow the arrival-line rule (r2.2).
const stAt = (obj) => obj;

const EARLY_FALLEN = { cattle: 'prior', salt: 'prior', iron: 'prior' };
const EARLY_WOUNDS = (latest) => ({
  cattle: { wound: latest === 'cattle' ? 'latest' : true },
  salt: { wound: latest === 'salt' ? 'latest' : true },
  iron: { wound: latest === 'iron' ? 'latest' : true }
});
const SHELLS_VIRTUE = { shells: { virtue: true } };
const METALS_VIRTUE = { metals: { virtue: true } };

// =========================================================== SCENE 5 (8)

const S5_CAM_BAND = frame('shells', 'metals');           // s ≈ 1.18

cell('s5-b1', {
  scene: 'S5', beat: 1, ord: 1, kind: 'rail',
  source: 'the amendment S5 b1 · EvolutionRail’s world · the rails law · r2.1 the fill order · r2.2 the arrival line, the installed S5 script verbatim',
  caption: 'Beat 1 · the rail begins, and it begins at the left edge of the record. SHELLS is station one — the first body a claim ever wore — with its render in the band above the line and its virtue beneath it in the script’s own words: “Beautiful. Scarce. Hard to fake.” No station stands blank. The track runs on into darkness to the right: the history has not happened yet.'
}, (st) => {
  rail(st, {
    head: 'shells', cam: frame('shells', 'shells'),
    st: stAt({ shells: 'live' }), rows: { ...SHELLS_VIRTUE }
  });
});

cell('s5-b2', {
  scene: 'S5', beat: 2, ord: 2, kind: 'rail',
  source: 'the amendment S5 b2 · the legacy wound, verbatim · the survival-brightness ruling · r2.1',
  caption: 'Beat 2 · CATTLE arrives to the RIGHT of the shells — the rail fills the way history is written — and falls, its wound at full voice beneath it, the station dimmed with it. SHELLS holds full brightness and its virtue: undefeated reads as alive, not blank.'
}, (st) => {
  rail(st, {
    head: 'cattle', cam: frame('shells', 'cattle'),
    st: stAt({ shells: 'alive', cattle: 'prior' }),
    rows: { ...SHELLS_VIRTUE, cattle: { wound: 'latest' } }
  });
});

cell('s5-b3', {
  scene: 'S5', beat: 3, ord: 3, kind: 'rail',
  source: 'the amendment S5 b3 · the legacy wound, verbatim',
  caption: 'Beat 3 · SALT enters next along the line and falls. Its wound speaks at full voice; CATTLE’s recedes to the dimmed-prior step (§9.4 rule 10). The shells’ virtue holds at its own station’s voice — it is not competing with the sentence that just landed, it is the reason the station is still standing.'
}, (st) => {
  rail(st, {
    head: 'salt', cam: frame('shells', 'salt'),
    st: stAt({ shells: 'alive', cattle: 'prior', salt: 'prior' }),
    rows: { ...SHELLS_VIRTUE, cattle: { wound: true }, salt: { wound: 'latest' } }
  });
});

cell('s5-b4', {
  scene: 'S5', beat: 4, ord: 4, kind: 'rail',
  source: 'the amendment S5 b4 · the legacy wound, verbatim',
  caption: 'Beat 4 · IRON falls. Three wounds on the record, the newest at full voice, and one station at the far left still lit with its virtue intact — SHELLS is the one still standing, and you can read that from the frame alone.'
}, (st) => {
  rail(st, {
    head: 'iron', cam: frame('shells', 'iron', { cap: 1.5 }),
    st: stAt({ shells: 'alive', ...EARLY_FALLEN }),
    rows: { ...SHELLS_VIRTUE, ...EARLY_WOUNDS('iron') }
  });
});

cell('s5-b5', {
  scene: 'S5', beat: 5, ord: 5, kind: 'rail',
  source: 'the amendment S5 b5 · the rails law · the equal-weight band box (r2.5) · r2.2 — the metals virtue, the installed S5 script verbatim',
  caption: 'Beat 5 · METALS rises out of the wreckage at full voice, and arrives with its own line beneath it — “Hard to make more of. Slow to decay. Divisible without dying.” — the script’s own sentence. Its render is near-16:9 and now sits inside the same box as its neighbours: one family, one weight. The three wounds have receded; SHELLS still alive, still lit, still holding its virtue.'
}, (st) => {
  rail(st, {
    head: 'metals', cam: S5_CAM_BAND,
    st: stAt({ shells: 'alive', ...EARLY_FALLEN, metals: 'live' }),
    rows: { ...SHELLS_VIRTUE, ...EARLY_WOUNDS(null), ...METALS_VIRTUE }
  });
});

cell('s5-b6', {
  scene: 'S5', beat: 6, ord: 6, kind: 'featured',
  source: 'the amendment S5 b6 · the S5-F3 dated-fact grammar (approved) staged at the SHELLS station · the survival-brightness ruling · r2.1, r2.2',
  caption: 'Beat 6 · ZANZIBAR, the featured moment, at the far-left SHELLS station — the ruling’s own instruction: the dated fact returns to the station it belongs to, across the whole record the act has built since station one. The virtue is replaced by the wound at the dimmed-prior step, and the station goes dark in front of you. This is the frame where the survival-brightness ruling pays: the station that read as alive for five beats is defeated here.'
}, (st) => {
  const cam = frame('shells', 'metals', { cy: 400 });
  rail(st, {
    head: 'metals', cam,
    st: stAt({ shells: 'prior', ...EARLY_FALLEN, metals: 'alive' }),
    rows: { ...EARLY_WOUNDS(null), shells: { wound: true }, ...METALS_VIRTUE }
  });
  datedFact(st, SPECIMEN.zanzibar, cam, 'shells', 620);
});

cell('s5-b7', {
  scene: 'S5', beat: 7, ord: 7, kind: 'statement',
  source: 'the amendment S5 b7 · the installed S5 script, verbatim · statement over the receded rail',
  caption: 'Beat 7 · “The function stayed. The carrier changed.” — the act’s thesis over the receded rail. Four bodies have been and gone on the record above; the one still standing carries its virtue, and the claim that rode all of them is spoken, not drawn (r2.3 — the traveler has stepped off the Act II rail).'
}, (st) => {
  rail(st, {
    head: 'metals', cam: frame('shells', 'metals', { cy: 470 }),
    st: stAt({ shells: 'prior', ...EARLY_FALLEN, metals: 'alive' }),
    rows: { ...EARLY_WOUNDS(null), shells: { wound: true }, ...METALS_VIRTUE },
    recede: 'statement'
  });
  statement(st, 'The function stayed. The carrier changed.', { top: 800 });
});

cell('s5-b8', {
  scene: 'S5', beat: 8, ord: 8, kind: 'statement',
  source: 'the amendment S5 b8 · the installed S5 script, verbatim · the question register (1.03)',
  caption: 'Beat 8 · the exit question over the receded record: why did the carrier keep changing? Every station on the rail behind it is part of the answer, and the newest one — metals, still undefeated — is where the question points.'
}, (st) => {
  rail(st, {
    head: 'metals', cam: frame('shells', 'metals', { cy: 470 }),
    st: stAt({ shells: 'prior', ...EARLY_FALLEN, metals: 'alive' }),
    rows: { ...EARLY_WOUNDS(null), shells: { wound: true }, ...METALS_VIRTUE },
    recede: 'statement'
  });
  text(st, 'Why did the carrier keep changing?',
    'left:240px; right:240px; top:790px; text-align:center; text-indent:0;' +
    'font-size:64px; font-weight:560; line-height:1.35; letter-spacing:-0.015em; color:#fff;');
});

// =========================================================== SCENE 6 (9)

const S6_STATIONS = stAt({ shells: 'prior', ...EARLY_FALLEN, metals: 'prior', gold: 'live' });
const S6_ROWS = { ...EARLY_WOUNDS(null), shells: { wound: true }, ...METALS_VIRTUE };

cell('s6-b1', {
  scene: 'S6', beat: 1, ord: 9, kind: 'rail',
  source: 'the amendment S6 b1 · the regenerated gold render · the strip’s recorded gain, verbatim · the equal-weight band box (r2.5)',
  caption: 'Beat 1 · GOLD arrives at full voice, in the shared band box at its own near-16:9 aspect — no longer the widest thing on the rail. SCARCITY IN MATTER lands as its annotation, anchored at the station. The metals recede into the family’s champion, keeping their virtue on the record: absorbed, not defeated.'
}, (st) => {
  const cam = frame('shells', 'gold', { cy: 520 });
  rail(st, { head: 'gold', cam, st: S6_STATIONS, rows: S6_ROWS });
  landing(st, 'SCARCITY IN MATTER', cam, 'gold', { y: 790, size: 40, reg: 'caps', a: 0.92 });
});

cell('s6-b2', {
  scene: 'S6', beat: 2, ord: 10, kind: 'seam',
  source: 'the amendment S6 b2–b7 · the approved s6-b2 builder (states.mjs) over the deep-dimmed rail — the legacy table-over-rail treatment',
  caption: 'Beat 2 · the periodic-table overlay enters: the rail recedes to the legacy deep dim and the table rises over it — the approved restored cell’s own builder, unchanged. Beneath it the record now carries gold’s gain, settled from beat 1’s landing. Beats 3–7 play the elimination exactly as approved (carried byte-identical on this sheet).'
}, (st) => {
  rail(st, {
    head: 'gold', cam: frame('shells', 'gold'),
    st: S6_STATIONS, rows: { ...S6_ROWS, gold: { gain: true } }, recede: 'deep'
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
    caption: `Beat ${b} · the elimination, wave ${b - 2} of the restored legacy pacing — carried byte-identical from the approved states sheet. The rail holds deep-dimmed beneath the overlay in the film; the approved cell is the overlay’s own content, unchanged, and no r2 ruling touches it.`
  }, () => { throw new Error('carried cell — never re-rendered'); });
});

cell('s6-b8', {
  scene: 'S6', beat: 8, ord: 16, kind: 'rail',
  source: 'the amendment S6 b8 · the installed S6 script, verbatim · the overlay’s return seam',
  caption: 'Beat 8 · the rail returns, GOLD crowned — the overlay’s answer landed. “Hard to create. Hard to destroy.” lands at the station while SCARCITY IN MATTER holds its place in the record beneath it.'
}, (st) => {
  const cam = frame('shells', 'gold', { cy: 520 });
  rail(st, {
    head: 'gold', cam, st: S6_STATIONS,
    rows: { ...S6_ROWS, gold: { gain: true } }
  });
  landing(st, 'Hard to create. Hard to destroy.', cam, 'gold', { y: 790, size: 40 });
});

cell('s6-b9', {
  scene: 'S6', beat: 9, ord: 17, kind: 'seam',
  source: 'the amendment S6 b9 · the selected counted load (approved s6-b9 builder) over the deep-dimmed rail',
  caption: 'Beat 9 · the mass-state overlay enters: the rail recedes and the counted load — the presenter’s selected system, the approved builder unchanged — rises over it. Gold’s weakness, weight growing with value.'
}, (st) => {
  rail(st, {
    head: 'gold', cam: frame('shells', 'gold'),
    st: S6_STATIONS, rows: { ...S6_ROWS, gold: { gain: true } },
    recede: 'deep'
  });
  STATE_CELLS['s6-b9'].build(st);
});

cell('s6-b9-return', {
  scene: 'S6', beat: 9, ord: 18, kind: 'return',
  source: 'the amendment S6 b9 — “the rail returns carrying it as GOLD’s dependency note” · the strip’s recorded dependency, verbatim',
  caption: 'Beat 9, the return seam · the rail comes back carrying the overlay’s answer: “as value grows, weight grows” lands as GOLD’s dependency note, at full voice — the strip’s own recorded row. The station now shows the whole trade: the gain above, the cost beneath.'
}, (st) => {
  rail(st, {
    head: 'gold', cam: frame('shells', 'gold'),
    st: S6_STATIONS,
    rows: { ...S6_ROWS, gold: { gain: true, dep: 'latest' } }
  });
});

// =========================================================== SCENE 7 (5)

const S7_STATIONS = stAt({ ...S6_STATIONS, gold: 'alive', coinage: 'live' });

cell('s7-b1', {
  scene: 'S7', beat: 1, ord: 19, kind: 'rail',
  source: 'the amendment S7 b1 · the rail’s own riser note, verbatim · the coinage study ingested this session (r2.7)',
  caption: 'Beat 1 · COINAGE arrives, and for the first time the station is photographic: the presenter’s coinage study was gated and ingested this session, so the pending stub the last sheet flagged is gone. Its annotation is the rail’s own recorded note — “Solves verification and division. Trust required: the mint.” Gold stays alive behind it, undefeated, its trade recorded.'
}, (st) => {
  const cam = frame('shells', 'coinage', { cy: 520 });
  rail(st, {
    head: 'coinage', cam, st: S7_STATIONS,
    rows: { ...S6_ROWS, gold: { gain: true, dep: true } }
  });
  landing(st, 'Solves verification and division. Trust required: the mint.', cam, 'coinage', { y: 780, size: 36 });
});

cell('s7-b2', {
  scene: 'S7', beat: 2, ord: 20, kind: 'rail',
  source: 'the amendment S7 b2 · the installed S7 script’s own clause as the limit row',
  caption: 'Beat 2 · the fleet problem is spoken over the rail, and the station’s limit takes its place beneath COINAGE at full voice: “solves the market stall, not the merchant fleet” — the installed script’s own clause in the wound register. Nothing else moves.'
}, (st) => {
  rail(st, {
    head: 'coinage', cam: frame('shells', 'coinage'),
    st: S7_STATIONS,
    rows: { ...S6_ROWS, gold: { gain: true, dep: true }, coinage: { wound: 'latest' } }
  });
});

cell('s7-b3', {
  scene: 'S7', beat: 3, ord: 21, kind: 'rail',
  source: 'the amendment S7 b3 as restaged by r2.4 — the vault overlay retired to file · the certificate render at its station · the service path’s grammar · the featured line at full voice',
  caption: 'Beat 3 · THE VAULT FOLDS INTO THE RAIL. There is no standalone overlay any more: CLAIM ON GOLD arrives as a station, the certificate render takes its place in the band, and one thin dependency line arcs back from it to the GOLD station — through the corridor between the band and the line, the airspace the traveler left when the claim stepped off the rail. “A claim on gold in a vault. Trust required: the vault.” lands as the featured line, at full voice. The gold has not moved; the claim on it has.'
}, (st) => {
  const cam = frame('shells', 'claim', { cy: 520 });
  rail(st, {
    head: 'claim', cam,
    st: stAt({ ...S6_STATIONS, gold: 'alive', coinage: 'prior', claim: 'live' }),
    rows: { ...S6_ROWS, gold: { gain: true, dep: true }, coinage: { wound: true } },
    depLine: true
  });
  landing(st, 'A claim on gold in a vault. Trust required: the vault.', cam, 'claim', { y: 790, size: 36, w: 1040 });
});

cell('s7-b4', {
  scene: 'S7', beat: 4, ord: 22, kind: 'rail',
  source: 'the amendment S7 b4 as restaged by r2.4 — “the dependency line persists at the station” · the landing settled into the rail’s own row register',
  caption: 'Beat 4 · the dependency line persists in the record. The sentence that landed at full voice a beat ago has condensed into the station’s own row — the same words, in the rail’s register, where the record keeps them — and the line still runs back to the gold that has never moved. Coinage holds its limit; the certificate station stands lit.'
}, (st) => {
  rail(st, {
    head: 'claim', cam: frame('shells', 'claim', { cy: 520 }),
    st: stAt({ ...S6_STATIONS, gold: 'alive', coinage: 'prior', claim: 'live' }),
    rows: {
      ...S6_ROWS, gold: { gain: true, dep: true }, coinage: { wound: true },
      claim: { note: 'latest' }
    },
    depLine: true
  });
});

cell('s7-b5', {
  scene: 'S7', beat: 5, ord: 23, kind: 'statement',
  source: 'the amendment S7 b5 · the installed S7 script, verbatim — both pairs',
  caption: 'Beat 5 · the trade named honestly, over the receded rail: “The gold stayed. The claim moved.” and “Portability improved. Trust moved to the issuer.” The dependency line still hangs in the record behind the words — which is why the second sentence is not an opinion.'
}, (st) => {
  rail(st, {
    head: 'claim', cam: frame('shells', 'claim', { cy: 470 }),
    st: stAt({ ...S6_STATIONS, gold: 'alive', coinage: 'prior', claim: 'alive' }),
    rows: {
      ...S6_ROWS, gold: { gain: true, dep: true }, coinage: { wound: true },
      claim: { note: true }
    },
    depLine: true, recede: 'statement'
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
  caption: 'Beat 1 · LEDGER arrives — the glowing entry, in the shared band box at its own 3:2 aspect. MONEY BECAME INFORMATION lands as its annotation. The certificate’s vault note has given way to the named trade: portability bought, issuer trust owed, both now standing in the record as the claim station’s pair.'
}, (st) => {
  const cam = frame('shells', 'ledger', { cy: 520 });
  rail(st, { head: 'ledger', cam, st: S8_STATIONS, rows: S8_ROWS });
  landing(st, 'MONEY BECAME INFORMATION', cam, 'ledger', { y: 780, size: 40, reg: 'caps', a: 0.92 });
});

cell('s8-b2', {
  scene: 'S8', beat: 2, ord: 25, kind: 'rail',
  source: 'the amendment S8 b2 · the legacy severance’s honest strength line, verbatim',
  caption: 'Beat 2 · the honest strengths land at the station: “The most universally accepted medium of exchange in history.” — the legacy’s own sentence, at the ledger, at full voice, with INSTANT TRANSFER settled into the record beneath it.'
}, (st) => {
  const cam = frame('shells', 'ledger', { cy: 520 });
  rail(st, {
    head: 'ledger', cam, st: S8_STATIONS,
    rows: { ...S8_ROWS, ledger: { gain: true } }
  });
  landing(st, 'The most universally accepted medium of exchange in history.', cam, 'ledger', { y: 780, size: 36 });
});

cell('s8-b3', {
  scene: 'S8', beat: 3, ord: 26, kind: 'featured',
  source: 'the amendment S8 b3 · the S5-F3 dated-fact grammar staged at the LEDGER station · the severance decree, verbatim',
  caption: 'Beat 3 · 1971, the featured moment at the LEDGER station — the severance’s decree in the approved dated-fact typography, landed under the station. Gold and its claim dim together: captured, not beaten — the redemption they stood on is cancelled. The ledger reigns alone from here.'
}, (st) => {
  const cam = frame('shells', 'ledger', { cy: 420 });
  rail(st, {
    head: 'ledger', cam,
    st: stAt({ ...S8_STATIONS, gold: 'prior', claim: 'prior' }),
    rows: { ...S8_ROWS, ledger: { gain: true } }
  });
  datedFact(st, SPECIMEN.severance, cam, 'ledger', 600);
});

cell('s8-b4', {
  scene: 'S8', beat: 4, ord: 27, kind: 'seam',
  source: 'the amendment S8 b4 · the ported four-currency chart (approved s8-b4 builder) over the deep-dimmed rail',
  caption: 'Beat 4 · the chart overlay enters: the rail recedes and the ported severance chart — the frozen data, every draw rule — rises over it, unchanged.'
}, (st) => {
  rail(st, {
    head: 'ledger', cam: frame('shells', 'ledger'),
    st: stAt({ ...S8_STATIONS, gold: 'prior', claim: 'prior' }),
    rows: { ...S8_ROWS, ledger: { gain: true } },
    recede: 'deep'
  });
  STATE_CELLS['s8-b4'].build(st);
});

cell('s8-b4-return', {
  scene: 'S8', beat: 4, ord: 28, kind: 'return',
  source: 'the amendment S8 b4 — “the rail returns with the residue noted” · the strip’s recorded dependency, verbatim',
  caption: 'Beat 4, the return seam · the rail comes back with the residue noted at the LEDGER station: “the window closed” — the strip’s recorded dependency row, at full voice. The chart’s slope has become one line of the record.'
}, (st) => {
  rail(st, {
    head: 'ledger', cam: frame('shells', 'ledger'),
    st: stAt({ ...S8_STATIONS, gold: 'prior', claim: 'prior' }),
    rows: { ...S8_ROWS, ledger: { gain: true, dep: 'latest' } }
  });
});

cell('s8-b5', {
  scene: 'S8', beat: 5, ord: 29, kind: 'statement',
  source: 'the amendment S8 b5 · the installed S8 script, verbatim',
  caption: 'Beat 5 · the measured wound, over the receded rail: “Extraordinary at moving value. Measurably poor at storing it.” Both halves of the ledger’s trade now stand in the record beneath it.'
}, (st) => {
  rail(st, {
    head: 'ledger', cam: frame('shells', 'ledger', { cy: 470 }),
    st: stAt({ ...S8_STATIONS, gold: 'prior', claim: 'prior', ledger: 'alive' }),
    rows: { ...S8_ROWS, ledger: { gain: true, dep: true } },
    recede: 'statement'
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
  source: 'the amendment S9 b1 as restaged by r2.6 — the approved s9-b1-a geometry, its origin moved to the LEDGER station · the legacy deep dim for the rest of the record',
  caption: 'Beat 1 · THE MESH FORMS OUT OF THE LEDGER STATION. It is not a diagram arriving from somewhere else: the record recedes to the legacy deep dim, the LEDGER station alone stays lit — the issuer the act has just watched fail — and its hub dissolves into the ring. The approved network system is unchanged in every line, chord and voice; only where it stands has moved. What replaces the issuer is anchored exactly where the issuer was.'
}, (st) => {
  const cam = frame('shells', 'ledger', { cy: 540, rightAir: MESH_R });
  rail(st, {
    head: 'ledger', cam,
    st: stAt({ ...S8_STATIONS, gold: 'prior', claim: 'prior', ledger: 'alive' }),
    rows: { ...S8_ROWS, ledger: { gain: true, dep: true } },
    recede: 'deep', lit: 'ledger'
  });
  const [lx, ly] = w2s(cam, X.ledger, 0);
  mesh(st, lx, ly, cam.s);
});

cell('s9-b2', {
  scene: 'S9', beat: 2, ord: 31, kind: 'rail',
  source: 'the amendment S9 b2 · the entrant’s facts block, verbatim · the C1 coin render',
  caption: 'Beat 2 · the rail returns and BITCOIN takes its station beside the ledger — the coin render per the C1 ruling, at full voice — with the facts landing as its entrant annotation in the deck’s most neutral register. Description, never argument.'
}, (st) => {
  const cam = frame('shells', 'bitcoin', { cy: 430 });
  rail(st, { head: 'bitcoin', cam, st: S9_STATIONS, rows: S9_ROWS });
  landing(st, ENTRANT.facts, cam, 'bitcoin', { y: 620, size: 33 });
});

cell('s9-b3', {
  scene: 'S9', beat: 3, ord: 32, kind: 'rail',
  source: 'the amendment S9 b3 · the entrant block’s capabilities, verbatim · §9.4 rule 10',
  caption: 'Beat 3 · the three capabilities that had never coexisted land at the station, each in the caps register at full voice, while the facts recede to the dimmed-prior step.'
}, (st) => {
  const cam = frame('shells', 'bitcoin', { cy: 430 });
  rail(st, { head: 'bitcoin', cam, st: S9_STATIONS, rows: S9_ROWS });
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
  const cam = frame('shells', 'bitcoin', { cy: 430 });
  rail(st, { head: 'bitcoin', cam, st: S9_STATIONS, rows: S9_ROWS });
  ENTRANT.capabilities.forEach((copy, i) => {
    landing(st, copy, cam, 'bitcoin', { y: 590 + i * 44, size: 24, reg: 'caps', a: 0.42 });
  });
  landing(st, ENTRANT.limitation, cam, 'bitcoin', { y: 770, size: 27, w: 860 });
});

cell('s9-b5', {
  scene: 'S9', beat: 5, ord: 34, kind: 'statement',
  source: 'the amendment S9 b5 · the approved s9-b5 pair, verbatim',
  caption: 'Beat 5 · the stability distinction, over the receded rail: the market’s valuation of a young asset and the architecture of the claim are two different questions. Volatility is a stage, not a verdict.'
}, (st) => {
  rail(st, {
    head: 'bitcoin', cam: frame('shells', 'bitcoin', { cy: 430 }),
    st: stAt({ ...S9_STATIONS, bitcoin: 'alive' }),
    rows: { ...S9_ROWS, bitcoin: { gain: true, dep: true } },
    recede: 'statement'
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
  caption: 'Beat 1 · the rail, complete, read again as argument. The gain-and-dependency pairs stand lit at the four architecture stations — the strip’s own recorded rows on the same rail the act has been building since station one — and every earlier station still says why it entered and how it left. No second strip exists.'
}, (st) => {
  rail(st, {
    head: 'bitcoin', cam: frame('shells', 'bitcoin', { cy: 470 }),
    st: S10_STATIONS, rows: S10_ROWS
  });
});

cell('s10-b2', {
  scene: 'S10', beat: 2, ord: 36, kind: 'rail',
  source: 'the amendment S10 b2 · the installed S10 script, verbatim — the line lands on the rail',
  caption: 'Beat 2 · “The history of money is a history of changing trade-offs.” — landed on the complete rail, not over a receded one: the sentence and its evidence share the frame.'
}, (st) => {
  rail(st, {
    head: 'bitcoin', cam: frame('shells', 'bitcoin', { cy: 470 }),
    st: S10_STATIONS, rows: S10_ROWS
  });
  statement(st, 'The history of money is a history of changing trade-offs.', { top: 780, size: 44 });
});

cell('s10-b3', {
  scene: 'S10', beat: 3, ord: 37, kind: 'seam',
  source: 'the amendment S10 b3 · the ported palladium frame (approved s10-b3 builder) over the deep-dimmed extended rail · placement confirmed as staged (r2.6)',
  caption: 'Beat 3 · the palladium overlay, against the extended rail: the record recedes to the deep dim and the ported frame — the hook, the two panels, the real figures — rises over it, unchanged. Its placement here is confirmed by the r2 rulings; beat 4, the insufficiency line, is the approved cell carried byte-identical.'
}, (st) => {
  rail(st, {
    head: 'bitcoin', cam: frame('shells', 'bitcoin'),
    st: S10_STATIONS, rows: S10_ROWS, recede: 'deep'
  });
  STATE_CELLS['s10-b3'].build(st);
});

cell('s10-b4', {
  scene: 'S10', beat: 4, ord: 38, kind: 'carried',
  carriedFrom: 'review/act-2/states/s10-b4.png',
  source: 'the amendment S10 b4 — the insufficiency line inside the approved palladium frame, unchanged',
  caption: 'Beat 4 · THE BAR — “Marginally better is structurally insufficient.” — landing inside the ported palladium frame exactly as approved; carried byte-identical from the states sheet, and untouched by any r2 ruling.'
}, () => { throw new Error('carried cell — never re-rendered'); });

cell('s10-b5', {
  scene: 'S10', beat: 5, ord: 39, kind: 'statement',
  source: 'the amendment S10 b5 · the question register (1.03) over the receded rail',
  caption: 'Beat 5 · “Better for what job?” — the pivot that opens Act III, over the receded complete record. Ten stations, each with its line beneath it, and one question that none of them has answered yet.'
}, (st) => {
  rail(st, {
    head: 'bitcoin', cam: frame('shells', 'bitcoin', { cy: 420 }),
    st: S10_STATIONS, rows: S10_ROWS, recede: 'statement'
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
