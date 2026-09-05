> **Build prompt, executed — archived, not authoritative.** ChatGPT/Codex-era working material for the original Section 4 build.
> Superseded by `docs/what-is-money-master.md` and `docs/synthesis-architecture.md` (Stage 0, 25 August 2026). Nothing here governs.

# Codex Task — Build the Comparison Framing and New Ten-Property Table (Slides 4.15–4.16)

Read and follow these files first:

- `AGENTS.md`
- `PLANS.md`
- `docs/section-4-master-brief.md`
- `docs/section-4-narrative-master-document.md`
- `docs/codex-refine-4-10-to-4-14-failure-framework.md`
- `docs/codex-fix-4-13-4-14-sequence.md`

This task-specific brief is the binding source of truth for slides **4.15 and 4.16**.

It continues directly from the approved final state of slide 4.14:

```text
THE TEN PROPERTIES
```

The goal is to:

1. introduce the five assets being compared;
2. distinguish monetary assets from productive assets;
3. state the comparison assumptions clearly;
4. apply the exact approved score matrix;
5. rebuild the old comparison table in the new premium Section 4 visual language;
6. avoid a winner-takes-all or propagandistic presentation.

The **underlying score matrix is being reused**, with the exact updates specified in this brief.

The **old table design must not be reused**.

---

# 1. Task boundary

Create:

- slide 4.15 — From Framework to Comparison;
- slide 4.16 — The Comparison;
- speaker notes for slides 4.15–4.16;
- narrowly scoped comparison-table components;
- required asset exports and registrations.

Preserve without visual or narrative changes:

- slides 4.01–4.14;
- Sections 1–3;
- the approved Bitcoin-orange accent system;
- the approved Section 4 kicker;
- the approved property names and order;
- all approved navigation and build behaviour;
- slide 4.17 and all later slides.

Do not implement:

- integrity versus price stability;
- monetisation volatility;
- native yield versus cash flow;
- architecture versus valuation;
- any later Section 4 slide.

Do not:

- add dependencies;
- modify the slide engine;
- alter global typography;
- use the old red/green heatmap;
- reuse emoji-style asset icons;
- introduce a total score or winner;
- run `npm audit fix`.

---

# 2. Required asset preflight

Verify these existing assets:

```text
assets/images/carrier_gold.png
assets/images/carrier_paper.png
assets/images/carrier_bitcoin.png
```

Verify these new user-created assets:

```text
assets/images/comparison_property.png
assets/images/comparison_shares.png
```

Expected exports in `src/assets.js`:

```js
carrierGold
carrierPaper
carrierBitcoin
comparisonProperty
comparisonShares
```

Before editing:

1. verify all five files exist;
2. verify each loads correctly;
3. inspect dimensions and black-background/transparency treatment;
4. inspect optical scale and crop safety;
5. confirm that all five can be shown as a visually coherent set.

If either new comparison asset is missing:

- stop before editing;
- report the exact missing path;
- do not create a generic icon;
- do not use an emoji;
- do not hotlink an external asset;
- do not silently replace the image with text-only content.

---

# 3. Comparison assumptions

The scores are not universal statements about every possible wrapper, custody arrangement or jurisdiction.

They apply under the following explicit assumptions.

## Gold

```text
Physical investment-grade bullion.
```

Assume:

- direct ownership or secure bullion custody;
- standardised investment-grade form;
- no tokenised wrapper.

## Fiat

```text
A major developed-market fiat currency held in ordinary contemporary forms,
including bank deposits and cash.
```

Assume:

- normal access through regulated financial infrastructure;
- practical use for payments and savings;
- no unusual capital-control edge case as the default;
- no claim that bank deposits and physical cash are structurally identical.

## Bitcoin

```text
Native BTC held in self-custody on the Bitcoin network.
```

Assume:

- valid private-key control;
- no exchange or custodial wrapper;
- no synthetic Bitcoin exposure.

## Property

```text
Direct, unlevered ownership of real property.
```

Assume:

- direct title;
- no REIT or tokenised wrapper;
- no leverage;
- ordinary legal and maintenance obligations.

## Shares

```text
A diversified portfolio of listed ordinary shares held through standard market infrastructure.
```

Assume:

- conventional listed shares;
- standard brokerage/custody infrastructure;
- no private-company shares;
- no claim that fractional-share access is universal;
- ordinary voting/economic rights remain centred on legally recognised shares and share classes.

These assumptions must appear in speaker notes.

Do not place all definitions on screen.

---

# 4. Exact final score matrix

Use the following exact scores.

| Property | Gold | Fiat | Bitcoin | Property | Shares |
|---|---:|---:|---:|---:|---:|
| No supply inflation | 4 | 1 | 5 | 3 | 2 |
| Divisibility | 3 | 4 | 5 | 1 | 3 |
| Liquidity | 3 | 5 | 4 | 2 | 5 |
| Portability | 2 | 4 | 5 | 1 | 4 |
| No carrying costs | 2 | 4 | 4 | 1 | 4 |
| Resistance to control | 4 | 1 | 5 | 1 | 1 |
| Durability | 5 | 3 | 5 | 4 | 3 |
| Verifiability | 4 | 4 | 5 | 3 | 4 |
| Fungibility | 5 | 4 | 4 | 1 | 4 |
| Track record | 5 | 3 | 2 | 4 | 4 |

Implement the matrix from one single data source.

Suggested structure:

```js
const comparisonRows = [
  {
    property: "NO SUPPLY INFLATION",
    scores: { gold: 4, fiat: 1, bitcoin: 5, property: 3, shares: 2 },
  },
  {
    property: "DIVISIBILITY",
    scores: { gold: 3, fiat: 4, bitcoin: 5, property: 1, shares: 3 },
  },
  {
    property: "LIQUIDITY",
    scores: { gold: 3, fiat: 5, bitcoin: 4, property: 2, shares: 5 },
  },
  {
    property: "PORTABILITY",
    scores: { gold: 2, fiat: 4, bitcoin: 5, property: 1, shares: 4 },
  },
  {
    property: "NO CARRYING COSTS",
    scores: { gold: 2, fiat: 4, bitcoin: 4, property: 1, shares: 4 },
  },
  {
    property: "RESISTANCE TO CONTROL",
    scores: { gold: 4, fiat: 1, bitcoin: 5, property: 1, shares: 1 },
  },
  {
    property: "DURABILITY",
    scores: { gold: 5, fiat: 3, bitcoin: 5, property: 4, shares: 3 },
  },
  {
    property: "VERIFIABILITY",
    scores: { gold: 4, fiat: 4, bitcoin: 5, property: 3, shares: 4 },
  },
  {
    property: "FUNGIBILITY",
    scores: { gold: 5, fiat: 4, bitcoin: 4, property: 1, shares: 4 },
  },
  {
    property: "TRACK RECORD",
    scores: { gold: 5, fiat: 3, bitcoin: 2, property: 4, shares: 4 },
  },
];
```

Do not duplicate the scores manually across components.

---

# 5. Binding score judgements

The following judgements are intentional and must not be “corrected” by Codex.

## Fiat divisibility = 4

Fiat is highly divisible in ordinary use, but it remains less granular and less universally divisible than native Bitcoin units.

Do not increase it to 5.

## Shares divisibility = 3

Fractional-share access exists, but:

- it is not universal;
- implementation depends on the platform and jurisdiction;
- whole legally recognised shares and share classes remain important for voting and other rights.

Do not increase it above 3.

## Shares fungibility = 4

Shares of the same company and class can be fungible, but:

- different companies are not interchangeable;
- different share classes of the same company are not necessarily interchangeable;
- the asset category is less uniformly fungible than standardised gold or protocol-native Bitcoin units.

Do not increase it to 5.

## Shares track record = 4

Diversified listed equity ownership has extensive historical evidence, but:

- companies disappear;
- market and custody structures change;
- equity ownership remains dependent on legal and institutional continuity.

Use 4.

---

# 6. Most important score justifications for speaker notes

Do not attempt to narrate all fifty cells.

The notes should focus on the ratings that reveal the deepest structural trade-offs.

## Bitcoin — no supply inflation = 5

Use concise wording close to:

> Bitcoin receives a five because no person or authority can unilaterally create additional valid units and dilute the claim on value embodied in those already held.

## Fiat — no supply inflation = 1 and resistance to control = 1

Use non-moralistic wording close to:

> Fiat is designed to be elastic and institutionally governed. That gives the system flexibility, but it means the holder does not control either the supply rules or the conditions of access.

## Gold — durability and track record = 5; portability and no carrying costs = 2

Use wording close to:

> Gold is extraordinarily durable and historically proven, but the same physicality that gives it permanence also makes it expensive to store, secure and move.

## Bitcoin — verifiability = 5

Use wording close to:

> Bitcoin’s ownership and supply rules can be independently verified rather than accepted solely on the authority of an issuer or custodian.

## Bitcoin — fungibility = 4

Use wording close to:

> Bitcoin units are protocol-equivalent, but transaction histories are visible and can be treated differently by exchanges, intermediaries or regulators.

## Property — low scores do not mean bad investment

Use wording close to:

> Property scores poorly on several monetary-carrier properties, but that does not make it a poor productive or consumptive asset. It means it is not optimised to act as money.

## Shares — divisibility = 3

Use wording close to:

> Fractional access has improved divisibility, but it is not universal and does not always reproduce the complete legal and voting rights of whole shares.

## Shares — fungibility = 4

Use wording close to:

> Ordinary shares of the same company and class can be interchangeable, but different companies and different share classes are not.

## Shares — liquidity = 5 and resistance to control = 1

Use wording close to:

> Listed shares can be exceptionally liquid, while ownership and transfer still depend on issuers, brokers, exchanges, custodians, regulators and legal systems.

## No total score

Use wording close to:

> There is no total because the properties do not necessarily carry equal weight, and one severe weakness may matter more than several moderate strengths.

---

# 7. Slide 4.15 — From Framework to Comparison

## 7.1 Exact purpose

Slide 4.15 introduces the five assets and frames the comparison correctly.

It must establish:

1. the ten properties can now be applied;
2. people use all five assets to carry purchasing power through time;
3. the assets are not all the same type;
4. Gold, Fiat and Bitcoin are principally monetary assets;
5. Property and Shares are productive assets;
6. the framework makes trade-offs explicit;
7. the scores remain judgements under stated assumptions.

## 7.2 Speaker notes

Use this script closely:

> We now have ten properties by which a carrier can be assessed.
>
> So let’s apply them to five of the most common ways people attempt to carry purchasing power through time.
>
> Gold, fiat and Bitcoin are principally monetary assets.
>
> Property and shares are productive assets. Their value can also arise from rents, profits and productive activity.
>
> They are therefore not identical instruments. But people use all five to preserve or grow purchasing power through time.
>
> To keep the comparison meaningful, I am using specific assumptions.
>
> Gold means physical investment-grade bullion.
>
> Fiat means a major developed-market currency held in ordinary contemporary forms, including bank deposits and cash.
>
> Bitcoin means native BTC held in self-custody.
>
> Property means direct, unlevered ownership of real property.
>
> Shares means a diversified portfolio of listed ordinary shares held through standard market infrastructure.
>
> The framework makes the trade-offs explicit. The scores remain judgements—and reasonable people can disagree with them.

End with:

> Let’s compare them against the ten properties we have just derived.

## 7.3 Visible text

### Kicker

```text
FROM FRAMEWORK TO COMPARISON
```

### Main question

```text
How well can each asset carry purchasing power through time?
```

### Group labels

```text
MONETARY ASSETS
```

```text
PRODUCTIVE ASSETS
```

### Asset labels

```text
GOLD
FIAT
BITCOIN
PROPERTY
SHARES
```

### Final line

```text
The framework is explicit. The scores are judgements.
```

Use British spelling:

```text
judgements
```

Do not display the detailed holding assumptions on screen.

## 7.4 Composition

Use five premium isolated object renders across one horizontal baseline.

Recommended order:

```text
GOLD   FIAT   BITCOIN   |   PROPERTY   SHARES
```

Use:

- `carrier_gold.png`
- `carrier_paper.png`
- `carrier_bitcoin.png`
- `comparison_property.png`
- `comparison_shares.png`

Requirements:

- equal-width visual slots;
- normalise optical scale rather than raw pixel dimensions;
- no cards;
- no visible image boxes;
- no emojis;
- no old slide icons;
- labels directly beneath assets;
- subtle vertical divider between Bitcoin and Property;
- group labels centred above their respective columns;
- Bitcoin must not have a special border, glow or highlighted card;
- all five assets receive equal visual status.

Suggested logical centres:

```text
gold x ≈ 390
fiat x ≈ 650
bitcoin x ≈ 910
property x ≈ 1240
shares x ≈ 1500
```

Suggested maximum image box:

```text
width: 145–175 px
height: 105–135 px
```

## 7.5 Progressive builds

Implement exactly four cumulative states.

### Build 0 — Ask the comparison question

Visible:

- kicker;
- main question;
- no assets yet.

### Build 1 — Monetary assets

Reveal:

- group label `MONETARY ASSETS`;
- Gold;
- Fiat;
- Bitcoin.

Use one restrained stagger.

### Build 2 — Productive assets

Reveal:

- divider;
- group label `PRODUCTIVE ASSETS`;
- Property;
- Shares.

### Build 3 — Frame the scoring

Reveal:

```text
The framework is explicit. The scores are judgements.
```

Keep all five assets visible.

No asset changes colour.

## 7.6 Final frame

The slide should communicate:

- five common ways to carry purchasing power;
- two different asset families;
- one shared comparison framework;
- no declared winner.

---

# 8. Slide 4.16 — The Comparison

## 8.1 Exact purpose

Slide 4.16 applies the ten-property framework using the exact score matrix.

It must:

1. expose structural trade-offs;
2. remain readable at presentation scale;
3. avoid a spreadsheet-like heatmap;
4. avoid green/red moral coding;
5. avoid an aggregate score;
6. avoid highlighting Bitcoin as the predetermined winner;
7. invite scrutiny and verification.

## 8.2 Speaker notes

Use this script closely:

> This is not an attempt to produce a mathematically perfect answer.
>
> Every score depends on assumptions about the form in which the asset is held, transferred and verified.
>
> The point is not a total score. There is no total.
>
> The point is to make each structural trade-off visible.
>
> Bitcoin scores five on no supply inflation because no person or authority can unilaterally create additional valid units and dilute the claim on value embodied in those already held.
>
> Fiat scores one on supply inflation and resistance to control because elasticity and institutional governance are features of the system. That gives it flexibility, but the holder does not control the rules.
>
> Gold scores exceptionally well on durability and track record, but its physicality makes it expensive to store, secure and move.
>
> Bitcoin scores five on verifiability because its ownership and supply rules can be independently verified.
>
> It scores four rather than five on fungibility because transaction histories are visible and can be treated differently by intermediaries.
>
> Property scores poorly on several monetary-carrier properties. That does not make it a bad productive or consumptive asset. It means it is not optimised to act as money.
>
> Shares receive three on divisibility because fractional access is not universal and may not reproduce the full legal and voting rights of whole shares.
>
> They receive four on fungibility because shares of the same company and class can be interchangeable, while different companies and share classes are not.
>
> Listed shares can be extremely liquid, but they remain dependent on issuers, brokers, custodians, exchanges, regulators and legal systems.
>
> There is no total because the properties do not necessarily carry equal weight, and one severe weakness may matter more than several moderate strengths.
>
> You may disagree with individual scores. That is useful, because the framework shows us precisely what we are disagreeing about.

End with:

> Don’t trust the table. Verify every score.

The presenter does not need to speak every justification every time. These notes provide the approved reasoning.

## 8.3 Visible text

### Kicker

```text
THE COMPARISON
```

### Group labels

```text
MONETARY ASSETS
```

over:

```text
GOLD
FIAT
BITCOIN
```

and:

```text
PRODUCTIVE ASSETS
```

over:

```text
PROPERTY
SHARES
```

### Exact row labels

```text
NO SUPPLY INFLATION
DIVISIBILITY
LIQUIDITY
PORTABILITY
NO CARRYING COSTS
RESISTANCE TO CONTROL
DURABILITY
VERIFIABILITY
FUNGIBILITY
TRACK RECORD
```

### Final line

```text
Don't trust the table. Verify every score.
```

Preferred emphasis:

- `Don't trust the table.` white;
- `Verify every score.` Bitcoin orange.

Do not display:

- totals;
- rankings;
- winners;
- averages;
- green/red labels;
- caveat paragraphs.

## 8.4 New table visual system

Build a new premium comparison-table component.

Suggested component names:

```text
AssetComparisonTable
DotRating
ComparisonAssetHeader
```

Do not reuse the old heatmap component or CSS.

### Table architecture

Columns:

```text
PROPERTY | GOLD | FIAT | BITCOIN | PROPERTY | SHARES
```

Use one subtle vertical divider between:

```text
BITCOIN | PROPERTY
```

to distinguish the two asset families.

### Rating system

Use five small circles per cell.

For a score of `n`:

- first `n` circles are filled Bitcoin orange;
- remaining circles are low-opacity neutral grey.

Example:

```text
4 / 5 = ● ● ● ● ○
```

Requirements:

- no red;
- no green;
- no cell background colours;
- no coloured pills;
- no highlighted Bitcoin column;
- no numeric total;
- no pulsing or score animation after reveal.

Suggested dot styling:

```text
filled: #F7931A
empty: rgba(255,255,255,0.12)
diameter: 8–11 px
gap: 6–9 px
```

Each cell must include an accessible label such as:

```text
aria-label="4 out of 5"
```

Store the numeric value in the data model even though the primary visible treatment is dots.

### Row styling

- property name in white or high-contrast neutral;
- thin, low-opacity horizontal separators;
- no alternating row backgrounds;
- no cards;
- no heatmap fills;
- consistent row height.

### Header styling

Use compact versions of the same five asset renders above the column labels.

Suggested image box:

```text
width: 54–72 px
height: 42–58 px
```

If the table becomes too vertically dense at the actual recording viewport, prioritise:

1. readable property labels;
2. readable ratings;
3. text column headings;

and reduce or omit only the miniature header images on 4.16.

Do not remove the full assets from 4.15.

## 8.5 Suggested logical geometry

At 1920×1080:

```text
table left x ≈ 120
table right x ≈ 1800
property column width ≈ 500
score column width ≈ 230–235
header top y ≈ 145
header bottom y ≈ 275
first row centre y ≈ 330
row height ≈ 60–63
last row centre y ≈ 895
final line centre y ≈ 1000
```

Adjust to the existing safe zones.

The full table must fit without scrolling or clipping.

## 8.6 Progressive builds

Implement exactly three cumulative states.

### Build 0 — Structure

Visible:

- kicker;
- group labels;
- asset headers;
- property rows;
- five low-opacity empty dots in every score cell;
- no filled score dots;
- no final line.

This establishes the framework before showing the assessment.

### Build 1 — Reveal all scores

Fill all score dots according to the exact matrix in one coherent reveal.

Requirements:

- reveal every score simultaneously;
- a restrained total stagger across the table is acceptable only if it completes within 500–750 ms;
- do not reveal row by row;
- do not reveal column by column;
- do not highlight Bitcoin;
- once revealed, every score stays visually stable.

### Build 2 — Verification line

Reveal:

```text
Don't trust the table. Verify every score.
```

No cell changes colour or emphasis.

## 8.7 Final frame

The final frame must feel:

- analytical;
- neutral;
- premium;
- readable;
- open to disagreement;
- structurally consistent with the rest of Section 4.

It must not feel like:

- an old spreadsheet;
- a crypto marketing graphic;
- a traffic-light scorecard;
- a predetermined Bitcoin victory slide.

---

# 9. Transition from slide 4.14 to 4.15

Preferred continuation:

1. the numbered property list on 4.14 remains briefly;
2. the property names recede;
3. kicker changes to `FROM FRAMEWORK TO COMPARISON`;
4. main question appears;
5. candidate assets appear in their groups.

Do not force the property rows into a table during this transition.

The clean conceptual sequence is:

```text
criteria established
→ candidates introduced
→ comparison applied
```

---

# 10. Transition from slide 4.15 to 4.16

Preferred continuation:

1. main question and final line fade;
2. five asset objects reduce in scale and move into header positions;
3. asset labels retain or match their table-header geometry;
4. property rows appear;
5. empty score dots appear.

Use shared-DOM continuation only if reliable.

Otherwise use matching geometry and a clean crossfade.

Do not modify the approved final state of 4.15 merely to force a fragile transition.

---

# 11. Motion standards

Allowed:

- opacity;
- restrained translation;
- subtle image scaling;
- one-time dot filling;
- clean crossfade;
- mild stagger.

Avoid:

- bouncing dots;
- score counting;
- flashing cells;
- red/green transitions;
- column spotlights;
- winner animations;
- card flips;
- large glows;
- pulsing Bitcoin emphasis.

Suggested timing:

```text
asset reveal: 350–500 ms
asset-group stagger total: 450–650 ms
table structure reveal: 400–600 ms
score fill reveal total: 500–750 ms
verification line reveal: 350–450 ms
```

Respect reduced motion.

In reduced-motion mode:

- all target states appear instantly;
- all scores remain correct;
- no content depends on delayed callbacks.

---

# 12. Deterministic build requirements

For slides 4.15–4.16:

- every build reconstructs its complete state;
- forward navigation works;
- backward navigation works;
- refresh at nonzero builds works;
- force-next works;
- force-previous works;
- reduced motion works;
- score dots do not remain filled on Build 0;
- score dots do not duplicate;
- no stale asset transforms persist;
- no final-line state leaks into prior builds;
- all timelines and delayed calls are cleaned up.

---

# 13. Implementation scope

Modify only:

- slide 4.15 module;
- slide 4.16 module;
- slide-specific CSS/selectors;
- speaker notes for 4.15–4.16;
- `src/assets.js`;
- narrowly scoped comparison-table components;
- minimal slide registration/manifest entries.

Do not:

- modify slides 4.01–4.14;
- implement 4.17;
- alter global typography;
- alter the canonical orange;
- reuse old heatmap CSS;
- add comparison totals;
- add winner styling;
- add dependencies;
- leave old emoji icons active;
- leave an unused duplicate score matrix.

---

# 14. Required visual self-review

Inspect every build at 1920×1080.

## Slide 4.15

1. Are all five asset files used?
2. Do the five assets feel like one coherent visual set?
3. Are Gold, Fiat and Bitcoin grouped as monetary assets?
4. Are Property and Shares grouped as productive assets?
5. Is the divider restrained?
6. Is Bitcoin given no special treatment?
7. Is the final line spelled `judgements`?
8. Does the final frame avoid declaring a winner?

## Slide 4.16

9. Are the exact ten approved row labels used?
10. Are the exact fifty scores used?
11. Is Fiat divisibility exactly 4?
12. Is Shares divisibility exactly 3?
13. Is Shares fungibility exactly 4?
14. Is Shares track record exactly 4?
15. Are there no red or green score cells?
16. Is there no total score?
17. Is there no winner?
18. Is the Bitcoin column visually neutral?
19. Is the monetary/productive divider clear but subtle?
20. Are all dots aligned consistently?
21. Is each rating readable at the recording viewport?
22. Does Build 0 show empty dots only?
23. Does Build 1 reveal every score in one coherent action?
24. Does Build 2 add only the verification line?
25. Is the final line fully inside the safe zone?

## Preservation

26. Are slides 4.01–4.14 visually unchanged?
27. Is slide 4.17 untouched?
28. Are notes aligned with the approved assumptions?
29. Is every intermediate build screenshot-ready?
30. Does backward navigation restore the empty-score state correctly?

Correct every failed item before reporting completion.

---

# 15. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the complete diff.
4. Verify all five image assets load.
5. Open slide 4.15 directly.
6. Inspect builds 0–3 at 1920×1080.
7. Open slide 4.16 directly.
8. Inspect builds 0–2 at 1920×1080.
9. Inspect both final states at the actual recording viewport.
10. Navigate 4.14 → 4.15 → 4.16 repeatedly.
11. Navigate backward through the same sequence.
12. Refresh 4.15 at nonzero builds.
13. Refresh 4.16 at Builds 0, 1 and 2.
14. Test force-next and force-previous.
15. Test reduced-motion mode.
16. Verify notes overlay.
17. Verify second-window notes.
18. Keep the browser console open and confirm no errors.
19. Confirm slide 4.17 is untouched.
20. Search active source and CSS for:
    - old heatmap component usage;
    - red/green score classes;
    - highlighted Bitcoin-column selectors;
    - old row wording;
    - wrong score values;
    - duplicate matrices;
    - totals or winner calculations;
    - emoji icons;
    - accidental changes beyond scope.

Stop after slides 4.15–4.16 are complete.

Do not proceed to slide 4.17.

---

# 16. Completion report

Report:

## Implemented

- concise summary of slide 4.15;
- concise summary of the new slide 4.16 table;
- confirmation that the old heatmap design was not reused;
- confirmation that no winner or total was added.

## Exact score decisions

Explicitly confirm:

```text
Fiat divisibility = 4
Shares divisibility = 3
Shares fungibility = 4
Shares track record = 4
```

## Assets

Report exact paths used:

```text
assets/images/carrier_gold.png
assets/images/carrier_paper.png
assets/images/carrier_bitcoin.png
assets/images/comparison_property.png
assets/images/comparison_shares.png
```

## Files changed

Provide a file-by-file list.

Report exact paths for:

- comparison table component;
- dot-rating component;
- asset-header component;
- score data source.

## Validation

Report:

- commands actually run;
- build result;
- console result;
- reduced-motion result;
- forward-navigation result;
- backward-navigation result;
- refresh/restoration result;
- notes result.

## Review access

Provide exact deep links for:

- slide 4.15;
- slide 4.16.

Include instructions for reviewing every build state.

## Remaining judgement calls

List only genuine visual issues requiring human review.

End with one recommended next action only.
