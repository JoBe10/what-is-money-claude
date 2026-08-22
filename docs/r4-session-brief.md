# Rebuild Session Brief — R4 (Data & Sources)
## *What Is Money? — And How Does Bitcoin Fit In?*

**Status:** Approved for implementation
**Scope:** Research, verify, and finalize every figure and dated claim in the rebuilt Sections 1–3; replace all `PROVISIONAL` data; produce the complete `docs/SOURCES.md`. No visual redesign, no copy changes to argumentative text — see the discrepancy rule in §0.4. Web research is expected and required.
**Branch:** `rebuild-r4-data` (merge `rebuild-r3-section-3` to `main` first if unmerged, standard no-ff).
**Date:** 30 July 2026

---

# 0. Rules

1. Read first: this brief; `docs/sections-1-3-rebuild-brief.md` §3.2 (the evidence rule) and §13; `docs/r2-report.md` and `docs/r3-report.md`; the current `docs/SOURCES.md` stubs.
2. Primary sources over aggregators: national statistics agencies (BLS, ONS, e-Stat, SNB/Swiss statistics), central banks, USGS, peer-reviewed or industry-standard references (Johnson Matthey/WPIC for PGMs). Record source, series ID where applicable, retrieval date, and the exact figure used.
3. Charted data is embedded as static data files in the repo (no runtime fetching) with a generation comment pointing at the `SOURCES.md` entry.
4. **The discrepancy rule:** where verified data contradicts any on-screen claim or script sentence, do NOT silently rewrite argumentative copy. Implement the corrected *figures*, and list every copy-level discrepancy in the report under "Presenter rulings needed," quoting the current line and the finding. Exception: pure figure fills (chart values, axis labels) are in scope without flagging.

---

# 1. The work

## 1.1 Currency purchasing-power chart (severance slide)

Finalize the four series — USD, GBP, JPY, CHF — as purchasing power of one unit, CPI-deflated, indexed 1971 = 100, annual, through the latest available year. Sources: BLS CPI-U (USD), ONS CPIH/RPI long series (GBP — choose the defensible long series and note the choice), Japan e-Stat CPI (JPY), Swiss CPI (CHF). Render with final data; remove `PROVISIONAL`. The chart must show CHF as the strongest line (verify it is — that's the honesty point of including it) and every line declining. Entries: WIM-FX-001…004.

## 1.2 Palladium (the palladium test slide)

1. **Rarity — verify the metric with care, this is a known risk:** the on-screen panel currently says CRUSTAL RARITY, but crustal-abundance estimates (CRC/USGS-class values) may show palladium *more* abundant in the crust than gold (values on the order of ~0.015 ppm Pd vs ~0.004 ppm Au appear in standard references). If the crustal metric does not support "rarer than gold," do not massage it: **switch the panel to the metric that is true and relevant — annual mine production and/or above-ground stocks** (palladium production ≈ a small fraction of gold's ~3,000+ t/yr; verify current figures via USGS Mineral Commodity Summaries and WPIC/Johnson Matthey), retitle the panel accordingly (e.g. `ANNUAL MINE SUPPLY · TONNES`), and flag under Presenter rulings that the hook line "rarer than gold" may need to become supply-anchored phrasing (e.g. "scarcer in supply than gold"). Accuracy outranks the aphorism.
2. **Price history:** replace the provisional price panel with real annual data 1990–present for gold and palladium (USD/oz, annual average or year-end, one convention, stated), verifying the shape shows the genuine palladium>gold periods (~2001 spike, ~2018–2022). Sources: LBMA/Johnson Matthey/FRED. Entries: WIM-PD-001 (supply/rarity), WIM-PD-002 (prices).
3. Verify the script claims: discovery 1803 (Wollaston); "no central bank holds palladium as a monetary reserve" (check against IMF COFER category definitions and any state stockpile edge cases — Russia's Gokhran holdings are inventory, not monetary reserves; if any edge case muddies the sentence, flag it).

## 1.3 Script-level factual verification (no figures on screen)

Verify and record entries for every dated or quantitative claim in the Sections 1–3 scripts: the 80,000-hours basis (WIM-001, already stubbed — complete it); 21,000,000 supply cap (WIM-BTC-001); the aggry-beads account and its on-screen dating "West Africa, 1500s–1800s" (find defensible scholarly support — Graeber/Einzig/economic-history sources; if the dating or "wiped out by supply" framing overstates, flag under Presenter rulings with suggested minimal wording); August 15, 1971 window closure and the "officially temporary" line; Argentina script claims (dollar-priced real estate, "five decades", cross-administration persistence — support with documented sources; no figures on screen); "one side of nearly every trade on Earth" (mark as rhetorical-order-of-magnitude, note in SOURCES.md as presenter framing, not a sourced statistic); gold/silver periodic-elimination claims (standard chemistry, cite a reference for the elimination logic e.g. reactivity/radioactivity classifications).

## 1.4 `docs/SOURCES.md`

Complete document: one entry per claim — id, the claim as rendered/spoken, figure(s) used, source (org, series/publication, date), retrieval date, and any judgment notes. Ordered by deck position. This document ships with the repo and is the audit trail for every number in the presentation.

---

# 2. Verification & report

1. Build clean; both charts render with final data at 1920×1080; visual regression screenshots against the R2.2/R3.1 baselines (design unchanged, data changed).
2. Zero `PROVISIONAL` flags remain (grep).
3. `docs/SOURCES.md` complete; every on-screen figure traceable; every script date/quantity covered.
4. Write `docs/r4-report.md`: sources chosen and why, figures implemented, and — most importantly — the **Presenter rulings needed** list (every place where verified reality tensions with current copy, with quoted lines and suggested minimal fixes). Do not apply copy fixes; stop and wait.

Do not merge.
