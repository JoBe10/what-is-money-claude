# Codex Task — Rebuild Slide 4.04 Only

Read and follow these files first:

- `AGENTS.md`
- `docs/section-4-master-brief.md`
- `PLANS.md`

This task-specific prompt is the binding source of truth for slide **4.04** and overrides any conflicting earlier implementation detail for that slide.

## Task boundary

Rebuild **slide 4.04 only** from scratch.

Preserve without visual or narrative changes:

- slide 4.01;
- slide 4.02;
- slide 4.03;
- Sections 1–3;
- the close slide;
- all approved baseline fixes;
- the validated `SlideEngine` continuation fix.

Do not implement slide 4.05 or any later Section 4 slide.

Remove the current rejected 4.04 implementation, including:

- any current weak intermediate composition;
- any crude product icons or unstructured visual clutter;
- any prior Open Claim Circuit implementation that does not match this prompt;
- any stale slide-specific CSS, DOM, animation logic, or notes that are no longer used.

Do not leave dead selectors, unused DOM, or alternate prototypes behind.

---

# 1. Purpose of slide 4.04

This slide answers the unresolved question from slide 4.03:

```text
What did he actually receive?
```

It must establish, in sequence:

1. The surgeon received `$400`, but he did not receive the final goods or services he actually wants.
2. If he had received those goods or services directly, the exchange would have been barter.
3. Instead, he received an earned, transferable claim on value.
4. Because money is standardised and widely accepted, the claim is no longer tied to the patient who paid him.
5. The claim can be taken back to the wider market and exchanged with anyone willing to accept the money.
6. The surgeon has completed his side of the exchange.
7. The final counter-value remains pending.
8. The exchange is still open.

The slide must teach the audience the visual grammar of the **Open Claim Circuit**.

This is the conceptual foundation for the later statement:

```text
Spending closes the exchange.
Saving keeps it open.
```

Do not introduce the spend/save fork yet. Leave the final state ready for it.

---

# 2. Speaker notes

Use this script closely and naturally. Do not add new economic theory, alternative definitions, or explanatory detours.

> At first glance, the surgeon received four hundred dollars.
>
> But he has not received the final goods or services he actually wants.
>
> If he had received sneakers, food, wine or some other final good directly, that would have been barter. Instead, he receives money.
>
> So what does that money represent at its core?
>
> It represents an earned, transferable claim on value. The surgeon has provided a service that was exchanged for four hundred dollars, but he has not yet taken the final four hundred dollars’ worth of goods or services he wants in return.
>
> Because money is standardised and widely accepted, that claim is no longer tied to the patient. He can take it back to the wider market and exchange it with anyone willing to accept the money.
>
> Money therefore turns a person-specific exchange into a transferable claim on the wider market.
>
> Or more formally: money is the transferable counterclaim created when value is provided to the market without the final counter-value yet being taken.
>
> The surgeon has completed his side of the exchange. The final counter-value remains pending.
>
> The exchange is still open.

End with this transition:

> And once we see money this way, saving becomes much easier to understand: spending closes the exchange, while saving keeps it open.

Do not include:

- a long legal clarification;
- a subjective-value theory aside;
- a labour-theory discussion;
- a full definition paragraph on screen;
- stale `L1:` transcript markers;
- references to the rejected 4.04 design.

---

# 3. Visible text

The slide may display only the following text.

## Kicker

```text
THE UNFINISHED EXCHANGE
```

## Opening statement

```text
He has not received the final goods or services he actually wants.
```

## Temporary question

```text
So what does the $400 represent?
```

This question appears only temporarily and disappears when the answer is revealed.

## Main conceptual reveal

```text
AN EARNED, TRANSFERABLE
CLAIM ON VALUE
```

Preferred emphasis:

- `AN EARNED, TRANSFERABLE` in white;
- `CLAIM ON VALUE` in orange.

## Open Claim Circuit labels

Left node:

```text
VALUE PROVIDED
COMPLETE
```

Connecting path:

```text
TRANSFERABLE CLAIM
```

Right node:

```text
FINAL COUNTER-VALUE
PENDING
```

## Wider-market explanation

```text
No longer tied to the patient.
Usable across the wider market.
```

## Final statement

```text
The exchange is still open.
```

Do not add any other visible copy.

The full formal definition remains spoken in the notes rather than displayed as a paragraph.

---

# 4. Open Claim Circuit — canonical visual grammar

The circuit represents an unfinished exchange.

Canonical labelled structure:

```text
VALUE PROVIDED                         FINAL COUNTER-VALUE
  COMPLETE          ●────────────○           PENDING
                    TRANSFERABLE CLAIM
```

Meaning:

- filled left node = value has already been provided;
- hollow right node = the final goods or services ultimately wanted have not yet been received;
- orange connecting path = the earned, transferable monetary claim;
- the claim keeps the exchange open;
- the hollow right node will fill later when the claim is redeemed;
- a carrier shell will be added in a later slide, not here.

The circuit must not resemble:

- a coin;
- a dollar sign;
- a battery;
- a magical energy orb;
- a generic glowing gem;
- a loading indicator;
- a technical progress bar;
- a cryptocurrency network diagram.

## Circuit styling

Use:

- restrained Bitcoin-orange accent;
- a clean geometric form;
- a slightly curved path or partial open loop rather than a rigid flat line;
- modest glow only where consistent with the deck;
- strong legibility at 1920×1080;
- labels aligned cleanly and never colliding with the path.

### Left node

- solid orange fill;
- visibly complete;
- no pulse loop;
- label aligned cleanly above or below.

### Right node

- black interior;
- orange outline;
- clearly hollow;
- no pulse loop;
- label clearly shows `PENDING`.

### Connecting path

- thin but confident;
- orange;
- may show one brief left-to-right travelling highlight during its reveal;
- no continuous animation;
- label `TRANSFERABLE CLAIM` small and restrained.

The circuit should be implemented cleanly enough for later reuse, but do not build a large framework or later-slide behavior in this task.

---

# 5. Visual composition

## Overall approach

The slide begins as a direct conceptual continuation from 4.03, then simplifies into a full-width conceptual composition.

The visual hierarchy in the final state must be:

1. Open Claim Circuit
2. `AN EARNED, TRANSFERABLE / CLAIM ON VALUE`
3. `The exchange is still open.`
4. restrained wider-market context

The slide should become cleaner as it progresses.

## Kicker

Place:

```text
THE UNFINISHED EXCHANGE
```

top left, matching the established section kicker style used on 4.03.

Do not use a generic orange top heading bar.

## Opening composition

At the beginning, preserve the conceptual geometry of 4.03:

- dim surgeon image on the left;
- `$400` strong and orange near the centre;
- faint examples of possible final goods on the right.

Suggested examples:

- sneakers;
- steak;
- wine.

These are illustrative examples only.

They must be:

- simple line-art silhouettes;
- low-opacity neutral grey;
- unlabelled;
- visually subordinate to `$400`;
- clearly not yet received.

Do not create a dense product catalogue.

## Main circuit composition

Once revealed, the circuit should occupy approximately the central 65–70% of the logical 1920×1080 stage.

Suggested placement, adjusted to existing safe zones:

- left node near x=470–520;
- right node near x=1400–1450;
- circuit baseline near y=535–575;
- conceptual headline centred above around y=300–370;
- final statement centred below around y=760–815.

The circuit should be the dominant object in the final frame.

## Main headline

Use two lines:

```text
AN EARNED, TRANSFERABLE
CLAIM ON VALUE
```

Requirements:

- centred above the circuit;
- first line white;
- second line orange;
- strong display typography;
- no excessive tracking;
- no box;
- no underline;
- no card background.

## Wider-market field

After the claim is untied from the patient, reveal a restrained field of possible market counterparties around and beyond the right node.

Use:

- five or six subtle neutral endpoints;
- varied but restrained spacing;
- no human icons;
- no company logos;
- no buildings;
- no dense network lines;
- no decorative constellation across the whole slide.

The field represents the wider market, not technology.

## Final conclusion

Place:

```text
The exchange is still open.
```

centred below the circuit.

Requirements:

- white;
- clearly readable;
- strong but not larger than the main headline;
- enough space from the circuit;
- no box;
- no underline;
- no extra explanation beside it.

---

# 6. Progressive builds

Implement exactly six cumulative states: build steps `0` through `5`.

Each build must reconstruct its complete target state deterministically. Do not assume the previous build ran.

## Build 0 — Carry the unresolved exchange forward

Visible:

- kicker `THE UNFINISHED EXCHANGE`;
- dim surgeon image on the left;
- large orange `$400` near the centre;
- faint possible final goods on the right;
- no capability labels;
- no previous 4.03 question;
- no circuit;
- no wider-market field;
- no final conclusion.

The slide should feel like a direct continuation from the final state of 4.03.

## Build 1 — State what is missing

Reveal:

```text
He has not received the final goods or services he actually wants.
```

Requirements:

- white;
- centred or placed in a clear upper-middle zone;
- `$400` remains bright;
- goods remain faint and unselected;
- surgeon image dims slightly further;
- no crosses, warning icons, or `NOT RECEIVED` labels.

## Build 2 — Ask what the money represents

The opening statement recedes or fades out.

Reveal:

```text
So what does the $400 represent?
```

Requirements:

- centred;
- white;
- visually associated with `$400`;
- goods remain faint;
- no circuit yet;
- no answer yet.

Create a deliberate pause.

## Build 3 — Reveal the claim

Fade the temporary question.

Transform `$400` into the Open Claim Circuit.

Required sequence within the build:

1. `$400` contracts or dissolves cleanly;
2. filled left node forms;
3. hollow right node forms;
4. path connects them;
5. node labels appear;
6. path label appears;
7. headline appears:

```text
AN EARNED, TRANSFERABLE
CLAIM ON VALUE
```

Requirements:

- surgeon image and product examples recede almost completely;
- no abrupt layout jump;
- no particle explosion;
- no spinning or decorative animation;
- the audience must be able to understand every circuit element.

## Build 4 — Untie the claim from the patient

Fade the remaining surgeon/patient context completely.

Reveal:

- restrained wider-market endpoints around/beyond the right node;
- supporting text:

```text
No longer tied to the patient.
Usable across the wider market.
```

Requirements:

- circuit remains dominant;
- supporting text is smaller and subordinate;
- market field must not compete with the circuit;
- no logos or detailed icons.

## Build 5 — Land the conclusion

Keep the circuit fully visible.

Dim the wider-market field slightly.

Reveal:

```text
The exchange is still open.
```

Requirements:

- final statement becomes the concluding focal point;
- main headline remains visible but slightly quieter;
- circuit remains fully legible;
- product examples and surgeon image are no longer separately visible;
- final frame is clean and screenshot-ready.

---

# 7. Initial and final states

## Initial state

Visible:

- `THE UNFINISHED EXCHANGE`;
- dim surgeon image on the left;
- strong orange `$400`;
- faint final-goods examples on the right.

The slide should feel visually connected to 4.03.

## Final state

Visible:

- kicker;
- main headline;
- fully labelled Open Claim Circuit;
- restrained wider-market endpoints;
- supporting wider-market statement;
- final conclusion:

```text
The exchange is still open.
```

Not visible:

- surgeon image;
- capability labels;
- `$400` as separate typography;
- sneakers, steak, or wine;
- temporary question;
- opening statement.

The final frame must be polished and calm enough to remain on screen while the presenter explains the formal definition.

---

# 8. Transition from slide 4.03

Do not redesign slide 4.03.

Use the existing final 4.03 frame as the handoff.

Preferred transition:

1. capability labels fade first;
2. specialised-surgery headline fades;
3. final question fades;
4. surgeon image darkens but remains;
5. `$400` remains visually stable;
6. 4.04 appears with the same or closely matched `$400` position;
7. faint final-goods examples appear.

If the existing validated continuation system allows `$400` to persist safely, it may be reused.

If not, use matching geometry and a clean crossfade.

Do not modify 4.03 merely to force a complex shared-DOM transition.

Reliability is more important than technical cleverness.

---

# 9. Transition into slide 4.05

Do not implement or redesign slide 4.05.

Leave 4.04’s final state ready for a later spend/save slide.

The intended later transition is:

1. main headline fades;
2. wider-market field disappears;
3. supporting labels become quieter;
4. only the Open Claim Circuit remains;
5. the circuit later encounters a fork:
   - `SPEND NOW`
   - `SAVE`

Do not add this fork during the current task.

---

# 10. Implementation constraints

Modify only:

- the slide 4.04 module;
- slide 4.04-specific CSS/selectors;
- slide 4.04 speaker notes;
- a minimal reusable Open Claim Circuit component if one is required and does not already exist in an approved form.

Do not:

- modify slide 4.01;
- modify slide 4.02;
- modify slide 4.03;
- modify the manifest order or active slide set unless strictly required to keep the existing reviewed sequence functional;
- add dependencies;
- create new photographic assets;
- alter global typography;
- modify the slide engine;
- implement slide 4.05;
- run `npm audit fix`;
- build a general Section 4 state framework;
- include later carrier-shell behavior in the circuit component;
- retain rejected 4.04 styles or DOM.

## Product examples

The sneakers, steak, and wine may be implemented as:

- simple inline SVG silhouettes;
- minimalist CSS line icons;
- existing approved icon assets if already available.

They must remain extremely simple and subordinate.

Do not install an icon library.

## Reusable circuit component

If creating a component:

- keep it narrowly focused;
- expose only the state needed for slide 4.04;
- ensure deterministic reset;
- clean up GSAP timelines and delayed calls;
- respect reduced motion;
- do not encode spend/save, dilution, carrier, or later failure-mode logic yet.

---

# 11. Required self-review before completion

Before reporting completion, verify:

1. Does the slide clearly answer the question from 4.03?
2. Are the goods visibly examples of what was not yet received?
3. Does `$400` remain the conceptual anchor until the circuit reveal?
4. Is the Open Claim Circuit immediately understandable?
5. Is the left node clearly complete?
6. Is the right node clearly pending?
7. Does the path clearly represent the transferable claim?
8. Does the circuit avoid looking like a progress bar or technology diagram?
9. Is the claim clearly untied from the patient without implying a legal claim against all market participants?
10. Is the wider-market field subtle and subordinate?
11. Does no text overlap any element?
12. Is the final frame cleaner than the initial frame?
13. Does the final statement land clearly?
14. Are the speaker notes aligned exactly with the approved narrative?
15. Were slides 4.01, 4.02, and 4.03 left visually unchanged?
16. Is the circuit structurally reusable for the later spend/save slide without already implementing it?

Correct any failure before reporting completion.

---

# 12. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the full diff for every changed file.
4. Open slide 4.04 directly.
5. Inspect builds 0, 1, 2, 3, 4, and 5 individually at 1920×1080.
6. Inspect the final frame at the actual recording viewport.
7. Test forward and backward builds.
8. Test force-next and force-previous.
9. Refresh at a nonzero build step and confirm restoration.
10. Test reduced-motion mode.
11. Verify notes overlay and second-window notes.
12. Navigate 4.03 → 4.04 and back repeatedly.
13. Confirm slides 4.01, 4.02, and 4.03 are visually unchanged.
14. Keep the browser console open and confirm no errors.
15. Search active source/CSS for:
    - old rejected 4.04 copy;
    - obsolete circuit selectors;
    - stale product-icon positioning;
    - duplicated circuit components;
    - `L1:` artifacts.

Stop after slide 4.04 is complete. Do not implement or redesign any other slide.

---

# 13. Completion report

Report:

## Implemented

- concise summary of the rebuilt 4.04;
- confirmation that no other slide was redesigned.

## Files changed

- file-by-file list;
- exact Open Claim Circuit component path if created.

## Validation

- commands and browser checks actually performed;
- build result;
- console result;
- reduced-motion result;
- notes result;
- backward-navigation result.

## Review access

- exact local direct URL/deep link for slide 4.04;
- instructions for viewing every build state if needed.

## Remaining judgment calls

- only issues that genuinely require human visual review.

End with one recommended next action only.
