import { UnitField } from '../../components/UnitField.js';

// 1.4 — the stakes. The mercy line, essentially alone on black; the
// hours-field ghosted behind it at watermark legibility. No supporting
// elements, no image, no chart — the restraint is the image.

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '1-04-the-stakes',
  section: 'question',
  number: 4,
  title: 'The Stakes',
  totalBuildSteps: 1,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's1q s1q-stakes';

    const field = UnitField();
    root.appendChild(field.el);

    const line = document.createElement('p');
    line.className = 's1q-stakes__line';
    line.textContent =
      'If you don’t understand the thing your life’s work is stored in, you are at the mercy of those who do.';
    root.appendChild(line);

    container.appendChild(root);

    this._refs = { root, field, line, appliedStep: 0, reconstruct: false };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    if (this._refs && (ctx?.targetBuildStep || 0) > 0) this._refs.reconstruct = true;
  },

  onExit() {
    this._refs?.field.destroy();
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    const n = Math.max(0, Math.min(1, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);

    // The ghosted hours-field is present from build 0 — clearly there,
    // clearly not the subject.
    refs.field.setState({ mode: 'dim', progress: 1 });
    setVisible(refs.line, n >= 1);
  },

  notes: `[→] And here is why the question matters — why it’s worth the next hour of your attention.

If you don’t understand the thing your life’s work is stored in, you are at the mercy of those who do.

That asymmetry is as old as money itself. In every era, the people who understood the monetary system — how it works, who controls it, where its weaknesses are — have held a quiet power over the people who merely used it. Most people live their entire lives on the wrong side of that line without ever knowing the line exists.

The point of the next hour is to move you to the other side of it.`
};
