import './styles/fonts.css';
import './styles/icons.css';
import './styles/globals.css';
import './styles/slides.css';
import { SlideEngine } from './engine/SlideEngine.js';
import manifest from './slides/manifest.js';
import { prototypes } from './proto/registry.js';

const root = document.getElementById('deck-root');
const protoToken = new URLSearchParams(window.location.search).get('proto');

// `?proto=` is the scratch route; anything else is the deck.
if (protoToken === null) {
  startDeck();
} else {
  startScratchRoute(protoToken.trim().toLowerCase());
}

function startDeck() {
  // The manifest is the single source of truth for deck ordering; the per-module
  // `number` fields are historical and drifted when slides were added or removed.
  // Normalizing here means they can never disagree with the running deck again.
  manifest.slides.forEach((slide, i) => { slide.number = i + 1; });

  mount(manifest.slides, manifest.sections);
}

// The scratch route runs prototype scenes through the real engine — the same
// builds, notes, reduced-motion and direct-entry behavior the film gets — so a
// prototype gate judges the thing that will ship rather than a mock of it. It
// never touches the deck: a scene joins the film when its batch splices it into
// the manifest.
//
//   ?proto=            every registered prototype, in registry order
//   ?proto=<id>        one prototype, by module id or by its `protoKey`
//   ?proto=list        the index, even when prototypes are registered
//
// `?slide=` still selects the entry point within whatever the route is running.
function startScratchRoute(token) {
  const scenes = token === '' || token === 'all'
    ? prototypes.slice()
    : prototypes.filter((s) => s.id === token || s.protoKey === token);

  if (token === 'list' || !scenes.length) {
    renderScratchIndex(token);
    return;
  }

  scenes.forEach((scene, i) => { scene.number = i + 1; });
  mount(scenes, [{ id: 'proto', label: 'Prototypes', slides: scenes }]);
}

function mount(slides, sections) {
  const engine = new SlideEngine({ root, slides, sections });
  engine.start();
  // Expose for debugging in the console.
  window.__deck = engine;
}

// The index is a working surface, not a frame of the film: plain type on the
// deck's black, no composition to mistake for a design.
function renderScratchIndex(token) {
  const wrap = document.createElement('div');
  wrap.className = 'scratch-index';

  const title = document.createElement('div');
  title.className = 'scratch-index__title';
  title.textContent = 'Scratch route';
  wrap.appendChild(title);

  const note = document.createElement('div');
  note.className = 'scratch-index__note';
  if (!prototypes.length) {
    note.textContent = 'No prototypes registered. Add a scene module to src/proto/registry.js to run it here.';
  } else if (token !== 'list') {
    note.textContent = `No prototype matches “${token}”. Registered:`;
  } else {
    note.textContent = 'Registered prototypes:';
  }
  wrap.appendChild(note);

  if (prototypes.length) {
    const list = document.createElement('ul');
    list.className = 'scratch-index__list';
    prototypes.forEach((scene) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `?proto=${scene.protoKey || scene.id}`;
      link.textContent = scene.title ? `${scene.id} — ${scene.title}` : scene.id;
      item.appendChild(link);
      list.appendChild(item);
    });
    wrap.appendChild(list);
  }

  const back = document.createElement('a');
  back.className = 'scratch-index__back';
  back.href = '?';
  back.textContent = 'Run the deck';
  wrap.appendChild(back);

  root.innerHTML = '';
  root.appendChild(wrap);
}
