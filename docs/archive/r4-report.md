> **Historical record — archived, not authoritative.** The session it reports is complete; its rulings are absorbed into `docs/what-is-money-master.md` (Stage 0, 25 August 2026).
> Kept as evidence: measurements, screenshots and decision logs referenced elsewhere still resolve here. Nothing here governs.

# R4 Phase Report — Data & Sources

**Branch:** `rebuild-r4-data` (not merged) · **Base:** `main` at `076e2bb`, the
`Merge R3+R3.1: Section 3 rebuild` commit created this session per §0 with
`npm run build` verified clean before branching.
**Brief:** `docs/r4-session-brief.md` · **Date:** 30 July 2026

Every figure and dated claim in the rebuilt Sections 1–3 is now researched,
sourced and recorded. Both provisional charts plot real data. `PROVISIONAL`
appears nowhere in `src/`. `docs/SOURCES.md` is complete: **24 live entries
plus one redirect**, ordered by deck position, each with the claim as
rendered or spoken, the figures, the source with series identifiers, a
retrieval date, and a judgment note where one is owed.

**No argumentative copy was changed.** Eight places where verified reality
sits in tension with a line the deck says are listed in **§4 — Presenter
rulings needed**, each with the current line quoted and a suggested minimal
fix. One of them (R-05) is substantial: the deck's palladium hook says
"rarer than gold," and the crustal-rarity claim behind it cannot be
supported.

---

## 1. What the numbers turned out to be

### 1.1 The purchasing-power chart (slide 2.7)

Four national CPI records, inverted to purchasing power of one unit, indexed
1971 = 100, annual, **1971–2025** — every year plotted, no control points and
no interpolation. Embedded at `src/data/purchasing-power.js`.

| | 1971 | 2025 | Price level |
|---|---|---|---|
| **USD** — BLS CPI-U, `CUUR0000SA0` | 40.5 | 321.943 | **12.58** · 7.95× |
| **GBP** — ONS CPIH-consistent (`JF4D`→`L522`) | 131.84 | — | **9.06** · 11.03× |
| **JPY** — Statistics Bureau CPI, All items | 32.9 | 111.9 | **29.40** · 3.40× |
| **CHF** — SNB cube `plkopr` (BFS LIK) | 33.8028 | 100.4144 | **33.66** · 2.97× |

The brief set two conditions on this chart and both hold. **CHF is the
strongest line** — 33.66 against JPY 29.40, USD 12.58, GBP 9.06 — which is the
honesty point of including it; it is the highest line in 51 of 55 years, the
dollar sitting above it only in 1972–1975. **Every line declines** over the
span, by between 66% (CHF) and 91% (GBP).

The provisional shapes R2 drew were closer than they had any right to be: USD
12.5 against a real 12.58, GBP 9 against 9.06. JPY (33 → 29.40) and CHF
(38 → 33.66) were optimistic by a few points.

**The GBP series choice** was the one real judgment call, and it changes the
number by nearly a factor of two. Three defensible long runs exist:

| Series | 2025 purchasing power | Price multiple |
|---|---|---|
| RPI long run (`CDKO`) | 5.04 | 19.86× |
| CPI-consistent | 7.89 | 12.67× |
| **CPIH-consistent (chosen)** | **9.06** | **11.03×** |

CPIH was chosen on three grounds, recorded in full in WIM-FX-002:
**concept comparability** (the other three are headline consumer price
indices that capture owner-occupied housing through rents or rental
equivalence; RPI includes mortgage-interest payments, which in Britain's
high-rate 1970s and 1980s measures debt service rather than what a pound
buys); **standing** (the UK Statistics Authority stripped RPI of its National
Statistic designation in 2013 and the ONS advises against using it, while
CPIH is the ONS's lead measure); and **direction of error** (CPIH-consistent
is the most conservative of the three, so the deck cannot be accused of
picking the series that flatters its case). The cost is disclosed: the
pre-1988 half is an ONS model the ONS itself labels "not National Statistics
… provided purely for indicative purposes."

### 1.2 The palladium panels (slide 3.5)

**The left panel changed metric.** It said CRUSTAL RARITY. It cannot, and
this is the brief's flagged risk landing exactly where the brief feared:

| Reference | Gold | Palladium | Implies |
|---|---|---|---|
| CRC Handbook-class values | ~0.004 ppm | ~0.015 ppm | palladium **more** abundant |
| Rudnick & Gao (2003), upper crust | ~1.5 ppb | ~0.52 ppb | palladium **less** abundant |
| Wedepohl (1995), continental crust | ~2.5 ppb | ~0.4 ppb | palladium **less** abundant |

The standard references disagree about the **direction** of the comparison,
not merely its magnitude — both metals sit at parts-per-billion
concentrations estimated from sparse sampling. A comparison whose sign
depends on which book you open cannot go on a screen, and massaging it is
what the brief forbade. So the panel is now **ANNUAL MINE SUPPLY · TONNES**,
where the answer is unambiguous, every source agrees, and the fact is the one
that bears on a monetary argument:

- **gold 3,280 t**, **palladium 217 t** — world total mine production, 2024
  actuals, both from USGS *Mineral Commodity Summaries 2026*. Ratio ≈ **15×**.
- The same edition's 2025 estimates are 3,300 t and 190 t (≈17×). The deck
  plots the actuals.
- Figures are now **shown on screen**, which the provisional panel could not
  do. The bars keep their old reading direction — shorter is scarcer — so the
  panel's grammar is unchanged even though its metric is not.

Palladium's bar is 7% of gold's. That is what the real comparison looks like.

**The price panel plots the real record.** LBMA daily benchmark prices, USD
per troy ounce, arithmetic mean of every published fixing per year,
**1990–2025**, one vertex per year, one convention for both metals.

The beat's claim survives, and the real data fits it better than the
provisional shape did. Palladium closed above gold on annual averages in
**exactly two four-year stretches**: 1999–2002 (peaking at 680.33 against
gold's 279.10 in 2000) and 2019–2022 (2,398.28 against 1,798.61 in 2021).
"Long stretches," plural, is correct. The provisional data had modelled one
2001 spike; the truth is two runs of four years.

### 1.3 Script-level verification

Fourteen further claims were researched and recorded. The ones that moved:

- **Nixon's exact words check out.** "I have directed Secretary Connally to
  suspend **temporarily** the convertibility of the dollar into gold or other
  reserve assets" — 15 August 1971. The deck's "officially temporary;
  permanent ever since" is the president's own adverb against the outcome.
  (WIM-003.)
- **The Argentina beat is the best-sourced claim in Section 3.** Dollar-priced
  real estate dating to the 1970s crisis, peso daily settlement, savings in
  dollars and *ladrillos*, ~60% deposit dollarization by 1999, and the
  political-neutrality claim — the load-bearing one — holding across the
  military government, Alfonsín, Menem, the *corralito*, the Kirchners,
  Macri, the 2019–23 controls and Milei. "Five decades" from the 1975
  *Rodrigazo* is right. (WIM-AR-001.)
- **"No central bank holds palladium" survives its edge case.** Monetary gold
  is the only commodity in the IMF's reserve-asset taxonomy, so palladium is
  excluded by definition rather than by absence of a holding — the right form
  of proof for a negative claim. Russia's Gokhran does hold palladium, but it
  sits under the **Ministry of Finance**, not the central bank, and its metal
  is a strategic stockpile that was liquidated into the market, which is the
  opposite of a monetary reserve. The on-screen line is precise as written.
  (WIM-PD-003.)
- **1803 is the right year to print** even though Wollaston isolated the metal
  in 1802: the RSC's reference table gives 1803, it is the year the metal
  entered public knowledge via the anonymous handbill, and public knowledge is
  what the beat's argument is about. (WIM-PD-004.)
- **The 21,000,000 cap is 20,999,999.9769** under the implementation's integer
  arithmetic; the round number is standard. (WIM-BTC-001.)
- **The aggry-bead account is the weakest claim in the deck**, and the
  well-documented case is sitting right next to it — see R-02.
- **The rhetorical framings are recorded as rhetoric.** "One side of nearly
  every trade on Earth," "the most used good in human civilization," "not one
  hour of school — anywhere": no series measures any of these. WIM-006 records
  them explicitly as presenter framing so no future reader mistakes them for
  statistics, which is what the brief asked for.

---

## 2. What was implemented

| Change | Files |
|---|---|
| Purchasing-power series, 1971–2025, real annual data | `src/data/purchasing-power.js` (new), `src/slides/section-2-origin/07-the-severance.js` |
| Palladium mine supply + LBMA prices | `src/data/palladium.js` (new), `src/slides/section-3-function/05-the-palladium-test.js` |
| Panel retitle + class rename `__rarity*` → `__supply*` | same slide, `src/styles/slides.css` |
| `PROVISIONAL` removed | both slides, the stylesheet, `docs/SOURCES.md` |
| Complete audit trail | `docs/SOURCES.md` |

Nothing else under `src/` changed — git-verified, and gated. The charts read
their series from static data files with no runtime fetching, each file's
header naming its `SOURCES.md` entry, as §0.3 requires.

Two consequential decisions inside "figure fills," both disclosed rather than
buried: the chart window now ends **2025** rather than 2026 (the last complete
calendar year for all four national indices — 2026 is six or seven months old
at retrieval), and the palladium panel's **class names changed with its
metric**, because a stylesheet block called `__rarity` on a supply panel is
the stale-naming problem the observations log already complains about.

---

## 3. Verification

### 3.1 Visual regression — design unchanged, data changed

`review/rebuild-r4/harness-r4/regression-r4.cjs`. Every build of Sections 1–3
re-captured at 1920×1080 and pixel-diffed against its committed baseline
(`screenshots-r2-2` for Section 2, `screenshots-r3-1` for Section 3).
**110 builds, 90 with a baseline, 0 failures, console clean.** Exactly three
slides differ, and each for a stated reason:

| Slide / builds | Changed | Why |
|---|---|---|
| `2-07-the-severance` b3–b4 | 1.58% | the purchasing-power chart, new data |
| `3-05-the-palladium-test` b2–b5 | 0.98% | the two palladium panels, new data |
| `2-03-the-convergence` b1–b3 | 5.9% | **not R4** — the murmuration is a canvas field seeded with `Math.random()`, so no two runs draw the same frame; reported, not gated |

Every other build of Sections 1–3 is **pixel-identical** to its baseline. The
deck-chrome band (`y ≥ 1000`) is masked from the comparison: the engine fades
the slide counter and progress bar after 2000 ms of no input, so whether they
appear depends on how long the harness took to arrive — the R3.1 baselines
caught them just before the fade and this run just after. What that band
actually renders is gated statically instead: four `git`-based structural
checks assert the engine is untouched, no slide changed its
`totalBuildSteps`, the slide registry is unchanged, and only the sanctioned
files changed under `src/`.

### 3.2 R4 static gates

`review/rebuild-r4/harness-r4/gates-r4.cjs` — **63 checks, 0 failures.**
Zero `PROVISIONAL` (including a full walk of `src/`); `SOURCES.md` complete
and cross-referenced **both ways** (every WIM id cited in code is defined;
every required entry present; every live entry states a claim, a basis and a
date; every presenter-ruling flag raised in `SOURCES.md` is answered in this
report); the embedded data internally consistent with what the deck says
about it — 55 annual values per currency, indexed to exactly 100 at 1971, all
declining, CHF strongest, the deflation upticks counted, the endpoints
matching the figures quoted in `SOURCES.md`, the palladium crossings landing
on exactly 1999–2002 and 2019–2022, mine supply 3,280/217; and the
constitution gates carried forward over the new files (banned terms, the
claim-ladder confinement, typographic apostrophes, American English, no
accent in JS or data).

### 3.3 The R3.1 functional suite under R4

`node review/rebuild-r3/harness-r3-1/verify-r3-1.cjs --part=static` →
**64 of 66 pass.** The two failures are R3-era invariants R4 was **instructed
to break**, and they are the correct outcome, not a regression:

- *"Sections 1–2 sources untouched beyond glyphs.js"* — R4's mandate is the
  Section 2 chart.
- *"palladium chart flagged PROVISIONAL in code"* — R4's mandate is to remove
  the flag.

`gates-r4.cjs` replaces both with R4-appropriate versions. The suite's
palladium probe was updated for the renamed panel (it now also asserts the
retired rarity panel is gone and that the two supply figures render as
`GOLD  3,280 t` / `PALLADIUM  217 t`), and one latent harness bug was fixed —
see §5.

### 3.4 Build

`npm run build` clean at every state of the session, including the merge
commit and the final state.

---

## 4. Presenter rulings needed

Eight items. In each case the **figures are implemented** and the **copy is
untouched**, per the discrepancy rule. Nothing here is a blocker for a
presenter who knows about it; several are one word.

---

### R-01 · "the coincidence of wants" is missing a word

**Current, on screen (2.1, and the inherited scene label at 2.2):**
> The coincidence of wants.

**Current, spoken (2.1):**
> "Economists call this the coincidence of wants: for direct exchange to
> work, you must want exactly what I have, and I must want exactly what you
> have, at the same time, in the right amounts."

**Finding.** The term of art is the **double** coincidence of wants, coined by
W. S. Jevons in *Money and the Mechanism of Exchange* (1875): barter requires
"a double coincidence, which will rarely happen." The deck's *definition* is
exactly Jevons's — it describes the double condition correctly — but the
sentence attributes to economists a name they do not use. An economist in the
audience will notice immediately, and it is the cheapest possible correction.

**Suggested minimal fix.** Insert one word in both places: on screen **"The
double coincidence of wants."**, spoken **"Economists call this the double
coincidence of wants."** Nothing else changes. (WIM-007.)

---

### R-02 · The aggry-bead receipt names the wrong object, and the documented case is the one already on screen

**Current, on screen (2.4, the SHELLS stop's receipt line):**
> West Africa, 1500s–1800s: industrial shipping made aggry beads cheap to
> import. Local savings, wiped out by supply.

**Finding — three problems, and one clean fix.**

1. **Wrong object.** *Aggry* (akori) beads are the scarce antique beads
   prized in West Africa. What European traders shipped in bulk were newly
   manufactured glass beads — imitations and novelties, not aggry. The
   sentence names the thing that was valuable, not the thing that flooded in.
2. **Anachronistic mechanism.** "Industrial shipping" in the 1500s is wrong
   by two centuries. The Atlantic bead trade starts in the 16th century;
   *industrial* glass production (Bohemia, Birmingham) is 18th–19th century.
   The 1500s date belongs to the trade, not to the industrial supply that
   does the argumentative work.
3. **Thin evidence for the specific claim.** "Local savings, wiped out by
   supply" for *beads* rests on popular accounts — Szabo's "Shelling Out"
   (2002) and Ammous's *The Bitcoin Standard* (2018) — not on quantitative
   economic history. The V&A's scholarship supports the *mechanism* (European
   glassmaking was commonplace where the technology was rare) but not the
   savings-destruction claim.

**The fix is already drawn on the slide.** The rail's stop is labelled
**SHELLS** with the cowrie glyph, and cowries are the case with a
peer-reviewed source and dates. Hogendorn & Johnson, *The Shell Money of the
Slave Trade* (Cambridge University Press, 1986), document cowries as regular
market currency across much of West Africa; the stable rate of 3,000 to the
gold *mithqal* eroding in the first half of the 19th century (Barth records
3,800 at Timbuktu in the 1850s); then a "second and general great inflation"
driven by the importation of thousands of tons of cheaper Zanzibar *Cypraea
annulus*; and colonial administrations displacing cowries with low-value coin
*because of the inflation*. That is "out-supplied," sourced, and it is about
the object the glyph already shows.

**Suggested minimal fix — on screen:**
> West Africa, 1800s: shiploads of cheaper Zanzibar cowries collapsed the
> shell rate. Local savings, out-supplied.

**And in the spoken line**, "carrying industrially produced beads" becomes
"carrying shiploads of cheaper cowries," leaving the rest of the paragraph —
including "They were out-*supplied*" — exactly as written. The beat gets
stronger: one object, one century, one citable source.

**If you would rather keep beads**, the honest version is "West Africa,
1700s–1800s: mass-produced glass beads made the bead supply worthless" — but
it keeps the weaker evidence base and loses the match with the cowrie glyph.
(WIM-005.)

---

### R-03 · "chemistry leaves two survivors" overstates, and it collides with the deck's own palladium beat

**Current, on screen (2.5):** "Chemistry leaves two candidates."

**Current, spoken (2.5):**
> "Strip away what's too common to be scarce and what can't be worked, and
> chemistry — not culture, not politics, *chemistry* — leaves you two
> survivors: silver, and gold."

**Finding.** Every elimination step is sound — gases by state, alkali and
alkaline-earth metals by reactivity, lanthanides and actinides by
radioactivity, iron and most transition metals by corrosion. But what
chemistry leaves is the **noble metals**, commonly enumerated in this
argument as five: rhodium, palladium, silver, platinum, gold. Getting from
five to two needs two further steps: **melting point** (rhodium 1,964 °C,
platinum 1,768 °C, palladium 1,555 °C were unmeltable in pre-modern
furnaces, against gold's 1,064 °C and silver's 962 °C) and **historical
availability** (platinum unknown to the Old World until the 18th century,
palladium until 1803). The script's "what can't be worked" is doing the
first, which is fair and physical. The second is history, not chemistry.

**Why it matters beyond pedantry.** Slide 3.5 needs palladium to have been a
*genuine* candidate that lost on network effects and timing. If 2.5 has
already told the audience that chemistry excluded everything but gold and
silver, the palladium beat is answering a question the deck has apparently
already closed. Naming the reason palladium is not in the final two — it
could not be melted, and nobody knew it existed — sets up 3.5 instead of
undercutting it.

**Suggested minimal fix — spoken:**
> "…and chemistry plus the furnaces of the day leave you two survivors:
> silver, and gold. The other noble metals melt too high to work, and two of
> them nobody had even found yet — hold that thought."

On screen, "Chemistry leaves two candidates." can stand, or become
"Chemistry and the furnace leave two candidates." (WIM-009.)

---

### R-04 · "every line goes one direction" is true of the trend, not of every year

**Current, spoken (2.7):**
> "Every line on this chart — including the strongest currency of the era,
> the Swiss franc — goes one direction."

**Finding.** With the real data, deflation years raise purchasing power. On
the plotted series the lines rise year-on-year in **12 years for JPY**
(1995, 1999–2003, 2005, 2009–2011, 2016, 2021), **6 for CHF** (2009, 2012,
2013, 2015, 2016, 2020), **1 for USD** (2009) and **none for GBP**. The
largest single-year rise is JPY +0.46 index points and CHF +0.42 — under 2 px
at 1920×1080, so nothing visibly contradicts the line on stage. But the
sentence is a universal claim about every line, and a viewer who has read the
chart carefully, or an economist who knows Japan's deflation decade, can
correct it.

**Suggested minimal fix.** One word, "over the span," or the stronger version
that gives up nothing:

> "Every line on this chart — including the strongest currency of the era,
> the Swiss franc — ends far below where it started."

That is unambiguously true, is a bigger claim rhetorically, and cannot be
picked at. (WIM-FX-005.)

---

### R-05 · "rarer than gold" — the crustal claim cannot be supported

**This is the substantial one.**

**Current, on screen (3.5, the hook):**
> Palladium: rarer than gold. Genuinely useful. At times more expensive. It
> never became money.

**Current, spoken (3.5):**
> "Palladium. **Rarer in the Earth's crust than gold.** Genuinely useful —
> industry needs it."

and later:

> "Eighteen-oh-three: palladium is discovered — **rarer than gold** — and
> walks into a world where gold is the base money of civilization…"

**Finding.** The spoken claim is the unsupportable one. Standard references
disagree about whether palladium is rarer than gold in the crust, and they
disagree about the **direction**: CRC-class values (Au ~0.004 ppm, Pd ~0.015
ppm) make palladium *more* abundant; Rudnick & Gao (Au ~1.5 ppb, Pd ~0.52
ppb) and Wedepohl (Au ~2.5 ppb, Pd ~0.4 ppb) make it rarer. Both metals are
estimated at parts-per-billion from sparse sampling. There is no defensible
way to assert the crustal comparison in either direction, so the panel
behind it has been switched to annual mine supply and the panel now reads
**ANNUAL MINE SUPPLY · TONNES · gold 3,280 t · palladium 217 t**.

The **on-screen hook** — "rarer than gold" without "in the Earth's crust" —
is defensible if "rarer" is heard as scarcity of supply, which is now
exactly what the panel beneath it shows. But it sits directly above a panel
about supply, so making it supply-anchored costs nothing and closes the gap.

**Suggested minimal fix — the hook, on screen:**
> Palladium: scarcer in supply than gold. Genuinely useful. At times more
> expensive. It never became money.

**And in the script**, "Rarer in the Earth's crust than gold" becomes
**"Scarcer than gold — the world mines about fifteen times as much gold each
year"**, which is now a figure on the screen behind the presenter; and
"palladium is discovered — rarer than gold —" becomes "palladium is
discovered — scarcer than gold —".

**Note what does not change.** The beat's argument is untouched and is in
fact strengthened: palladium is genuinely scarcer than gold on the metric
that matters to a monetary good, it has been more expensive for two
four-year stretches, and it still never became money. "A bit scarcer moved
nothing" lands harder when the scarcity is real and measured rather than
contested. (WIM-PD-001.)

---

### R-06 · the chart ends 2025, the script says "still buys"

**Current, spoken (2.7):** "Here is what one unit of the major currencies
**still** buys, measured from that year." **On screen:** "Purchasing power of
one unit · 1971 = 100" — no window stated.

**Finding.** The chart now ends at 2025, the last complete calendar year for
all four national indices (2026 is six or seven months old, and the USD's own
2025 average is already an eleven-month figure because October 2025 CPI was
never published during the appropriations lapse). The deck's present is 2026.
The gap is one year and nothing on screen says which year the lines stop.

**Options.** (a) Accept it — a one-year lag on annual national statistics is
normal and no viewer will object. (b) State the window in the index note:
**"Purchasing power of one unit · 1971 = 100 · through 2025"**, which is a
figure fill and needs no ruling if you want it. (c) Change "still buys" to
"buys today," which is no more precise. Recommendation: (b) if you want the
belt, (a) otherwise. (WIM-FX-005.)

---

### R-07 · "80,000 hours" is a full-time career, but the on-screen line says "your life"

**Current, on screen (1.1):** "This is how many hours of your life you will
spend working."

**Finding.** The script keeps the framing — "A year of full-time work is
about two thousand hours. A career — call it forty years — is eighty
thousand" — and 40 × 2,000 is stated on stage, so the arithmetic is
transparent. The on-screen sentence drops it and addresses the viewer
directly. For a viewer with part-time years, career breaks or a shorter
working life, 80,000 is high; OECD average-annual-hours series run to roughly
1,700–1,800 for the US and lower across Europe, because they include
part-time work and leave.

**Suggested minimal fix.** "This is roughly how many hours of a working life
go into working." Or keep the direct address and add one word: "This is how
many hours of your working life you will spend working." Either keeps the
image and removes the personal assertion. (WIM-001.)

---

### R-08 · "seventeen years" expires on 1 January 2027

**Current, spoken (2.8):** "It is seventeen years into a hundred-year
question." **On screen (2.8):** "seventeen years into a hundred-year
question."

**Finding.** Correct for calendar 2026 (2026 − 2009); wrong from
1 January 2027. It is hard-coded copy, not a computed value, and it appears
both on screen and in the script.

**Options.** (a) Leave it and treat it as an annual maintenance item — add it
to a pre-recording checklist. (b) Make it robust: "not yet two decades into a
hundred-year question," which holds until 2028 and reads no worse.
(c) Compute it from the genesis year at render time, which removes the
maintenance but puts a live number on a slide whose register is deliberately
still. Recommendation: (b). (WIM-004.)

---

## 5. Deviations, judgment calls, and two harness bugs

1. **The GBP series is CPIH-consistent, not RPI** (§1.1). The most
   consequential figure decision of the session; three candidate series, a
   nearly 2× spread, reasoned in WIM-FX-002. The chosen series is the
   conservative one.
2. **The palladium panel changed metric, and its CSS classes with it.**
   `__rarity*` → `__supply*`. A stylesheet block named for a metric the panel
   no longer measures is the stale-naming problem the R3.1 observations log
   already records; renaming is contained to one slide and one CSS block.
3. **Mine-supply figures are 2024 actuals, not 2025 estimates.** Both metals
   from one edition of one source so the comparison is like-for-like. The
   2025 estimates (3,300 t / 190 t, a 17× ratio) are recorded in
   WIM-PD-001 — they would have made the deck's case *stronger*, which is
   why the actuals are the honest choice.
4. **Figures are now rendered on the supply panel.** The provisional panel
   showed relative bar lengths only, because invented precision was banned.
   With sourced data the figures can and should be shown; the bars keep their
   reading direction, so the panel's grammar is unchanged.
5. **The chart windows end 2025** (§2, R-06) — the last complete calendar
   year for every series involved, on both charts.
6. **The USD 2025 annual average rests on eleven months.** October 2025 CPI
   was never published (BLS footnote X, "Data unavailable due to the 2025
   lapse in appropriations"). BLS's published annual average is 321.943; this
   session recomputed the mean of the available months and got 321.943
   exactly. Disclosed in WIM-FX-001 and in the data file rather than silently
   used.
7. **`src/data/` is a new directory.** §0.3 requires embedded static data
   files with a generation comment pointing at `SOURCES.md`; there was
   nowhere for them to live. Both files carry their sources, series ids,
   retrieval dates and honest notes in the header, and neither is hand-edited.
8. **WIM-002 is retired to a redirect,** replaced by WIM-FX-001…005, so
   references in `docs/r2-report.md` and `docs/r2-session-brief.md` still
   resolve.
9. **The R3.1 suite's file reader was line-ending-dependent — fixed.** Its
   notes-extraction regex required bare LF, so after this session's branch
   checkout materialized tracked sources as CRLF, 23 of its 66 static checks
   failed for a reason that had nothing to do with their subject (the verbatim
   script comparisons and the claim-count decomposition silently read empty
   strings). Both suites now normalize line endings on read. **This is worth
   noting for the R2/R2.1/R2.2 harnesses too** — they share the pattern and
   would fail the same way on a fresh checkout.
10. **The R4 regression harness masks the deck-chrome band** (§3.1), because
    the chrome's 2000 ms idle fade makes its presence in a screenshot a
    function of harness latency. Four `git`-based structural checks replace
    what the band would have proved. Also excluded: `2-03-the-convergence`,
    whose murmuration is seeded with `Math.random()`.
11. **Sections 1–2 carry pre-existing ASCII apostrophes in comments.** The
    R2-era files predate the R2 Phase D typographic standard, which was
    applied to files each session touched. R4 touched only
    `07-the-severance.js` in Section 2 and left it clean; the rest are out of
    scope and logged as an observation rather than swept, since sweeping them
    would mean opening files R4 has no mandate to change.

---

## 6. Logged to `docs/rebuild-observations.md`

The CRLF fragility across every harness generation and the recommendation to
back-port; the deck-chrome idle fade as a screenshot hazard for any future
regression suite; the pre-existing ASCII apostrophes in Sections 1–2
comments; the fact that both charts now end 2025 and will want an annual
refresh; and the palladium panel's retired metric, so that no future session
tries to restore the crustal comparison without re-reading WIM-PD-001.

---

## 7. State

`npm run build` clean. Two new data files, two chart slides rewired, one
stylesheet block renamed, `docs/SOURCES.md` complete at 24 live entries, this
report, and the R4 evidence under `review/rebuild-r4/`
(`regression-r4-results.json`, `gates-r4-results.json`, `console-log-r4.txt`,
`screenshots-r4/` — 110 frames).

**Zero `PROVISIONAL` flags remain.** Every on-screen figure is traceable to a
`SOURCES.md` entry with a series identifier and a retrieval date; every script
date and quantity in Sections 1–3 is covered.

**Stopping here per the brief: no merge, and no copy fixes applied.** The
eight rulings in §4 are waiting — R-05 is the one that changes what the
audience hears, and R-02 is the one that would make a weak beat strong.

---

# R4.1 — The Eight Rulings, Applied

**Branch:** `rebuild-r4-data` (still not merged) · **Date:** 31 July 2026

The presenter ruled on all eight. Every ruling is applied; nothing else in the
deck moved. Two rulings came back differently from the recommendation in §4,
and both are improvements:

- **R-07 reversed.** I proposed softening the cold open's on-screen line. The
  ruling: *"keep the on-screen line untouched — the cold open's punch is
  non-negotiable — put the qualifier in the script sentence, which it already
  essentially carries."* Correct: the precision problem was real, but the fix
  belonged in the spoken layer, which is where the deck already does its
  qualifying. The screen keeps its punch and the presenter now says
  "a **full-time working life** — call it forty years."
- **R-03 enlarged.** I proposed a one-sentence hedge. The ruling asked for the
  real thing: *"add one elimination wave — the noble metals survive chemistry,
  but the platinum group melts at temperatures no ancient furnace could reach
  and hides in ores no ancient chemist could crack; workable nobility leaves
  two. Which quietly explains why palladium waited until 1803 — the collision
  becomes a setup."* That is a better idea than mine. The second cause —
  the PGMs hiding in ores nobody could crack — is what actually explains 1803,
  and it converts a hole in the argument into a plant that pays off two
  sections later.

## R4.1.1 — What each ruling changed

| | Ruling | Where | Applied |
|---|---|---|---|
| **R-01** | adopt the standard term | 2.1 on screen + script, 2.2 on screen | "The **double** coincidence of wants." |
| **R-02** | adopt the drawn fix — the cowrie inflation | `EvolutionRail` receipt, 2.4 script | receipt: **"West Africa, 1800s: shiploads of cheaper Zanzibar cowries collapsed the shell rate. Local savings, out-supplied."** |
| **R-03** | one new elimination wave | `ElementGrid`, 2.5 (5 builds → **6**) | the furnace wave; verdict **"Workable nobility leaves two."** |
| **R-04** | the precise phrasing | 2.7 script | "…the Swiss franc — **ends far below where it began**." |
| **R-05** | the supply-anchored hook | 3.5 hook + script ×2 | hook: **"Palladium: scarcer in supply than gold."** |
| **R-06** | the "as of 2025" fix | 2.7 index note | "Purchasing power of one unit · 1971 = 100 · **as of 2025**" |
| **R-07** | keep the screen, qualify the script | 1.1 script only | "A **full-time working life** — call it forty years — is eighty thousand." |
| **R-08** | the durable phrasing, everywhere | `EvolutionRail` + 2.8 script | "**not yet twenty years** into a hundred-year question" |

### R-02, in full

The receipt now names the object the glyph always showed. The script sentence
that carried it changed with it — "When European ships **began landing
thousands of tons of cheaper Zanzibar cowries in West Africa**, the **shells'**
scarcity — which had always been an accident of distance — collapsed. The
people holding their savings in **shells** were not out-traded. They were
out-*supplied*." The punchline is untouched, which was the point of the
ruling. Aggry beads leave the deck entirely: the claim they were carrying is
now made about cowries, with Hogendorn & Johnson (Cambridge, 1986) behind it —
one object, one century, one citable source.

### R-03, in full — the furnace wave

The `ElementGrid`'s step 4 used to carry two cuts at once, which is what let
the slide say chemistry alone leaves silver and gold. It now splits:

- **Build 5** (grid step 4) removes what will not hold a shape — mercury
  pours; tungsten and rhenium cannot be worked at all. Wave line: *"Anything
  that will not hold a shape is out."* What stands is the noble family, **eight
  cells: Ru Rh Pd Ag / Os Ir Pt Au**. The audience sees chemistry's real
  answer for the first time.
- **Build 6** (grid step 5) is the furnace wave: the six platinum-group metals
  settle out and **Ag and Au stand alone**. Verdict: *"Workable nobility
  leaves two."*

New fate code `n` in the grid (noble but unmeltable), its own CSS wave, and
the PGMs settle a shade brighter than the merely shapeless — because the deck
comes back for one of them at 3.5.

The script's new fifth arrow: *"And strip away what will not hold a shape —
the metal that pours, the ones no fire of the age could work at all. What's
left is a small family: the noble metals, the ones that simply refuse to
corrode."* And the sixth: *"And now the furnace decides. The platinum group
melts at temperatures no ancient furnace could reach, and hides in ores no
ancient chemist could crack — which is why the world would not even meet one
of them until 1803. Remember that; it has a part to play later. So: not
culture, not politics — chemistry and the forge leave you two survivors:
silver, and gold. …"* The rest of the paragraph is unchanged.

**The collision is now a setup.** 2.5 plants 1803 and says a metal is coming
back; 3.5 collects. And 3.5's palladium is what the deck now needs it to be —
a genuine candidate that chemistry never excluded, held out by the furnace and
then by the network.

## R4.1.2 — Verification

Everything was re-run at the final state. **271 checks across four suites, 0
failures**, console clean throughout.

| Suite | Result |
|---|---|
| **R4 gates** (`gates-r4.cjs`) | **67 checks, 0 failures** |
| **R4 regression** (`regression-r4.cjs`) | **111 builds, 90 diffed, 0 failures** |
| **R4.1 build integration** (`builds-r4-1.cjs`) | **18 + 18 checks (standard + reduced motion), 0 failures** |
| **R3.1 static / direct / reduced-motion** | **68 + 105 + 119 checks, 0 failures** (results under `review/rebuild-r4/r3-1-suite-rerun/`) |

**The gates inverted, deliberately.** R4 gated on *no copy having changed*.
R4.1 authorizes exactly eight changes, so the gate now proves the opposite and
proves more: **all 14 ruled lines are on stage** (each ruling's applied wording
asserted in its file), **every retired wording is gone** from the deck
(`aggry beads`, `industrially produced beads`, `goes one direction`, the
crustal-rarity sentence, both `seventeen years`, the undoubled `coincidence of
wants`), copy changed **only** on the ten files the rulings name, and **R-07's
on-screen line is asserted untouched** — the one ruling that forbids a change
is gated as such.

**Visual regression.** 111 builds re-captured and diffed; every changed build
maps to a ruling:

| Slide / builds | Changed | Ruling |
|---|---|---|
| `2-01-the-world-without-it` b3 | 0.65% | R-01 |
| `2-02-the-discovery` b0–b1 | 0.24% | R-01 (inherited scene label) |
| `2-04-the-competition-record` b7–b8 | 0.80% / 0.68% | R-02 |
| `2-05-two-survivors` b0, b5 | 0.38% / 0.91% | R-02 (rail receipt) + R-03 |
| `2-07-the-severance` b3–b4 | 1.79% | R-04, R-06 (+ R4 data) |
| `2-08-the-pattern` b6 | 0.24% | R-08 |
| `3-05-the-palladium-test` b1–b5 | 1.79–1.88% | R-05 (+ R4 data) |
| `2-03-the-convergence` b1–b3 | 5.9% | **not a ruling** — the murmuration is `Math.random()`-seeded; reported, not gated |

Everything else in Sections 1–3 is pixel-identical. Slide 2.5 is reported but
not pixel-gated past b0: it gained a build, so its b5 is no longer the
baseline's b5 — build numbering diverges by design, and `builds-r4-1.cjs`
covers it properly instead.

**The new build, checked as an argument, not just as a frame.**
`builds-r4-1.cjs` counts lit cells by fate at every build of 2.5 and asserts
the waves resolve exactly as the script claims: 8 cells lit at build 5 (the
noble family), 2 at build 6 (Ag and Au, in the `alone` state), the right wave
line on each build, the verdict never early. It also re-checks the
`evolution-rail` group boundaries in both directions — 2.4 b8 → 2.5 b0
forward, 2.5 b6 → 2.6 b0 forward, and 2.6 b0 → 2.5 b6 backward landing the
end state rather than black — because a new build inside a scene group is the
one change that can desynchronize a handoff. Both variants pass.

**Pacing.** All 22 slides of Sections 1–3 re-audited: every script's `[→]`
count equals its `totalBuildSteps`. Only one count moved — 2.5, from 5/5 to
**6/6** — and the regression's structural check asserts that it is the *only*
build-count change in the diff.

| Slide | Builds | `[→]` | |
|---|---|---|---|
| 2-05-two-survivors | **6** | **6** | ✓ (was 5/5) |
| *all 21 others* | unchanged | match | ✓ |

**A baseline hazard, caught and undone.** `verify-r3-1.cjs --part=direct`
writes its screenshots into `screenshots-r3-1/` — the very directory the R4
regression uses as its Section 3 baseline. Re-running it as a check replaced
45 baseline frames with R4.1-state captures, which would have made every
later regression run report "no change" for Section 3. The frames and the
R3.1 result JSONs were restored from git; this session's re-run results live
under `review/rebuild-r4/r3-1-suite-rerun/` instead, so the R3.1 evidence the
R3 report cites stays byte-intact and the R4.1 re-run is still on the record.
The regression figures above were produced *before* the overwrite, against
the original baselines.

**Two harness updates, both recorded rather than quiet.** The R3.1 suite
carried three assertions that R4/R4.1 were authorized to break. Two were
inverted to match the deck as it now is — the palladium chart must carry *no*
`PROVISIONAL` flag and must cite its `SOURCES.md` entries; no palladium stub
may still be marked provisional — and the third, "Sections 1–2 untouched," was
retired in favor of `gates-r4.cjs`, which asserts the exact file list each
cycle was allowed to touch and is strictly stronger. The verbatim gate was
*not* waived: it now compares 3-05's installed script against the R3.1 brief
text **with the R-05 amendments applied**, and separately asserts that each
amendment's `from` string actually occurs in the brief — so a mis-specified
amendment fails loudly instead of silently comparing an unchanged text.

## R4.1.3 — Judgment calls

1. **R-03's wave line and the split point.** The ruling named the platinum
   group; the grid also had mercury, tungsten and rhenium sitting in the same
   bucket, and they are not noble. They go one build earlier, so that what
   stands at build 5 is exactly the noble family and the ruling's sentence is
   literally true on screen. Wave line: "Anything that will not hold a shape
   is out."
2. **"Remember that; it has a part to play later."** The forward reference is
   deliberate and matches the deck's existing idiom ("Remember that one;
   you're about to see the ship arrive"). It does not name palladium, so the
   3.5 reveal still lands.
3. **"not culture, not politics" survives.** R-03 was about the word
   *chemistry* doing work it could not do, not about the cadence. The line is
   now "not culture, not politics — chemistry and the forge," which keeps the
   punch and is true.
4. **R-06 uses the presenter's phrasing** — "as of 2025" — rather than the
   report's "through 2025".
5. **R-08 uses "not yet twenty years"** (the presenter's words) rather than
   the report's "not yet two decades", and is applied in both places the old
   figure appeared: the rail's entrant wound line and the 2.8 script.
6. **`SOURCES.md` entries carry the ruling, not just the fix.** Each of the
   eight now shows **✔ Ruling R-0n applied (R4.1)** with the presenter's
   reasoning and the applied wording quoted, so the audit trail records why a
   line reads the way it does, not only what it says. WIM-009 gained the
   melting points and the ore-chemistry basis for the new wave.

## R4.1.4 — State

`npm run build` clean. Ten source files changed under the eight rulings, one
new elimination wave, `docs/SOURCES.md` updated across eight entries, and the
R4.1 evidence beside the R4 evidence under `review/rebuild-r4/`.

**Zero presenter rulings remain open.** Every flag R4 raised is marked applied
and gated both ways — the new wording on stage, the old wording gone.

**Stopping here per the brief: no merge.**
