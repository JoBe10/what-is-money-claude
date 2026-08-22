// 3.2 — the functions separate. Three column headers land together, empty:
// PRICED IN · PAID IN · SAVED IN. The Argentina row fills them — one glyph
// per column, the saved column carrying two — under a small kicker. Then
// the principle the deck needs twice more. Build 0 is the authored black
// beat before the headers land.
//
// R3.1 §A: the saved column names the goods plainly — dollars · real
// estate. The brick glyph stays: the idiom (“saving in bricks”) lives in
// the spoken layer, where the script can gloss it.

import { glyph } from '../../components/section-2/glyphs.js';

// R7.3 §5.2 — the two currencies are named in type, not drawn as icons.
//
// Both of them use the `$` sign, so the dollar mark and the peso mark were the
// same drawing on one frame: the row said "$ · $ · $ + brick" and the whole
// point of the slide is that these are three *different* goods. An icon was
// never going to carry that distinction, and the alternative it had — the sol
// de mayo from Argentina's own coinage — collided with gold's sun mark two
// slides earlier. The deck already owns a register for naming a thing exactly
// and quietly: its label style. The currencies take it. The one entry that is
// not a currency keeps its glyph, because a brick is a thing you can draw.
const COLUMNS = [
  { key: 'priced', head: 'PRICED IN', marks: [{ text: 'USD' }], word: 'dollars' },
  { key: 'paid', head: 'PAID IN', marks: [{ text: 'ARS' }], word: 'pesos' },
  { key: 'saved', head: 'SAVED IN', marks: [{ text: 'USD' }, { glyph: 'brick' }], word: 'dollars · real estate' }
];

const KICKER = 'Argentina, five decades.';
const PRINCIPLE =
  'The functions are separable — across goods, and across time. A good can be money in one function before, or without, the others.';

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '3-02-the-functions-separate',
  section: 'function',
  number: 16,
  title: 'The Functions Separate',
  totalBuildSteps: 3,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's3f s3f-separate';

    const heads = [];
    const cells = [];
    COLUMNS.forEach((spec, index) => {
      const head = document.createElement('p');
      head.className = 's3f-separate__head';
      head.dataset.col = String(index);
      head.textContent = spec.head;
      root.appendChild(head);
      heads.push(head);

      const cell = document.createElement('div');
      cell.className = 's3f-separate__cell';
      cell.dataset.col = String(index);

      const glyphs = document.createElement('div');
      glyphs.className = 's3f-separate__glyphs';
      spec.marks.forEach((mark) => {
        const m = document.createElement('div');
        if (mark.text) {
          m.className = 's3f-separate__mark';
          m.textContent = mark.text;
        } else {
          m.className = 's3f-separate__glyph';
          m.innerHTML = glyph(mark.glyph, 56);
        }
        glyphs.appendChild(m);
      });
      cell.appendChild(glyphs);

      const word = document.createElement('p');
      word.className = 's3f-separate__word';
      word.textContent = spec.word;
      cell.appendChild(word);

      root.appendChild(cell);
      cells.push(cell);
    });

    const kicker = document.createElement('p');
    kicker.className = 's3f-separate__kicker';
    kicker.textContent = KICKER;
    root.appendChild(kicker);

    const principle = document.createElement('p');
    principle.className = 's3f-separate__principle';
    principle.textContent = PRINCIPLE;
    root.appendChild(principle);

    container.appendChild(root);

    this._refs = {
      root, heads, cells, kicker, principle,
      appliedStep: 0, reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    if (this._refs && (ctx?.targetBuildStep || 0) > 0) this._refs.reconstruct = true;
  },

  onExit() {
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    const n = Math.max(0, Math.min(3, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);
    if (!live) {
      refs.root.dataset.snap = 'true';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete refs.root.dataset.snap;
      }));
    }

    refs.heads.forEach((head) => setVisible(head, n >= 1));
    setVisible(refs.kicker, n >= 2);
    refs.cells.forEach((cell) => setVisible(cell, n >= 2));
    setVisible(refs.principle, n >= 3);
  },

  notes: `[→] Now, here’s the thing almost every explanation of money skips: nothing says one good has to do all three jobs. And when a money starts failing at one of them, people don’t write essays about it — they quietly split the jobs up.

[→] Argentina has been the world’s clearest demonstration for fifty years. Apartments are priced and sold in dollars. Daily life is paid in pesos. And savings go into dollars and real estate — Argentines literally call it “saving in bricks,” buying a floor at a time as the money comes in, because the bricks hold what the peso cannot. Three functions, three different goods. And before anyone reads politics into it: this pattern has persisted across administrations of every stripe — left, right, military, civilian. It isn’t a story about one government. It’s what people *do* when one function of their money breaks.

[→] So hold this as a principle, because we’ll need it twice more: the functions are separable — across goods, and across time. Which means a good can be money in one function before it’s money in the others. And that raises the obvious next question: is there an order?`
};
