import {
  ensureHoursScene,
  releaseHoursScene,
  adoptOverlay,
  finishOverlayCleanup
} from './_hoursScene.js';

// 1.2 — the conversion. The completed hours-field flows toward center and
// condenses into a single plain, softly luminous disc — an unmarked token.
// No symbol, no currency sign: the token stays deliberately anonymous.
//
// Second member of the `hours-field` scene group (R2.1 §A): entered forward
// from 1.1, this slide adopts the very field the viewer just watched fill —
// no teardown, no black — and the collapse consumes that same object.

const COLLAPSE_MS = 4600;
// The token begins to bloom once enough of the field has streamed in.
const TOKEN_EMERGE_AT = 0.22;

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '1-02-the-conversion',
  section: 'question',
  number: 2,
  title: 'The Conversion',
  totalBuildSteps: 3,
  sceneGroup: 'hours-field',

  render(container) {
    container.innerHTML = '';
    const scene = ensureHoursScene(container);
    this._buildOverlay(container, scene);
    this._applyBuild(0);
  },

  _buildOverlay(container, scene) {
    const root = document.createElement('div');
    root.className = 's1q s1q--overlay s1q-conversion';

    // The disc's render is shared deck-wide (R7.1 §2): this element and every
    // Section 4 claim are the same object. `s1q-token` carries only where it
    // sits and how it arrives.
    const token = document.createElement('div');
    token.className = 'luminous-disc s1q-token';
    root.appendChild(token);

    const lineOne = document.createElement('p');
    lineOne.className = 's1q-conversion__line';
    lineOne.textContent = 'Everything you earn is your time, changing form.';
    root.appendChild(lineOne);

    const lineTwo = document.createElement('p');
    lineTwo.className = 's1q-conversion__line';
    lineTwo.textContent = 'Money is where a life’s work accumulates.';
    root.appendChild(lineTwo);

    container.appendChild(root);

    this._refs = {
      root,
      field: scene.field,
      token,
      lineOne,
      lineTwo,
      appliedStep: 0,
      reconstruct: false,
      overlayCleanup: null
    };
  },

  onEnter(ctx) {
    if (ctx && ctx.continuous) {
      // Handoff (forward from 1.1): the field persists untouched — build 0
      // is its steady end state — and 1.1's counter and line fade away.
      const scene = ensureHoursScene(ctx.container);
      this._buildOverlay(ctx.container, scene);
      adoptOverlay(ctx.container, this._refs.root, this._refs);
      this._refs.reconstruct = true;
      if ((ctx.targetBuildStep || 0) === 0) this._applyBuild(0);
      return;
    }
    if (this._refs && (ctx?.targetBuildStep || 0) > 0) this._refs.reconstruct = true;
  },

  onExit(ctx) {
    finishOverlayCleanup(ctx?.container, this._refs);
    releaseHoursScene(ctx?.container, Boolean(ctx?.continuous));
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

    // The two lines are sequenced, never stacked — each gets the frame alone.
    setVisible(refs.lineOne, n === 2);
    setVisible(refs.lineTwo, n >= 3);

    if (n === 0) {
      // Visual continuity with 1.1's end state: the field, steady, counter
      // gone — on a handoff this call is a no-op on the adopted field.
      refs.field.setState({ mode: 'steady', progress: 1 });
      setVisible(refs.token, false);
      return;
    }

    if (n === 1 && live) {
      refs.field.animate({
        mode: 'collapse',
        duration: COLLAPSE_MS,
        onTick: (t) => {
          if (t >= TOKEN_EMERGE_AT) setVisible(refs.token, true);
        },
        onDone: () => setVisible(refs.token, true)
      });
      return;
    }

    // Builds 1–3 at rest: the field fully condensed, the token alone.
    refs.field.setState({ mode: 'collapse', progress: 1 });
    setVisible(refs.token, true);
  },

  notes: `[→] Watch what happens to them. Every hour worked gets converted — poured, one by one, into a single thing. This is what a paycheck actually is: hours, changing shape.

[→] Everything you earn is your time, changing form. Now, to be precise about it: not every hour trades at the same rate. The market doesn’t price your hours — it prices what you *make* with them. An hour of specialized, skilled, valuable work converts into more than an hour of unskilled work. That’s not a flaw in the system; that’s the system working. But notice that whatever the exchange rate — what you *paid* was time. The rate varies. The currency you paid in never does.

[→] Money is where a life’s work accumulates. Whatever you own, whatever you’ve saved, whatever you’ve built — nearly all of it passed through this on the way. Every working hour, funneled into one vessel.

So here is the question that should bother you far more than it probably does.`
};
