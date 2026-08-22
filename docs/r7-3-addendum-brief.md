# Rebuild Session Brief — R7.3 (Addendum: Renders, Brightness, and Craft Fixes)
## *What Is Money? — And How Does Bitcoin Fit In?*

**Status:** Approved for implementation
**Scope:** Presenter fresh-eyes review fixes on Sections 1–3 and shared systems. Section 4 direction is deliberately **out of scope** this session (a separate design conversation is pending) — touch Section 4 only where a shared component fix (brightness floors, disc) necessarily propagates.
**Branch:** continue on `rebuild-r7-1-harmonization`.
**Date:** 14 August 2026

---

# 1. Dark-field render integration

The four presenter-generated images are now in the repo at `assets/dark-field/` (not `incoming/`): `cattle.png`, `salt.png`, `cowrie_shells.png`, `iron.png`. Grade-gate each (corner luminance, warmth, edge check; contact sheet), then integrate into the contenders' introduction builds of the competition-record slide, replacing the glyph placeholders. The render→glyph crossfade at the line-draw transformation stays exactly as designed (the register handoff is deliberate and presenter-reconfirmed). Update the manifest doc; remove the `DARK-FIELD PENDING` stubs.

# 2. Brightness floors (deck-wide state rule; fixes the "murk" states)

Several rail/pattern states currently render everything — including active statements — at ~35–40% brightness. Two rules, added to §9.4 and enforced in the harness:

1. **The legibility floor:** no dimmed-prior or `defeated` element settles below ~55% of full warmth. Dimming means "recede," never "vanish into murk."
2. **The last-lit invariant:** the most recently landed text element of any build renders at full brightness; dimming applies only to elements that came before it. (The pattern slide's thesis lines are the flagship case: each dims one step as the next lands; the final line holds full brightness as the frame's end state.)

Re-capture every rail and pattern build against these rules.

# 3. The pattern slide de-crowding (state design, not deletion)

At the full-rail overview and thesis builds: historical wound texts settle to **labels-only** (wound lines hidden at this camera; stops + names + glyphs remain); the BITCOIN block splits — the three-fact description lands with its build, then dims one step when the limitation line lands, which holds bright. Net visible text at the final state: the closing thesis line (bright), stop labels, the Bitcoin limitation. Nothing else competes.

# 4. The abstraction ladder script — the missing rung motivation [install verbatim, replacing the second and third script paragraphs]

[→] So people built upward. Stamp the metal into standard coins and you've solved verification and division at a stroke — every coin the same weight, the same purity, the same stamp — as long as you trust the mint.

[→] But coins solve the market stall, not the merchant fleet. Move a fortune in coin and you're back to weight, guards, and dangerous roads — the burden grows with the amount, and so does the risk. And most gold ended up resting in vaults for safekeeping anyway. So the second rung: leave the gold where it's safe, and trade the *receipt* — a claim on gold in a vault, light as air, divisible by the stroke of a pen, good across any distance the issuer's name can travel. As long as you trust the vault.

(First and final paragraphs unchanged; `[→]` count unchanged.)

# 5. Small fixes

1. **Functions triad (3.1):** the central token/disc is missing from the rendered slide — the three functions must radiate from the LuminousDisc per the design; restore and verify at every build (likely a regression from the disc component migration).
2. **Argentina columns (3.2):** replace the icon-glyphs for the currencies with **typographic marks in the deck's label style** — `USD` and `ARS` small-caps text marks (both currencies share the `$` sign, which is why an icon was always going to fail here; the sun-like peso glyph is retired). The real-estate brick glyph remains, pending §6.
3. **Periodic-table bridge:** add one sentence to the two-survivors script opening: *"So let's zoom all the way out — past history, past geography — to the full set of candidates nature ever offered."* (Strengthens the metals→table transition per presenter note.)

# 6. Glyph-quality studio round (presenter-judged)

The grammar glyph set has repeatedly under-delivered on distinctiveness. Run one dedicated crafting round across the full set (contenders, rail stops, functions, stages, Argentina brick, palladium, table assets): three genuinely distinct new candidates per glyph at a raised bar (each glyph needs one memorable formal idea, not a generic silhouette), rendered on a single contact sheet at all deployed scales — **and stop there. The presenter selects.** Do not self-select or apply this round; ship the contact sheet in the report and await selections. (Prior rounds' self-selections are what keeps reading as "basic" to the presenter; his eye decides this one.)

# 7. Featured-render moments (flagged toggle)

Implement, behind a single toggle, the "close-up + schematic" pattern for the rail's two arrival moments: when METALS rises and when GOLD takes the crown, a display-scale dark-field render (gold study; a metals study if provided, else gold only) appears **above the rail** as the sensory moment while the stop keeps its glyph — then recedes as the camera moves on. Screenshot both toggle states for the presenter's ruling. The rail line itself never carries photographs.

# 8. Verification

Standard suite over every changed slide/build (traversal, reduced motion, direct entry, pacing tables unchanged except where §3 re-states builds — update those); brightness-floor and last-lit assertions added to the harness and run deck-wide; grade-gate evidence and contact sheets in `review/rebuild-r7-3/`; decision-log updates; report appended (`docs/r7-3` section in the combined report). Waypoint/1.5 copy is **not** changed this session (pending presenter rulings in chat). Stop without merging.
