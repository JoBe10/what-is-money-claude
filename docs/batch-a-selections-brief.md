# Batch A — Selection-Application Session Brief
## Record the Gate 1 ruling · apply the frame verdicts · regrade the patient · record the register assignments

**Mode: FAST.** Scoped verification only — target well under an hour.
**Model: Opus 5, max effort. Fresh CLI session.**
**Branch:** `film-rebuild`. **Prior tag:** `batch-a-frames`. **Tag on completion:** `batch-a-selections`.
**First step:** commit this brief as `docs/batch-a-selections-brief.md` if it is not already in the repository.
**Standing law applies in full:** commit granularity (AGENTS.md §4.1), the aesthetic law (§4.3), the no-invention rule (§4.4), FAST-mode obligations (§14.0). Read `docs/synthesis-architecture.md`, `docs/what-is-money-master.md` §5–§6, `docs/dark-field-manifest.md`, and `docs/batch-a-frames-report.md` before editing anything.

---

# 1. The presenter's rulings (25 August 2026 — record verbatim, implement exactly)

These rulings were given in chat and are the authority for this session. Nothing here is a session choice.

1. **Prototype Gate 1 — the Claim Mark is candidate A**, the current ClaimObject luminous disc, verbatim. Because A is the existing disc, the hours-field unit style already rhymes with it: **no unit-style tuning and no P1-F1 re-render.**
2. **S2-F1 — the photographic patient wins** (`s2-f1-photo` over `s2-f1-mark`).
3. **S3-F1 — compositional attempt 2** (the birth in the scene: surgeon photograph left, patient right, the mark forming mid-path), **with the patient as a photograph, not the line glyph** — consistent with the S2-F1 ruling. This is the only frame whose composition changes.
4. **P2-F1 — the plain variant** (the mercy line alone on black; the hours-field ghost is retired for this frame). Rationale on record: at ~3–4% luminance the ghost is imperceptible on ordinary displays and will not survive YouTube compression; brighter would compete with the line.
5. **All other frames are approved as rendered:** P1-F1, P1-F2, P1-F3, S2-F2, S3-F2 (candidate-A variant), S4-F1, S4-F2 (candidate-A variant).
6. **The S4-F1 wine-edge observation is waved off** — presenter-accepted judgment; within the gate; no action.
7. **The patient render: regrade first.** Attempt the corner regrade; fall back to presenter regeneration only if the regrade cannot pass without visibly damaging the subject (see §3).
8. **Duplicate-subject scene assignments** — proposed by Claude in chat, approved by the presenter with veto reserved; record as rulings (see §4).

# 2. Task 1 — record the Gate 1 selection

- Set `CLAIM_MARK_SELECTION = 'A'` in `src/proto/claim-mark.js`.
- All three candidates remain on file behind the API, per the aesthetic law: a future change of selection must remain a one-letter change.
- Commit separately.

# 3. Task 2 — the patient regrade

The `patient` render is held in `assets/dark-field/incoming/` — top-left corner luminance 64.73 against the gate's limit of 6, because the key light's shaft is in frame. This is the surgeon's failure class from R7.2, which was fixed by a corner regrade.

- Apply the same class of fix: burn the offending corner region down to stage black with a soft falloff that does not visibly clip the subject or the light's falloff **on the subject**.
- Re-run the grade gate on the regraded image. On pass, ingest via the standard harness (`ingest-r7-2.cjs`); the image moves into the shipping set and `src/dark-field.js` gets its measured framing row.
- **Stop condition (no-invention rule):** if the regrade cannot pass all five clauses without visible damage to the image, do not ship a compromised version and do not widen the gate. Leave the render held, restore the pre-session state of the incoming file, and flag in the report that regeneration from manifest §5.7 is needed from the presenter.
- File this session's gate runs under `review/frames-a/harness/` (the R7.3 `--out` amendment); do not overwrite R7.2's evidence file.

# 4. Task 3 — record the duplicate-subject scene assignments

Record in `docs/dark-field-manifest.md` and, where the code carries assignment metadata, in `src/dark-field.js`. Every non-assigned passing study **stays in the library, banked** — nothing is deleted.

| Subject | Assigned study | Serves |
|---|---|---|
| Cowrie | `single_cowrie` | P1 morph, center scale (generated for it: one object, rhyming with the sequence's other single forms) |
| Cowrie | `shells` | Scene 5 carrier lineup (individual shells stay legible at lineup scale) |
| Cowrie | `cowrie_shells` | Banked — no current scene |
| Ledger | `ledger_glow` | Scene 8, the transformation (the glowing close-up it was generated for) |
| Ledger | `ledger` | Carrier-lineup and other display-scale ledger appearances |
| Note | `gold_certificate` | Scene 7, the claim on gold |
| Note | `paper` | P1 morph's paper form and generic note appearances |

- The pre-existing **`fiat` gap is unchanged**: still missing, still flagged (manifest §3.0). The gold-certificate distinctness check remains pending until `fiat` lands. Do not attempt to close either flag in this session.

# 5. Task 4 — re-render the two changed frames only

Re-render, at the same 1920×1080 standard, with real assets and the deck's real type:

1. **S2-F1 final** — the photographic-patient composition, now pulling `patient` from the **shipping library** (post-ingest), with the HELD annotation removed. If Task 2 hit the stop condition, this re-render is blocked: leave the existing preview still in place and flag it.
2. **S3-F1 final** — attempt 2's composition with candidate A as the mark and the patient glyph replaced by the photographic patient, matching S2-F1's treatment and the register's grade. Same blocking rule as above.

Then:

- Update `review/frames-a/frames/frames.json` and re-cut the batch contact sheet so it shows the approved set: the two new finals plus the seven approved frames, P2-F1 in its plain variant.
- **Keep every prior still on file** — all attempts, all candidates, both P2-F1 variants, both S2-F1 options. The aesthetic law's file-keeping clause applies: a selection is changed by changing a reference, never by re-rendering from nothing.
- No other frame is touched. P1-F1 explicitly does not re-render (ruling 1).

# 6. Task 5 — documentation sync

Same-session, per the documentation currency rule:

- `docs/dark-field-manifest.md`: the patient outcome (regraded-and-ingested, or still held), the assignment table, the unchanged fiat flag.
- Append a short **selections record** to `docs/batch-a-frames-report.md` (or a sibling `docs/batch-a-selections-report.md` if cleaner): the eight rulings of §1, dated, so the approval trail lives in the repository and not only in chat.
- No change to `docs/synthesis-architecture.md` or the master's freeze register — these are craft selections, not structural amendments.

# 7. Verification (FAST scope)

- Grade gate: the regraded `patient` individually, then the full shipping set (expect all passing).
- `npm run build` clean.
- Deck boot smoke (dev server on a port that does not collide with the presenter's 5173): slide count unchanged, 0 console errors.
- Capture and visually review only the two re-rendered frames and the re-cut contact sheet.
- No deck-wide suites, no traversal matrix, no register/brightness audits — no scene or engine file changes in this session.
- **Do not report success for checks not actually run. Name the mode in the report.**

# 8. Out of scope — explicitly

- No scene implementation, no animation, no motion of any kind. Prototype Gate 2 (Scenes 2–4 in the `?proto=` scratch route) is the next session, on Fable 5 at top effort, and starts only after this session's tag is cut.
- No manifest splicing, no legacy-slide deletion, no engine changes.
- No new renders beyond the two frame re-renders; no attempt to generate the missing `fiat` or a replacement `patient`.

# 9. Definition of done

1. `CLAIM_MARK_SELECTION` is `'A'`.
2. The patient is regraded, gated, and ingested — or held with the stop condition cleanly reported.
3. S2-F1 and S3-F1 finals are rendered per the rulings (or cleanly blocked on the patient), the contact sheet is re-cut, all prior candidates remain on file.
4. The assignment table of §4 is recorded; the fiat flag is untouched.
5. Documentation is synced; commits are granular; the tree is clean; `batch-a-selections` is tagged.
6. The report follows AGENTS.md §16, names FAST, and flags anything pending rather than improvising it.

**Recommended next step for the report to name:** Prototype Gate 2 — Scenes 2–4 animated in the scratch route against the approved frames, Fable 5 at top effort, not leaving the gate until it is exceptional.
