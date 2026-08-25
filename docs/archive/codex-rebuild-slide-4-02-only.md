> **Build prompt, executed — archived, not authoritative.** ChatGPT/Codex-era working material for the original Section 4 build.
> Superseded by `docs/what-is-money-master.md` and `docs/synthesis-architecture.md` (Stage 0, 25 August 2026). Nothing here governs.

# Codex Task — Rebuild Slide 4.02 Only

Read and follow these files first:

- `AGENTS.md`
- `docs/section-4-master-brief.md`
- `PLANS.md`

This task-specific prompt is the binding source of truth for slide **4.02** and overrides any conflicting earlier implementation detail for that slide.

## Task boundary

Rebuild **slide 4.02 only** from scratch.

Preserve without visual or narrative changes:

- slide 4.01;
- slide 4.03;
- slide 4.04;
- Sections 1–3;
- the close slide;
- all approved baseline fixes;
- the validated `SlideEngine` continuation fix.

Do not implement any later Section 4 slide.

Do not redesign slide 4.03 in this task, even if its current visual quality is poor. It will be handled separately.

Remove the current rejected 4.02 implementation, including any slide-specific DOM, CSS, animation logic, or notes that are no longer used. Do not leave dead styles or alternate versions behind.

---

# 1. Purpose of slide 4.02

This slide should do only four things:

1. Slow the audience down before discussing store-of-value properties.
2. Draw attention to the word **value** in the phrase `STORE OF VALUE`.
3. Raise the first-principles question:
   `What exactly is being stored?`
4. Lead into the surgeon example with:
   `Start where money is earned.`

The logical movement is:

> We call it a store of value  
> → but value is not a physical substance  
> → so what exactly is being stored?  
> → start where money is earned.

Do not explain money as a claim yet. That revelation belongs to slides 4.03–4.04.

---

# 2. Speaker notes

Use this script closely and naturally. Do not add new theory, metaphors, or explanatory detours.

> When people talk about stores of value, they normally jump straight to the properties: scarcity, durability, portability and so on.
>
> But before we can ask what makes a store of value good, we first need to understand what it actually means to store value.
>
> Because value is not some objective substance—a unit that can simply be placed inside a container.
>
> So what exactly is being stored?
>
> The clearest way to answer that is to start where money is earned.

End with this transition:

> Let’s use a simple example.

The notes must contain no stale wording from the rejected implementation, including:

- `Before the properties, define the job`
- the box/container animation description;
- language about value moving outside a box;
- old build instructions;
- obsolete `L1:` transcript artifacts.

---

# 3. Visible text

There must be no kicker or top heading.

Remove:

```text
BEFORE THE PROPERTIES, DEFINE THE JOB
```

Remove:

```text
A store of value…
```

The only visible text across the complete slide is:

## Initial phrase

```text
STORE OF VALUE
```

## Final question

```text
What exactly is being stored?
```

## Final prompt

```text
Start where money is earned.
```

Do not add any other visible copy.

---

# 4. Progressive builds

Implement exactly five cumulative states: build steps `0` through `4`.

Each build must reconstruct its full target state deterministically. Do not assume the prior build ran.

## Build 0 — Familiar phrase

Show:

```text
STORE OF VALUE
```

Requirements:

- one naturally spaced inline phrase;
- `STORE OF` and `VALUE` may be separate spans solely for colour/opacity control;
- use normal word spacing;
- do not use flex `gap`, manual margins, absolute positioning between words, or letter-spacing tricks that create a wider gap before `VALUE`;
- all words are white;
- phrase is centred horizontally;
- no other content is visible.

## Build 1 — Examine “value”

Keep the phrase in exactly the same position.

- `STORE OF` fades to approximately 20–25% opacity;
- `VALUE` changes to the deck’s Bitcoin-orange accent;
- nothing moves;
- no scaling;
- no tracking change;
- no box;
- no outline;
- no underline;
- no glow beyond the deck’s existing restrained text treatment;
- no background elements.

The only conceptual move is visual emphasis.

## Build 2 — Clear the canvas

Fade the complete phrase out.

The screen should become clean black.

No earlier text may remain faintly visible.

This brief visual reset is intentional and should feel calm rather than abrupt.

## Build 3 — Central question

Reveal:

```text
What exactly is being stored?
```

Requirements:

- white;
- centred horizontally;
- placed slightly above the exact vertical midpoint;
- no previous phrase visible behind it;
- no box, line, icon, or decorative background;
- subtle opacity transition and, at most, an 8–12 px vertical settling motion.

## Build 4 — Direction forward

Keep the question unchanged.

Reveal beneath it:

```text
Start where money is earned.
```

Requirements:

- deck orange;
- significantly smaller than the question;
- medium weight;
- sentence case;
- comfortably separated from the question;
- no underline;
- no decorative box;
- no faded remnants from earlier states.

---

# 5. Visual composition

This is a purely typographic slide.

## Background

- existing pure-black deck background;
- no imagery;
- no particles;
- no textures;
- no cards;
- no container shape.

## Main phrase

`STORE OF VALUE` should:

- use the established display typography;
- feel large and confident, but not oversized;
- fit comfortably on one line at the logical 1920×1080 canvas;
- appear as one coherent phrase with natural kerning;
- sit slightly above the slide’s exact vertical centre;
- have generous empty space around it.

Target visual range, adjusted to existing tokens:

- approximately 104–120 px at the logical 1920×1080 stage;
- normal word spacing;
- no exaggerated tracking.

## Question

`What exactly is being stored?` should:

- be slightly smaller than the initial phrase;
- remain on one line at 1920×1080;
- dominate the final frame;
- be centred in the same general visual zone as the initial phrase.

Target visual range:

- approximately 80–96 px at the logical stage;
- use the deck’s established main heading weight and line height.

## Prompt

`Start where money is earned.` should:

- sit below the question with clear breathing room;
- use approximately 30–38 px at the logical stage;
- use the orange accent;
- remain understated and elegant.

## Alignment

Use one stable central axis throughout.

Do not shift the main phrase left or right when `VALUE` changes colour.

Do not leave the current visibly enlarged space between `OF` and `VALUE`.

---

# 6. Motion and timing

Use only restrained opacity and colour transitions.

Allowed:

- opacity;
- text colour;
- an optional 8–12 px vertical settling motion for newly appearing question/prompt text.

Not allowed:

- boxes;
- word displacement;
- moving `VALUE` outside a container;
- scale punches;
- letter scattering;
- particles;
- glow bursts;
- blur-heavy transitions;
- simultaneous competing motion;
- faded prior content behind the final question.

Suggested timing:

- colour/opacity emphasis: ~350–500 ms;
- phrase fade-out: ~300–450 ms;
- question reveal: ~400–550 ms;
- prompt reveal: ~300–450 ms.

Use existing deck timing conventions where they are close. The slide should feel deliberate, not slow.

Respect `prefers-reduced-motion`:
- all states must appear instantly and correctly;
- no delayed callbacks;
- no missing text.

---

# 7. Initial and final states

## Initial state

Only:

```text
STORE OF VALUE
```

Clean, white, naturally spaced, centred.

## Final state

Only:

```text
What exactly is being stored?

Start where money is earned.
```

The previous phrase must be completely absent.

The final frame must work as a polished standalone screenshot.

---

# 8. Transition into slide 4.03

Do not modify slide 4.03 in this task.

On exit from 4.02:

1. fade out the question;
2. allow `Start where money is earned.` to remain a fraction longer;
3. optionally grow a thin orange line from near the prompt as the slide exits;
4. complete a clean standard transition into the current 4.03.

Do not use shared DOM or change 4.03 to force this transition.

If the thin-line exit would require changes to 4.03 or create fragility, use a clean fade instead. The final 4.02 composition is more important than a complex transition.

---

# 9. Implementation constraints

Modify only:

- the slide 4.02 module;
- the slide 4.02-specific CSS/selectors;
- speaker notes for 4.02;
- a minimal shared typography helper only if absolutely necessary and if it does not change any other slide.

Do not:

- change slide 4.01;
- change slide 4.03;
- change slide 4.04;
- alter the manifest order or active slide set unless required to keep the existing reviewed sequence functional;
- add dependencies;
- create new assets;
- change global typography;
- modify the slide engine;
- run `npm audit fix`;
- retain rejected 4.02 styles or unused DOM.

Prefer simple DOM and CSS over a new component abstraction. This slide does not need a reusable scene component.

---

# 10. Required self-review before reporting completion

Before finishing, compare the implementation against these questions:

1. Is `STORE OF VALUE` one coherent naturally spaced phrase?
2. Is the space between `OF` and `VALUE` visually normal?
3. Does build 1 change only emphasis, without movement or a box?
4. Is build 2 completely black with no ghosted remnants?
5. Does the final question appear on a clean canvas?
6. Is the prompt understated rather than decorative?
7. Does the final frame look intentionally designed rather than generated?
8. Did any unrequested heading, line, box, icon, or background element remain?
9. Are the speaker notes exactly aligned with the approved narrative?
10. Were slides 4.01, 4.03, and 4.04 left visually unchanged?

If any answer is no, correct it before reporting completion.

---

# 11. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the full diff for every changed file.
4. Open slide 4.02 directly.
5. Inspect builds 0, 1, 2, 3, and 4 individually at 1920×1080.
6. Inspect the final state at the actual recording viewport.
7. Test forward and backward builds.
8. Test force-next and force-previous.
9. Refresh at a nonzero build step and confirm correct restoration.
10. Test reduced-motion mode.
11. Verify notes overlay and second-window notes.
12. Navigate 4.01 → 4.02 → 4.03 and back.
13. Confirm slides 4.01, 4.03, and 4.04 are visually unchanged.
14. Keep the browser console open and confirm no errors.
15. Search the active slide/CSS for:
    - `Before the properties, define the job`
    - `A store of value…`
    - old box/container selectors;
    - obsolete movement logic;
    - `L1:`.

Stop after slide 4.02 is complete. Do not redesign or implement any other slide.

---

# 12. Completion report

Report:

## Implemented
- concise summary of the rebuilt 4.02;
- confirmation that no other slide was redesigned.

## Files changed
- file-by-file list.

## Validation
- commands and browser checks actually performed;
- build result;
- console result;
- reduced-motion result;
- notes result.

## Review access
- exact local direct URL/deep link for slide 4.02;
- instructions for viewing each build state if needed.

## Remaining judgment calls
- only issues that genuinely require human visual review.

End with one recommended next action only.
