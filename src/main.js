import './styles/fonts.css';
import './styles/icons.css';
import './styles/globals.css';
import './styles/slides.css';
import { SlideEngine } from './engine/SlideEngine.js';
import manifest from './slides/manifest.js';

// The manifest is the single source of truth for deck ordering; the per-module
// `number` fields are historical and drifted when slides were added or removed.
// Normalizing here means they can never disagree with the running deck again.
manifest.slides.forEach((slide, i) => { slide.number = i + 1; });

const root = document.getElementById('deck-root');
const engine = new SlideEngine({
  root,
  slides: manifest.slides,
  sections: manifest.sections
});

engine.start();

// Expose for debugging in the console.
window.__deck = engine;
