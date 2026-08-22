import {
  ensureHoursScene,
  releaseHoursScene,
  adoptOverlay,
  finishOverlayCleanup
} from './_hoursScene.js';

// 1.1 — the cold open. Darkness, then a field of 80,000 units — one per
// working hour of a life — populating in accelerating waves while a counter
// ticks up in sync. Then the line lands. No title, no chrome preamble.
//
// The field is the `hours-field` scene group’s shared layer (R2.1 §A): at
// the 1.1 ↔ 1.2 boundary the engine hands it off untouched and only this
// slide’s counter and line transition.

const HOURS = 80000;
const FILL_MS = 8200;
// The authored hold: after the advance into build 1, the darkness continues
// for ~800ms before the first unit appears (a recorded-delivery pause).
const FILL_DELAY_MS = 800;

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '1-01-eighty-thousand-hours',
  section: 'question',
  number: 1,
  title: 'Eighty Thousand Hours',
  totalBuildSteps: 2,
  sceneGroup: 'hours-field',

  render(container) {
    container.innerHTML = '';
    const scene = ensureHoursScene(container);
    this._buildOverlay(container, scene);
    this._applyBuild(0);
  },

  _buildOverlay(container, scene) {
    const root = document.createElement('div');
    root.className = 's1q s1q--overlay s1q-hours';

    const counter = document.createElement('div');
    counter.className = 's1q-hours__counter';
    counter.textContent = '0';
    root.appendChild(counter);

    const line = document.createElement('p');
    line.className = 's1q-hours__line';
    line.textContent = 'This is how many hours of your life you will spend working.';
    root.appendChild(line);

    container.appendChild(root);

    this._refs = {
      root,
      field: scene.field,
      counter,
      line,
      appliedStep: 0,
      reconstruct: false,
      overlayCleanup: null
    };
  },

  onEnter(ctx) {
    if (ctx && ctx.continuous) {
      // Handoff (backward from 1.2): adopt the mounted field; the overlays
      // crossfade. The engine applies the target build right after this.
      const scene = ensureHoursScene(ctx.container);
      this._buildOverlay(ctx.container, scene);
      adoptOverlay(ctx.container, this._refs.root, this._refs);
      this._refs.reconstruct = true;
      if ((ctx.targetBuildStep || 0) === 0) this._applyBuild(0);
      return;
    }
    // Direct entry / backward entry at a nonzero build reconstructs the exact
    // end state instead of replaying the fill.
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

    const n = Math.max(0, Math.min(2, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);

    setVisible(refs.line, n >= 2);

    if (n === 0) {
      refs.field.setState({ mode: 'empty' });
      refs.counter.dataset.visible = 'false';
      refs.counter.textContent = '0';
      return;
    }

    if (n === 1 && live) {
      // The counter stays dark through the authored hold and fades in with
      // the first countable units, completing together with the field.
      refs.counter.dataset.visible = 'false';
      refs.field.animate({
        mode: 'fill',
        duration: FILL_MS,
        delay: FILL_DELAY_MS,
        onTick: (units) => {
          if (units > 0) refs.counter.dataset.visible = 'true';
          refs.counter.textContent = units.toLocaleString('en-US');
        },
        onDone: () => {
          refs.counter.textContent = HOURS.toLocaleString('en-US');
        }
      });
      return;
    }

    // Build 1 reconstructed, or build 2 (which force-completes any running
    // fill via the animation cancel inside setState).
    refs.field.setState({ mode: 'steady', progress: 1 });
    refs.counter.dataset.visible = 'true';
    refs.counter.textContent = HOURS.toLocaleString('en-US');
  },

  notes: `Let me start with a number.

[→] Every point of light appearing on your screen is one hour of work. One hour of somebody’s morning, somebody’s commute, somebody’s shift. Watch them add up. A year of full-time work is about two thousand hours. A full-time working life — call it forty years — is eighty thousand. *[the counter completes with the field]* There they are. All at once.

[→] Eighty thousand hours. That is how much of a human life goes into working. And I want you to notice what those hours have in common: every single one of them is irreplaceable. You don’t get any of them back. They only move in one direction.

Hold that picture for a second — because all of those hours get traded for one thing.`
};
