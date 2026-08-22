// The featured-render moment (R7.3 §7) — a FLAGGED CANDIDATE, off by default.
//
// The pattern the brief asks for is "close-up + schematic": at the rail's two
// arrival moments — METALS rising out of the wreckage, and GOLD taking the
// crown — a display-scale dark-field render appears *above* the rail as the
// sensory beat, while the stop below keeps its glyph and the record stays a
// record. Then it recedes as the camera moves on. The line itself never carries
// a photograph, which is the rule that makes this legal at all: the render is a
// cutaway over the diagram, not an entry on it.
//
// So it lives in the slide's overlay in stage coordinates, not in the rail's
// world layer. That is the whole architectural point. A render placed inside
// `.s2o-rail` would travel with the camera and would *be* on the diagram —
// §9.4.9's containment rule and the register audit's rail assertion would both
// be right to fail it. Here the schematic is one layer and the close-up is
// another, and the slide composes them.
//
// GOLD ONLY, for now. The brief says "a metals study if provided, else gold
// only", and no metals render exists: METALS is a category, and the deck has
// never had a photograph of one. The metals slot is implemented and dormant —
// `RailFeature` returns null for a subject with no graded render, so dropping
// `metals.png` into assets/dark-field/ lights the second moment with no code
// change, exactly as every other subject in the register works. It does not
// stub to a glyph: the stop already shows that glyph, and two copies of one
// mark stacked vertically is not a sensory beat.
//
// Ruling: the presenter's. Flipping RAIL_FEATURE is the whole change; both
// states are screenshotted in review/rebuild-r7-3/screenshots/.

import { DarkFieldImage } from '../DarkField.js';
import { hasDarkField } from '../../dark-field.js';

/** The single toggle governing both arrival moments (R7.3 §7). */
export const RAIL_FEATURE = false;

// Display scale: big enough to be a sensory moment rather than an inset, small
// enough to leave the stop, its label and the frame's air alone. 4:3 is the
// first shoot's aspect, which is what `gold` is.
export const FEATURE_W = 400;
export const FEATURE_H = 300;

const SUBJECTS = {
  metals: 'A stack of rough metal ingots',
  gold: 'A cast gold bar'
};

/**
 * The close-up over a rail stop, or null if that subject has no graded render.
 *
 * @param {string} subject  dark-field subject key (a rail stop's own id)
 * @param {number} x        stage x to center on — the stop's own stage x, which
 *                          the slide computes from the camera it is holding
 * @param {number} bottom   stage y of the render's lower edge, above the rail
 */
export function RailFeature({ subject, x, bottom = 500 } = {}) {
  if (!hasDarkField(subject)) return null;

  const el = document.createElement('div');
  el.className = 's2o-railfeature';
  el.dataset.subject = subject;
  el.dataset.visible = 'false';
  el.style.left = `${Math.round(x - FEATURE_W / 2)}px`;
  el.style.top = `${Math.round(bottom - FEATURE_H)}px`;

  const df = DarkFieldImage({
    name: subject,
    width: FEATURE_W,
    height: FEATURE_H,
    alt: SUBJECTS[subject] || subject
  });
  df.el.dataset.visible = 'true';
  el.appendChild(df.el);

  return el;
}

export default RailFeature;
