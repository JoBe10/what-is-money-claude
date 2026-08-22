// The Evolution Rail — the competition record of Section 2, rebuilt from
// scratch for R2 and revised for R2.1 (§C icon grammar, §D fiat + the named
// entrant, §E the contender row that becomes the rail, §F craft rules).
//
// The rail is deliberately the waypoint line’s descendant: the same thin
// horizontal line-language 1.5 drew as method, now carrying the deck’s
// history along it. Stops are minimal circular markers with a monochrome
// glyph and a caps label; defeated stops settle low and keep their one-line
// wound on one shared two-row rhythm (label row, wound row — no staggered
// baselines, §F.2); the abstraction ladder of 2.6 stacks as compact risers
// above the gold stop; the record ends in a dark extension carrying the
// protected `?` and the 2009 entrant — named BITCOIN in stop typography,
// described beneath in the neutral register (§D.1). After the severance the
// paper rung settles as the FIAT marker floating above the line, right of
// GOLD, connected to nothing (§D.2) — every money in the record sits on the
// line; the current one hovers over it.
//
// Contender mode (§E): the four early stops can render as the 2.4 contender
// row — enlarged glyph, label beneath it, full-voice wound, no dots, no
// line. The transformation to rail geometry is transform-only (translate +
// scale per element, camera move, the line drawing through the row), so the
// morph never reflows text mid-gesture.
//
// Architecture: a world layer (all elements at fixed world coordinates)
// viewed through a camera (translate + scale, now including a vertical
// anchor `cy` — the stage y of the rail line, §F.4). The component is
// state-first: `applyState(state, { live })` reconstructs the ENTIRE rail
// from scratch, so any slide build renders its exact frame with no animation
// having run (direct entry, back-navigation, refresh). `live: true` lets the
// camera tween (GSAP) and the CSS state transitions play; otherwise
// everything snaps via the data-snap attribute. Reduced motion always snaps.
//
// Label layout (R2.2 §C.2): every text block lives at its stop’s world x,
// centered under its own stop, and is transformed only by the camera —
// there is no per-viewport re-layout. The clipping rule is carried by the
// FRAMES themselves: every authored camera is composed so that every text
// block it shows sits fully inside the frame with padding (≥28 world px);
// the verification sweep asserts it. Frame-edge padding may compress
// composition spacing, never de-center an individual label under its stop.
//
// Color: the rail is monochrome. The single sanctioned exception is the
// `active` stop state — the deck’s accent, structural, never decorative
// (rebuild brief §9.3). All state lives on this instance; `destroy()` kills
// the camera tween. No module-level caches, no timers.

import { gsap } from 'gsap';
import { glyph } from './glyphs.js';
import { DarkFieldImage } from '../DarkField.js';

// The four contenders can carry a dark-field render as well as their mark
// (§9.4.9, R7.2 §D1). The render is their sensory introduction — these are
// goods people's savings actually lived in — and the mark is their structural
// life on the record. `renders: true` shows the photographs; turning it off at
// the transformation build crossfades each render down into its own glyph as
// the line draws through the row, which is the designed handoff the two-register
// rule sanctions: the moment history abstracts a good into an entry.
//
// Only these four. Metals and gold are categories and summaries on this rail,
// not goods someone held, and the register does not follow them.
//
// The value is the subject key the render is filed under, which is the stop's
// own id everywhere except shells: the R7.3 shoot's cowrie study is
// `cowrie_shells`, because the carrier lineup at 4.06 already holds a `shells`
// study from the first shoot, in landscape, and a row reads as one shoot or it
// reads as none. Two studies of one good, each with a row of its own; the mark
// they both collapse into is the same cowrie either way.
const CONTENDER_RENDERS = {
  cattle: { subject: 'cattle', alt: 'A single ox' },
  salt: { subject: 'salt', alt: 'A block of rock salt' },
  shells: { subject: 'cowrie_shells', alt: 'A cluster of cowrie shells' },
  iron: { subject: 'iron', alt: 'A rough iron bloom' }
};
// World-space box for a contender render, sized so four of them sit across the
// row camera with clear air between and clear of the frame edges. The 4:5 is
// the contender shoot's own aspect: the framing rule in src/dark-field.js
// normalizes a subject against its box, and it can only do that if the box is
// the shape the render arrives in (`object-fit: contain` otherwise letterboxes
// the image first and every measured scale lands short).
const RENDER_W = 150;
const RENDER_H = 188;
// The render's baseline matches the contender glyph's: top -80, 40 tall,
// --glyph-y -12, so the mark's bottom edge sits at world y -52. Sharing the
// baseline is what lets the crossfade read as one object becoming another
// rather than as two things swapping places.
const RENDER_BOTTOM = -52;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ----- World geometry (world px; the rail line is world y = 0) -----

// The stage y the world layer is authored at; FRAMES may override per frame
// via `cy` (the full-rail frame composes the line at ~62% stage height).
const RAIL_STAGE_Y = 640;

const LINE_START = -60;
const LINE_END = 1900;        // the record so far; fades into dark
const EXT_END = 2600;         // the dark extension (2.8)

// Stop order is the contender-row order (§E build 0: CATTLE · SALT ·
// SHELLS · IRON) — the row the viewer watches take its wounds IS the record;
// the transformation drops the line through it without reshuffling anyone.
export const STOP_X = {
  cattle: 170,
  salt: 400,
  shells: 635,
  iron: 870,
  metals: 1210,
  gold: 1620
};

const MINOR_MARKS = [90, 320, 555, 790, 1025];

const ENTRANT_X = 2160;
const QMARK_X = 2440;

// The FIAT mark (§D.2): a fixed float above the line, right of GOLD, with
// no connector down to it.
const FIAT_X = 1800;
const FIAT_Y = -150;

// Named camera frames (cx = world x centered in the viewport, s = zoom,
// cy = stage y of the rail line; 640 unless a frame recomposes the stage).
// Every frame is composed so that every text block it shows sits fully
// inside the viewport with padding — labels stay centered under their
// stops at every camera (R2.2 §C.2), so the frame must make the room.
export const FRAMES = {
  row:       { cx: 520,  s: 1.6,  cy: 560 },
  early:     { cx: 430,  s: 1.42, cy: 640 },
  // The metals frame holds the whole record — all four defeated columns
  // and METALS rising — with no text near a frame edge.
  metals:    { cx: 770,  s: 1.3,  cy: 640 },
  // The gold and severance frames open past the defeated early record:
  // the wound columns sit ~4 world px apart, so no frame edge can fall
  // between them without slicing one — instead the left edge clears the
  // whole IRON column and the chapter frames METALS · GOLD · the ladder
  // (and, severed, the FIAT float). Labels stay centered under their stops;
  // the frame makes the room (the R2.1 clamp drift this replaces).
  gold:      { cx: 1680, s: 1.5,  cy: 640 },
  severance: { cx: 1790, s: 1.3,  cy: 640 },
  full:      { cx: 1270, s: 0.68, cy: 670 }
};

const STOPS = [
  { id: 'cattle', label: 'CATTLE', wound: 'Cannot be divided. Half a cow is no cow.' },
  { id: 'salt',   label: 'SALT',   wound: 'Dissolves in a rainstorm.' },
  { id: 'shells', label: 'SHELLS',
    wound: 'Scarce only until someone reaches the right beach — supply one ship away from collapse.',
    receipt: 'West Africa, 1800s: shiploads of cheaper Zanzibar cowries collapsed the shell rate. Local savings, out-supplied.' },
  { id: 'iron',   label: 'IRON',   wound: 'Rusts. And anyone with a furnace can make more.' },
  { id: 'metals', label: 'METALS', wound: null },
  { id: 'gold',   label: 'GOLD',   wound: 'heavy · hard to verify · dangerous to move' }
];

const RISERS = [
  { id: 'coinage', label: 'COINAGE', note: 'Solves verification and division. Trust required: the mint.' },
  { id: 'paper',   label: 'PAPER',   note: 'A claim on gold in a vault. Trust required: the vault.' }
];

function div(className, cssText = '') {
  const el = document.createElement('div');
  el.className = className;
  if (cssText) el.style.cssText = cssText;
  return el;
}

export function EvolutionRail() {
  const el = div('s2o-rail');
  const world = div('s2o-rail__world');
  world.style.top = `${RAIL_STAGE_Y}px`;
  el.appendChild(world);

  function place(node, x, y = 0) {
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    world.appendChild(node);
    return node;
  }

  // ----- The line -----
  const baseline = div('s2o-rail__line');
  baseline.style.width = `${LINE_END - LINE_START}px`;
  place(baseline, LINE_START, -1);

  const extension = div('s2o-rail__extension');
  extension.style.width = `${EXT_END - LINE_END}px`;
  place(extension, LINE_END, -1);

  MINOR_MARKS.forEach((x) => place(div('s2o-rail__minor'), x - 1, -5));

  // ----- Stops -----
  const stopEls = {};
  STOPS.forEach(({ id, label, wound, receipt }) => {
    const stop = div('s2o-rail__stop');
    stop.dataset.stop = id;

    const g = div('s2o-rail__glyph');
    g.innerHTML = glyph(id, 48);
    stop.appendChild(g);

    // All four renders ship as of R7.3; the component still stubs to the
    // subject's own grammar mark if one is ever missing, so the transformation
    // plays either way.
    if (CONTENDER_RENDERS[id]) {
      const renderBox = div('s2o-rail__render');
      const df = DarkFieldImage({
        name: CONTENDER_RENDERS[id].subject,
        width: RENDER_W,
        height: RENDER_H,
        alt: CONTENDER_RENDERS[id].alt,
        stubSize: 64
      });
      df.el.dataset.visible = 'true';
      renderBox.style.top = `${RENDER_BOTTOM - RENDER_H}px`;
      renderBox.appendChild(df.el);
      stop.appendChild(renderBox);
    }

    stop.appendChild(div('s2o-rail__dot'));

    const labelEl = div('s2o-rail__label');
    labelEl.textContent = label;
    stop.appendChild(labelEl);

    if (wound) {
      const woundEl = div('s2o-rail__wound');
      woundEl.textContent = wound;
      if (id === 'gold') woundEl.classList.add('s2o-rail__wound--traits');
      stop.appendChild(woundEl);
    }
    if (receipt) {
      const receiptEl = div('s2o-rail__receipt');
      receiptEl.textContent = receipt;
      stop.appendChild(receiptEl);
    }

    place(stop, STOP_X[id]);
    stopEls[id] = stop;
  });

  // ----- The abstraction ladder (risers above gold) -----
  // The spine climbs stub → coinage → paper. The severance cut opens at the
  // coinage–paper segment: the paper rung — the claim layer — detaches and
  // settles as the FIAT marker; coinage (a form of the metal itself) stays
  // standing on gold.
  const stub = div('s2o-rail__spine s2o-rail__spine--stub');
  const STUB_TOP = -56;
  stub.style.height = `${-6 - STUB_TOP}px`;
  place(stub, STOP_X.gold - 1, STUB_TOP);

  const ladder = div('s2o-rail__ladder');
  place(ladder, STOP_X.gold, 0);

  function ladderPiece(node, dx, y, riserId) {
    node.style.left = `${dx}px`;
    node.style.top = `${y}px`;
    if (riserId) node.dataset.riser = riserId;
    ladder.appendChild(node);
    return node;
  }

  // Chip centers: coinage -128, paper -222 (chips are 40 tall). The spine
  // segments bridge stub → coinage → paper and reveal with their riser.
  const RISER_GEOM = {
    coinage: { chipTop: -148, spineTop: -108, spineH: 52 },
    paper:   { chipTop: -242, spineTop: -202, spineH: 54 }
  };

  const riserEls = {};
  RISERS.forEach(({ id, label, note }) => {
    const geom = RISER_GEOM[id];

    const spine = ladderPiece(div('s2o-rail__spine'), -1, geom.spineTop, id);
    spine.style.height = `${geom.spineH}px`;

    const chip = ladderPiece(div('s2o-rail__riser'), -80, geom.chipTop, id);
    const chipMark = div('s2o-rail__risermark');
    chipMark.innerHTML = glyph(id, 22);
    chip.appendChild(chipMark);
    const chipLabel = div('s2o-rail__riserlabel');
    chipLabel.textContent = label;
    chip.appendChild(chipLabel);

    const noteEl = ladderPiece(div('s2o-rail__risernote'), 104, geom.chipTop + 4, id);
    noteEl.textContent = note;

    riserEls[id] = { chip, noteEl };
  });

  // ----- FIAT (§D.2): the one stop that does not touch the line -----
  // The rail's visual sentence — glyph + marker + label — holds for every
  // entry, fiat and the entrant included (R2.2 §D): no stop goes unmarked.
  const fiat = div('s2o-rail__fiat');
  const fiatGlyph = div('s2o-rail__glyph');
  fiatGlyph.innerHTML = glyph('fiat', 48);
  fiat.appendChild(fiatGlyph);
  fiat.appendChild(div('s2o-rail__fiatdot'));
  const fiatLabel = div('s2o-rail__fiatlabel');
  fiatLabel.textContent = 'FIAT';
  fiat.appendChild(fiatLabel);
  const fiatLine = div('s2o-rail__fiatline');
  fiatLine.textContent = '1971– : decree.';
  fiat.appendChild(fiatLine);
  place(fiat, FIAT_X, FIAT_Y);

  // ----- The dark end: ?, the named entrant -----
  const qmark = div('s2o-rail__qmark');
  qmark.textContent = '?';
  place(qmark, QMARK_X - 24, -24);

  const entrant = div('s2o-rail__entrant');
  const entrantGlyph = div('s2o-rail__glyph');
  entrantGlyph.innerHTML = glyph('bitcoin', 48);
  entrant.appendChild(entrantGlyph);
  entrant.appendChild(div('s2o-rail__entrantdot'));
  const entrantLabel = div('s2o-rail__entrantlabel');
  entrantLabel.textContent = 'BITCOIN';
  entrant.appendChild(entrantLabel);
  const entrantLine = div('s2o-rail__entrantline');
  entrantLine.textContent = '2009: digital · no state, no company · supply fixed by its own rules.';
  entrant.appendChild(entrantLine);
  const limitation = div('s2o-rail__limitation');
  limitation.textContent =
    'Very young. Its price still swings far more than the monies it would compete with. Not yet twenty years into a hundred-year question.';
  entrant.appendChild(limitation);
  place(entrant, ENTRANT_X);

  // ----- Camera -----
  const cam = { cx: FRAMES.early.cx, s: FRAMES.early.s, cy: FRAMES.early.cy };
  let tween = null;

  function applyCam() {
    world.style.transform =
      `translate(${960 - cam.cx * cam.s}px, ${cam.cy - RAIL_STAGE_Y}px) scale(${cam.s})`;
  }

  function killTween() {
    if (tween) tween.kill();
    tween = null;
  }

  // ----- Full-state reconstruction -----
  //
  // state = {
  //   camera:     { cx, s, cy? } (usually a FRAMES entry),
  //   contenders: boolean — the four early stops in contender-row treatment,
  //   renders:    boolean — the four contenders on the dark-field register
  //               (defaults to `contenders`; set false with contenders true to
  //               hold the row on its marks, or drop both to transform),
  //   line:       boolean (default true) — the baseline + minor marks,
  //   stops:      { cattle: { state, wound, latest }, ... }
  //               state: hidden|upcoming|lit|active|defeated
  //               wound: false|true|'contender'|'receipt' (true = the stop’s
  //               rail-era text: the receipt for shells, the wound otherwise)
  //               latest: true on the ONE stop whose wound line landed on this
  //               build — see the note below
  //   risers:     { coinage, paper },            booleans
  //   severed, fiat, extension, entrant, limitation,   booleans
  //   latest:     '' | 'coinage' | 'paper' | 'entrant' | 'limitation' — the
  //               rail’s non-stop text that landed on this build
  //   dimmed:     false|true|'deep' (chart dim / the table’s heavy dim)
  // }
  //
  // `latest` is the §9.4 rule-10 marker (R7.3). The rail carries several text
  // rows at once — four wounds, two riser notes, the entrant’s description and
  // its limitation — and until now they all sat at one muted tone forever, so a
  // build that landed a sentence rendered it at the same voice as the four that
  // were spoken minutes ago. The rule is that the sentence being spoken is at
  // full brightness and everything before it has receded to the floor, so the
  // rail has to know which row is the current one. It is the caller’s to say,
  // because only the slide knows what its build means.
  function applyState(state, { live = false } = {}) {
    const animate = live && !prefersReducedMotion();
    const camera = {
      cx: state.camera.cx,
      s: state.camera.s,
      cy: state.camera.cy == null ? RAIL_STAGE_Y : state.camera.cy
    };

    killTween();
    if (animate) {
      tween = gsap.to(cam, {
        cx: camera.cx,
        s: camera.s,
        cy: camera.cy,
        duration: 1.7,
        ease: 'power2.inOut',
        onUpdate: applyCam,
        onComplete: () => { tween = null; }
      });
    } else {
      cam.cx = camera.cx;
      cam.s = camera.s;
      cam.cy = camera.cy;
      applyCam();
    }

    // Snap mode suppresses every CSS transition for exact instant
    // reconstruction; a double-rAF restores them once the state has painted.
    if (!animate) {
      el.dataset.snap = 'true';
    }

    el.dataset.contenders = String(Boolean(state.contenders));
    // The register the four contenders speak on this frame. Defaults to
    // whatever `contenders` says, so every existing caller keeps its behavior:
    // the sensory introduction and the contender treatment are the same beats.
    el.dataset.renders = String(state.renders == null
      ? Boolean(state.contenders)
      : Boolean(state.renders));
    el.dataset.line = String(state.line !== false);

    el.dataset.latest = state.latest || '';

    STOPS.forEach(({ id, receipt }) => {
      const conf = (state.stops && state.stops[id]) || { state: 'upcoming', wound: false };
      stopEls[id].dataset.state = conf.state;
      let wound = conf.wound || false;
      if (wound === true) wound = receipt ? 'receipt' : 'wound';
      else if (wound === 'contender') wound = 'wound';
      stopEls[id].dataset.wound = String(wound);
      stopEls[id].dataset.latest = String(Boolean(conf.latest));
    });

    RISERS.forEach(({ id }) => {
      const on = Boolean(state.risers && state.risers[id]);
      riserEls[id].chip.dataset.visible = String(on);
      riserEls[id].noteEl.dataset.visible = String(on);
      ladder.querySelectorAll(`.s2o-rail__spine[data-riser="${id}"]`)
        .forEach((seg) => { seg.dataset.visible = String(on); });
    });

    const anyLadder = Boolean(state.risers && (state.risers.coinage || state.risers.paper));
    stub.dataset.visible = String(anyLadder);

    el.dataset.severed = String(Boolean(state.severed));
    fiat.dataset.visible = String(Boolean(state.fiat));

    extension.dataset.visible = String(Boolean(state.extension));
    qmark.dataset.visible = String(Boolean(state.extension));
    entrant.dataset.visible = String(Boolean(state.entrant));
    limitation.dataset.visible = String(Boolean(state.limitation));

    el.dataset.dimmed = String(state.dimmed === 'deep' ? 'deep' : Boolean(state.dimmed));

    if (!animate) {
      // Force style resolution while snapped, then restore transitions.
      // eslint-disable-next-line no-unused-expressions
      world.offsetHeight;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete el.dataset.snap;
      }));
    }
  }

  function destroy() {
    killTween();
    el.remove();
  }

  applyCam();
  return { el, applyState, destroy };
}

export default EvolutionRail;
