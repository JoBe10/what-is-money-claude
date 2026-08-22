// The dark-field register's one render path (§9.4.9, R7.2).
//
// Every photographic beat in the deck goes through this component, for the same
// reason every claim goes through LuminousDisc: one surface means one look. It
// does three things a raw <img> could not.
//
// 1. It is the pending stub. A subject whose render has not been generated yet
//    renders its grammar glyph instead, marked `data-pending="true"` and listed
//    in docs/dark-field-manifest.md — so a slide is built once, against the
//    beat, and starts showing photography the moment the file lands. The
//    alternative (block the slide until the image exists) would have made this
//    session's Section 2 work impossible and left the beat unbuilt.
//
// 2. It carries the register marker. Everything it produces is `.df-image` or
//    `.df-stub`, which is what the register audit counts: no `.df-image` may
//    exist inside a slide whose root declares `data-register="line"`, and none
//    may exist inside a structural diagram at all.
//
// 3. It composites for a black stage. The renders are graded to a pure black
//    ground (the gate proves it), so they need no vignette, no mask and no
//    rounded corner — the image simply *is* the frame, and `object-fit:
//    contain` keeps the subject's proportions at whatever box the slide gives
//    it. Nothing here adds chrome to a photograph; the grade did that work
//    upstream, which is the whole point of gating it.
//
// The subject key is shared with the icon grammar, so `DarkFieldImage({ name:
// 'shells' })` and `glyph('shells')` are two registers of one thing.

import { hasDarkField, darkFieldUrl, darkFieldFraming } from '../dark-field.js';
import { glyph } from './section-2/glyphs.js';

// Subjects whose grammar mark is filed under a different name than the render.
// `cowrie_shells` is the contender row's shells — the R7.3 shoot's portrait of
// the same subject the carrier lineup shows in its own 4:3 study. One good, two
// studies, one mark: the row that introduces cowries and the row that compares
// carriers are each internally one shoot, and both collapse to `shells`.
const STUB_GLYPH = {
  surgeon: 'operation',
  cowrie_shells: 'shells',
  property: 'real-estate'
};

/**
 * A dark-field render, or its grammar glyph if the render is not present yet.
 *
 * @param {string} name     subject key — the same key the glyph set uses
 * @param {number} width    box width on the 1920×1080 stage
 * @param {number} height   box height on the stage
 * @param {string} alt      accessible description of the subject
 * @param {number} stubSize glyph size used when the render is pending
 */
export function DarkFieldImage({
  name,
  width,
  height,
  alt = '',
  className = '',
  stubSize = Math.round(Math.min(width, height) * 0.5)
} = {}) {
  const el = document.createElement('div');
  el.className = `df ${className}`.trim();
  el.dataset.subject = name;
  el.style.setProperty('--df-w', `${width}px`);
  el.style.setProperty('--df-h', `${height}px`);

  const present = hasDarkField(name);
  el.dataset.pending = String(!present);

  if (present) {
    const img = document.createElement('img');
    img.className = 'df-image';
    img.src = darkFieldUrl(name);
    img.alt = alt;
    img.draggable = false;
    // The measured framing normalization (src/dark-field.js FRAMING): every
    // subject lands at the same relative size in its box, so a row of renders
    // reads as one shoot. The surplus black margin is clipped by .df's
    // overflow, which costs nothing — it is the same black as the stage.
    const [scale, dx, dy] = darkFieldFraming(name);
    img.style.setProperty('--df-scale', String(scale));
    img.style.setProperty('--df-dx', `${dx}%`);
    img.style.setProperty('--df-dy', `${dy}%`);
    el.appendChild(img);
  } else {
    // DARK-FIELD PENDING — the render for this subject is listed in
    // docs/dark-field-manifest.md and has not been generated yet. The grammar
    // mark stands in so the beat is complete and the choreography is real;
    // dropping the graded render into assets/dark-field/ replaces it with no
    // code change.
    const stub = document.createElement('div');
    stub.className = 'df-stub';
    stub.setAttribute('role', 'img');
    stub.setAttribute('aria-label', alt || name);
    stub.innerHTML = glyph(STUB_GLYPH[name] || name, stubSize);
    el.appendChild(stub);
  }

  return { el, present };
}

export default DarkFieldImage;
