// The scratch route's registry — the prototypes `?proto=` can run.
//
// A prototype is an ordinary scene module (`src/scenes/`) listed here while it
// is being judged. Listing it costs the deck nothing: the deck's ordering is
// `src/slides/manifest.js` and only a batch splices a scene into it. When the
// batch lands, the entry leaves this list.
//
// Empty at Stage 0 — no scene is implemented yet. Prototype Gate 1 (the Claim
// Mark contact sheet) and Gate 2 (Scenes 2–4 in this route) are the first
// entries this file will carry; see `docs/synthesis-architecture.md` and
// `docs/batch-a-package.md`.
//
// Each entry is the scene module itself. An optional `protoKey` on a module
// gives it a shorter address than its id (`?proto=claim-mark`); without one,
// its id is its address.
export const prototypes = [];

export default prototypes;
