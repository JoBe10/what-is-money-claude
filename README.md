# What is Money? — Presentation Deck

Cinematic HTML deck for the talk *"What is Money? — And how does Bitcoin fit in?"*

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to http://127.0.0.1:5173). The browser opens automatically.

## Keyboard shortcuts

| Key | Action |
|---|---|
| `→` / `Space` | Next build step or slide |
| `←` | Previous build step or slide |
| `↓` | Force next build step (hops to next slide at end) |
| `↑` | Force previous build step |
| `Esc` | Toggle overview grid (closes other overlays first) |
| `F` | Toggle browser fullscreen |
| `N` | Toggle speaker-notes overlay |
| `?` | Show keyboard shortcuts help |
| `g` then digits then `Enter` | Jump to slide number (e.g. `g 2 4 ⏎` → slide 24) |

Inside the notes overlay, the "Open in second window" button pops the current slide's notes into a separate window which auto-syncs as you advance — handy for a second monitor. The "Copy slide URL" button next to it copies a deep-link to the current slide.

## Touch / mobile navigation

The deck is also navigable by touch, so it works on phones and tablets:

| Gesture | Action |
|---|---|
| Tap right two-thirds of the screen | Next build step or slide |
| Tap left third of the screen | Previous build step or slide |
| Swipe left | Next build step or slide |
| Swipe right | Previous build step or slide |

Interfering mobile browser gestures (pinch-zoom, double-tap-zoom, edge overscroll, long-press text selection) are disabled on the slide surface. A fullscreen toggle appears bottom-left of the chrome where the browser supports the Fullscreen API (most desktop + Android browsers; iOS Safari omits it since it can't fullscreen non-video elements). Keyboard navigation is unchanged — touch support is purely additive.

## Deep-linking & dev-loop persistence

The current slide is reflected in the URL so refreshes and Vite HMR reloads preserve your position.

- `?slide=18` — jump to slide 18 (1-based).
- `?slide=2-09-collectibles` — jump to the slide whose `id` matches.
- `#18` / `#2-09-collectibles` — same forms via hash; query param wins when both are present.

The URL updates as you navigate (debounced; uses `history.replaceState` so the back button doesn't pollute with every key press). The current slide *and* its build step are written to `sessionStorage`, so Vite HMR reloads return you to exactly where you were — including the mid-slide build state.

## Scratch route (`?proto=`)

Prototype scenes run through the real engine, without joining the deck:

- `?proto=` — every prototype registered in `src/proto/registry.js`, in order.
- `?proto=<id>` — one, by module id or by its `protoKey`.
- `?proto=list` — the index of what is registered.

`?slide=` still selects the entry point inside whatever the route is running, so
builds, notes, direct entry and reduced motion behave exactly as they will on
stage. Nothing here affects the deck: a scene joins the film only when its batch
splices it into `src/slides/manifest.js`.

## Project layout

```
index.html
src/
  main.js                 # entry: mounts the deck, or the scratch route on ?proto=
  dark-field.js           # subject-keyed image register (images are never pathed)
  engine/                 # navigation, transitions, overlays
  components/             # reusable visual elements (KickerLabel, BuildList, …)
  proto/registry.js       # prototypes the scratch route can run
  scenes/                 # the film, one directory per act — see src/scenes/README.md
  slides/
    manifest.js           # the running order, and the only source of truth for it
    section-1-question/   # the legacy deck, replaced batch by batch
styles/
  globals.css             # design tokens, shell chrome, overlays
  slides.css              # shared slide patterns
assets/dark-field/        # the graded shipping set (do not regenerate without approval)
```

## Adding a slide

1. Create `src/slides/section-N-name/NN-name.js`. Export a default object with the slide-module shape:

   ```js
   export default {
     id: '12-thing',        // unique
     section: 'history',    // section id from manifest.js
     number: 12,            // absolute slide number
     title: 'A title',
     totalBuildSteps: 0,    // 0 means no within-slide builds
     render(container) { /* mount DOM into container (1920×1080 logical) */ },
     onEnter(ctx) { /* start animations */ },
     onExit(ctx)  { /* clean up timers/listeners */ },
     buildStep(n) { /* apply state for build step n (0..totalBuildSteps) */ },
     notes: `Speaker notes...`
   };
   ```

2. Import it in `src/slides/manifest.js` and add it to the right section's array.

3. **Use design tokens, not raw hex.** Read colors via `var(--accent)`, `var(--text-secondary)` etc. — defined in `src/styles/globals.css`. Tailwind utilities (`bg-accent`, `text-text-muted`) are also wired up via `tailwind.config.js`.

4. **Pull images from the manifest** — `import { images } from '../../assets.js'; img.src = images.bitcoin;`. Don't reference raw paths.

5. If a slide should continue from the previous one (shared DOM, smooth morph, no fade transition), set `continuesFrom: 'previous-slide-id'` on the new slide and use the previous render's API stored on the container (see `OrangePillCapsule.js` for the pattern).

## Design tokens (cheat sheet)

- Background is always `var(--bg-primary)` (pure black).
- `--accent` is Bitcoin orange `#F7931A` — visual weight target ~30%.
- `--success` (`#4ADE80`) and `--danger` (`#FF5C5C`) are reserved for honest-money / dishonest-money semantics; don't use them decoratively.
- Kicker labels: 11px UPPERCASE, +0.22em tracking, orange, with a 18px leading rule. Use the `KickerLabel` component.
- Titles tighten letter-spacing to ~-0.025em; subtitles open up a hair.

## Conventions

- No bullets that look like default browser bullets. Use the `BuildList` component for any progressively-revealed list.
- No full-width orange bars or underlines beneath titles.
- Pre-flight check before adding decoration: would a Bitcoiner spot this as AI slop? If yes, cut it.
- Whitespace is part of the design.

## Production / projection

- Press `F` to enter fullscreen on the projector machine.
- Chrome UI (slide counter + progress bar) auto-hides after 2 s of mouse idle; it returns on movement.
- The deck respects `prefers-reduced-motion` — ambient loops stop and transitions become instant.
