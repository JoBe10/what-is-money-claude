// The dark-field register's asset manifest (§9.4.9, R7.2).
//
// This is the deck's only raster surface, and it is deliberately one module:
// every photographic asset the deck can reach is registered here, so "which
// slides speak the dark-field register" is answerable by reading one file and
// the register audit is a gate rather than a grep across the tree. Nothing in
// `src/` may reference an image by path.
//
// Files are keyed by *subject*, and the key is the same string the icon grammar
// uses for that subject's glyph (`src/components/section-2/glyphs.js`). That is
// the two-register system made literal: `shells` names one thing, which exists
// as a render for its sensory introduction and as a mark for its structural
// life, and the handoff at 2.4 is a crossfade between two lookups of one name.
//
// The glob is eager and Vite-resolved, so an image that has not been generated
// yet is simply absent from the registry — no import to break, no placeholder
// file to remember to delete. `hasDarkField()` is how a slide asks, and
// `DarkFieldImage()` (components/DarkField.js) is how it renders either the
// image or its pending stub. That is what makes the pipeline non-blocking: the
// presenter drops a regenerated render into `assets/dark-field/` and the slide
// that was stubbing it starts showing it, with no code change.
//
// Incoming images are NOT registered. `assets/dark-field/incoming/` is the
// presenter's drop zone; `review/rebuild-r7-2/harness/ingest-r7-2.cjs`
// grade-gates what lands there and moves only the passes across. Off-grade
// imagery never reaches a slide — §9.4.9's outliers-are-regenerated rule is
// enforced by the pipeline, not by discipline.

const modules = import.meta.glob('../assets/dark-field/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
});

// ------------------------------------------------- duplicate-subject assignments
//
// Three subjects hold more than one passing study, on purpose, and the presenter
// ruled on the Batch A register sheet which study serves which scene (25 August
// 2026; docs/dark-field-manifest.md §2.2). There is no assignment field to fill
// here — a key resolves to one file, and which scene calls which key is a
// property of the scenes — so the ruling is recorded where someone choosing
// between two cowries is actually standing:
//
//   cowrie   single_cowrie   P1 morph, centre scale (one object, rhyming with
//                            the sequence's other single forms)
//            shells          Scene 5, the carrier lineup (individual shells stay
//                            legible at lineup scale)
//            cowrie_shells   banked — no current scene
//   ledger   ledger_glow     P1's morph, the ledger form (presenter-ruled
//                            29 August 2026 — the script's line is "it stopped
//                            looking like anything at all"), and Scene 8, the
//                            transformation (the glowing close-up)
//            ledger          the carrier lineup and other display-scale
//                            ledger appearances
//   note     gold_certificate  Scene 7, the claim on gold
//            paper             P1 morph's paper form, generic note appearances
//
// Banked is not deleted. Every passing study stays in the register so a change
// of assignment is a change of the key a scene asks for, never a regeneration.

/** subject key → resolved URL, for every dark-field render present in the tree. */
export const darkField = Object.fromEntries(
  Object.entries(modules).map(([file, url]) => [
    file.replace(/^.*\/([^/]+)\.[a-z]+$/i, '$1'),
    url
  ])
);

// ------------------------------------------------------------------ framing
//
// The grade gate holds the *light* consistent across the register. This holds
// the *framing* consistent, which is the part a viewer notices first: five
// perfectly graded renders in one row still read as five separate shoots if one
// subject fills its frame and the next occupies a third of it. Measured, the
// restored set spans 0.36 to 0.72 of frame width — a two-to-one spread in
// apparent size, which is the old O-07 problem arriving by a different door.
//
// One rule fixes it, and it is the icon grid's rule: every subject's longer
// relative axis is scaled to 88% of its box's matching axis, exactly as the
// 48-unit glyph grid normalizes every mark into a 40-unit live area. The three
// numbers per subject are [scale, dx%, dy%] and they are *measured, not
// eyeballed* — `node review/rebuild-r7-2/harness/grade-r7-2.cjs` prints this
// block, and a regenerated render produces its own row by re-running it. That
// is what makes this a rule rather than the five hand-tuned per-asset
// corrections R7 recorded as never converging.
//
// The offsets re-center a subject whose bounding box is not centered in its
// frame; without them, scaling up walks an off-center subject out of its box.
// They are small on this set (≤ 4.7%), which is the master prompt's "centered
// composition" clause holding.
//
// Assumes the render and its box share an aspect ratio to within a few percent.
// The shipping set is four families and each needs its own box: the 4:3 renders
// of the first shoot (4.04–4.06, and `shells` in the carrier lineup) in 4:3
// boxes, the 4:5 portraits of the R7.3 contender shoot and the Batch A drop in
// the 4:5 box the rail's contender row now uses, `ledger_glow`, the Batch A
// drop's one 3:2 landscape, which needs a 3:2 box (P1's ledger form gives it
// one), and `fiat`, ingested at Batch A, which is 1672×941 — near 16:9, the
// widest frame in the register. `metals`, ingested at the Act II states r2
// session for S5's rail band (the rails law), arrives at the same 1672×941 and
// joins that family. `gold` was REGENERATED by the presenter and re-ingested
// at the rail-states session (1 September 2026) at that same 1672×941, so it
// leaves the first shoot's 4:3 family and joins this one — and every box that
// displays gold derives from the new render's own aspect (the ledger_glow
// precedent): the rail's band boxes and P1's gold-form box (960×540 at 480,
// 380 — 16:9 to within 0.05%). The retired 4:3 study is on file at
// review/act-2/dark-field/gold--retired.png. `coinage`, ingested at the rail
// r2 session (1 September 2026) for the rail's COINAGE station — the last
// station in the register with no study — arrives at that same 1672×941 and
// joins the family too, so the near-16:9 group is now fiat · metals · gold ·
// coinage. The four Act III neutral stage marks — `collectible`, `store`,
// `medium`, `unit`, presenter-generated and ingested 2 September 2026 for the
// ladder's stages and the triad's job marks (the neutral-marks ruling, master
// §13) — join this family as well. `medium` was REPLACED by the presenter the
// same day (Batch C ruling 3: the handshake read as agreement, not exchange;
// the new study is the mid-transfer hand-off) and re-ingested at 842×474 —
// the same near-16:9 aspect at a smaller frame, so its band boxes are
// unchanged; the retired handshake study is on file at
// review/act-3/dark-field/medium--retired.png. The other three stand at
// 1672×941. A box with a materially different aspect would need
// the scale computed against `object-fit: contain`'s actual fit rather than
// against the frame — which is exactly the defect that showed up when the four
// portrait renders first landed in the old landscape box: the rule was applied
// to a fit it did not describe, and the row came out at four different sizes.
//
// FLAGGED (Batch A): every present call site for `fiat` is a 6:5 box —
// ComparisonAssetHeader's 180×150 display box and 96×72 compact box — which is
// a 48% aspect departure, well past "a few percent". Those call sites are Act
// IV/V scenes (Batches D and E) and are out of Batch A's scope; the row above is
// the gate's measured value and stands. The box question goes with the scenes.
const FRAMING = {
  bitcoin: [1.226, 0.3, 1.5],
  cattle: [1.101, -2.1, 3.1],
  coffee_cup: [1.227, -3.1, 13.2],
  coinage: [1.44, 1.1, -1.3],
  collectible: [1.371, 1.4, 1],
  cowrie_shells: [1.13, 1.7, -2.5],
  fiat: [1.127, 0.9, -1.9],
  gold: [1.469, -0.7, -3.5],
  gold_certificate: [1.124, -2.9, -0.9],
  iron: [1.095, -4.5, -7.6],
  ledger: [1.222, -1.6, 1],
  ledger_glow: [1.122, 3.2, -5.7],
  meal: [0.935, -0.8, 2.4],
  medium: [1.287, -1.5, 12.4],
  metals: [1.457, -0.4, -0.4],
  palladium: [1.287, -1.8, 1.5],
  paper: [1.313, 0.8, 2],
  patient: [1.217, 3.4, -5],
  property: [1.226, -1.6, -3.1],
  salt: [1.433, 1.8, 3.1],
  shares: [1.104, -0.1, 0.8],
  shells: [1.422, 0.3, -2.5],
  shoe: [1.222, 1, -4.7],
  single_cowrie: [1.93, 4.4, 3.6],
  store: [1.035, 0.4, 1.6],
  surgeon: [1.005, 6.8, 5.8],
  unit: [1.113, -0.3, -0.5],
  vault: [1.354, -2.4, 5.1],
  wine: [1.029, 0.2, -1.3]
};

/** [scale, dx%, dy%] for a subject — identity if it has no measured row yet. */
export function darkFieldFraming(name) {
  return FRAMING[name] || [1, 0, 0];
}

export function hasDarkField(name) {
  return Object.prototype.hasOwnProperty.call(darkField, name);
}

export function darkFieldUrl(name) {
  return darkField[name] || null;
}

/** Every subject present, sorted — used by the register audit and the contact sheet. */
export function darkFieldSubjects() {
  return Object.keys(darkField).sort();
}

export default darkField;
