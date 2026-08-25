> **Build prompt, executed — archived, not authoritative.** ChatGPT/Codex-era working material for the original Section 4 build.
> Superseded by `docs/what-is-money-master.md` and `docs/synthesis-architecture.md` (Stage 0, 25 August 2026). Nothing here governs.

# Codex Task — Build the Final Investment Thesis and Close Section 4 (Slides 4.17–4.23)

Read and follow these files first:

- `AGENTS.md`
- `PLANS.md`
- `docs/section-4-master-brief.md`
- `docs/section-4-narrative-master-document.md`
- `docs/codex-refine-4-10-to-4-14-failure-framework.md`
- `docs/codex-fix-4-13-4-14-sequence.md`
- `docs/codex-build-4-15-4-16-comparison-table.md`

This task-specific brief is the binding source of truth for:

- the final spoken bridge at the end of slide **4.16**;
- slide **4.17**;
- slide **4.18**;
- slide **4.19**;
- slide **4.20**;
- slide **4.21**;
- slide **4.22**;
- slide **4.23**.

It supersedes conflicting prior implementation guidance for those slides while preserving the approved narrative, visual system, score matrix, table design, and slide-engine behaviour.

This task completes Section 4.

The quality standard is the one now established by slides 4.03–4.16:

- premium;
- restrained;
- clean;
- mathematically aligned where symmetry is intended;
- conceptually rigorous;
- minimal on-screen copy;
- strong narrative continuity;
- screenshot-ready at every build;
- no generic infographic clutter;
- no weak icons;
- no borrowed “evolution of problem solving” framework;
- no unsupported claim that 90%+ of capital inevitably flows into one solution.

---

# 1. Task boundary

Modify:

- slide 4.16 speaker notes only, adding the approved architecture-versus-valuation bridge;
- slide 4.17;
- slide 4.18;
- slide 4.19;
- slide 4.20;
- slide 4.21;
- slide 4.22;
- slide 4.23;
- slide-specific CSS for those slides;
- speaker notes for those slides;
- narrowly scoped visual helpers required for this final sequence;
- minimal slide registration or manifest entries.

Preserve without visual changes:

- slides 4.01–4.16;
- the complete comparison table;
- all score values;
- all asset definitions;
- the approved `ClaimObject`;
- the approved `CarrierShell`;
- the approved asset renders;
- the approved Bitcoin-orange accent system;
- the Section 4 kicker;
- Sections 1–3;
- the close slide and any existing global outro mechanics;
- the validated `SlideEngine`.

Do not implement:

- an appendix;
- a volatility appendix;
- a native-yield appendix;
- a “Money: Civilization’s Operating System” trailer;
- any teaser for a future presentation;
- any slide after 4.23 unless an existing close slide already follows Section 4.

Do not:

- add dependencies;
- add an icon library;
- modify global typography;
- modify the slide engine;
- use the old “repurposed versus purpose-built” language;
- use Florian’s “evolution of problem solving” or 90% convergence argument;
- add a total-addressable-market slide based on the full market values of property, shares, art and gold;
- imply that Bitcoin competes for the full market capitalisation of productive assets;
- run `npm audit fix`.

---

# 2. Narrative arc of the final sequence

The section has established:

```text
Money is a claim on value.
A store of value carries that claim through time.
The ten properties let us compare the available carriers.
```

The final sequence must derive the investment thesis directly from that logic:

```text
the comparison table evaluates architecture, not valuation
→ when fiat is not trusted to preserve long-term purchasing power,
  the store-of-value function migrates into other assets
→ that savings demand adds monetary premium
→ other assets have primary productive, consumptive, aesthetic or historical functions
→ Bitcoin’s utility is monetary
→ Bitcoin competes for monetary premium, not the other assets’ entire value
→ the entire stock of wealth does not need to move
→ every new saving or rebalance creates a marginal carrier decision
→ growing demand against fixed supply can reprice the existing stock
→ Bitcoin only needs to win a growing share of the next units of savings
```

This conclusion must feel earned by the presentation’s own framework.

It must not feel imported from another presentation.

---

# 3. Core conceptual distinctions

The following distinctions are binding.

## 3.1 Architecture is not valuation

The comparison table assesses structural suitability as a carrier.

It does not prove:

- that Bitcoin is undervalued at every price;
- that its short-term price will rise;
- that the highest-scoring asset must generate the highest immediate return;
- that a lower-scoring asset cannot temporarily be cheap;
- that productive cash flows are irrelevant.

This distinction should be stated briefly in slide 4.16 speaker notes only.

Do not create a dedicated architecture-versus-valuation slide in this task.

## 3.2 The store-of-value function migrates

Do not say:

```text
Fiat no longer has any store-of-value function.
```

Use the more precise claim:

```text
When the dominant medium of exchange is not trusted to preserve purchasing power
over long periods, the store-of-value function migrates into other assets.
```

Fiat may remain highly effective for:

- exchange;
- accounting;
- settlement;
- short-term nominal liquidity.

The argument concerns long-term purchasing-power preservation.

## 3.3 Monetary premium is conceptual

For this presentation:

```text
ASSET VALUE
=
UNDERLYING UTILITY OR PRODUCTIVE VALUE
+
MONETARY PREMIUM
```

This is a conceptual decomposition, not a directly measurable accounting identity.

Do not present monetary premium as an exact observable number.

## 3.4 Bitcoin competes for monetary demand

Do not imply that Bitcoin competes for:

- all housing utility;
- all future corporate cash flows;
- all aesthetic value;
- all industrial utility;
- the full market value of every asset.

Use:

```text
Bitcoin competes for the monetary demand embedded within those markets.
```

## 3.5 Bitcoin’s utility is monetary

Use the precise distinction:

```text
Bitcoin has no separate productive, consumptive or aesthetic function.
Its utility is monetary: carrying and transferring value under rules
that no person or authority can change unilaterally.
```

Do not describe Bitcoin merely as “useless except for scarcity.”

Do not say it has no use other than storing value, because settlement and transfer are also monetary uses.

## 3.6 Gold is a partial exception

Gold is not identical to property, shares, art or collectibles.

Gold has:

- ornamental use;
- some industrial use;
- an extensive historical monetary role.

Treat it as an established monetary commodity and Bitcoin’s most direct traditional store-of-value competitor.

---

# 4. Existing assets available

Reuse the approved visual assets where appropriate:

```text
assets/images/carrier_gold.png
assets/images/carrier_paper.png
assets/images/carrier_bitcoin.png
assets/images/comparison_property.png
assets/images/comparison_shares.png
```

Expected exports:

```js
carrierGold
carrierPaper
carrierBitcoin
comparisonProperty
comparisonShares
```

No new image asset is required.

Do not introduce:

- generic art icons;
- emoji collectibles;
- stock photos;
- future-city images;
- a market-cap globe;
- a waterfall of money;
- a red/green capital-flow graphic.

Art and collectibles may be included in spoken notes without appearing as visual objects.

---

# 5. Slide 4.16 — add the architecture-versus-valuation bridge

## 5.1 Visual rule

Do not change slide 4.16 visually.

Do not add a build.

Do not add visible copy.

Preserve:

```text
Don't trust the table. Verify every score.
```

## 5.2 Add this spoken bridge at the end of the notes

Use this wording closely:

> One caveat before turning this into an investment thesis: this table compares architecture, not valuation.
>
> A strong carrier can still be expensive, and a weaker carrier can temporarily be cheap.
>
> What the table tells us is which assets are structurally best positioned to compete for monetary demand.

End with:

> So where does that monetary demand currently go?

This bridge protects the analytical credibility of the investment thesis without interrupting the visual momentum.

---

# 6. Slide 4.17 — When the Store-of-Value Function Migrates

## 6.1 Exact purpose

Slide 4.17 reconnects the comparison framework to the earlier three-functions-of-money discussion.

It must establish:

1. fiat remains dominant as a medium of exchange and unit of account;
2. many savers do not trust it to preserve purchasing power over long periods;
3. the human demand to defer consumption does not disappear;
4. the store-of-value function migrates into other assets;
5. those assets absorb savings demand in addition to their underlying utility.

Do not yet define monetary premium formally.

That belongs to 4.18.

## 6.2 Speaker notes

Use this script closely:

> Fiat remains extremely effective as a medium of exchange and unit of account.
>
> But many savers do not trust it to preserve purchasing power over long periods.
>
> The demand to save does not disappear.
>
> The store-of-value function migrates.
>
> It reappears as monetary demand for gold, property, shares, art, collectibles and other scarce assets.
>
> Those assets are then asked to do two jobs at once: perform their underlying function and preserve purchasing power.

End with:

> That additional savings demand creates something we need to distinguish from the asset’s underlying utility: monetary premium.

## 6.3 Visible text

### Kicker

```text
WHEN THE STORE-OF-VALUE FUNCTION MIGRATES
```

### Opening statement

```text
The demand to save does not disappear.
```

### Main reveal

```text
It migrates.
```

### Final statement

```text
When money is not trusted to preserve purchasing power,
savings demand moves into other assets.
```

Do not add a list of every asset category as text.

## 6.4 Visual composition

Use a left-to-right movement.

### Left zone

Use the approved Fiat/paper-money object.

Label:

```text
MEDIUM OF EXCHANGE
UNIT OF ACCOUNT
```

These labels should remain small and restrained.

### Centre

A stream of two or three approved orange claim objects or thin orange flow lines moves away from the fiat object.

The flow represents savings demand, not physical cash.

### Right zone

Use three representative assets:

- Gold;
- Property;
- Shares.

Use:

- `carrierGold`;
- `comparisonProperty`;
- `comparisonShares`.

Do not add art or collectible icons.

The spoken notes can mention them.

### Visual meaning

The slide should show:

```text
fiat remains useful for exchange/accounting
+
long-term savings demand seeks other carriers
```

Do not visually depict fiat as collapsing, burning or becoming worthless.

## 6.5 Progressive builds

Implement exactly four cumulative states.

### Build 0 — Fiat’s retained functions

Visible:

- kicker;
- Fiat object;
- small labels:
  - `MEDIUM OF EXCHANGE`;
  - `UNIT OF ACCOUNT`.

No other assets yet.

### Build 1 — The demand to save

Reveal:

```text
The demand to save does not disappear.
```

A small approved claim object appears beside or just beyond Fiat.

### Build 2 — Migration

Reveal:

```text
It migrates.
```

Animate the savings-demand flow toward:

- Gold;
- Property;
- Shares.

Reveal those three assets.

Requirements:

- one coordinated flow;
- no branching spaghetti;
- no glowing arrows thicker than the claim object;
- no score dots;
- no Bitcoin yet.

### Build 3 — Land the mechanism

Reveal:

```text
When money is not trusted to preserve purchasing power,
savings demand moves into other assets.
```

Keep the three receiving assets visible.

The final frame should remain calm and balanced.

## 6.6 Final state

- Fiat on the left;
- Gold, Property and Shares on the right;
- restrained savings-demand flow between them;
- final statement visible;
- no Bitcoin yet.

The absence of Bitcoin creates the setup for the next slides.

---

# 7. Slide 4.18 — The Monetary Premium

## 7.1 Exact purpose

Slide 4.18 defines monetary premium.

It must establish:

1. many assets have underlying utility or productive value;
2. additional savings demand can increase their value beyond that underlying function;
3. the additional component is monetary premium;
4. Bitcoin competes for monetary premium, not the asset’s full value;
5. the decomposition is conceptual rather than directly observable.

## 7.2 Speaker notes

Use this script closely:

> Property has value because it provides shelter and rental services.
>
> Shares have value because businesses produce goods, earn profits and may distribute cash flows.
>
> Gold has ornamental and limited industrial uses, but a large part of its historical value is already monetary.
>
> When savers also use these assets to preserve purchasing power, that demand adds monetary premium.
>
> People do not buy every asset only for what it produces or does. They also buy it because they need somewhere to store value.
>
> If money itself reliably preserved purchasing power, other assets would likely be valued more for their underlying utility and cash flows—and less for their role as savings vehicles.
>
> We cannot observe and measure monetary premium perfectly. It is a conceptual distinction.
>
> But it is essential, because Bitcoin does not compete with the entire value of every other asset. It competes for the monetary demand embedded within those markets.

End with:

> So what happens when an asset whose utility is monetary enters a market where other assets are already doing money’s job?

## 7.3 Visible text

### Kicker

```text
THE MONETARY PREMIUM
```

### Main equation

```text
ASSET VALUE
=
UNDERLYING UTILITY / PRODUCTIVE VALUE
+
MONETARY PREMIUM
```

### Supporting statement

```text
Savings demand adds value beyond what the asset produces, provides or represents.
```

### Final statement

```text
Bitcoin competes for the monetary premium—
not the asset’s entire value.
```

Do not display a market-cap number.

Do not display percentage estimates of monetary premium.

## 7.4 Visual composition

Use three premium asset examples in one row:

- Property;
- Shares;
- Gold.

Each asset has a two-layer conceptual treatment.

### Base layer

A restrained neutral label beneath each asset:

For Property:

```text
SHELTER / RENT
```

For Shares:

```text
PROFITS / CASH FLOWS
```

For Gold:

```text
ORNAMENTAL / INDUSTRIAL
```

### Monetary-premium layer

A thin Bitcoin-orange halo, outer contour or secondary band appears around each object.

Label the shared outer layer once:

```text
MONETARY PREMIUM
```

Do not label every orange halo separately.

Do not make the orange layer larger than the underlying object.

## 7.5 Progressive builds

Implement exactly four cumulative states.

### Build 0 — Define the equation

Reveal the main equation only.

No asset examples yet.

### Build 1 — Underlying value

Reveal Property, Shares and Gold with their restrained base labels.

No orange premium layer yet.

### Build 2 — Add monetary premium

Reveal the subtle orange outer layer around all three assets simultaneously.

Reveal:

```text
Savings demand adds value beyond what the asset produces, provides or represents.
```

### Build 3 — Clarify Bitcoin’s addressable demand

Reveal:

```text
Bitcoin competes for the monetary premium—
not the asset’s entire value.
```

Do not reveal Bitcoin visually yet.

This line prepares 4.19.

## 7.6 Final state

- equation;
- three assets;
- underlying-value labels;
- shared monetary-premium treatment;
- final distinction.

The slide must not imply the monetary-premium component can be measured exactly from the diagram.

---

# 8. Slide 4.19 — When Other Assets Do Money’s Job

## 8.1 Exact purpose

Slide 4.19 contrasts:

- assets with primary productive, consumptive, aesthetic or historical functions;
- Bitcoin, whose utility is monetary.

It must establish:

1. Property, Shares and Art have reasons to be valued beyond money;
2. Gold is an established monetary commodity and partial exception;
3. when money is not trusted to preserve purchasing power, those assets also absorb savings demand;
4. Bitcoin has no separate productive, consumptive or aesthetic function;
5. Bitcoin’s utility is monetary;
6. it competes for the monetary premium attached elsewhere.

This is the conceptual centre of the final investment thesis.

## 8.2 Speaker notes

Use this script closely and preserve its logic:

> Property provides shelter.
>
> Companies produce goods and services.
>
> Art provides cultural and aesthetic value.
>
> Gold has served as a monetary commodity for thousands of years.
>
> But when the dominant money is not trusted to preserve purchasing power over long periods, these assets are also asked to do another job: they absorb the savings demand that money is failing to satisfy.
>
> Bitcoin is different.
>
> It has no separate productive, consumptive or aesthetic function.
>
> Its utility is monetary—to carry and transfer value under rules that cannot be changed unilaterally.
>
> It is not another productive asset with a monetary premium attached.
>
> It is a monetary asset competing for the premium attached to everything else.

Include this additional line before the final two sentences:

> If money itself reliably preserved purchasing power, other assets would likely be valued more for their underlying utility and cash flows—and less for their role as savings vehicles.

End with:

> The question is not whether Bitcoin eliminates their primary functions. The question is how much monetary demand they continue to absorb.

## 8.3 Visible text

### Kicker

```text
WHEN OTHER ASSETS DO MONEY'S JOB
```

### Sequential functional statements

```text
PROPERTY SHELTERS.
```

```text
COMPANIES PRODUCE.
```

```text
GOLD HAS LONG CARRIED MONETARY VALUE.
```

Do not create a visible `ART EXPRESSES` object or icon.

Art remains in the spoken explanation.

### Bitcoin statement

```text
BITCOIN'S UTILITY IS MONETARY.
```

### Final line

```text
It competes for the monetary premium attached elsewhere.
```

## 8.4 Visual composition

Use a balanced four-position horizontal composition.

From left to right:

1. Property asset;
2. Shares asset;
3. Gold asset;
4. Bitcoin asset.

Use the existing premium renders.

Under each:

- Property:
  ```text
  SHELTERS
  ```
- Shares:
  ```text
  PRODUCES
  ```
- Gold:
  ```text
  MONETARY COMMODITY
  ```
- Bitcoin:
  ```text
  MONETARY UTILITY
  ```

Do not use:

- cards;
- a “repurposed” label;
- a “purpose-built” label;
- a winner badge;
- a special orange frame around Bitcoin.

Bitcoin may receive final textual emphasis, but its object render should remain optically consistent with the other assets.

## 8.5 Progressive builds

Implement exactly five cumulative states.

### Build 0 — Property

Reveal Property and:

```text
PROPERTY SHELTERS.
```

### Build 1 — Shares

Reveal Shares and:

```text
COMPANIES PRODUCE.
```

Keep Property visible.

### Build 2 — Gold

Reveal Gold and:

```text
GOLD HAS LONG CARRIED MONETARY VALUE.
```

Keep the first two visible.

### Build 3 — Bitcoin

Reveal Bitcoin and:

```text
BITCOIN'S UTILITY IS MONETARY.
```

Preferred emphasis:

- `BITCOIN'S UTILITY` white;
- `MONETARY` Bitcoin orange.

### Build 4 — Land the competition

Reveal:

```text
It competes for the monetary premium attached elsewhere.
```

Keep all four assets visible.

## 8.6 Final state

The slide should communicate:

- other assets retain their primary roles;
- Gold remains a monetary commodity;
- Bitcoin’s economic utility is monetary;
- the competition concerns monetary premium.

---

# 9. Slide 4.20 — Bitcoin Does Not Need to Replace Everything

## 9.1 Exact purpose

Slide 4.20 narrows the investment thesis and prevents a total-replacement interpretation.

It must establish:

1. Bitcoin does not need to eliminate Property;
2. Bitcoin does not need to eliminate Shares;
3. Bitcoin does not need to eliminate Art, Gold or every alternative store of value;
4. the primary functions of other assets remain;
5. Bitcoin competes with their monetary function, not their reason to exist;
6. the key question is whether other assets keep the same monetary premium as more savers understand and act on Bitcoin’s structural advantages.

## 9.2 Speaker notes

Use this script closely:

> A home still provides shelter.
>
> A company still produces goods, earns profits and may pay dividends.
>
> Art can still provide cultural and aesthetic value.
>
> Gold can remain a historically trusted monetary commodity.
>
> Bitcoin does not need to eliminate any of those functions.
>
> It competes with the portion of their value that comes from savers needing somewhere to preserve purchasing power.
>
> The narrower question is whether those assets will continue to carry the same monetary premium as more savers understand—and act on—the structural advantages of an asset whose primary function is to carry monetary value.
>
> Bitcoin has been accessible for years. What changes over time is understanding, confidence, liquidity, custody infrastructure and the willingness to act.

End with:

> Bitcoin competes with their monetary function—not their reason to exist.

## 9.3 Visible text

### Kicker

```text
BITCOIN DOES NOT NEED TO REPLACE EVERYTHING
```

### Sequential statements

```text
It does not need to replace property.
```

```text
It does not need to replace shares.
```

```text
It does not need to absorb every store of value.
```

### Final statement

```text
Bitcoin competes with their monetary function—
not their reason to exist.
```

Do not show the longer “as more savers understand…” sentence on screen.

Keep it in the spoken notes.

## 9.4 Visual composition

Start with the five-asset row from the comparison sequence:

- Gold;
- Fiat;
- Bitcoin;
- Property;
- Shares.

However, remove the table and scores.

Use the asset objects only.

Preferred arrangement:

- Bitcoin centred;
- Gold, Property and Shares around it;
- Fiat may remain subdued in the background or be omitted from the final frame, because this slide concerns the assets carrying savings demand.

Do not visually delete or destroy any asset.

Do not make Property or Shares fade to zero.

The visual meaning is coexistence with changing monetary demand.

## 9.5 Progressive builds

Implement exactly four cumulative states.

### Build 0 — Property remains

Reveal Property and:

```text
It does not need to replace property.
```

Bitcoin remains visible but neutral.

### Build 1 — Shares remain

Reveal Shares and replace the dominant sentence with:

```text
It does not need to replace shares.
```

Keep Property visible.

### Build 2 — Broaden the scope

Reveal Gold and the broader asset field.

Replace the dominant sentence with:

```text
It does not need to absorb every store of value.
```

### Build 3 — Land the precise competition

Reveal:

```text
Bitcoin competes with their monetary function—
not their reason to exist.
```

All relevant assets remain visible.

Bitcoin may receive restrained orange emphasis in the final line only.

## 9.6 Final state

- Bitcoin and the alternative assets coexist;
- no asset is visually erased;
- final line dominates;
- extensive black space remains.

---

# 10. Slide 4.21 — The Marginal Store-of-Value Decision

## 10.1 Exact purpose

Slide 4.21 introduces the key investment insight:

```text
Bitcoin does not need the entire existing stock of wealth to move.
It needs to win a growing share of new and recurring allocation decisions.
```

It must establish:

1. every new unit of savings creates a new carrier decision;
2. portfolio rebalances and asset sales create new decisions;
3. inheritances, refinancings and business exits create new decisions;
4. monetary competition is decided at the margin;
5. the question is where the next unredeemed claim goes.

This is the narrative climax before the fixed-supply consequence.

## 10.2 Speaker notes

Use this script closely:

> The entire existing stock of global wealth does not need to move at once.
>
> Every new unit of savings creates a new decision.
>
> So does every refinancing, inheritance, asset sale and portfolio rebalance.
>
> A maturing bond creates another decision.
>
> A business exit creates another decision.
>
> The important question is which carrier wins a growing share of those marginal decisions.
>
> The monetary competition is decided at the margin.

End with:

> So where does the next unredeemed claim go?

## 10.3 Visible text

### Kicker

```text
THE MARGINAL STORE-OF-VALUE DECISION
```

### Main question

```text
Where does the next unredeemed claim go?
```

### Supporting line

```text
Every new unit of savings creates a new carrier decision.
```

### Final line

```text
The monetary competition is decided at the margin.
```

Do not list refinancing, inheritance, asset sales and rebalancing on screen.

Keep those in the notes.

## 10.4 Visual composition

Bring back the approved `ClaimObject`.

Place one claim object at the centre-bottom or centre of the stage.

Arrange five candidate assets in one balanced destination row or shallow arc:

- Gold;
- Fiat;
- Bitcoin;
- Property;
- Shares.

Use the same order as the comparison table.

Create five restrained paths from the claim decision point toward the five assets.

Requirements:

- paths mathematically distributed;
- no one path active initially;
- no thicker Bitcoin path;
- no winner highlight;
- no clutter;
- no animated money rain.

The slide asks the question; it does not yet visually answer it.

## 10.5 Progressive builds

Implement exactly four cumulative states.

### Build 0 — The next claim

Visible:

- kicker;
- claim object;
- main question.

No destination assets yet.

### Build 1 — The available carriers

Reveal all five candidate assets simultaneously.

Reveal five restrained paths.

Do not highlight any candidate.

### Build 2 — Recurring decisions

Reveal:

```text
Every new unit of savings creates a new carrier decision.
```

Introduce two or three additional smaller claim objects arriving sequentially at the same decision point.

Do not route them to specific assets.

Their arrival represents recurring decisions.

### Build 3 — Land the marginal insight

Reveal:

```text
The monetary competition is decided at the margin.
```

Keep the candidate field neutral.

## 10.6 Final state

- repeated claim decisions visible;
- five carriers visible;
- no winner chosen;
- final line dominant.

This slide establishes the mechanism.

Slide 4.22 explains why the mechanism matters disproportionately for fixed supply.

---

# 11. Slide 4.22 — Fixed Supply Reprices at the Margin

## 11.1 Exact purpose

Slide 4.22 connects marginal savings demand to Bitcoin’s fixed supply.

It must establish:

1. demand does not need to purchase every existing Bitcoin;
2. only marginal units transact at any moment;
3. new demand meets holders’ willingness to sell;
4. Bitcoin’s supply cannot expand in response through discretionary issuance;
5. marginal transactions can reprice the entire outstanding stock;
6. this is market logic, not a mechanical price guarantee.

Do not:

- promise a specific price;
- show a forecast;
- use a market-cap multiplier;
- use a price chart;
- claim every inflow produces a predictable proportional increase.

## 11.2 Speaker notes

Use this script closely:

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

End with:

> Bitcoin does not need to absorb everything. It only needs to win more of the margin.

## 11.3 Visible text

### Kicker

```text
FIXED SUPPLY REPRICES AT THE MARGIN
```

### Sequential statements

```text
Demand does not need to absorb everything.
```

```text
It only needs to grow against a supply that cannot respond.
```

```text
Marginal flows can reprice the entire stock.
```

Do not display a disclaimer paragraph.

## 11.4 Visual composition

Use a restrained fixed-supply field.

### Fixed supply

Represent Bitcoin’s supply using a finite, stable set of small Bitcoin-orange units or approved claim markers arranged in a clean ring, row or compact field.

Recommended:

- 21 small units as a symbolic visual reference;
- no visible `21 MILLION` label unless already supported by existing deck conventions;
- fixed unit count across all builds;
- no new units appearing.

Place the premium Bitcoin object at the centre or beside the field.

### Available margin

Only two or three units at the edge receive brighter emphasis, representing the supply currently offered for sale.

### Incoming demand

Use two or three approved claim markers approaching the highlighted edge.

### Repricing

Use a restrained outer valuation contour, index line or typographic value band that expands across the whole fixed field after the marginal interaction.

Do not use:

- candlesticks;
- a price chart;
- a rocket;
- a multiplier;
- green arrows;
- dollar amounts.

## 11.5 Progressive builds

Implement exactly four cumulative states.

### Build 0 — The fixed stock

Visible:

- kicker;
- fixed unit field;
- Bitcoin object;
- statement:
  ```text
  Demand does not need to absorb everything.
  ```

### Build 1 — The available margin

Highlight only the small edge portion currently offered.

Reveal incoming claim markers.

No new supply units appear.

### Build 2 — Demand meets fixed supply

Reveal:

```text
It only needs to grow against a supply that cannot respond.
```

Incoming demand reaches the available edge.

The fixed field remains unchanged in unit count.

### Build 3 — Reprice the stock

Reveal:

```text
Marginal flows can reprice the entire stock.
```

A restrained valuation emphasis propagates across the existing field.

The units themselves do not multiply.

## 11.6 Final state

- fixed supply visibly unchanged;
- marginal interaction visible;
- whole-stock repricing concept visible;
- final line dominant;
- no price prediction.

---

# 12. Slide 4.23 — The Investment Case from First Principles

## 12.1 Exact purpose

Slide 4.23 closes Section 4 and potentially the presentation.

It must:

1. summarise the full causal chain;
2. return to the presentation’s original claim-on-value framework;
3. connect the ten-property comparison to marginal savings decisions;
4. land the Bitcoin investment thesis;
5. end without a trailer or appendix teaser.

This slide adds no new analysis.

It compresses the entire argument.

## 12.2 Speaker notes

Use this script closely:

> Money is a claim on value.
>
> A store of value carries that claim through time.
>
> The ten properties let us compare the available carriers.
>
> The investment question is which carrier wins the next unit of savings.
>
> Bitcoin does not need to replace property, shares, gold or every alternative store of value.
>
> It only needs to become the preferred place to store a growing share of the next units of value.
>
> That is the investment case—from first principles.

After the final line, pause.

Do not add:

- a sequel teaser;
- `Money: Civilization’s Operating System`;
- another callout;
- a market forecast;
- a price target.

## 12.3 Visible text

### Kicker

```text
THE INVESTMENT CASE — FROM FIRST PRINCIPLES
```

### Four-line summary

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
The investment question is which carrier wins the next unit of savings.
```

### Final conclusion

```text
Bitcoin does not need to replace everything.
```

```text
It only needs to become the preferred place
to store the next unit of value.
```

### Final line

```text
The investment case—from first principles.
```

## 12.4 Visual composition

Return to the approved core visual language:

- one `ClaimObject`;
- one `CarrierShell`;
- a restrained `NOW → LATER` path.

Use the claim/carrier as the visual anchor beneath or between the summary lines.

Do not show:

- the comparison table;
- all five asset objects;
- a chart;
- a globe;
- a market-cap figure.

The final slide should feel like a return to first principles.

## 12.5 Progressive builds

Implement exactly four cumulative states.

### Build 0 — Reconstruct the causal chain

Reveal the first two lines:

```text
Money is a claim on value.
A store of value carries that claim through time.
```

Show the claim object entering the carrier and moving along the restrained time path.

### Build 1 — Add the framework and investment question

Reveal:

```text
The ten properties let us compare the available carriers.
The investment question is which carrier wins the next unit of savings.
```

Keep the claim/carrier visible.

### Build 2 — Land the conclusion

Subdue the four-line summary.

Reveal:

```text
Bitcoin does not need to replace everything.
```

Then:

```text
It only needs to become the preferred place
to store the next unit of value.
```

Preferred emphasis:

- first line white;
- `preferred place`;
- `next unit of value`;

in restrained Bitcoin orange.

Do not highlight the whole conclusion.

### Build 3 — Final frame

Fade the four-line summary completely.

Keep:

- claim inside carrier;
- restrained time path;
- final conclusion.

Reveal:

```text
The investment case—from first principles.
```

The final frame should be extremely minimal.

If an existing global close slide follows, ensure the next advance transitions cleanly to it.

If 4.23 is the final visible slide, allow it to remain on screen without automatically advancing.

## 12.6 Final frame

Only:

- kicker or final line, depending on the approved deck convention;
- claim/carrier visual;
- the two-line Bitcoin conclusion;
- `The investment case—from first principles.`;
- extensive black space.

No future-presentation teaser.

---

# 13. Cross-slide transitions

## 13.1 4.16 → 4.17

Do not visually morph the comparison table into the migration slide.

Preferred:

1. verification line fades;
2. table dims;
3. clean crossfade;
4. Fiat object appears;
5. 4.17 kicker appears.

The spoken architecture-versus-valuation bridge carries the conceptual transition.

## 13.2 4.17 → 4.18

Retain the Gold, Property and Shares assets.

Remove:

- Fiat object;
- savings flow.

Reorganise the three assets into the monetary-premium examples.

## 13.3 4.18 → 4.19

Retain:

- Property;
- Shares;
- Gold.

Remove:

- equation;
- premium halos after a brief hold.

Add:

- Bitcoin asset;
- 4.19 functional labels.

## 13.4 4.19 → 4.20

Retain the asset field.

Re-centre Bitcoin.

Shift Property, Shares and Gold into a coexistence composition.

## 13.5 4.20 → 4.21

Fade the explanatory statement.

Reorganise assets into the five-carrier destination field.

Bring back the claim object at the decision point.

## 13.6 4.21 → 4.22

Fade all alternative assets except Bitcoin.

The claim decision field transforms into incoming demand.

Bitcoin becomes the fixed-supply subject.

## 13.7 4.22 → 4.23

Fade the fixed-supply field and marginal repricing visual.

Retain one claim object.

Form the approved carrier shell around it.

Restore a restrained `NOW → LATER` path.

Begin the final four-line summary.

Use reliable matching geometry or clean crossfades.

Do not force fragile shared-DOM continuation.

---

# 14. Typography and layout standards

## Kicker

Use the approved Section 4 kicker style:

- short Bitcoin-orange line;
- uppercase;
- restrained tracking;
- consistent position.

## Main statements

- no more than two lines where possible;
- no cards;
- no quotation marks;
- no decorative outlines;
- no excessive tracking.

## Orange usage

Use Bitcoin orange for:

- claim objects;
- one key phrase;
- active flow;
- final conclusion emphasis;
- kicker line.

Do not turn every statement orange.

## Black space

Preserve substantial negative space.

The ending should feel increasingly distilled as it approaches 4.23.

---

# 15. Motion standards

Allowed:

- opacity;
- restrained translation;
- clean claim movement;
- subtle asset scaling;
- one-time path drawing;
- soft premium-halo formation;
- controlled flow lines;
- restrained whole-field valuation emphasis.

Avoid:

- particles;
- money rain;
- bouncing;
- spring motion;
- spinning;
- pulsing loops;
- rockets;
- green arrows;
- explosive repricing;
- dramatic blur;
- market charts;
- ticker animations.

Suggested timing:

```text
standard reveal: 350–500 ms
asset movement: 500–750 ms
claim movement: 500–750 ms
migration flow: 600–850 ms
premium-layer reveal: 450–650 ms
fixed-supply interaction: 600–850 ms
final-slide transition: 600–900 ms
```

Respect reduced motion.

In reduced-motion mode:

- complete target states appear instantly;
- no concept is omitted;
- no delayed callback is required.

---

# 16. Deterministic build requirements

For slides 4.17–4.23:

- every build reconstructs its complete target state;
- forward navigation works;
- backward navigation works;
- refresh at nonzero builds works;
- force-next works;
- force-previous works;
- reduced motion works;
- migrated claim markers do not leak into later slides;
- monetary-premium halos reset;
- asset positions restore;
- repeated marginal claim markers do not duplicate;
- fixed-supply unit count never changes;
- final-slide summary and conclusion restore correctly;
- timelines and delayed calls are cleaned up.

---

# 17. Implementation scope

Modify only:

- slide 4.16 speaker notes;
- slide 4.17 module;
- slide 4.18 module;
- slide 4.19 module;
- slide 4.20 module;
- slide 4.21 module;
- slide 4.22 module;
- slide 4.23 module;
- slide-specific CSS/selectors;
- speaker notes;
- narrowly scoped flow, premium-layer, marginal-decision and fixed-supply helpers;
- minimal slide registration/manifest entries.

Any shared-component change must preserve slides 4.04–4.16 exactly.

Do not:

- change slide 4.16 visuals;
- change table scores;
- change earlier property wording;
- add new image assets;
- add a trailer;
- create a general-purpose market simulation framework;
- add price forecasts;
- add total-market-value calculations;
- modify the slide engine;
- add dependencies;
- run `npm audit fix`.

---

# 18. Required visual self-review

Inspect every build at 1920×1080.

## Slide 4.16 notes

1. Is the architecture-versus-valuation caveat present?
2. Is slide 4.16 visually unchanged?

## Slide 4.17

3. Does Fiat retain exchange/accounting utility rather than appearing destroyed?
4. Does the demand to save visibly migrate?
5. Are Gold, Property and Shares the receiving examples?
6. Is Bitcoin absent from this slide?
7. Is the final frame clean?

## Slide 4.18

8. Is the monetary-premium equation immediately understandable?
9. Are underlying-value labels accurate?
10. Is the premium layer restrained?
11. Is the conceptual—not measurable—nature preserved in notes?
12. Does the final line explicitly say Bitcoin competes for premium, not total value?

## Slide 4.19

13. Is the title exactly `WHEN OTHER ASSETS DO MONEY'S JOB`?
14. Does Property shelter?
15. Do Companies produce?
16. Is Gold treated as an established monetary commodity?
17. Is Bitcoin’s utility described as monetary?
18. Are `repurposed` and `purpose-built` absent?
19. Is Bitcoin not given a winner badge?

## Slide 4.20

20. Are other assets visibly preserved rather than replaced?
21. Is the final statement exactly about monetary function versus reason to exist?
22. Is the longer adoption/understanding wording kept in notes rather than crowded on screen?

## Slide 4.21

23. Is the same claim object restored?
24. Are five carrier destinations balanced?
25. Is no destination highlighted as the winner?
26. Do repeated claim markers represent recurring marginal decisions without clutter?
27. Does the final line land cleanly?

## Slide 4.22

28. Is the supply field visibly fixed?
29. Do no new supply units appear?
30. Is only the available margin emphasised?
31. Is whole-stock repricing shown without a price chart?
32. Is there no mechanical-price promise?
33. Is the final line readable and credible?

## Slide 4.23

34. Are the four summary lines exact?
35. Does the claim/carrier visual return?
36. Does the final conclusion avoid saying Bitcoin must replace everything?
37. Is `preferred place` or `next unit of value` the only orange emphasis?
38. Is there no sequel teaser?
39. Is the final frame minimal enough to end the presentation?

## Preservation

40. Are slides 4.01–4.16 visually unchanged?
41. Are all score values unchanged?
42. Is the existing close-slide behaviour preserved?
43. Are notes aligned with the approved narrative?
44. Is every intermediate build screenshot-ready?
45. Does backward navigation reconstruct every state cleanly?

Correct every failed item before reporting completion.

---

# 19. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the complete diff.
4. Open slide 4.16 and verify visual preservation.
5. Verify the updated 4.16 notes.
6. Open slide 4.17 directly and inspect all builds.
7. Open slide 4.18 directly and inspect all builds.
8. Open slide 4.19 directly and inspect all builds.
9. Open slide 4.20 directly and inspect all builds.
10. Open slide 4.21 directly and inspect all builds.
11. Open slide 4.22 directly and inspect all builds.
12. Open slide 4.23 directly and inspect all builds.
13. Inspect final states at the actual recording viewport.
14. Navigate 4.16 → 4.17 → 4.18 → 4.19 → 4.20 → 4.21 → 4.22 → 4.23 repeatedly.
15. Navigate backward through the same sequence repeatedly.
16. Refresh every new slide at multiple nonzero build states.
17. Test force-next and force-previous.
18. Test reduced-motion mode.
19. Verify notes overlay.
20. Verify second-window notes.
21. Keep the browser console open and confirm no errors.
22. Verify any existing close slide still works.
23. Search source and CSS for:
    - `repurposed`;
    - `purpose-built`;
    - `90%`;
    - `evolution of problem solving`;
    - total-addressable-market arithmetic;
    - price forecasts;
    - money rain;
    - green arrows;
    - sequel teaser;
    - `Civilization's Operating System`;
    - duplicate claim objects;
    - leaking migration flows;
    - changing fixed-supply unit count;
    - accidental changes beyond scope.

Stop after Section 4 is complete.

Do not add further slides.

---

# 20. Completion report

Report:

## Implemented

- concise summary of the 4.16 spoken bridge;
- concise summary of slide 4.17;
- concise summary of slide 4.18;
- concise summary of slide 4.19;
- concise summary of slide 4.20;
- concise summary of slide 4.21;
- concise summary of slide 4.22;
- concise summary of slide 4.23;
- confirmation that Section 4 is complete.

## Narrative safeguards

Confirm that:

- the closing is derived from the claim/carrier framework;
- the old evolution-of-problem-solving thesis was not used;
- no 90% convergence claim was used;
- Bitcoin competes for monetary premium rather than full asset value;
- no price forecast or total-market-value arithmetic was added;
- no sequel trailer was added.

## Files changed

Provide a file-by-file list.

Report exact paths for any new narrowly scoped helpers.

Confirm that slide 4.16 visuals and slides 4.01–4.15 remain unchanged.

## Validation

Report:

- commands actually run;
- build result;
- console result;
- reduced-motion result;
- forward-navigation result;
- backward-navigation result;
- refresh/restoration result;
- notes result;
- close-slide result.

## Review access

Provide exact deep links for:

- slide 4.17;
- slide 4.18;
- slide 4.19;
- slide 4.20;
- slide 4.21;
- slide 4.22;
- slide 4.23.

Include instructions for reviewing every build state.

## Remaining judgement calls

List only genuine visual issues requiring human review.

End with one recommended next action only.
