// The carrier — a thin-stroke open-form shell in the deck's grammar
// (R7.1 §2, given material presence at R7.2 §C3).
//
// Before R7.1 this was a pair of angular bracket frames with an inner echo, a
// housing drawn in a language nothing else in the deck spoke. R7.1 replaced it
// with the grammar's own construction: two open arcs enclosing the claim, one
// stroke weight, dot terminals, generous negative space between shell and disc.
//
// R7.2's ruling is that the R7.1 shell was *right and insufficient*. Two
// hairlines beside the disc's glow read as a diagram annotation rather than as
// a body — and the argument of 4.05–4.09 is that the claim is put *inside*
// something, which has to be an object the viewer can imagine failing. The old
// faceted capsule had that confidence and paid for it in register. So the shell
// gains weight without leaving the line grammar. Three constructions were
// drawn and judged at shipping scale (review/rebuild-r7-2/carrier-studio/):
//
//   A — the doubled arc.  The R7.1 pair at a heavier stroke with a hairline
//       echo inside each arc. Weight by thickening. It reads as a bolder
//       version of the same annotation: more ink, not more object, and the echo
//       is close enough to the outer stroke to alias into it at 4.05's scale.
//
//   B — the stave ring.   Six short arc segments around the circle, three a
//       side, with narrow gaps. Weight by repetition — a container assembled
//       from parts, visibly openable. It reads as a dial or a loading spinner:
//       the repeated gaps quantize the ring and the eye counts segments instead
//       of seeing an enclosure. It also fights the disc, whose whole identity
//       is that it is continuous.
//
//   C — the banded wall (SELECTED). Each side becomes a band with an inner and
//       an outer wall closed at both ends, so the shell has real thickness —
//       a vessel wall seen edge-on, with an inside and an outside. That is the
//       one construction that answers "material presence" literally instead of
//       decoratively: the carrier is a thing with a wall, the claim sits in the
//       space the wall encloses, and the two openings at top and bottom say the
//       vessel is not sealed. It holds the grammar exactly — one stroke weight,
//       open linework, dot terminals, no fill — and at riser scale the band
//       collapses gracefully into a single heavier arc rather than into mush.
//
// The stroke stays the grammar's 2.5 in every candidate: hierarchy comes from
// silhouette, never from weight (icon grammar §1). C gets its weight from
// construction, which is the grammar's own answer to this problem.
//
// The accent is the color because §9.4.6 says orange marks argument, and the
// carrier is precisely what is under judgment — the claim is never in question,
// only the body chosen to carry it. The glow is tuned deliberately below the
// disc's: the thing being tested must not out-shine the thing being carried.
//
// The left/right split preserves the existing `focus: 'future'` choreography
// motion-for-motion: the trailing side dims, the leading side brightens, and
// the carrier reads as traveling forward through time.

// The grammar's single stroke weight (assets/icons/candidates/candidates.js).
const STROKE = 2.5;
const CX = 120;
const CY = 120;

// One-letter swap, exactly like the icon set's SELECTIONS.
const SELECTION = 'c';

const f = (v) => Number(v.toFixed(2));
const pt = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [f(CX + r * Math.cos(a)), f(CY + r * Math.sin(a))];
};
const arc = (r, a1, a2, sweep = 1) => {
  const [x1, y1] = pt(r, a1);
  const [x2, y2] = pt(r, a2);
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
  return { d: `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`, x1, y1, x2, y2 };
};
const dot = (x, y, r = 1.8) => `<circle class="s4-carrier-shell__terminal" cx="${x}" cy="${y}" r="${r}" />`;

// Each candidate returns { left, right } — the two markup halves the focus
// choreography addresses. Angles are screen-space degrees (y grows downward),
// so 90 is the bottom of the circle and 270 the top.
const CANDIDATES = {
  // A — the doubled arc: R7.1's pair, thickened, with a hairline echo inside.
  a: () => {
    const R = 96;
    const SPAN = 150;
    const side = (mid) => {
      const a1 = mid - SPAN / 2;
      const a2 = mid + SPAN / 2;
      const outer = arc(R, a1, a2);
      const inner = arc(R - 9, a1 + 4, a2 - 4);
      return `
        <path d="${outer.d}" />
        <path class="s4-carrier-shell__echo" d="${inner.d}" />
        ${dot(outer.x1, outer.y1)}${dot(outer.x2, outer.y2)}`;
    };
    return { left: side(180), right: side(0) };
  },

  // B — the stave ring: three segments a side, weight by repetition.
  b: () => {
    const R = 96;
    const SEG = 44;
    const GAP = 14;
    const side = (mid) => {
      const total = SEG * 3 + GAP * 2;
      let a = mid - total / 2;
      let out = '';
      for (let i = 0; i < 3; i += 1) {
        const s = arc(R, a, a + SEG);
        out += `<path d="${s.d}" />${dot(s.x1, s.y1, 1.6)}${dot(s.x2, s.y2, 1.6)}`;
        a += SEG + GAP;
      }
      return out;
    };
    return { left: side(180), right: side(0) };
  },

  // C — the banded wall: an inner and an outer wall, closed at both ends. The
  // shell has thickness, so it is a vessel rather than a mark beside one.
  c: () => {
    const R_OUT = 99;
    const R_IN = 86;
    const SPAN = 152;
    const side = (mid) => {
      const a1 = mid - SPAN / 2;
      const a2 = mid + SPAN / 2;
      const o = arc(R_OUT, a1, a2, 1);
      const i = arc(R_IN, a2, a1, 0);
      // One closed outline: out along the outer wall, across the end cap, back
      // along the inner wall, across the other cap. Stroked, never filled.
      const band = `${o.d} L ${i.x1} ${i.y1} ${i.d.replace(/^M [^A]+/, '')} Z`;
      // No dot terminals: this construction has no stroke ends to punctuate.
      // The band is one closed outline, and the grammar's closed forms — the
      // cowrie, the gable, the parted round — carry no terminals either. The
      // first cut of this candidate put dots at the mid-radius of each end cap;
      // the contact sheet showed them sitting exactly on the cap stroke, where
      // they were invisible at every shipping scale. Invisible ink is worse
      // than absent ink.
      return `<path d="${band}" />`;
    };
    return { left: side(180), right: side(0) };
  }
};

export function CarrierShell({ className = '', candidate = SELECTION } = {}) {
  const el = document.createElement('div');
  el.className = `s4-carrier-shell ${className}`.trim();
  el.dataset.candidate = candidate;
  el.setAttribute('aria-hidden', 'true');

  const build = CANDIDATES[candidate] || CANDIDATES[SELECTION];
  const { left, right } = build();

  el.innerHTML = `
    <svg class="s4-carrier-shell__geometry" viewBox="0 0 240 240" focusable="false"
         stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round">
      <g class="s4-carrier-shell__frame s4-carrier-shell__frame--left">${left}</g>
      <g class="s4-carrier-shell__frame s4-carrier-shell__frame--right">${right}</g>
    </svg>
  `;

  function applyState({ visible = false, focus = 'none' } = {}) {
    el.dataset.visible = String(visible);
    el.dataset.focus = focus;
  }

  function destroy() {
    el.remove();
  }

  applyState();
  return { el, applyState, destroy };
}

export const CARRIER_SHELL_CANDIDATES = Object.keys(CANDIDATES);
export const CARRIER_SHELL_SELECTION = SELECTION;

export default CarrierShell;
