# SOURCES.md

The audit trail for every number and dated claim in the deck (rebuild brief
§9.1). One entry per claim: what is rendered or spoken, the figure used, the
source with series/publication identifiers, the retrieval date, and any
judgment note. **Ordered by deck position.**

Completed in phase R4 (30 July 2026); the eight copy rulings it raised were
ruled on and applied in **R4.1 (31 July 2026)**. Every `PROVISIONAL` stub is
resolved; no entry in this document is a placeholder. Where verified data sat
in tension with a line of copy, R4 implemented the figure and flagged the
line; R4.1 carries the presenter's ruling and the applied wording. Entries
that went through that loop are marked **✔ Ruling R-0n applied** and quote
what is on stage now — see `docs/r4-report.md` §R4.1 for the full record.

Charted data is embedded as static files in the repo — `src/data/purchasing-power.js`
(WIM-FX-001…004) and `src/data/palladium.js` (WIM-PD-001/002) — with no
runtime fetching. Each file's header names its `SOURCES.md` entry.

**Retrieval convention.** All web retrievals below are dated 2026-07-30
unless stated. Where an organization publishes an API, the endpoint is given
so the figure can be re-pulled and checked.

---

# Section 1 — The Question

## WIM-001 — 80,000 working hours in a lifetime

- **Rendered:** "Eighty Thousand Hours"; the counter running to 80,000; "This
  is how many hours of your life you will spend working." **Spoken:** "A year
  of full-time work is about two thousand hours. A full-time working life —
  call it forty years — is eighty thousand."
- **Appears:** Slide 1.1 (`1-01-eighty-thousand-hours`), builds 1–2.
- **Figure:** 80,000 hours = 40 years × 2,000 hours/year.
- **Basis:** The arithmetic is stated on stage and is the whole claim: a
  full-time year of roughly 50 weeks × 40 hours ≈ 2,000 hours, over a working
  life of roughly 40 years. For scale against real data: U.S. BLS American
  Time Use Survey and OECD average-annual-hours-worked series put actual
  average annual hours below 2,000 in most advanced economies (OECD's series
  is ~1,700–1,800 for the U.S. and lower in Europe), because they include
  part-time work, leave and unemployment. The figure is also the one
  popularized by the "80,000 Hours" research organization (80000hours.org)
  using the same 40 × 2,000.
- **Judgment note:** this is a **round order-of-magnitude figure for a
  full-time career**, not a population average, and the *script* frames it
  that way ("call it forty years"). It is deliberately the high, simple
  number; a presenter asked "is that the average?" should answer no — it is a
  full-time career, and the average is lower.
- **✔ Ruling R-07 applied (R4.1).** The presenter ruled the on-screen line
  untouched — "the cold open's punch is non-negotiable" — and moved the
  qualifier into the script, which already carried it implicitly. The spoken
  line now reads "A year of full-time work is about two thousand hours. **A
  full-time working life** — call it forty years — is eighty thousand." The
  on-screen sentence stands exactly as written. A presenter asked "is that
  the average?" still answers no: it is a full-time working life, and the
  spoken line now says so.
- **Date recorded:** 2026-07-28 · completed 2026-07-30

---

## WIM-006 — The three "most used good" framings

- **Spoken:** "It is one side of nearly every trade on Earth." · "It is the
  most used good in human civilization." · "And there is not one hour of
  school — anywhere — on what it actually is."
- **Appears:** Slide 1.3 (`1-03-what-is-money`), builds 2–4. Nothing numeric
  appears on screen.
- **Basis:** **Presenter framing, not sourced statistics.** All three are
  rhetorical order-of-magnitude statements. The first is true in the trivial
  sense that a monetary economy prices and settles nearly all exchange in
  money, and false for barter, gift, and in-kind transfers, which are not
  counted anywhere comprehensively; no statistical series measures "share of
  trades with money on one side." The third is a generalization about
  curricula that admits obvious counterexamples (personal-finance mandates
  now exist in many U.S. states and in England's citizenship curriculum),
  and the script's own scope — "on what it actually *is*" rather than on
  budgeting — is what keeps it defensible.
- **Judgment note:** recorded here so that no future reader mistakes these
  for measured claims. They are stage rhetoric and should never be given a
  figure or a citation on screen. Per the brief (§1.3) this is the intended
  treatment.
- **Date recorded:** 2026-07-30

---

# Section 2 — Where Money Comes From

## WIM-007 — The coincidence of wants

- **Rendered:** "The double coincidence of wants." **Spoken:** "Economists
  call this the double coincidence of wants: for direct exchange to work, you
  must want exactly what I have, and I must want exactly what you have, at
  the same time, in the right amounts."
- **Appears:** Slides 2.1 (`2-01-the-world-without-it`, build 3) and 2.2
  (`2-02-the-discovery`, inherited scene label).
- **Basis:** The term of art is the **double** coincidence of wants, coined by
  William Stanley Jevons, *Money and the Mechanism of Exchange* (1875), ch. 1:
  barter requires "a double coincidence, which will rarely happen." The
  deck's definition of the condition is exactly Jevons's; the name is missing
  a word.
- **✔ Ruling R-01 applied (R4.1).** The presenter adopted the standard term.
  One word inserted in both places — the on-screen label on 2.1 and 2.2, and
  the spoken attribution. The deck's gloss was already Jevons's; now the name
  is too.
- **Source:** Jevons, W. S., *Money and the Mechanism of Exchange*, London:
  Macmillan, 1875, ch. 1 (full text: Online Library of Liberty /
  Econlib). Retrieved 2026-07-30.
- **Date recorded:** 2026-07-30

---

## WIM-008 — Salability as the property the competition selects on

- **Spoken:** "Some goods are easier to sell on than others — and that
  property has a name: salability."
- **Appears:** Slide 2.2 (`2-02-the-discovery`), build 4.
- **Basis:** Carl Menger, "On the Origins of Money" (*Economic Journal*, 1892,
  trans. C. A. Foley) and *Grundsätze der Volkswirthschaftslehre* (1871), ch.
  VII–VIII: money emerges from the differing *Absatzfähigkeit* —
  saleableness / salability — of goods, without decree. The deck's emergence
  account (nobody invents it; convergence on the most salable good) is
  Menger's, and 2.3's "emergent order — like language" is Menger's own
  analogy.
- **Judgment note:** the deck does not attribute this on stage, where it
  attributes Boyapati (WIM-012). That is a defensible asymmetry — the stages
  framing is a specific modern synthesis, salability is textbook — but a
  presenter asked "whose idea is this?" should be able to say Menger, 1892.
- **Date recorded:** 2026-07-30

---

## WIM-005 — The shell defeat: "West Africa, 1800s"

- **Rendered:** SHELLS wound — "Scarce only until someone reaches the right
  beach — supply one ship away from collapse." Receipt line — **"West Africa,
  1800s: shiploads of cheaper Zanzibar cowries collapsed the shell rate.
  Local savings, out-supplied."** **Spoken:** "When European ships began
  landing thousands of tons of cheaper Zanzibar cowries in West Africa, the
  shells' scarcity … collapsed. … They were out-*supplied*."
- **Appears:** Slide 2.4 (`2-04-the-competition-record`), build 7 — the rail's
  SHELLS stop; the wound and receipt live in `EvolutionRail.js`.
- **What the record supports.** The best-documented case of a West African
  money destroyed by supply expansion is **cowrie shells, not aggry beads** —
  and the rail's stop is labelled SHELLS and drawn with the cowrie glyph, so
  the documented case is the one the visual already shows. Jan Hogendorn and
  Marion Johnson, *The Shell Money of the Slave Trade* (Cambridge University
  Press, African Studies 49, 1986) document: cowries (*Cypraea moneta*) as
  regular market currency across much of West Africa; erosion of the stable
  rate (3,000 to the gold mithqal) already underway in the first half of the
  19th century, with Barth recording 3,800 at Timbuktu in the 1850s; then a
  "second and general great inflation" caused by the importation of thousands
  of tons of cheaper Zanzibar *Cypraea annulus*; and colonial administrations
  displacing cowries with low-value coin because of the inflation. That is
  precisely "out-supplied," with a peer-reviewed source and a date range.
- **What the record does not support.** Three problems with the receipt line
  as written. (1) **"aggry beads"** names the wrong object: aggry (akori)
  beads are the scarce antique beads prized in West Africa; the goods
  European traders shipped in bulk were newly manufactured glass beads, not
  aggry. (2) **"industrial shipping"** in the 1500s is anachronistic — the
  Atlantic bead trade begins in the 16th century, but mass *industrial* glass
  production (Bohemia, Birmingham) is 18th–19th century; the 1500s date
  belongs to the start of the trade, not to industrial supply. (3) **"Local
  savings, wiped out by supply"** for beads specifically rests on popular
  accounts — Nick Szabo, "Shelling Out: The Origins of Money" (2002), and
  Saifedean Ammous, *The Bitcoin Standard* (2018), ch. 2 — rather than on
  quantitative economic history. The V&A's public scholarship
  ("From culture to currency: glass beads and the transatlantic slave
  trade") supports the *mechanism* — European glassmaking was commonplace
  while the technology was rare in West Africa, so imported beads traded
  against scarce local resources — but not the savings-destruction figure.
- **✔ Ruling R-02 applied (R4.1).** The presenter adopted the drawn fix: the
  stop is SHELLS with the cowrie glyph, so the receipt became the Zanzibar
  cowrie inflation — "one object, one century, one citable source, same
  out-supplied punchline." The receipt and the script sentence above are the
  applied wording; the rest of the paragraph, including "They were
  out-*supplied*", is unchanged. Aggry beads leave the deck: the claim they
  carried is now made about the object the glyph already showed, with
  Hogendorn & Johnson behind it.
- **Sources:** Hogendorn & Johnson, *The Shell Money of the Slave Trade*, CUP
  1986 (ISBN 9780521541107); Victoria & Albert Museum, "From culture to
  currency: glass beads and the transatlantic slave trade"; Szabo, "Shelling
  Out" (2002). Retrieved 2026-07-30.
- **Date recorded:** 2026-07-28 · revised 2026-07-30

---

## WIM-009 — Chemistry narrows the table to silver and gold

- **Rendered:** "Run the competition over the whole table." · the four wave
  lines · **"Workable nobility leaves two."** **Spoken:** "The gases are out …
  Everything that rusts, burns, or dissolves in water — out … The radioactive
  row — out … And strip away what will not hold a shape … What's left is a
  small family: the noble metals … And now the furnace decides. The platinum
  group melts at temperatures no ancient furnace could reach, and hides in
  ores no ancient chemist could crack — which is why the world would not even
  meet one of them until 1803 … not culture, not politics — chemistry and the
  forge leave you two survivors: silver, and gold."
- **Appears:** Slide 2.5 (`2-05-two-survivors`), builds 1–6.
- **Basis:** The elimination is standard chemistry and each step is sound.
  Gases and the noble gases are excluded by state at STP; the alkali and
  alkaline-earth metals by reactivity (they oxidize or react with water);
  the lanthanides, actinides and technetium/promethium by radioactivity or
  instability; iron and most transition metals by corrosion. What survives on
  chemical grounds is the set of **noble metals** — commonly enumerated as
  ruthenium, rhodium, palladium, silver, osmium, iridium, platinum and gold,
  and in the popular form of this argument as the five "precious" ones:
  rhodium, palladium, silver, platinum, gold.
- **Judgment note — the five-to-two step.** Chemistry alone does not leave
  *two*. Narrowing five to two rests on (a) melting point and workability:
  rhodium (1,964 °C), platinum (1,768 °C) and palladium (1,555 °C) could not
  be melted or refined with pre-modern furnaces, whereas gold (1,064 °C) and
  silver (962 °C) could; and (b) historical availability: platinum was
  unknown to the Old World until the 18th century and palladium until 1803
  (WIM-PD-004). The script's "what can't be worked" is doing step (a), which
  is a physical property and fair; step (b) is history, not chemistry.
- **✔ Ruling R-03 applied (R4.1) — one new elimination wave.** The presenter
  ruled the collision real and the fix strengthening: "the noble metals
  survive chemistry, but the platinum group melts at temperatures no ancient
  furnace could reach and hides in ores no ancient chemist could crack;
  workable nobility leaves two. Which quietly explains why palladium waited
  until 1803 — the collision becomes a setup." Implemented as a genuine sixth
  build. The `ElementGrid`'s step 4 used to carry two cuts at once; it now
  splits: **step 4** removes what will not hold a shape (mercury pours;
  tungsten and rhenium cannot be worked), leaving the noble family — Ru, Rh,
  Pd, Os, Ir, Pt, Ag, Au — visibly standing; **step 5**, the furnace wave,
  takes the six platinum-group metals and leaves silver and gold alone. The
  audience now watches chemistry leave eight and the forge leave two.
  Verdict copy: "Workable nobility leaves two."
- **Basis for the new wave.** Melting points: Rh 1,964 °C, Pt 1,768 °C,
  Pd 1,555 °C, Ru 2,334 °C, Os 3,033 °C, Ir 2,466 °C — against Au 1,064 °C
  and Ag 962 °C, the only two a pre-modern furnace could melt and cast. And
  the PGMs occur intergrown with one another in the same ores, chemically
  inert and separable only by wet chemistry that did not exist before the
  late 18th century: that is why platinum reached Europe as an unworkable
  curiosity and why Wollaston had to dissolve platinum in aqua regia to find
  palladium at all (WIM-PD-004). The deck's 1803 beat is now set up two
  sections earlier.
- **Sources:** standard reactivity/radioactivity classifications (Royal
  Society of Chemistry periodic table; CRC Handbook of Chemistry and
  Physics); melting points, RSC element pages. The popular form of the
  argument: Visual Capitalist, "Why Gold is Money: A Periodic Perspective,"
  and NPR Planet Money, "A Chemist Explains Why Gold Beat Out Lithium,
  Osmium, Einsteinium" (2011), both retrieved 2026-07-30.
- **Date recorded:** 2026-07-30

---

## WIM-003 — 1971: the closing of the gold redemption window

- **Rendered:** "1971." large and alone. **Spoken:** "So in August 1971, the
  redemption window closes. Officially temporary; permanent ever since."
- **Appears:** Slide 2.7 (`2-07-the-severance`), builds 1–2.
- **Figure:** August 15, 1971.
- **Basis:** In a televised address on Sunday **15 August 1971**, President
  Nixon announced: *"I have directed Secretary Connally to suspend
  temporarily the convertibility of the dollar into gold or other reserve
  assets, except in amounts and conditions determined to be in the interest
  of monetary stability and in the best interests of the United States."*
  Convertibility was never restored; the Bretton Woods par-value system was
  formally abandoned in 1973 and the IMF Articles amended in 1978. The
  deck's "officially temporary; permanent ever since" is exactly the
  president's own word — *temporarily* — against the outcome.
- **Judgment note:** the suspension applied to **official** (foreign
  central-bank) convertibility; private U.S. citizens had been unable to
  redeem dollars for gold since 1933 and could not legally hold monetary
  gold until 1974. The deck's narrative — "other countries start showing up
  with dollars, asking for the metal" — correctly describes the official
  channel, so the framing is accurate; a presenter should be ready to make
  the official/private distinction if challenged.
- **Sources:** Federal Reserve History, "Nixon Ends Convertibility of U.S.
  Dollars to Gold and Announces Wage/Price Controls"
  (federalreservehistory.org/essays/gold-convertibility-ends); Nixon,
  "Address to the Nation Outlining a New Economic Policy," 15 August 1971;
  Executive Order 11615 (the wage-price freeze issued the same day).
  Retrieved 2026-07-30.
- **Date recorded:** 2026-07-28 · completed 2026-07-30

---

## WIM-011 — "Taxes are payable in it, and only in it"

- **Spoken:** "And to be precise about what keeps it in use now: law. Taxes
  are payable in it, and only in it." Nothing on screen.
- **Appears:** Slide 2.7 (`2-07-the-severance`), build 2.
- **Basis:** U.S. federal tax liabilities are denominated and discharged in
  U.S. dollars; the IRS accepts payment only in dollars (cash, cheque, card
  and electronic transfer are all dollar-denominated instruments), and
  property received in kind is valued in dollars. 31 U.S.C. §5103 makes
  Federal Reserve notes legal tender for "all debts, public charges, taxes,
  and dues." The same structure holds in every issuing jurisdiction the deck
  charts.
- **Judgment note:** the "only" is right in substance and slightly strong in
  form — a handful of jurisdictions have experimented with accepting other
  assets for some payments, and taxpayers can settle in kind in unusual
  cases, but the liability is always *denominated* in the state's unit. The
  claim the argument needs is the denomination, which is unambiguous. Not
  flagged: the script's point is the legal anchor, and the legal anchor is
  real.
- **Source:** 31 U.S.C. §5103 (legal tender); IRS payment guidance.
  Retrieved 2026-07-30.
- **Date recorded:** 2026-07-30

---

## WIM-FX-001 — USD purchasing power, 1971 = 100

- **Rendered:** the USD line on "What one unit still buys."; the index note
  "Purchasing power of one unit · 1971 = 100". No point values on screen.
- **Appears:** Slide 2.7 (`2-07-the-severance`), builds 3–4.
- **Figures:** CPI-U annual averages, 1982-84 = 100: **1971 = 40.5**,
  **2025 = 321.943**. Purchasing power 1971 = 100 → **2025 = 12.58**. One
  1971 dollar buys 12.58% of what it bought in 1971; equivalently the price
  level is 7.95× higher.
- **Source:** U.S. Bureau of Labor Statistics, Consumer Price Index for All
  Urban Consumers (CPI-U), U.S. city average, all items, not seasonally
  adjusted. **Series ID `CUUR0000SA0`**, annual averages (period `M13`).
  Pulled from the BLS public API v2
  (`https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0?startyear=…&endyear=…&annualaverage=true`),
  all 55 years 1971–2025. Retrieved 2026-07-30.
- **Judgment note — the 2025 annual average.** October 2025 CPI was never
  published: the BLS record carries footnote X, "Data unavailable due to the
  2025 lapse in appropriations." BLS's published 2025 annual average
  (321.943) is therefore the mean of eleven months, which this session
  verified by recomputing it from the available months — the two agree
  exactly. The figure is BLS's own; the eleven-month basis is disclosed here
  and in `src/data/purchasing-power.js`.
- **Date recorded:** 2026-07-30

---

## WIM-FX-002 — GBP purchasing power, 1971 = 100

- **Rendered:** the GBP line on the same chart. No point values on screen.
- **Appears:** Slide 2.7 (`2-07-the-severance`), builds 3–4.
- **Figure:** purchasing power 1971 = 100 → **2025 = 9.06** (price level
  11.03× higher). The weakest of the four lines.
- **Series used — CPIH-consistent long run.** ONS modelled historical CPIH,
  **series `JF4D`** (1965 = 100), monthly Jan 1949 – Dec 1988, annual
  averages; spliced at 1988 to the published CPIH all-items index, **series
  `L522`** (2015 = 100), annual, 1988–2025. 1971 = 131.84 and 1988 = 508.03
  on the historical basis; L522 1988 = 48.2 and 2025 = 138.0.
- **Why this series, and what the alternatives show.** The brief asked for a
  reasoned choice. Three defensible long runs exist for the UK and they do
  not agree:

  | Series | 2025 purchasing power (1971 = 100) | Price multiple |
  |---|---|---|
  | RPI long run (`CDKO`, Jan 1974 = 100) | 5.04 | 19.86× |
  | CPI-consistent (modelled `JF2G`-class + `D7BT`) | 7.89 | 12.67× |
  | **CPIH-consistent (chosen)** | **9.06** | **11.03×** |

  CPIH was chosen for three reasons. (1) **Concept comparability:** the other
  three currencies on this chart are measured by their national headline
  consumer price indices, all of which capture owner-occupied housing through
  rental equivalence or actual rents; CPIH does the same, while RPI includes
  mortgage-interest payments — which in the UK's high-rate 1970s and 1980s
  makes RPI a cost-of-living-including-debt-service measure rather than a
  measure of what one unit buys. (2) **Standing:** the UK Statistics
  Authority removed RPI's National Statistic designation in 2013 and the ONS
  advises against its use; CPIH is the ONS's lead measure. (3) **Direction of
  error:** CPIH-consistent is the most conservative of the three — it shows
  the *smallest* decline — so the deck cannot be accused of choosing the
  series that flatters its argument. The trade-off is disclosed: the ONS
  labels the pre-1988 estimates "not National Statistics … modelled and
  provided purely for indicative purposes."
- **Sources:** ONS time series `JF4D` and `L522` via
  `https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/<id>/mm23/data`;
  the pre-1988 estimates from ONS, "Consumer price inflation, historical
  data, UK 1950 to 1988" (`publicationtablesdataset.xlsx`, released
  18 May 2022) and its methodology article, "Consumer price inflation,
  historical estimates, UK, 1950 to 1988 – methodology". RPI comparison from
  series `CDKO`, "Retail Prices Index: Long run series: 1800 to 2024".
  Retrieved 2026-07-30.
- **Date recorded:** 2026-07-30

---

## WIM-FX-003 — JPY purchasing power, 1971 = 100

- **Rendered:** the JPY line on the same chart. No point values on screen.
- **Appears:** Slide 2.7 (`2-07-the-severance`), builds 3–4.
- **Figures:** Japan CPI, 2020-base, All items (総合), annual averages:
  **1971 = 32.9**, **2025 = 111.9**. Purchasing power 1971 = 100 →
  **2025 = 29.40** (price level 3.40× higher).
- **Source:** Statistics Bureau of Japan / e-Stat, Consumer Price Index
  2020-base, "長期時系列データ 中分類指数 全国 年平均" (long-term time
  series, group indices, Japan, annual average), file `statInfId=000032103936`
  via `https://www.e-stat.go.jp/stat-search/file-download?statInfId=000032103936&fileKind=1`,
  column 総合 / "All items", years 1970–2025. Cross-checked against the
  Statistics Bureau's own summary page for 2025 (stat.go.jp/english/data/cpi/158c.html),
  which states the 2025 all-items annual average as 111.9, +3.2% on the year.
  Retrieved 2026-07-30.
- **Judgment note:** Japan's 総合 index includes imputed rent for
  owner-occupied housing, consistent with the treatment in the other three
  series. The longer series that reaches back to 1947 is the *ex-imputed-rent*
  variant and is not used here, so all four currencies are on the same
  housing convention.
- **Date recorded:** 2026-07-30

---

## WIM-FX-004 — CHF purchasing power, 1971 = 100

- **Rendered:** the CHF line on the same chart, **the strongest of the four**
  — the honesty point of including it. **Spoken:** "Every line on this chart
  — including the strongest currency of the era, the Swiss franc — goes one
  direction."
- **Appears:** Slide 2.7 (`2-07-the-severance`), builds 3–4.
- **Figures:** Swiss CPI (Landesindex der Konsumentenpreise), December
  2010 = 100, annual averages computed from the twelve monthly values:
  **1971 = 33.8028**, **2025 = 100.4144**. Purchasing power 1971 = 100 →
  **2025 = 33.66** (price level 2.97× higher).
- **Verified:** CHF *is* the strongest line at every year of the window and at
  the end (33.66 against JPY 29.40, USD 12.58, GBP 9.06), and it declines
  over the span. The brief required this to be checked rather than assumed;
  it holds.
- **Source:** Swiss National Bank data portal, cube **`plkopr`**
  (Landesindex der Konsumentenpreise), series `LD2010100`, monthly from
  January 1921, via `https://data.snb.ch/api/cube/plkopr/data/csv/en`;
  published by the Swiss Federal Statistical Office (BFS) and redistributed
  by the SNB. 2026 is excluded as incomplete (six months at retrieval).
  Retrieved 2026-07-30.
- **Date recorded:** 2026-07-30

---

## WIM-FX-005 — The chart's shape: "every line goes one direction"

- **Spoken:** "Every line on this chart — including the strongest currency of
  the era, the Swiss franc — ends far below where it began. Not one
  government's scandal. Every issuer, every continent, the same slope."
- **Appears:** Slide 2.7 (`2-07-the-severance`), build 3.
- **What the real data shows.** Over the full span every line ends far below
  where it started, and the ordering is stable. Year to year the lines are
  **not** monotonic, because deflation raises purchasing power: JPY rises in
  12 of the 54 year-steps, CHF in 7, USD in 1 (2009), GBP in none. The
  largest single-year rise is JPY +0.46 index points (2009) and CHF +0.42
  (2015) — under 2 px on this chart at 1920×1080, but real.
- **✔ Ruling R-04 applied (R4.1).** The presenter adopted the precise
  phrasing: **"every line ends far below where it began."** Unambiguously
  true of all four series, a larger claim rhetorically than the one it
  replaces, and immune to the deflation-year objection.
- **Verified — "the strongest currency of the era."** True as stated. CHF is
  the highest line at the end of the window and in 51 of the 55 years; the
  dollar sat above it only in **1972–1975**, before Swiss inflation fell
  below US inflation for good. The claim is about the era and the era bears
  it out.
- **✔ Ruling R-06 applied (R4.1).** The presenter adopted the "as of 2025"
  fix. The on-screen index note now reads **"Purchasing power of one unit ·
  1971 = 100 · as of 2025"**, so the chart states its own window and the
  spoken "still buys" has a date attached to it. The script is unchanged.
- **Date recorded:** 2026-07-30

---

## WIM-004 — 2009: the entrant's launch, and "seventeen years"

- **Rendered:** the entrant line; "Not yet twenty years into a hundred-year
  question." **Spoken:** "In 2009, something appeared that had never existed
  before … It is not yet twenty years into a hundred-year question."
- **Appears:** Slide 2.8 (`2-08-the-pattern`), builds 5–6; the "2009–" start
  year recurs at 3.7 (WIM-BTC-002).
- **Figures:** 2009; 2026 − 2009 = 17.
- **Basis:** The Bitcoin genesis block was mined **3 January 2009** (block 0,
  timestamp 2009-01-03 18:15:05 UTC); the white paper was published 31
  October 2008 and the network's first transaction was 12 January 2009. The
  "hundred-year question" is the deck's own framing device (Section 4's
  100-Year Test), not an external statistic.
- **✔ Ruling R-08 applied (R4.1).** "Seventeen years" is replaced everywhere
  it appeared — the rail's entrant wound line in `EvolutionRail.js` and the
  2.8 script — by **"not yet twenty years into a hundred-year question."**
  Honest at any point between 2009 and 2029, and it survives past the
  recording date, which was the presenter's stated reason. The underlying
  figure (2026 − 2009 = 17) is unchanged and recorded here.
- **Source:** the Bitcoin genesis block, verifiable on any full node or block
  explorer; Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System"
  (2008). Retrieved 2026-07-30.
- **Date recorded:** 2026-07-28 · completed 2026-07-30

---

# Section 3 — What Money Must Do

## WIM-AR-001 — Argentina: five decades of separated functions

- **Rendered:** kicker "Argentina, five decades."; the row **dollars · pesos ·
  dollars · real estate**. **Spoken:** "Argentina has been the world's
  clearest demonstration for fifty years. Apartments are priced and sold in
  dollars. Daily life is paid in pesos. And savings go into dollars and real
  estate — Argentines literally call it 'saving in bricks' … this pattern has
  persisted across administrations of every stripe — left, right, military,
  civilian."
- **Appears:** Slide 3.2 (`3-02-the-functions-separate`), build 2. No figures
  on screen.
- **Basis, claim by claim.**
  - *Dollar-priced real estate.* Argentine residential property is quoted,
    negotiated and settled in U.S. dollars; the convention dates to the
    1970s inflation crisis, which established the dollar as the pricing and
    transaction currency of the property market. Documented in the IMF's
    survey of Latin American dollarization ("Dollar Dependence," *Finance &
    Development*, September 2016), which describes households and firms in
    these economies coming to "use foreign currencies — typically the dollar
    — to save and to buy and sell big items like real estate," and in the
    BCRA's own working-paper series ("Financial Dollarization in Argentina: A
    Historical Analysis of a Current Restriction," Central Bank of Argentina
    working paper 2021/95).
  - *Pesos for daily life.* Wages, retail prices and everyday settlement are
    peso-denominated; this is uncontested.
  - *Savings in dollars and bricks.* Household savings concentrate in
    U.S. dollars, much of it held outside the banking system, and in real
    estate — *ladrillos*, bricks — which has functioned as the standard
    inflation shelter. Financial dollarization of private deposits reached
    roughly 60% by 1999 (Federal Reserve Bank of Chicago, *Chicago Fed
    Letter*, "Dollarization in Argentina," June 1999).
  - *"Five decades."* The pattern is dated from the mid-1970s — the
    *Rodrigazo* of June 1975 and the inflation regime that followed. 2026 −
    1975 ≈ 51 years, so "five decades" and "fifty years" are correct.
  - *Cross-administration persistence.* The span covers the 1976–83 military
    government, the Alfonsín and Menem administrations, the 2001–02 collapse
    and *corralito*, the Kirchner years and their exchange controls, Macri's
    liberalization, the 2019–23 controls, and the Milei stabilization from
    December 2023. Peso instability and dollar-denominated property persist
    across all of them, which is the script's point.
- **Judgment note:** the political-neutrality claim is the load-bearing one
  and it is the best-supported: no administration of any stripe in the window
  produced a peso that Argentines saved in. Nothing numeric is asserted on
  stage, which is the right call — the underlying figures (informal dollar
  holdings especially) are estimates.
- **Sources:** IMF, *Finance & Development*, September 2016, "Dollar
  Dependence"; BCRA working paper 2021/95; Chicago Fed Letter, June 1999.
  Retrieved 2026-07-30.
- **Date recorded:** 2026-07-29 · completed 2026-07-30

---

## WIM-012 — The four stages of monetization, after Boyapati

- **Rendered:** kicker "after Vijay Boyapati."; the ladder's four stages
  COLLECTIBLE → STORE OF VALUE → MEDIUM OF EXCHANGE → UNIT OF ACCOUNT.
  **Spoken:** "The framing follows Vijay Boyapati. Monetary goods have
  historically climbed four stages."
- **Appears:** Slide 3.3 (`3-03-the-order-of-monetization`), builds 1–6; the
  ladder returns at 3.4 and 3.7.
- **Basis:** Vijay Boyapati, "The Bullish Case for Bitcoin," first published
  2 March 2018 (Medium; later expanded into a book), which sets out
  monetization in four stages — collectible, store of value, medium of
  exchange, unit of account — and argues the store-of-value role precedes the
  medium-of-exchange role. The deck's gate logic ("nobody accepts as payment
  what they don't expect to hold value") and its stage-signature point
  (volatility as a property of the stage) follow the same essay. The
  underlying emergence theory is Menger's (WIM-008).
- **Judgment note:** attribution is on screen and correct. The deck adds its
  own claim — that collectible is a *pre-monetary* stage rather than one of
  the three functions — which is an R3.1 clarification of Boyapati, not
  Boyapati's own wording.
- **Source:** Boyapati, "The Bullish Case for Bitcoin" (2018),
  vijayboyapati.medium.com. Retrieved 2026-07-30.
- **Date recorded:** 2026-07-30

---

## WIM-013 — "Gold spent millennia as a collectible curiosity"

- **Spoken:** "Gold itself spent millennia as a collectible curiosity before
  it was anyone's savings — if you'd judged it in that stage by its price
  behavior, you'd have judged the stage, not the metal."
- **Appears:** Slide 3.4 (`3-04-stage-signatures`), build 2. Nothing on
  screen.
- **Basis:** Gold was worked ornamentally for millennia before it served a
  monetary role: the Varna necropolis gold (Bulgaria, c. 4600–4200 BCE) is
  the oldest substantial worked-gold assemblage; Egyptian and Mesopotamian
  goldwork spans the third and second millennia BCE; the first gold coinage
  is Lydian, c. 610–560 BCE, and gold-silver bimetallic coinage under
  Croesus c. 560–546 BCE. Several millennia therefore separate gold as
  prestige object from gold as struck money — the deck's "millennia" is
  conservative.
- **Judgment note:** "collectible curiosity" is the deck's stage vocabulary
  (WIM-012) rather than an archaeological term, and "before it was anyone's
  savings" is a simplification — stored gold ornaments were a store of value
  in a loose sense long before coinage. The claim the argument needs is the
  long pre-monetary phase, which is solid. Not flagged.
- **Sources:** Varna necropolis excavation literature (Ivanov, 1970s
  onwards); standard numismatic dating of Lydian electrum and Croeseid
  coinage. Retrieved 2026-07-30.
- **Date recorded:** 2026-07-30

---

## WIM-PD-001 — Palladium versus gold: annual mine supply

- **Rendered:** panel title **"ANNUAL MINE SUPPLY · TONNES"**; rows
  **"GOLD  3,280 t"** and **"PALLADIUM  217 t"** with relative bar lengths;
  note "world mine production, 2024 — shorter is scarcer".
- **Appears:** Slide 3.5 (`3-05-the-palladium-test`), builds 2–5.
- **Figures:** world total mine production, **2024**: gold **3,280 t**,
  palladium **217 t** (USGS prints 217,000 kg). Ratio ≈ **15×**. The same
  edition's 2025 estimates are 3,300 t and 190 t (≈17×); the deck plots the
  2024 actuals, and both metals are taken from one edition of one source so
  the comparison is like-for-like.
- **Source:** U.S. Geological Survey, *Mineral Commodity Summaries 2026*:
  the Gold chapter (`pubs.usgs.gov/periodicals/mcs2026/mcs2026-gold.pdf`,
  "Data in metric tons", world total mine production 3,280 / 3,300ᵉ) and the
  Platinum-Group Metals chapter
  (`pubs.usgs.gov/periodicals/mcs2026/mcs2026-platinum-group.pdf`, "Data in
  kilograms", palladium world total 217,000 / 190,000ᵉ). Retrieved
  2026-07-30.
- **Why this metric and not crustal rarity — the R4 finding.** The panel
  previously said CRUSTAL RARITY. It cannot, because standard references
  disagree about the **direction** of the comparison, not merely its
  magnitude:

  | Reference | Gold | Palladium | Implies |
  |---|---|---|---|
  | CRC Handbook-class values | ~0.004 ppm | ~0.015 ppm | palladium **more** abundant |
  | Rudnick & Gao (2003), upper continental crust | ~1.5 ppb | ~0.52 ppb | palladium **less** abundant |
  | Wedepohl (1995), continental crust | ~2.5 ppb | ~0.4 ppb | palladium **less** abundant |

  Crustal abundance for both metals is estimated at parts-per-billion
  concentrations from sparse sampling, and the estimates scatter by more than
  an order of magnitude. A comparison whose sign depends on which reference
  you open cannot be asserted on screen, and massaging it would be exactly
  the failure the brief forbade. Annual mine supply is unambiguous, agreed
  across sources, and the fact that actually bears on a monetary argument:
  how much new metal the world must absorb each year.
- **✔ Ruling R-05 applied (R4.1).** The presenter adopted the supply-anchored
  hook. On screen: **"Palladium: scarcer in supply than gold. Genuinely
  useful. At times more expensive. It never became money."** Spoken:
  **"Scarcer in supply than gold: the world mines about fifteen times as much
  gold each year"** — a figure now standing on the panel behind the presenter
  — and, at the 1803 beat, "palladium is discovered — **scarcer** than gold".
  "Rarer in the Earth's crust than gold" is gone from the deck: it was the one
  sentence in the beat no source could carry. The argument is unchanged and
  lands harder, because the scarcity is measured rather than contested.
- **Context, not rendered:** above-ground stocks tell the same story from the
  other side — the World Gold Council estimates roughly **216,265 t** of gold
  mined and still above ground at end-2024, of which ~37,755 t sits in
  central banks and official reserves; no comparable above-ground palladium
  stock is published, and industry estimates run to a few thousand tonnes at
  most, most of it in working autocatalyst inventory rather than in savings.
  (World Gold Council, "How much gold has been mined?", gold.org/goldhub.)
- **Date recorded:** 2026-07-29 · replaced 2026-07-30

---

## WIM-PD-002 — Palladium versus gold: the price record

- **Rendered:** panel title **"PRICE OF ONE OUNCE · MODERN ERA"**; two
  plotted series with a log value axis and axis years 1990/2000/2010/2020.
  No point values on screen. **Spoken:** "There have been long stretches
  where an ounce of palladium cost *more* than an ounce of gold." · "There
  have been years when palladium was the more expensive metal, ounce for
  ounce."
- **Appears:** Slide 3.5 (`3-05-the-palladium-test`), builds 2–5.
- **Figures:** LBMA daily benchmark prices, **USD per troy ounce**, arithmetic
  mean of every published fixing in each calendar year, **1990–2025**, one
  vertex per year. Endpoints: gold 383.56 (1990) → 3,431.54 (2025);
  palladium 108.75 (1990) → 1,151.40 (2025). Extremes in window: palladium
  low 88.13 (1992), palladium high 2,398.28 (2021), gold high 3,431.54
  (2025).
- **Verified — the crossings.** On annual averages palladium closed **above**
  gold in exactly two stretches, each four years long: **1999–2002**
  (peaking 680.33 against gold's 279.10 in 2000) and **2019–2022** (peaking
  2,398.28 against gold's 1,798.61 in 2021). Palladium is below gold in every
  other year of the window, and from 2023 onward. "Long stretches," plural,
  is therefore correct — and the real record is a better fit for the claim
  than the provisional shape it replaces, which had modelled a single 2001
  spike.
- **Source:** London Bullion Market Association, LBMA Gold Price PM
  (`https://prices.lbma.org.uk/json/gold_pm.json`, daily from 1 April 1968)
  and LBMA/LPPM Palladium Price PM
  (`https://prices.lbma.org.uk/json/palladium_pm.json`, daily from 2 April
  1990); USD column. Retrieved 2026-07-30.
- **Judgment notes.** (1) One convention for both metals — PM fixing, annual
  arithmetic mean — stated here and in `src/data/palladium.js`. (2) The LBMA
  palladium series begins 2 April 1990, so the 1990 palladium average covers
  April–December (187 fixings) against gold's full year (251); the plotted
  1990 palladium point is therefore a nine-month mean. (3) 2026 is excluded
  as incomplete (146 fixings at retrieval). (4) The panel is titled MODERN
  ERA rather than by its year span because gold was no longer the world's
  money in daily use across this window; it held the store-of-value role
  only (WIM-PD-003), and the beat says so out loud rather than letting the
  chart imply otherwise.
- **Date recorded:** 2026-07-29 · replaced 2026-07-30

---

## WIM-PD-003 — Central banks hold gold, not palladium

- **Rendered:** "And when gold's role narrowed to store of value, palladium
  never touched that either. Central banks hold gold — not palladium."
  **Spoken:** "No central bank holds palladium reserves."
- **Appears:** Slide 3.5 (`3-05-the-palladium-test`), build 4.
- **Basis — the positive half.** Monetary gold is a reserve asset in the
  IMF's framework: reserve assets comprise monetary gold, SDRs, the reserve
  position in the IMF, and "other reserve assets" (currency and deposits,
  securities, financial derivatives, other claims). "Monetary gold is gold to
  which the monetary authority has title and that is held as a reserve
  asset." Official gold holdings are reported to the IMF and compiled by the
  World Gold Council; central banks and official institutions hold roughly
  37,755 t.
- **Basis — the negative half.** No other metal appears anywhere in the
  reserve-asset taxonomy. Gold is the only commodity that qualifies, so
  palladium is excluded by the definition of a reserve asset rather than by
  the absence of a particular holding. That is the right form of proof for a
  negative existence claim, as the R3.1 stub anticipated.
- **Edge case checked and cleared — Russia's Gokhran.** Russia's State
  Precious Metals and Gems Repository (Gokhran) does hold palladium, and its
  stockpile — accumulated in the 1970s–80s and sold down through the 1990s
  and 2000s — moved global prices; as much as 1 Moz was sold in 2010 alone.
  It does not muddy the sentence: Gokhran sits under the **Ministry of
  Finance**, not the central bank, its palladium is a strategic/industrial
  stockpile rather than a monetary reserve, and it functioned as an inventory
  to be liquidated, which is the opposite of a reserve held for monetary
  purposes. Russia's *central bank* reserve metal is gold. The on-screen
  wording "Central banks hold gold — not palladium" is precise as written.
- **Sources:** IMF Balance of Payments and International Investment Position
  Manual, reserve-asset definitions, and the COFER dataset documentation
  (data.imf.org/COFER); IMF Annual Report 2025, Appendix I "International
  Reserves"; World Gold Council goldhub reserve statistics; Gokhran's
  statutory position under the Russian Ministry of Finance, and contemporary
  reporting of its palladium sales (The Moscow Times, MetalMiner,
  Mining.com). Retrieved 2026-07-30.
- **Date recorded:** 2026-07-30

---

## WIM-PD-004 — Palladium discovered in 1803

- **Rendered:** "Discovered in 1803 — facing a monetary network thousands of
  years old." **Spoken:** "Eighteen-oh-three: palladium is discovered."
- **Appears:** Slide 3.5 (`3-05-the-palladium-test`), build 3.
- **Figure:** 1803.
- **Basis:** The Royal Society of Chemistry gives palladium's discovery date
  as **1803** and its discoverer as **William Hyde Wollaston**, who isolated
  it from the residue of platinum dissolved in aqua regia and named it after
  the asteroid Pallas (discovered 1802, itself named for the Greek goddess).
  Wollaston isolated the metal in 1802, offered it for sale anonymously
  through a London shop in April 1803 with an unsigned handbill of its
  properties, and claimed the discovery publicly before the Royal Society in
  1805 after Richard Chenevix disputed that it was an element at all.
- **Judgment note:** 1802 (isolation) and 1803 (announcement) both appear in
  the literature. The deck uses **1803**, which is the conventional published
  date and the one the RSC's reference table gives — and it is also the year
  the metal entered public knowledge, which is what the beat's argument is
  about (a latecomer walking into an existing network). Not flagged; the
  nuance is recorded here in case a chemist in the audience raises it.
- **Sources:** Royal Society of Chemistry periodic table, element 46
  (periodic-table.rsc.org/element/46/palladium); Chemistry World, "Two men,
  two centuries, four metals"; Dictionary of National Biography, "Wollaston,
  William Hyde". Retrieved 2026-07-30.
- **Date recorded:** 2026-07-30

---

## WIM-014 — More claims on base money than base money

- **Rendered:** "More claims than base. That is what a bank run runs on."; the
  tower's inverted proportions (BASE MONEY narrowest at the bottom, BANK
  DEPOSITS wider, PAYMENT APPS widest). **Spoken:** "There are far more
  claims on base money than there is base money. That's not a metaphor and
  not a scandal — it's arithmetic."
- **Appears:** Slide 3.6 (`3-06-what-your-money-is`), builds 3–6.
- **Basis:** In a fractional-reserve system, commercial-bank deposits are
  liabilities redeemable in base money (central-bank reserves and currency),
  and their total exceeds the monetary base. The relation is definitional
  rather than empirical: banks create deposits by lending, and no rule ties
  the deposit stock to the base one-for-one. Orders of magnitude for scale:
  U.S. M2 has run several times the monetary base for most of the post-war
  period (the ratio narrowed sharply after 2008 quantitative easing expanded
  reserves, and widened again as reserves were drained), and the Bank of
  England's own explainer "Money creation in the modern economy" (Quarterly
  Bulletin 2014 Q1) states plainly that "the majority of money in the modern
  economy is created by commercial banks making loans."
- **Judgment note — why no figure is displayed.** The slab widths
  (420 / 600 / 780 px) are **qualitatively honest and deliberately not to
  scale**; they assert "each layer issues more than it holds" and nothing
  more precise. No ratio is rendered on screen, stated in the code, or
  implied — the code comment in `src/components/section-3/LayerDiagram.js`
  says so explicitly. A real ratio would have to specify jurisdiction, date
  and monetary aggregate, and would date badly; the structural claim does
  not.
- **Sources:** Bank of England Quarterly Bulletin 2014 Q1, McLeay, Radia &
  Thomas, "Money creation in the modern economy"; Federal Reserve H.6 (money
  stock) and H.4.1 (factors affecting reserve balances) for the scale check.
  Retrieved 2026-07-30.
- **Date recorded:** 2026-07-30

---

## WIM-BTC-001 — The 21,000,000-unit supply cap

- **Rendered:** "Supply: 21,000,000 units — fixed by the protocol's rules."
  **Spoken:** "Its supply: twenty-one million units, fixed by the protocol's
  own rules — not a promise from an issuer; a property of the thing."
- **Appears:** Slide 3.7 (`3-07-where-bitcoin-is`), build 3.
- **Figure:** 21,000,000.
- **Basis:** The issuance schedule halves the block subsidy every 210,000
  blocks from an initial 50 BTC. The geometric series sums to just under 21
  million — **20,999,999.9769 BTC** with the integer-arithmetic truncation
  the implementation actually uses — and the consensus rules reject any block
  paying more than the scheduled subsidy. "21,000,000 units" is the standard
  round statement of the cap.
- **Judgment note:** the cap is a consensus-rule property of the software,
  which is what the script says ("a property of the thing," not "a promise
  from an issuer"). It is changeable in principle by overwhelming consensus,
  which is the honest caveat and is handled in Section 4's protocol-capture
  discussion rather than here. Realized supply is also permanently below the
  cap because of unspendable outputs and lost keys.
- **Source:** Bitcoin Core consensus rules (`GetBlockSubsidy`, halving
  interval 210,000); Nakamoto (2008). Retrieved 2026-07-30.
- **Date recorded:** 2026-07-29 · completed 2026-07-30

---

## WIM-BTC-002 — Bitcoin's stage placement and holder classes

- **Rendered:** "Collectible, 2009–. Now visibly in the store-of-value stage:
  held by individuals, funds, institutions, states. Not a medium of exchange
  or unit of account at scale." · "Can be held directly, with no counterparty
  — like a bearer asset." · "Early in a process that history shows can stall.
  Candidates have died mid-climb before."
- **Appears:** Slide 3.7 (`3-07-where-bitcoin-is`), builds 2–4.
- **Basis:** Each holder class named on screen exists as a matter of public
  record: individuals; funds (US spot bitcoin ETPs have been listed and
  reporting holdings since January 2024); institutions (listed corporate
  treasuries file their holdings); states (El Salvador's publicly disclosed
  treasury holdings; US and other government holdings arising from seizures
  and, since 2025, from announced reserve policy). "Not a medium of exchange
  or unit of account at scale" follows from the absence of any economy
  pricing or settling ordinary commerce in bitcoin at scale. Direct custody
  with no counterparty is a property of the protocol: control of a private
  key is control of the output.
- **Judgment note — deliberately unquantified.** No adoption figure appears
  on screen, and that is the right call: holder-class totals move monthly,
  on-chain address counts are not person counts, and any number here would
  date within a quarter and invite an argument the descriptive register is
  designed to avoid. The script states adoption "as fact, not as applause"
  and pairs it with the stall caveat in the same breath, satisfying the
  generalized honesty rule (§3.2). The claim-count discipline of §3.3 keeps
  the reserved word out of this slide entirely.
- **Sources:** SEC filings and issuer disclosures for US spot bitcoin ETPs;
  company filings for listed treasury holders; El Salvador government
  disclosures. Deliberately not reduced to a figure. Retrieved 2026-07-30.
- **Date recorded:** 2026-07-30

---

# Retired entries

## WIM-002 — Purchasing power of one unit, 1971 = 100 *(superseded)*

Replaced at R4 by **WIM-FX-001…005**, one entry per currency plus one for the
chart's spoken claim. The provisional indexed shapes this entry described are
gone from the code; the chart now plots the real annual national CPI records.
Kept as a redirect so that references to WIM-002 in `docs/r2-report.md` and
`docs/r2-session-brief.md` still resolve.
