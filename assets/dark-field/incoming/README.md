# The dark-field drop zone

Generate an image from a prompt in `docs/dark-field-manifest.md`, name the file
for its **subject key** (`surgeon.png`, `meal.png`, `cattle.png`, `salt.png`,
`iron.png` — the same key the icon grammar uses for that subject's mark), and
drop it here. Then:

```bash
node review/rebuild-r7-2/harness/ingest-r7-2.cjs
```

Images that pass the grade gate move into `assets/dark-field/` and appear on
their slides immediately, with no code change. Images that fail stay here with
the failing measurement printed, so off-grade imagery never reaches a slide
(§9.4.9: outliers are regenerated, never grandfathered).

`--dry` reports what would move without moving it.

This file exists so the directory survives a clean checkout; git does not track
empty directories.
