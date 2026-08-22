# Codex Task — Final Clean-Up Pass for 4.17, 4.22, 4.23 and “Spend or Save”

Read and follow these files first:

- `AGENTS.md`
- `PLANS.md`
- `docs/section-4-master-brief.md`
- `docs/section-4-narrative-master-document.md`
- `docs/codex-refine-4-10-to-4-14-failure-framework.md`
- `docs/codex-fix-4-13-4-14-sequence.md`
- `docs/codex-build-4-15-4-16-comparison-table.md`
- `docs/codex-build-4-17-to-4-23-final-investment-thesis.md`
- `docs/codex-refine-4-17-4-21-4-22-4-23-final-visuals.md`

This brief is a **narrow corrective pass**. It does **not** reopen the broader section. It only fixes a few remaining clarity / polish issues.

Scope is limited to:

- slide **4.17** (`WHEN THE STORE-OF-VALUE FUNCTION MIGRATES`);
- slide **4.22** (`FIXED SUPPLY REPRICES AT THE MARGIN`);
- slide **4.23** (`THE CASE FOR BITCOIN — FROM FIRST PRINCIPLES`);
- the earlier slide titled **`SPEND OR SAVE`**.

Everything else should remain untouched unless a tiny helper or style change is strictly necessary to implement these fixes.

---

# 1. High-level guidance

The deck is now in excellent shape. This pass is about **polish, centering, sequencing, and immediate legibility**.

The required changes are:

1. **4.17:** clean up the migration lane geometry so the three resting ClaimObjects are perfectly centred beneath Gold, Property and Shares, and the lower line / risers connect cleanly.
2. **4.22:** improve the legibility of the “reprices at the margin” mechanism, because the current final visual is still not self-evident enough.
3. **4.23:** fix the build sequence so the third and fourth summary lines do **not** appear at the same time.
4. **Spend or Save:** ensure the carrier fully disappears when the `SPEND NOW` goods appear, instead of remaining visibly ghosted over the sneaker / steak area.

---

# 2. Slide 4.17 — When the Store-of-Value Function Migrates

## Problem

The current final state is much better than before, but there are still a few visible polish issues:

- the three ClaimObjects do **not** land exactly centred beneath:
  - the Gold render + `GOLD` label,
  - the Property render + `PROPERTY` label,
  - the Shares render + `SHARES` label;
- the lower horizontal orange line does **not** fully connect into the final right-hand riser;
- the final riser appears to have a slightly different colour / visual weight;
- the three vertical branch lines feel a little detached from the three final ClaimObject resting positions.

## Required fix

### 2.1 Centre the final ClaimObjects perfectly

In the final migration state:

- each resting ClaimObject must sit **exactly on the horizontal centreline of its destination asset group**;
- “asset group” here means the **render + its label**, treated as one optical group;
- the ClaimObjects should therefore appear visually locked to:
  - Gold,
  - Property,
  - Shares.

Do not approximate this by eye if the component system allows a cleaner geometry calculation. If possible, base each ClaimObject x-position on the destination group’s centre.

### 2.2 Make the branch geometry perfectly clean

The lower migration lane must be one continuous line.

Fix the current gap at the far right.

All three vertical risers must:

- use the same stroke colour;
- use the same opacity;
- use the same thickness;
- terminate cleanly.

The final right-most riser must **visually match** the other two.

### 2.3 Link the risers to the ClaimObjects cleanly

Yes — the vertical lines should visually link to where the three ClaimObjects rest.

The cleanest approach is:

- lower horizontal lane;
- three upward risers;
- each riser terminating directly **beneath** its corresponding resting ClaimObject;
- a small, clean visual spacing (or direct touch if it looks better) between riser end and ClaimObject.

The important thing is that the relationship is unambiguous and clean.

The viewer should immediately read:

```text
migration lane
→ branch upward
→ claim lands here
→ this asset receives the savings demand
```

### 2.4 Preserve everything else

Do **not** change:

- the approved wording;
- the overall layout;
- the presence / absence of Bitcoin;
- the four-state structure;
- the general story.

This is a geometry / polish correction only.

---

# 3. Slide 4.22 — Fixed Supply Reprices at the Margin

## First: what the current version is trying to say

The current visual is trying to communicate:

- the full rectangular field = the **fixed outstanding stock**;
- the highlighted right-edge slice = the small portion **available at the margin**;
- the three incoming ClaimObjects on the right = **new savings demand**;
- the point is that demand does **not** need to buy the whole stock;
- it only needs to meet the comparatively thin edge of supply being offered at that moment;
- once the marginal trade happens, the resulting market price applies to the entire outstanding stock;
- hence: **marginal flows can reprice the entire stock**.

So the underlying logic is correct.

## But the remaining issue

If the creator / speaker does not immediately parse the visual, then it is not yet clear enough for the audience.

So yes: **this slide should be reworked one more time**.

Not a total conceptual rewrite — the concept is right — but the **visual explanation needs to become more instantly legible**.

## Required rework

### 3.1 Keep the stock-field concept

Retain the rectangular fixed-stock field concept.

Do **not** revert to the old ring / circle design.

The rectangular stock-field idea is the right direction.

### 3.2 Make the margin slice more obviously “the small part currently available”

At the moment, the viewer may not instantly understand the highlighted edge.

Make it clearer.

Suggested approach:

- keep the full grid of units as the outstanding stock;
- make the “available at the margin” area read more explicitly as a **thin edge slice**;
- you may use one or more of the following if helpful:
  - slightly stronger contrast between the main stock and the margin slice;
  - a cleaner small bracket or edge emphasis;
  - slightly more obvious isolation of the margin slice;
  - clearer micro-spacing or grouping.

Do not add clutter. Do not turn it into an infographic. But make it read more instantly as:

```text
whole stock
vs.
small available edge
```

### 3.3 Make the repricing mechanism clearer in the final state

This is the main remaining weakness.

The current final state does not yet make “the whole stock reprices” obvious enough.

The cleanest interpretation should become:

```text
incoming demand meets the thin available edge
→ price is discovered there
→ that market price applies to the whole stock
```

So in the final build, show this more explicitly.

Preferred direction:

- keep the incoming ClaimObjects at the margin edge;
- keep the grid count fixed;
- keep the right-edge slice as the contact point;
- then make the repricing of the full field more obvious via a restrained propagation / whole-field state change.

This could include, for example:

- the edge slice remaining the brightest point;
- a clean, restrained emphasis travelling from the margin inward / across the field;
- the entire stock settling into a slightly brighter, repriced state;
- optionally a subtle enclosing field outline or unified end-state emphasis **if** it clarifies the idea and remains elegant.

Do **not**:
- add units;
- make the grid explode;
- add a price chart;
- add candlesticks;
- add green arrows;
- add complicated explanatory labels;
- make it visually noisy.

### 3.4 Keep the copy minimal

The slide should still remain elegant and low-text.

Do not overload it with explanation.

You may keep the approved main statements, but the visual itself should now do more of the explanatory work.

### 3.5 Preserve the core meaning

Preserve the approved verbal meaning:

- demand does not need to absorb everything;
- it only needs to grow against a supply that cannot respond;
- marginal flows can reprice the entire stock.

But make the mechanism more visually legible.

---

# 4. Slide 4.23 — The Case for Bitcoin from First Principles

## Problem

The new pure-typographic ending is excellent.

However, the build sequence is still slightly wrong:

- Build 0: first sentence appears;
- Build 1: second sentence appears;
- then the third and fourth sentences appear together;
- the fourth is highlighted.

The highlighting logic is fine.

But the **third and fourth lines should not be revealed together**.

## Required fix

Change the sequence so the four summary lines are revealed **one-by-one**.

## Exact required build sequence

### Build 0

Visible:

```text
Money is a claim on value.
```

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

### Build 3

Add:

```text
The key question is which carrier wins the next unit of savings.
```

This fourth line should still carry the stronger emphasis / brightness, because it is the key line.

### Build 4

Transition to the final conclusion:

```text
Bitcoin does not need to replace everything.
It only needs to become the preferred place
to store the next unit of value.
```

and the small final line:

```text
The case for Bitcoin—from first principles.
```

## Preserve everything else

Do **not** change:

- the new title;
- the pure typographic approach;
- the final wording;
- the orange emphasis on `preferred place` and `next unit of value`;
- the general layout;
- the clean final frame.

This is a sequencing correction only.

---

# 5. Earlier slide — “Spend or Save”

## Problem

On the `SPEND OR SAVE` slide, when the carrier moves toward `SPEND NOW` and the goods appear (sneaker, steak, wine), the carrier is still visibly ghosted in the background.

It fades back but remains too visible over the sneaker / steak area.

## Required fix

For the `SPEND NOW` sequence only:

- when the goods appear and the claim is being redeemed into present consumption,
- the carrier should fade out fully / disappear completely into the background,
- so that it is no longer visibly sitting behind the sneaker / steak imagery.

In practical terms:

- by the time the goods cluster is established, the carrier opacity should be effectively zero;
- if a masking or z-order adjustment is cleaner than an opacity-only solution, use that;
- the result should be that the carrier is not visibly competing with the goods imagery.

## Preserve everything else

Do **not** change:

- the wording;
- the layout;
- the motion logic;
- the goods imagery;
- the `SAVE FOR LATER` side;
- the structure of the slide.

This is only a final clean fade / disappearance fix for the carrier on the `SPEND NOW` side.

---

# 6. Validation checklist

After implementation, validate the following.

## 4.17

1. Are the three resting ClaimObjects exactly centred beneath Gold, Property and Shares?
2. Is the lower lane continuous all the way to the final riser?
3. Do all three risers match in stroke colour and weight?
4. Do the risers visually connect to the ClaimObject resting positions?
5. Does the final state read cleaner than before?

## 4.22

6. Is the meaning more immediately legible?
7. Does the viewer clearly understand:
   - full stock,
   - thin available margin,
   - incoming demand,
   - whole-stock repricing?
8. Is the grid count unchanged across builds?
9. Is the final state clearer without becoming busier?
10. Is the slide still elegant rather than infographic-heavy?

## 4.23

11. Are the four summary lines revealed one-by-one?
12. Does the fourth line still receive stronger emphasis?
13. Does the final conclusion still land cleanly?

## Spend or Save

14. Does the carrier fully disappear during the `SPEND NOW` goods state?
15. Is it no longer visible over the sneaker / steak cluster?

## Preservation

16. Is everything else unchanged?

---

# 7. Required completion report

Report back with:

## Implemented
- 4.17 centering / lane / riser fixes;
- 4.22 clarity rework summary;
- 4.23 build-sequence fix;
- `SPEND OR SAVE` carrier disappearance fix.

## Build counts
Give the final build counts for:
- 4.17
- 4.22
- 4.23

Also confirm that `4.23` now has the extra summary build.

## Files changed
List exact file paths.

## Validation
Confirm:
- `npm run build`
- `git diff --check`
- no console errors
- manual inspection of all touched builds
- unchanged behaviour elsewhere

## Remaining judgement calls
List only genuine visual questions still worth human review.

End with one recommended next action only.
