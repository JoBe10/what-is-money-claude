> **Build prompt, executed — archived, not authoritative.** ChatGPT/Codex-era working material for the original Section 4 build.
> Superseded by `docs/what-is-money-master.md` and `docs/synthesis-architecture.md` (Stage 0, 25 August 2026). Nothing here governs.

# Codex Task — Final refinement of slides 4.13–4.14

Read and follow these files first:

- `AGENTS.md`
- `PLANS.md`
- `docs/section-4-master-brief.md`
- `docs/section-4-narrative-master-document.md`
- `docs/codex-refine-4-10-to-4-14-failure-framework.md`

This brief is a narrowly scoped corrective refinement for **slides 4.13 and 4.14 only**.

The earlier refinement worked almost perfectly.  
However, the **build sequence from “From Failure to Requirement” into “The Ten Properties” is still not correct** and must now be simplified.

The goal is to make this segment:

- cleaner;
- more direct;
- more consistent;
- easier to speak over;
- lighter on clicks;
- visually calmer.

---

# 1. Core judgement call: title wording

## Keep the kicker as:

```text
FROM FAILURE TO REQUIREMENT
```

Do **not** change it to `FROM FAILURE TO PROPERTY`.

### Why
That slide is not merely naming properties.  
It is showing the **logical inversion** from each failure mode to the **requirement** the ideal carrier must satisfy.

So the structure should be:

- **slide 4.13** = the reasoning step: from failure to requirement;
- **slide 4.14** = the result: the ten properties.

That distinction is good and should stay.

The visible headline on 4.13 should still be:

```text
Invert each failure. The properties emerge.
```

So:

- kicker = the logical move;
- headline = the outcome.

That is the cleanest framing.

---

# 2. What is wrong in the current implementation

The current sequence still contains several issues:

1. On slide 4.13, the first click shows only:
   - `DILUTED → NO SUPPLY INFLATION`
   with the property in orange.

2. The next click reveals the remaining nine mappings.

3. After that, there are still **extra transitional states**:
   - a state where only the properties are isolated;
   - a state showing only the first five numbered properties;
   - then a state showing the full two-column list.

That is still not the intended flow.

---

# 3. Correct final behaviour

## The whole sequence should now work like this

### Slide 4.13
**Build 0**
- show all ten failures only;
- no arrows;
- no properties.

**Build 1**
- show **all ten mappings at once**;
- every mapping appears in its final style immediately;
- no “single highlighted first property” step;
- no staggered reveal of the remaining nine;
- no orange active property after the reveal.

Then move directly to:

### Slide 4.14
A **single clean slide** showing the full numbered two-column list of all ten properties.

That means:

- no intermediate “properties only” isolation slide;
- no intermediate “first five properties only” slide;
- no extra stepping through partial property lists.

---

# 4. Exact required slide behaviour

## Slide 4.13 — From Failure to Requirement

### Kicker
Keep:

```text
FROM FAILURE TO REQUIREMENT
```

### Headline
Keep:

```text
Invert each failure. The properties emerge.
```

### Build 0 — failures only
Show the two-column failure layout only.

Left column:

```text
DILUTED
INDIVISIBLE
ILLIQUID
TRAPPED
COSTLY TO HOLD
```

Right column:

```text
CONTROLLED
DEGRADED
UNVERIFIABLE
NON-FUNGIBLE
UNTESTED
```

Styling:
- failures in restrained grey;
- no arrows;
- no properties;
- balanced two-column layout.

### Build 1 — all mappings at once
On one click, reveal the full mapping set:

Left:

```text
DILUTED        → NO SUPPLY INFLATION
INDIVISIBLE    → DIVISIBILITY
ILLIQUID       → LIQUIDITY
TRAPPED        → PORTABILITY
COSTLY TO HOLD → NO CARRYING COSTS
```

Right:

```text
CONTROLLED     → RESISTANCE TO CONTROL
DEGRADED       → DURABILITY
UNVERIFIABLE   → VERIFIABILITY
NON-FUNGIBLE   → FUNGIBILITY
UNTESTED       → TRACK RECORD
```

### Final style for all mappings
Every row must use the same final style immediately:

- failure term = restrained grey;
- arrow = Bitcoin orange;
- property term = white.

Important:
- `NO SUPPLY INFLATION` must **not** appear alone in orange first.
- There must be **no special first-row demonstration step** anymore.
- All ten mappings appear together, at once, in one coherent batch.

### Number of builds on 4.13
There should now be only **2 total states**:

- Build 0 = failures only;
- Build 1 = full mappings.

Nothing else.

### Remove these old extra states from 4.13 entirely
Do not keep any state that:
- isolates only the properties;
- removes failures/arrows while staying on 4.13;
- prepares the left-column-only numbered list;
- partially turns 4.13 into 4.14.

Those states should not exist anymore.

---

# 5. Slide 4.14 — The Ten Properties

This slide should now open directly on the final two-column numbered list.

## Kicker
Keep:

```text
THE TEN PROPERTIES
```

## Visible content
Use the exact final list below.

Left column:

```text
01  NO SUPPLY INFLATION
02  DIVISIBILITY
03  LIQUIDITY
04  PORTABILITY
05  NO CARRYING COSTS
```

Right column:

```text
06  RESISTANCE TO CONTROL
07  DURABILITY
08  VERIFIABILITY
09  FUNGIBILITY
10  TRACK RECORD
```

## Build structure
This slide should now have **one clean stable visual state**.

That means:
- no first state with only properties 01–05;
- no second state adding 06–10;
- no partial build-up;
- no extra intermediary numbering state.

The slide should simply appear with the **full final two-column list already present**.

If the slide framework requires at least one build index internally, that is fine, but visually it must behave like a single stable state.

---

# 6. Transition between 4.13 and 4.14

## Desired transition
From 4.13 Build 1 (all mappings visible), the next advance should go **directly** to 4.14 showing the full final two-column numbered list.

No transitional slide states in between.

### Sequence should be:

1. **4.13 / Build 0**  
   failures only

2. **4.13 / Build 1**  
   all ten mappings at once

3. **4.14**  
   full numbered two-column list of all ten properties

That is the entire sequence.

---

# 7. Speaker-note intent

You do not need to materially rewrite the speaker notes.  
But ensure the slide flow now supports this narration:

### On 4.13
The speaker can say:
- “Now invert each failure, and the required properties emerge.”
- then verbally walk through them one by one while all mappings are visible.

That is why all ten mappings should appear together.

### On 4.14
The speaker can then say:
- “That gives us ten properties.”
- and treat this slide as the clean final framework.

So the visual flow must support:
- explanation on 4.13;
- summary framework on 4.14.

---

# 8. Implementation requirements

Modify only what is necessary in slides 4.13 and 4.14.

Preserve unchanged:
- slide 4.10;
- slide 4.11;
- slide 4.12;
- the approved typography;
- the approved orange accent;
- the approved spacing system;
- the premium black presentation style.

Do not:
- introduce new animations;
- add icons;
- add explanatory footnotes;
- add new text;
- change the final property names;
- change the approved property order.

---

# 9. Required code cleanup

Remove or disable any old logic that creates the unwanted extra states, including:

- the single-row highlight/demonstration step for `DILUTED → NO SUPPLY INFLATION`;
- the follow-up batch reveal logic that assumes a “first row first” sequence;
- the “properties only” isolation state on 4.13;
- the intermediate “01–05 only” state on 4.14;
- any build arrays or stage maps that still produce those visuals.

The final implementation should have a simpler and more deterministic build structure.

---

# 10. Validation checklist

After making the change, validate this exact click sequence:

## Slide 4.13
- first state = failures only;
- next click = all ten mappings appear together;
- no extra 4.13 states after that.

## Next click
- go directly to slide 4.14.

## Slide 4.14
- immediately show the full numbered two-column list of all ten properties;
- no partial first-half-only state;
- no additional reveal of the second half.

Also verify:
- backward navigation works correctly;
- refreshing on 4.13 Build 1 restores the full mappings correctly;
- refreshing on 4.14 shows the full two-column list correctly;
- no old intermediate states reappear when navigating back and forward.

---

# 11. Completion report

When done, report:

## Implemented
- that 4.13 now has only two states;
- that all ten mappings appear at once on the second state;
- that the orange-only first-property reveal was removed;
- that all intermediate post-mapping states were removed;
- that 4.14 now opens directly on the full two-column numbered list.

## Title decision
Explicitly confirm that:
- the kicker remains `FROM FAILURE TO REQUIREMENT`;
- the reason is that it describes the logical inversion step, while `THE TEN PROPERTIES` remains the resulting framework.

## Files changed
List each file changed.

## Validation
Confirm that you tested:
- forward navigation;
- backward navigation;
- refresh restoration;
- notes overlay;
- console errors.

End with one recommended next action only.
