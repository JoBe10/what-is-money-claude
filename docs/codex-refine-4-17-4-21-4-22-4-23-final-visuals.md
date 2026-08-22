# Codex Task — Final Visual Refinement of Slides 4.17, 4.21, 4.22 and 4.23

Read and follow these files first:

- `AGENTS.md`
- `PLANS.md`
- `docs/section-4-master-brief.md`
- `docs/section-4-narrative-master-document.md`
- `docs/codex-refine-4-10-to-4-14-failure-framework.md`
- `docs/codex-fix-4-13-4-14-sequence.md`
- `docs/codex-build-4-15-4-16-comparison-table.md`
- `docs/codex-build-4-17-to-4-23-final-investment-thesis.md`

This brief is the binding corrective refinement for slides **4.17, 4.21, 4.22 and 4.23**. It supersedes conflicting visual and build guidance for those slides only.

The narrative is approved. This task must improve visual clarity, spatial hierarchy, motion logic and the final closing frame.

Current problems:

1. 4.17: migration lines and ClaimObjects overlap the Gold render.
2. 4.21: repeated small ClaimObjects form an unattractive queue beside the main claim.
3. 4.21: `The monetary competition is decided at the margin.` is redundant as visible copy.
4. 4.22: the circular fixed-supply visual is abstract, confusing and messy.
5. 4.22: incoming large ClaimObjects collide visually with the ring.
6. 4.23: `THE INVESTMENT CASE` narrows the presentation too much.
7. 4.23: CarrierShell and `NOW → LATER` clutter the ending and add little.
8. 4.23 should become a premium, pure-typographic conclusion.

The quality standard is the strongest approved Section 4 slides: precise, restrained, premium, immediately understandable and screenshot-ready at every build.

---

# 1. Scope

Modify only:

- slide 4.17;
- slide 4.21;
- slide 4.22;
- slide 4.23;
- their notes where explicitly specified;
- slide-specific CSS;
- narrowly scoped helpers used only by these slides.

Preserve unchanged:

- slides 4.01–4.16;
- slides 4.18–4.20;
- all approved scores and definitions;
- global typography;
- canonical Bitcoin orange;
- the slide engine;
- notes and navigation systems;
- reduced-motion support;
- existing approved image assets.

Do not:

- add new image assets;
- add dependencies;
- change 4.18–4.20;
- add market-cap calculations or price forecasts;
- add a sequel teaser;
- reintroduce `repurposed` versus `purpose-built`;
- run `npm audit fix`.

Use the existing assets:

```text
assets/images/carrier_gold.png
assets/images/carrier_paper.png
assets/images/carrier_bitcoin.png
assets/images/comparison_property.png
assets/images/comparison_shares.png
```

Reuse the approved `ClaimObject`. Do not create a second claim icon.

---

# 2. Slide 4.17 — When the Store-of-Value Function Migrates

## Narrative purpose

Preserve the approved argument:

- Fiat remains effective as medium of exchange and unit of account.
- The demand to save does not disappear.
- When Fiat is not trusted over long periods, savings demand migrates.
- Gold, Property and Shares absorb that demand.
- Bitcoin is intentionally absent.

## Remove the current overlap

No line or moving object may pass through, behind or directly across:

- Gold;
- Property;
- Shares;
- any asset label.

Delete the current overlapping geometry rather than patching z-index.

## New composition

Use three separated vertical zones:

### Left — Fiat origin

Place Fiat on the left with:

```text
FIAT
MEDIUM OF EXCHANGE
UNIT OF ACCOUNT
```

### Upper-right — destination assets

Place Gold, Property and Shares in a clean row.

Use equal optical scale and consistent labels.

### Lower corridor — migration lane

Create a dedicated horizontal migration lane **below the asset row**.

The lane must:

- begin near Fiat;
- sit clearly below all asset renders and labels;
- travel through empty black space;
- branch upward only near the destination zone;
- never intersect an image or label.

Use:

- one thin orange horizontal lane;
- two or three small ClaimObjects travelling along it;
- three restrained upward branches beneath Gold, Property and Shares.

Branches should stop before touching the asset renders.

Do not use thick arrows, large arrowheads or looping motion.

## Exact builds

### Build 0

Visible:

- kicker;
- Fiat object and labels.

No main statement, lane or destination assets.

### Build 1

Reveal:

```text
The demand to save does not disappear.
```

Reveal one ClaimObject near the origin of the lower corridor.

### Build 2

Reveal:

```text
It migrates.
```

Reveal:

- lower migration lane;
- Gold;
- Property;
- Shares;
- three upward destination branches.

Animate two or three ClaimObjects through the lower corridor. They may settle at the branch endpoints.

Absolutely no overlap with Gold or any other asset.

### Build 3

Reveal:

```text
When money is not trusted to preserve purchasing power,
savings demand moves into other assets.
```

Hold a calm final frame. No loops.

## Visual hierarchy

1. `It migrates.`
2. migration flow;
3. destination assets;
4. explanatory sentence;
5. Fiat’s retained functions.

Preserve the approved notes, updating only references to the new lower-lane design if necessary.

---

# 3. Slide 4.21 — The Marginal Store-of-Value Decision

## Narrative purpose

Communicate:

```text
one claim
→ several possible carriers
→ the decision recurs over time
```

## Remove the current repeated-claim queue

Delete the row of small ClaimObjects beside the main ClaimObject.

Do not replace it with:

- a queue;
- stack;
- pile;
- stream;
- conveyor belt;
- multiple persistent claims.

## Remove redundant visible copy

Remove from the slide:

```text
The monetary competition is decided at the margin.
```

Keep the idea in the speaker notes only.

## New composition

### Top

Kicker:

```text
THE MARGINAL STORE-OF-VALUE DECISION
```

Question:

```text
Where does the next unredeemed claim go?
```

### Middle

Place five candidates in the comparison-table order:

```text
GOLD
FIAT
BITCOIN
PROPERTY
SHARES
```

### Lower middle

Use exactly one persistent ClaimObject centred below the candidate row.

Draw five thin neutral connectors from the claim to the five assets.

Requirements:

- mathematically distributed;
- equal visual weight;
- no highlighted Bitcoin path;
- no glow or winner treatment;
- no path thicker than another.

### Bottom

Use one supporting line only:

```text
Every new unit of savings creates a new carrier decision.
```

## Showing recurrence

Do not add more claims.

Preferred optional treatment when the supporting sentence appears:

- create two very faint contour echoes behind the main ClaimObject;
- offset by only a few pixels;
- fade out within 400–600 ms;
- leave one main ClaimObject.

The echo must read as recurrence, not additional queued units.

In reduced-motion mode, omit the echo.

## Exact builds

### Build 0

Visible:

- kicker;
- question;
- one ClaimObject.

### Build 1

Reveal all five candidates and all five neutral connectors simultaneously.

### Build 2

Reveal:

```text
Every new unit of savings creates a new carrier decision.
```

Optionally play the subtle one-time echo.

No other visible text.

## Notes

Keep the approved spoken passage, including:

> The monetary competition is decided at the margin.

That sentence is spoken only.

---

# 4. Slide 4.22 — Fixed Supply Reprices at the Margin

## Narrative purpose

Show clearly:

- only part of the outstanding stock is available at a given moment;
- incoming demand meets supply offered at the margin;
- Bitcoin supply cannot expand through discretionary issuance;
- marginal trades can reprice the outstanding stock;
- this is not a deterministic price formula.

## Remove the current visual completely

Delete:

- the circular ring;
- central Bitcoin coin inside the ring;
- large incoming ClaimObjects moving into the circle;
- oval repricing outline;
- every inactive or hidden build state using that system.

Do not patch the circular composition.

## New visual concept — fixed stock field

Use a clean rectangular field of identical small units.

Recommended:

- 28–40 units;
- a mathematically aligned grid;
- 5–7 columns by 5–6 rows;
- identical size and spacing;
- subdued dark amber or neutral outlines;
- fixed count and fixed positions in every build.

The field represents outstanding stock.

Use small simplified faceted units derived from the deck’s visual language. Do not use Bitcoin logos in every cell.

Optional small label above the field:

```text
FIXED OUTSTANDING STOCK
```

Do not place a large Bitcoin coin in the centre. The preferred design is the grid plus typography.

## Available margin

Define a narrow right-edge slice containing only 3–5 units.

At the margin build:

- brighten only those edge units;
- keep the rest subdued.

Add a small neutral label:

```text
AVAILABLE AT THE MARGIN
```

No surrounding card.

## Incoming demand

Use two or three small ClaimObjects entering from the far right.

They must:

- be evenly spaced vertically;
- align with the edge slice;
- move horizontally;
- stop at or immediately before the highlighted margin;
- never overlap or enter the grid;
- never travel diagonally.

The visual should read:

```text
incoming savings demand
meets limited offered supply
```

## Repricing effect

After the claims reach the margin:

1. edge units brighten;
2. a thin restrained emphasis travels from right to left across the existing field;
3. the whole grid settles slightly brighter;
4. unit count and unit positions remain unchanged.

Do not:

- add units;
- remove units;
- expand the grid;
- draw a giant oval;
- use candlesticks;
- show a price target;
- use green arrows;
- make the effect explosive.

## Visible copy

Kicker:

```text
FIXED SUPPLY REPRICES AT THE MARGIN
```

Sequential statements:

```text
Demand does not need to absorb everything.
```

```text
It only needs to grow against a supply that cannot respond.
```

```text
Marginal flows can reprice the entire stock.
```

Do not show all three at equal strength.

## Exact builds

### Build 0 — fixed stock

Visible:

- kicker;
- first statement;
- complete subdued grid;
- optional `FIXED OUTSTANDING STOCK` label.

No margin highlight or incoming demand.

### Build 1 — supply offered at the margin

Subdue the first statement slightly.

Reveal:

```text
It only needs to grow against a supply that cannot respond.
```

Highlight the right-edge margin slice.

Reveal `AVAILABLE AT THE MARGIN`.

Reveal two or three incoming ClaimObjects and animate them horizontally to the edge.

The grid count remains fixed.

### Build 2 — reprice the stock

Reveal:

```text
Marginal flows can reprice the entire stock.
```

Propagate restrained emphasis from the edge across the existing grid.

Incoming claims may remain at the edge but must not overlap the grid.

## Notes

Preserve the approved explanation:

> Demand does not need to absorb every existing Bitcoin.
>
> At any moment, only a fraction of the outstanding supply is available for sale.
>
> New buyers compete with existing holders’ willingness to sell.
>
> In most markets, higher prices can eventually encourage additional production or issuance.
>
> Bitcoin’s supply rules do not respond that way.
>
> Additional demand meets a supply that cannot expand through discretionary creation.
>
> The marginal transaction then informs the market price applied to the entire outstanding stock.
>
> That does not give us a mechanical price formula. Liquidity, expectations, leverage and holder behaviour still matter.
>
> But it explains why a growing share of marginal savings flows can have an outsized effect on the valuation of a fixed-supply monetary asset.

End:

> Bitcoin does not need to absorb everything. It only needs to win more of the margin.

## Conceptual guardrails

Do not imply:

- guaranteed demand growth;
- a fixed price multiplier;
- all Bitcoin is unavailable;
- market depth is constant;
- holder behaviour is irrelevant;
- supply units literally revalue in a uniform mechanical way.

This is a market-structure abstraction.

---

# 5. Slide 4.23 — The Case for Bitcoin from First Principles

## Rename the slide

Change:

```text
THE INVESTMENT CASE — FROM FIRST PRINCIPLES
```

to:

```text
THE CASE FOR BITCOIN — FROM FIRST PRINCIPLES
```

The presentation is broader than an investment pitch.

The investment implication may remain in the notes.

## Remove the current visual completely

Remove from every build:

- CarrierShell;
- ClaimObject;
- `NOW`;
- `LATER`;
- time arrow;
- every diagram;
- every asset render.

Do not replace them with another visual.

This slide becomes a pure typographic ending.

## Exact visible copy

Kicker:

```text
THE CASE FOR BITCOIN — FROM FIRST PRINCIPLES
```

Summary:

```text
Money is a claim on value.
```

```text
A store of value carries that claim through time.
```

```text
The ten properties let us compare the available carriers.
```

```text
The key question is which carrier wins the next unit of savings.
```

Replace `The investment question...` with `The key question...`.

Final conclusion:

```text
Bitcoin does not need to replace everything.
```

```text
It only needs to become the preferred place
to store the next unit of value.
```

Final small line:

```text
The case for Bitcoin—from first principles.
```

## Exact builds

### Build 0

Visible:

- kicker;
- `Money is a claim on value.`

No other text.

### Build 1

Add:

```text
A store of value carries that claim through time.
```

### Build 2

Add:

```text
The ten properties let us compare the available carriers.
```

and:

```text
The key question is which carrier wins the next unit of savings.
```

All four lines form one clean centred summary block.

Do not make them too small.

The fourth line may be slightly larger or brighter.

### Build 3

Fade the four-line summary completely to zero.

Reveal only:

```text
Bitcoin does not need to replace everything.
```

```text
It only needs to become the preferred place
to store the next unit of value.
```

Colour treatment:

- normal text white;
- `preferred place` Bitcoin orange;
- `next unit of value` Bitcoin orange.

Then reveal below, small and restrained:

```text
The case for Bitcoin—from first principles.
```

Use neutral grey or soft white for the small line.

## Layout

For Builds 0–2:

- centre the summary block optically;
- use approximately 52–58% of slide width;
- preserve generous negative space.

For Build 3:

- place the conclusion slightly above optical centre;
- place the small final line well below;
- keep clear of slide counter and browser controls.

## Motion

Allowed:

- opacity;
- restrained 12–24 px translation;
- clean summary-to-conclusion crossfade.

Do not:

- type letter by letter;
- zoom;
- pulse orange words;
- animate words individually;
- use particles;
- reintroduce the claim/carrier visual.

## Notes

Use this closely:

> Money is a claim on value.
>
> A store of value carries that claim through time.
>
> The ten properties let us compare the available carriers.
>
> The key question is which carrier wins the next unit of savings.
>
> Bitcoin does not need to replace property, shares, gold or every alternative store of value.
>
> It only needs to become the preferred place to store a growing share of the next units of value.
>
> That is also the investment case—but more fundamentally, it is the case for Bitcoin from first principles.

Pause after the final sentence.

No sequel teaser.

## Final frame

Only:

- kicker;
- two-part conclusion;
- small final line;
- black space.

This should be the most elegant and memorable frame in the deck.

---

# 6. Cross-slide transitions

## 4.20 → 4.21

Reposition the assets into the five-carrier decision row and introduce one ClaimObject.

Do not retain visible text from 4.20.

## 4.21 → 4.22

Fade the candidate assets, connectors, ClaimObject and supporting sentence.

Use a clean crossfade into the stock grid.

Do not force a visual morph if it weakens clarity.

## 4.22 → 4.23

Fade the entire stock-field visual to pure black.

Then reveal the 4.23 kicker and first line.

Do not morph the grid into typography.

---

# 7. Motion and reduced motion

Allowed:

- opacity;
- restrained translation;
- one-time lane drawing;
- one-time claim travel;
- one-time subtle echo;
- one-time margin interaction;
- one-time grid emphasis propagation.

Avoid:

- loops;
- bouncing;
- springs;
- repeated pulses;
- particles;
- money rain;
- diagonal clutter;
- arrows passing behind assets.

Suggested timing:

```text
standard reveal: 350–500 ms
4.17 lane draw: 450–650 ms
4.17 claim travel: 600–850 ms
4.21 candidate reveal: 400–600 ms
4.21 echo: 400–600 ms
4.22 margin-demand movement: 550–750 ms
4.22 repricing propagation: 550–800 ms
4.23 summary-to-conclusion: 600–850 ms
```

In reduced motion:

- states appear instantly;
- 4.21 echo is omitted;
- 4.22 grid changes directly to its final highlighted state;
- no concept depends on motion.

---

# 8. Deterministic build requirements

For all four slides:

- every build reconstructs its complete target state;
- forward navigation works;
- backward navigation works;
- force-next works;
- force-previous works;
- refresh at nonzero builds works;
- reduced motion works;
- no ClaimObjects duplicate;
- no stale transforms remain;
- no old circular 4.22 nodes remain active;
- 4.22 unit count never changes;
- no old 4.23 CarrierShell or arrow appears after restoration;
- all timelines and delayed calls are cleaned up.

---

# 9. Visual self-review

Inspect every build at 1920×1080 and the actual recording viewport.

## 4.17

- migration lane fully below asset row;
- no overlap with Gold;
- no line crosses a label;
- branches restrained and aligned;
- Fiat retains its utility;
- Bitcoin absent;
- final sentence readable.

## 4.21

- exactly one persistent ClaimObject;
- no claim queue;
- five candidates balanced;
- connectors neutral;
- Bitcoin neutral;
- one lower sentence only;
- visible margin sentence removed;
- reduced motion works.

## 4.22

- old circular visual fully removed;
- rectangular stock field immediately understandable;
- unit count fixed;
- available edge visibly small;
- incoming claims clean and aligned;
- no overlap with grid;
- repricing propagates without adding units;
- no central coin required;
- no chart, multiplier or forecast.

## 4.23

- title exactly `THE CASE FOR BITCOIN — FROM FIRST PRINCIPLES`;
- `key question` replaces `investment question`;
- CarrierShell, ClaimObject and `NOW → LATER` fully removed;
- pure typography only;
- summary readable;
- summary disappears fully before conclusion;
- conclusion dominant;
- only `preferred place` and `next unit of value` orange;
- no sequel teaser;
- final frame materially cleaner than current implementation.

## Preservation

- 4.01–4.16 unchanged;
- 4.18–4.20 unchanged;
- notes outside specified changes unchanged;
- every build screenshot-ready.

Correct every failed item before reporting completion.

---

# 10. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the complete diff.
4. Inspect every build of 4.17.
5. Inspect every build of 4.21.
6. Inspect every build of 4.22.
7. Confirm 4.22 unit count is constant.
8. Inspect every build of 4.23.
9. Navigate 4.20 → 4.21 → 4.22 → 4.23 repeatedly.
10. Navigate backward repeatedly.
11. Refresh every new build state.
12. Test force-next and force-previous.
13. Test reduced motion.
14. Verify notes overlay.
15. Verify second-window notes.
16. Confirm no console errors.
17. Search active source and CSS for:
    - old 4.17 overlap geometry;
    - repeated 4.21 claim-row classes;
    - visible `The monetary competition is decided at the margin.`;
    - old 4.22 ring or oval classes;
    - old 4.22 central-circle layout;
    - old 4.23 CarrierShell;
    - old 4.23 `NOW`;
    - old 4.23 `LATER`;
    - `THE INVESTMENT CASE`;
    - `The investment question`;
    - accidental changes outside scope.

Stop after these four slides are complete.

---

# 11. Completion report

Report:

## Implemented

- 4.17 lower-lane migration redesign;
- confirmation that no flow overlaps Gold;
- 4.21 simplified one-claim decision map;
- confirmation that the claim queue was removed;
- confirmation that the visible margin sentence was removed;
- 4.22 complete rectangular stock-field redesign;
- confirmation that the old circle visual was removed;
- 4.23 pure typographic ending;
- confirmation of the new title.

## Build counts

Report final visual-state counts for:

- 4.17;
- 4.21;
- 4.22;
- 4.23.

## Files changed

Provide a file-by-file list and exact paths for new narrowly scoped helpers.

## Validation

Report:

- commands run;
- build result;
- console result;
- reduced-motion result;
- forward-navigation result;
- backward-navigation result;
- refresh/restoration result;
- notes result.

## Review access

Provide exact deep links for:

- 4.17;
- 4.21;
- 4.22;
- 4.23.

Explain how to review every build.

## Remaining judgement calls

List only genuine visual questions requiring human review.

End with one recommended next action only.
