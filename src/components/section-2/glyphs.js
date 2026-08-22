// The WIM glyph set — the Icon Studio selections (R2.2 §D).
// The rules live in docs/icon-grammar.md; the drawings live in
// assets/icons/candidates/candidates.js (three candidate constructions per
// glyph, all on the primitives grammar). This module holds only the
// SELECTIONS — which candidate each surface of the deck renders.
//
// To swap a glyph: change its letter below to 'a' | 'b' | 'c' and reload.
// The contact sheet (review/rebuild-r2/icon-studio/contact-sheet.html and
// its .png captures) shows every candidate at display, rail, and riser
// size on black. No redesign needed — every candidate is already drawn to
// the grammar: 48×48 grid, one 2.5u stroke, round caps and joins, dot
// terminals, open linework, monochrome via currentColor. The luminance
// treatment stays in placement CSS, never in the drawing.
//
// One drawing per good, shared by every surface that shows it (the
// traveling goods of 2.1–2.2, the contender row, the Evolution Rail stops,
// the riser marks, the FIAT float, and the BITCOIN entrant), so a good is
// recognizably the same object wherever it appears.

import { CANDIDATES, STROKE } from '../../../assets/icons/candidates/candidates.js';

// The R2.2 studio selections, one line of rationale each (full record in
// docs/r2-report.md §R2.2):
const SELECTIONS = {
  fish:    'b',  // the ichthys — one two-arc stroke, ancient carved provenance, cleanest 22px silhouette
  grain:   'a',  // the kernel arcs — reads as a wheat ear at every size; dots carry the terminal language
  sandals: 'a',  // the outsole and thong — the only construction still "sandal" at rail size
  cattle:  'a',  // the lyre head — the silhouette is the animal; the alternatives drift skull / smiley
  salt:    'b',  // the heap — the measured pile with falling grain dots; true to the traded good, no false depth
  shells:  'a',  // the cowrie — the money shell precisely; aperture alone loses the shell, scallop is generic
  iron:    'a',  // the flat ingot — the family trapezoid face-on; the Mars mark reads as a gender sign today
  metals:  'a',  // the stack — instantly bullion; iron’s trapezoid stacked two-and-one, the explicit family
  gold:    'b',  // the sun mark — gold’s own ancient sign; a centration dot, not a stamp, so coinage keeps the stamp
  coinage: 'a',  // the incuse square — the first mint mark in the record; survives the 22px riser scale
  paper:   'c',  // the counterfoil — the tear names the claim: a note cut from a ledger stub, no app-icon rectangle
  fiat:    'a',  // the severed tether — the note floating over its own cut anchor, the severance drawn in
  bitcoin: 'a',  // the struck ₿ — the universal mark whole, in the set’s stroke and dot terminals

  // The R3 studio selections (Section 3: functions, stages, the Argentina
  // triad, palladium, and the ladder/layer marks — full record in
  // docs/r3-report.md):
  'through-time':   'a',  // the hourglass — time’s own instrument with the set’s grain dots falling through; the vessel read as a wine glass, the arc as a cloche
  'between-people': 'b',  // the two figures — the only construction that says "people" at every size; the arcs read as an eye at rail scale
  measure:          'b',  // the graduated rule — the script’s own metaphor, the measuring stick itself; the dividers closed into a triangle
  collectible:      'c',  // the cut stone — the scarce, interesting object, instant at 22px; the strung beads read as a smile
  palladium:        'a',  // the Pallas mark — the sign the metal was named for in 1803; the glyph carries the beat’s own date, as gold carries its ancient sign
  brick:            'a',  // the coursing — instantly brickwork in pure line; the floor-by-floor draft read as a ladder, a collision this section cannot afford

  // RETIRED AT R7.3 (presenter ruling, §5.2) — no surface renders these two.
  // 3.2 was the only caller, and on that frame the two currencies rendered as
  // the same drawing: the dollar and the peso share the `$` sign, and the row
  // exists to say these are three different goods. The peso’s way out — the sol
  // de mayo — was a second sun two slides after gold’s. Both currencies are now
  // set in the deck’s label register (`USD`, `ARS`), which names them exactly
  // and cannot collide. The drawings and the selections stay recorded so the
  // studio history and the one-letter swap survive.
  dollar:           'a',  // the struck $ — the universal mark whole, one through-struck stem, the bitcoin selection’s exact rationale
  peso:             'a',  // the sol de mayo — the sun from Argentina’s own 1813 coinage; rays and an open center keep it clear of gold’s sun mark

  // RETIRED AT R3.1 — no surface renders these two. Both were sound
  // drawings that proved unreadable in place (icon grammar §1, the
  // legibility rule): at 30px straddling the ladder’s sloped line the arch
  // read as an ambiguous half-dot, and the jog hanging between two tower
  // chips read as a stray glyph rather than a tether. The ladder now uses a
  // threshold tick and the tower a plain hairline link — geometry instead
  // of iconography. The selections stay recorded so the studio history and
  // the one-letter swap survive; re-placing either needs a legibility read
  // at the shipping surface first.
  gate:             'b',  // the arch — passage drawn as a doorway over the climb line; the gateposts read as a pause mark
  tie:              'b',  // the counterfoil jog — the tether carrying the paper family’s tear: the link that is a redeemable slip

  // The R7 studio selections (Section 4: the comparison set’s two productive
  // assets, and the ledger the claim/carrier lineage needs — full record in
  // docs/r7-report.md). Gold, fiat and bitcoin are the anchors and are reused
  // above unchanged, so the rail’s gold and the table’s gold are one mark.
  'real-estate':    'a',  // the gable — the building as its own silhouette; the elevation mushes at riser size and the plot reads as a picture frame
  shares:           'a',  // the parted round — a fraction lifted out of the whole; the divided round is the Mercedes mark and the stacked slips are a copy icon
  ledger:           'a',  // the ruled book — the account book open on its spine; the tally column reads as a bar chart and the double entry needs a legend

  // The R7.1 studio selections (Section 4's derivation scene, where these
  // replace photographs — full record in docs/r7-1-report.md). Standing in for
  // a photograph is a heavier burden than the Section 2 goods carry: the mark
  // has to name the thing with no caption helping it.
  operation:        'a',  // the steadying pulse — the value delivered, not the procedure: a rhythm that starts irregular and settles. Second studio round; the first three all drew the operation and the best still read as a comb. The mending arc reads as a plain arch (its closed break is invisible) and the settled interval is a bar chart, which the grammar already rejected once at the ledger's tally column
  shoe:             'b',  // the head-on last — symmetry and lace rungs carry it; the profile read as a wedge and the print reads as a foot, not footwear (both re-cut once and still failed)
  meal:             'b',  // the plate and cover — the cloche is the oldest unambiguous sign for a served meal; the cut reads as a blob and the fork-and-cut as cutlery beside an egg
  wine:             'a'   // the glass — bowl, stem, foot; the bottle's neck terminals read as antennae and the amphora reads as an urn
};

export function glyph(name, size = 48) {
  const sel = SELECTIONS[name];
  const c = sel && CANDIDATES[name] && CANDIDATES[name][sel];
  if (!c) return '';
  return `<svg viewBox="0 0 48 48" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${c.body}</svg>`;
}

export default glyph;
