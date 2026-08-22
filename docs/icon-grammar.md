# The WIM Icon Grammar

**Source of truth:** `assets/icons/candidates/candidates.js` (every candidate drawing) + `src/components/section-2/glyphs.js` (the SELECTIONS — which candidate each surface renders) + this document (the rules).
**Scope:** every glyph in Sections 1–3, and every future glyph (R3's functions, stages, and palladium marks inherit this grammar).
**Introduced:** R2.1 §C, replacing the R2 set. **Revised:** R2.2 §D — the Icon Studio: three candidate constructions per glyph on the primitives grammar, a contact sheet, and a recorded selection per glyph; fiat and bitcoin join the set. **Extended:** R3 §A5 — ten more glyphs through the same studio process (three candidates each, selections recorded): the three functions, the collectible stage, palladium, the Argentina triad, and the ladder gate and layer tie marks. **Extended:** R7 §4.1 — three more (real estate, shares, ledger), and the grammar's scope widens to Section 4: every monetary object in the deck is now drawn in this hand.

## 1. Construction — "drawn from the deck's own primitives"

Every glyph is built from the deck's existing visual language — thin single-weight strokes, small dot terminals, geometric construction — each good rendered as a minimal engraved mark, the way it might be stamped on an ancient coin or drawn as a constellation.

- **Grid:** 48 × 48 units. Live area 40 × 40 (4u margin on every side). Optical center at (24, 24). Key geometry — axes, anchors, symmetry lines — sits on the 4u sub-grid; curve control points are free.
- **Stroke:** one weight for the entire set — **2.5u**, round caps, round joins. No glyph may thin or thicken a line for emphasis; hierarchy comes from silhouette, never from weight. The weight is a constant in `candidates.js`, deliberately not a parameter.
- **Dot terminals:** the set's punctuation. Key stroke ends and detail marks carry small filled dots at stroke scale — terminals r 1.8, detail dots (eyes, nostrils, grains, beads, rivets) r 1.4–2. Dots may serve as eyes, grains, rivets, bead-knots; lines as horns, planes, stems.
- **Corners:** hard corners carry the ~2u optical radius the round join of the shared stroke produces. Organic forms are built from arc segments, never polylines.
- **Fills:** banned, with one exception — dots at stroke scale (r ≤ 2). Everything else is open line work.
- **Silhouette test:** each glyph must be identifiable from its outline alone at 24 px, and no two glyphs may share a silhouette class except as an explicit family (see §3).

### The don't list (R2.2 §D)

- **No filled shapes larger than a dot terminal.**
- **No rounded-rectangle app-icon energy** — a rectangle may appear only broken (a fold, a tear, a severed tether), never as a self-contained rounded chip.
- **No perspective boxes** — no isometric cubes, no receding top faces, no three-quarter views. Every construction is flat-on. (This retired R2.1's isometric salt crystal and three-quarter iron ingot.)
- No stroke-width variance, no gradients, no baked-in glow, no color.

### The legibility rule (R3.1 §B)

**Any mark whose meaning a viewer cannot infer without a legend fails the grammar — encode it legibly or delete it.**

The silhouette test (§1) asks whether a mark is *identifiable*. This rule asks the harder question: whether it is *readable* — whether an audience seeing it once, at its real size, in its real place, with no key and no time to study it, takes the intended meaning from it. A glyph can pass the silhouette test and still fail this one, because meaning depends on placement and scale, not only on drawing.

Two consequences bind:

1. **The test is run at the surface, not in the studio.** A candidate is judged in a render of the slide it ships on, at its shipping size, by screenshot. The contact sheet proves construction; only the surface proves legibility.
2. **Deletion is a legitimate outcome.** A mark that cannot be made readable is removed, and the argument it was carrying moves to a form that can carry it — a legible mark, or the copy. Structure that only decorates is worse than absent: it spends the viewer's attention and returns nothing.

**Applied at R3.1:** the ladder's gate marks and the layer tower's tie marks were both drawn to the grammar and both passed the studio, and both failed here. At 30px straddling a 2px sloped line, the arch read as an ambiguous half-dot; the counterfoil jog, hanging between two chips, read as a stray glyph rather than a tether. Neither was inferable. The gate marks were re-encoded as a **threshold tick** — a short perpendicular stroke crossing the rising line, which reads as a threshold in any reading and needs no legend; the tie marks were re-encoded as a **plain hairline link** with its caption beside it. Both drawings remain on file in `assets/icons/candidates/` with their studio records intact, retired from the deck's surfaces rather than deleted from the set.

## 2. Color and luminance

- **Monochrome via `currentColor`.** The surrounding element's text color is the only palette a glyph has. Glyphs never carry the accent.
- **The soft luminance treatment** is applied by placement CSS, never baked into the drawing: `filter: drop-shadow(0 0 10px rgba(253, 233, 212, 0.22))` — the unit-warm glow family (`--unit-warm`, the deck's existing glow tone; not a new token). Applied wherever a glyph is a primary object (rail stops, contenders, traveling goods, the FIAT float, the entrant); omitted where the glyph is secondary texture (riser marks).

## 3. The set (R2.2 selections)

Three genuinely distinct candidates exist for every glyph (different construction ideas, not stroke-width variants) — all kept in `assets/icons/candidates/` so any selection can be swapped by changing one letter in `glyphs.js`, no redesign. The contact sheet (`review/rebuild-r2/icon-studio/contact-sheet.html`, captured to `contact-sheet.png` and `row-*.png` in the same directory) shows every candidate at display (96), rail (40), and riser (22) size on black.

| Glyph | Selected | Construction |
|---|---|---|
| fish | B — the ichthys | Two arcs springing from the nose and crossing at the tail — the oldest carved fish mark, redrawn; dot-terminal tail tips, stroke-scale eye. |
| grain | A — the kernel arcs | Wheat ear as open arcs sweeping off a straight stem, each kernel ending in a dot terminal; the awn leans one unit — the set's one deliberate asymmetry. |
| sandals | A — the outsole and thong | Footprint outsole (fuller outer edge, tapered heel) under the thong V, toe-post dot at the apex. |
| cattle | A — the lyre head | Front-on: lyre horns with dot-terminal tips, head narrowing to the muzzle, nostril dots. No face — the silhouette is the animal. |
| salt | B — the heap | The measured pile on its ground line, three grain dots falling onto it — the poured, pinched, spent good; flat, no false depth. |
| shells | A — the cowrie | The money shell, top view: egg outline, S-curved aperture, four tooth ticks. |
| iron | A — the flat ingot | The cast bar face-on: one trapezoid with a row of three rivet dots. The trapezoid is the metals family's shared construction. |
| metals | A — the stack | The family: three of iron's trapezoids stacked two-and-one, all face-on. |
| gold | B — the sun mark | Gold's own ancient sign: the circle with its center dot — a centration mark, not a stamp; coinage keeps the stamp. |
| coinage (riser mark) | A — the incuse square | Gold's round taking the stamp: the quadratum incusum, the first mint mark in the record. |
| paper (riser mark) | C — the counterfoil | The note torn from its stub: a zigzag tear for a left edge, medallion ring — the claim check that implies the ledger it was cut from. |
| fiat | A — the severed tether | The note floating over its own broken anchor line — the severance drawn into the glyph; on the rail it hangs above the line it left. |
| bitcoin | A — the struck ₿ | The universal mark redrawn whole in the set's stroke: stem, two bowls, four protruding strokes ending in dot terminals. |

### The R3 extension (§A5 selections)

| Glyph | Selected | Construction |
|---|---|---|
| through-time (store of value) | A — the hourglass | Time's own instrument, flat-on: two open chambers at a waist, three grain dots falling through — the good passing intact from now to later. |
| between-people (medium of exchange) | B — the two figures | Two minimal figures — head ring, shoulder arc — facing each other across one value dot. The exchange-arcs candidate read as an eye at rail size. |
| measure (unit of account) | B — the graduated rule | The measuring stick of value itself: a baseline with alternating graduations, one good-dot held against the scale — the script's own metaphor. |
| collectible | C — the cut stone | A faceted gem, flat-on: crown, girdle line, pavilion point. The strung-beads candidate read as a smile; the shelf was mush. |
| palladium | A — the Pallas mark | The sign of the asteroid Pallas — lozenge on a crossed stem — the sign the metal was named for in 1803: the glyph carries the beat's own date, as gold carries its ancient sun mark. |
| dollar | A — the struck $ | The universal mark whole, one through-struck stem, dot terminals — the bitcoin selection's exact rationale. |
| peso | A — the sol de mayo | The sun from Argentina's first peso coinage of 1813: open ring under eight rays, cardinal tips dotted. No center dot — gold keeps the sun-mark center. |
| brick | A — the coursing | A wall fragment in pure line: three course lines, head joints staggered bond-wise. The floor-by-floor candidate read as a ladder — a collision this section cannot afford. |
| gate (ladder mark) | B — the arch | Passage drawn as a doorway bridging the climb line, footed with dot terminals. The gatepost pair read as a pause mark. **Retired from the deck at R3.1** — failed the legibility rule at ladder scale; the ladder now uses a threshold tick. |
| tie (layer mark) | B — the counterfoil jog | The tether carrying the paper family's tear: a Z-jog mid-line — the link that is a redeemable slip. **Retired from the deck at R3.1** — failed the legibility rule in the tower; the tower now uses a plain hairline link. |

### The R7 extension (§4.1 selections)

| Glyph | Selected | Construction |
|---|---|---|
| real-estate | A — the gable | The building as its own silhouette: two roof strokes meeting at an apex over the walls, a ground line running past both, one door aperture. Flat-on, eaves dotted. The elevation mushed into a grid at riser size; the plot read as a picture frame. |
| shares | A — the parted round | The whole with one part taken out of it and set beside it, on its own radius, the same size as the gap it left. The divided round is the Mercedes mark — disqualifying, and recorded as such; the stacked slips are the copy-file icon and three self-contained rectangles besides. |
| ledger | A — the ruled book | The account book open on its spine: two page arcs from one center line, two ruled entries a page. The tally column reads as a bar chart; the double entry needs a legend. |

**Scope: Section 4 joins the grammar (R7).** The comparison table's five candidates, the 4.21 decision row and the 4.06 carrier lineage were photographic renders — a gold bar, a house, a banknote, a physical bitcoin coin. They are now these marks, and gold, fiat and bitcoin are the *existing* R2.2 selections, unchanged: the gold on the Evolution Rail and the gold in the comparison table are one drawing. Three consequences worth recording:

1. **The optical-weight problem dissolved.** The renders ranged over a 1.3× spread in apparent size and a 2.5× spread in luminance, and needed five per-asset scale and brightness corrections in CSS that never quite converged (the old O-07). One stroke weight and one grid need none.
2. **The photographic register is not abolished — it is scoped.** Monetary carriers are drawn; the human scene (the surgeon) and the *final goods* a claim is redeemed for (the sneaker, the steak, the wine) stay photographic. The line is meaningful: the deck draws what it is arguing about and photographs what it is arguing *for*.
3. **V-1 is closed by construction.** The physical-coin Bitcoin render asserted an object the deck spends 4.15 denying. The struck ₿ at display scale says the true thing, in the deck's own hand.

### The R7.1 extension (§C1 selections)

| Glyph | Selected | Construction |
|---|---|---|
| operation | A — the steadying pulse | One line read left to right: two irregular beats of differing height and spacing, then three even ones at one amplitude on one baseline. **The value delivered, not the procedure.** The mending arc's closed break is invisible — three smooth segments read as a plain arch; the settled interval lands as a bar chart, which this grammar already rejected once at the ledger's tally column. |
| shoe | B — the head-on last | Ankle opening as an open arc, upper falling to a rounded toe box, three lace rungs, sole bar beneath. Symmetry carries what silhouette could not: the profile reads as a wedge, the print as a foot rather than as footwear. |
| meal | B — the plate and cover | Dome arc with its handle dot over a plate line — the oldest unambiguous sign for a served meal, and intact at riser scale. The cut reads as a blob with a stem; the fork-and-cut as cutlery beside an egg. |
| wine | A — the glass | Bowl, stem, foot. The bottle puts dot terminals on the neck where they read as antennae; the amphora reads as an urn. |

**Scope amended at R7.1: the photographic register is abolished, not scoped.**
R7's point 2 above drew a line — draw what you argue about, photograph what you
argue *for* — and R7.1 removes it. The surgeon and the three final goods are now
drawn too, because §9.4.3 admits no photography anywhere and the line was in
practice a licence for the one register the deck could not make cohere. Section
4 holds no raster asset; `assets/images/` contains the favicon alone.

**Amended again at R7.2 (presenter ruling): two registers, and the grammar is
one of them.** R7.1's reading was right about the *problem* and wrong about the
*remedy*. The photography was incoherent because nothing governed it, not
because photography cannot be governed — and abolishing it cost the deck the
one thing line work cannot do, which is make a viewer want a thing. The deck now
speaks two registers under `docs/sections-1-3-rebuild-brief.md` §9.4.9: this
grammar for everything structural, and a graded dark-field register for the few
beats where sensory concreteness *is* the argument. What changed for this
document:

- **Nothing about the grammar itself.** Every rule in §1–§4 stands, and every glyph in the set stands. The grammar did not lose scope; it gained a stated boundary, which is what R7's point 2 was reaching for and could not enforce.
- **The boundary is now a gate, not a habit.** `review/rebuild-r7-2/harness/register-r7-2.cjs` asserts that no dark-field render appears inside a structural diagram, and that any slide showing one has declared a non-line register. The rail's form of the rule is the sharp one: a render may never stand on a *drawn line*, which is what makes the 2.4 transformation legal — before the line the four contenders are a row of goods, after it they are entries on a record.
- **A subject may exist in both registers**, keyed by one name: `shells` is a render at its sensory introduction and the cowrie mark everywhere structural. The two are looked up by the same string (`glyph('shells')` / `DarkFieldImage({ name: 'shells' })`), which is what lets 2.4 crossfade one into the other as its own beat.
- **The `operation` mark is retired from the deck's surfaces**, like the gate and tie marks before it — not deleted. 4.03 tells the surgeon's hour on the dark-field register now, and the mark's only remaining surface is 4.04's node-scene, where the service rests at the patient's end as the abstraction of the hour just shown. Its second-round studio record (above) stands; no third round was run, because nothing about the mark or its scale changed and a round with no new question to answer is ceremony.

**Two rulings worth carrying forward.** *Draw the outcome, not the process* —
when a mark for an action refuses to read, what usually needs changing is what
it depicts, not how it is drawn; the operation glyph only worked once it stopped
depicting surgery and started depicting a body going right. And the legibility
rule bit twice in this round: the shoe family failed outright on its first pass,
the operation family on its first *direction*. Both were re-cut rather than
shipped, which is the process working.

**Families (sanctioned silhouette-class shares):** the trapezoid (iron → metals, the metal family); the round (gold → coinage, the metal and its stamp); the note (paper → fiat, the claim and its severed descendant); the own-sign pair (gold's sun mark ↔ palladium's Pallas mark — each metal carrying its historical sign); the struck marks (bitcoin ↔ dollar — universal currency marks redrawn whole in the set's stroke). Each family shares construction deliberately and differs in one telling element. *(The tear family — paper → tie — lapsed at R3.1 with the tie mark's retirement; the counterfoil's zigzag now appears on the paper riser mark alone.)*

**Every rail entry speaks the same visual sentence** — glyph + marker + label — fiat and bitcoin included; no stop goes unmarked. The StageLadder inherits the sentence on its rising line (glyph above, marker pinned on the line, label below), and its entity berth (a placed glyph with its own small marker, pinned above a stage's glyph) extends it to entities standing at a stage.

**Grammar headroom (post-R3):** the primitives (single stroke, dot terminals, flat construction, families) accommodated all ten R3 glyphs without new construction rules; future extensions (R7's needs, if any) inherit the same studio process — three genuinely distinct candidates, contact sheet, recorded selection with rationale.

**Post-R3.1:** eight of the ten R3 glyphs ship; two are retired by the legibility rule (above). What the studio process did not include was a legibility read at the shipping surface, so it selected two marks that were sound as drawings and unreadable in place. That step is now part of the process: every new glyph is screenshot-reviewed on the slide it ships on before the selection is recorded.

### The R7.3 round — proposals on the table, no selections made

The presenter's fresh-eyes review returned one verdict on this set: it keeps
reading as *basic*. The diagnosis in the R7.3 brief is precise, and it is a
diagnosis of the process rather than of any one mark — **the set is a set of
silhouettes.** A silhouette says what a thing looks like. It does not say
anything. Every prior round asked "is this legible as a cow", and every prior
round got a legible cow.

So R7.3 raised the bar to one sentence — *every candidate must carry one
memorable formal idea, something describable in words after seeing it once* —
and ran a full round against it: **eighteen glyphs, three new candidates each,
on one contact sheet at every scale each glyph actually ships at, beside the
mark shipping today.** `review/rebuild-r7-3/icon-studio/contact-sheet.png`.

**Nothing was selected and nothing was applied.** The proposals live in
`assets/icons/candidates/candidates-r7-3.js`, which has no importer in `src/`,
and three gates in `gates-r7-3.cjs` hold that line. This is the material change
in the process: prior rounds self-selected, and self-selection is what produced
a set the presenter has now rejected twice. His eye decides this one.

Two things the round learned that are worth keeping whichever way the selections
go:

- **Where the idea is available in the record, take it from the record.** The ox head that became the letter A; the Ethiopian salt bar that circulated as money; the Kissi penny; the cowrie string of forty; the milled edge that stopped clipping; the split tally that is the ancestor of every paper claim. A mark whose idea is historical is memorable twice — it looks like something *and* it is something.
- **The don't list catches the same three failures every round.** The first cut of this round produced a Mercedes mark (shares), two bar charts (measure, real-estate), a second sun two slides from gold's (coinage) and a gender sign (bitcoin's key, upright). All four had been rejected by name in earlier rounds and all four came back, which suggests they are attractors rather than accidents. Each was re-cut before the sheet shipped, and the re-cuts are recorded in the file.

**Retired at R7.3:** `dollar` and `peso`. Both were sound drawings with one
fatal problem in place — 3.2's row exists to say that three *different* goods
are doing three jobs, and the dollar and the peso share the `$` sign, so the row
rendered the same mark twice. The peso's way out, the sol de mayo, was a second
sun two slides after gold's. Both currencies are now set in the deck's label
register (`USD`, `ARS`), which names them exactly and cannot collide. The
drawings stay on file with their studio records, retired from the deck's
surfaces rather than deleted — the third pair to go that way, after the gate and
tie marks and the operation mark.

**A rule this suggests, not yet adopted:** where a thing has an exact *name* and
no distinctive *form*, set it rather than draw it. Currencies are the clear
case. The deck's label style is a register that already exists and already
carries meaning, and reaching for it is not a failure of the grammar.

## 4. Placement rules (symmetry)

1. **Node anchor:** every node icon centers on one consistent anchor — icon centered directly above its node dot at a fixed vertical offset, identical across all nodes of a slide.
2. **The outside rule (R2.2 §A), for polygonal layouts:** labels sit on the **outside** of the shape, never crossing an edge, in mirror symmetry across the vertical axis. On the exchange triangle: the fisherman's name + HAS/WANTS block sits left of its dot (right-aligned toward it), the sandal-maker's right of its dot (left-aligned toward it) — both at one shared vertical offset, centered on the dot — and the farmer's stays centered below its dot (no edge below it). Icon anchors are unchanged by this rule.
3. **Goods in transit ride the drawn lines.** Travel paths follow the triangle's edges (or the rail's line) with a small consistent normal offset — keep-right relative to travel direction, so opposing goods on one edge pass on opposite sides. No free arcs.
4. **Labels share one baseline grid.** Name and HAS/WANTS rows sit at identical offsets from the node dot across all nodes of a slide.
5. **Contender rows and rail stops:** glyph centered above the marker, label centered below it, wound text below the label — one vertical rhythm, identical row heights across stops, no staggered baselines. Marker centers sit exactly on the rail line at every state and camera (R2.2 §C.1); the settle motion of defeated stops lives on text and glyph, never on the marker. The FIAT float is the one sanctioned exception — its marker deliberately does not touch the line.
6. **Labels live in rail-space** and are transformed only by the camera (R2.2 §C.2): every stop's text stays horizontally centered under its own stop at every camera. Frames are composed so every text block they show sits fully inside the viewport with padding — frame-edge padding may compress composition spacing, never de-center an individual label under its stop.
7. **Marks that cross a line are ticks, not glyphs (R3.1).** A mark whose job is to name a position *on* a drawn line — a threshold, a division, a boundary — is drawn as a stroke in that line's own language: perpendicular to it, centered on it, at the line's weight or a hair above, short enough to read as punctuation rather than as an object. It carries meaning through geometry, so it needs no legend (§1, the legibility rule). Glyphs sit *beside* lines — above a stop, beside a link — never straddling one.
8. **Sloped lines deepen the label row (R3).** On a rising line (the StageLadder), a centered below-label's left half would cross the incoming segment. The outside rule extends: the label row sits deep enough that no label of the set crosses the drawn line at any stop — the ladder uses +52 (against the rail's +26), one offset for all stops, rhythm uniform, clearance measured from the live DOM by the R3 geometry probe. Marker centers stay pinned on the line exactly as on the rail.
