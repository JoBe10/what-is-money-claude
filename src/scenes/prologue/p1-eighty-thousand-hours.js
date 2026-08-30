// Scene P1 — Eighty Thousand Hours / What Is Money? (11 beats + the authored
// entry black). The film's opening.
//
// One continuous world: a field of eighty thousand points of light, one per
// working hour of a life, that fills, condenses into a mass, and then
// shape-shifts through five forms before the frame clears to the question and
// the title. The beat map is `docs/batch-a-package.md` §1 as amended by the
// presenter's ruling of 29 August 2026 — eleven advances plus the entry black
// the first line is spoken over.
//
// LANDED STATES ARE APPROVED CELLS, BY CONSTRUCTION. Every settled frame here
// is a cell of `review/prologue/states/` (states.json `approvedSet`, ruled
// 29 August 2026): p1-b0 · p1-b1 · p1-b2 · p1-b3 · p1-b4 · p1-b5 · p1-b6 ·
// p1-b7-glow · p1-b8-a · p1-b9 · p1-b10 · p1-b11. The geometry is transcribed
// from the builders those cells were rendered from (`_prologueStage.js` and
// the deck's own type classes); the landed-state proof checks it per pixel.
// Nothing settled in this scene was derived.
//
// MOTION. The fill and the counter are the legacy deck's proven gesture,
// reused with its own timings (1.01: an 8.2s fill behind an authored 800ms
// hold, the counter fading in with the first countable units and completing
// with the field). The condensation is the deck's proven collapse (1.02's
// 4.6s), landing on the mass rather than on a disc — the disc is born in
// Scene 3 and nowhere earlier. The five-form morph is a cross-dissolve in the
// dark-field register's own reveal: each form is its own advance, and one
// object becoming another by dissolve is the scene's argument in a gesture —
// the form changed, the thing did not. The two lines and the title are the
// deck's own sequenced-line treatment: each gets the frame alone, and the
// title lands after a beat of emptiness.
//
// REGISTER. Monochrome plus the renders' photographic warmth. No accent, no
// Claim Mark, no luminous disc anywhere in this scene.

import { UnitField } from '../../components/UnitField.js';
import {
  setVisible, claimCanvas, releaseCanvas, massLayer, formBox, FORMS
} from './_prologueStage.js';

const HOURS = 80000;
// 1.01's own numbers: the fill, and the authored hold before the first unit.
const FILL_MS = 8200;
const FILL_DELAY_MS = 800;
// 1.02's own number: the collapse.
const COLLAPSE_MS = 4600;
// The mass resolves while the last of the field is still pouring in.
const MASS_EMERGE_AT = 0.45;

const MAX_STEP = 11;
// Beats 4–8 are the five forms, in the morph's order.
const FIRST_FORM_STEP = 4;

export default {
  id: 'eighty-thousand-hours',
  section: 'prologue',
  number: 1,
  title: 'Eighty Thousand Hours / What Is Money?',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    // `.s1q` is the Prologue's own ground: absolute, inset 0, opaque black —
    // half of the rasterization contract (`_prologueStage.js`).
    root.className = 's1q p1';

    // The field, first — everything else reads over it.
    const field = UnitField({ preRadial: true, warmAnim: true });
    root.appendChild(field.el);

    const mass = massLayer();
    root.appendChild(mass);

    const forms = FORMS.map((form) => {
      const el = formBox(form);
      root.appendChild(el);
      return el;
    });

    const counter = document.createElement('div');
    counter.className = 's1q-hours__counter';
    counter.textContent = '0';
    root.appendChild(counter);

    const hoursLine = document.createElement('p');
    hoursLine.className = 's1q-hours__line';
    hoursLine.textContent = 'This is how many hours of your life you will spend working.';
    root.appendChild(hoursLine);

    const formsLine = document.createElement('p');
    formsLine.className = 's1q-stakes__line';
    formsLine.textContent = 'The forms could hardly be more different.';
    root.appendChild(formsLine);

    const question = document.createElement('p');
    question.className = 's1q-what__question';
    question.textContent = 'So what is the thing that stays the same?';
    root.appendChild(question);

    const title = document.createElement('h1');
    title.className = 's1q-what__title';
    title.textContent = 'WHAT IS MONEY?';
    root.appendChild(title);

    container.appendChild(root);

    this._canvas = claimCanvas(container);
    this._refs = {
      root, field, mass, forms, counter, hoursLine, formsLine, question, title,
      appliedStep: 0,
      reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    // Direct entry, or backward entry at a nonzero build, reconstructs the
    // exact state instead of replaying the fill or the collapse.
    if (this._refs && (ctx?.targetBuildStep || 0) > 0) this._refs.reconstruct = true;
  },

  onExit() {
    this._refs?.field.destroy();
    releaseCanvas(this._canvas);
    this._canvas = null;
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    const n = Math.max(0, Math.min(MAX_STEP, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);

    // Everything above the field is declarative — one settled configuration
    // per build, reconstructed the same way forward, backward and cold.
    setVisible(refs.hoursLine, n === 2);
    setVisible(refs.mass, n === 3);
    refs.forms.forEach((el, i) => setVisible(el, n === FIRST_FORM_STEP + i));
    setVisible(refs.formsLine, n === 9);
    setVisible(refs.question, n === 10);
    setVisible(refs.title, n === MAX_STEP);

    const countable = n === 1 || n === 2;
    refs.counter.dataset.visible = String(countable);
    if (countable) refs.counter.textContent = HOURS.toLocaleString('en-US');

    // The field leaves the frame once it is spent. From the condensation on it
    // paints nothing, but an empty full-frame canvas is not free: it still
    // costs the frame a raster layer, and the approved cells for those beats
    // have no field element at all. Measured, not assumed — with the spent
    // canvases in the paint, the bitcoin form's own rasterization moved by up
    // to 9/255 along one column and the landed-state proof caught it. The live
    // collapse keeps the field until its gesture is done.
    if (!(n === 3 && live)) refs.field.el.style.display = n >= 3 ? 'none' : '';

    if (n === 0) {
      refs.field.setState({ mode: 'empty' });
      refs.counter.textContent = '0';
      return;
    }

    if (n === 1 && live) {
      // The hours arrive. The counter stays dark through the authored hold and
      // fades in with the first countable units, completing with the field.
      refs.counter.dataset.visible = 'false';
      refs.counter.textContent = '0';
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

    if (n <= 2) {
      // Build 1 reconstructed, or build 2 — which force-completes any running
      // fill through the animation cancel inside setState.
      refs.field.setState({ mode: 'steady', progress: 1 });
      return;
    }

    if (n === 3 && live) {
      // The condensation, one gesture: the field streams inward and the mass
      // resolves out of it while the last of the field is still arriving.
      setVisible(refs.mass, false);
      refs.field.animate({
        mode: 'collapse',
        duration: COLLAPSE_MS,
        onTick: (t) => {
          if (t >= MASS_EMERGE_AT) setVisible(refs.mass, true);
        },
        onDone: () => {
          setVisible(refs.mass, true);
          refs.field.el.style.display = 'none';
        }
      });
      return;
    }

    // Build 3 reconstructed, and every build after it: the field is spent.
    refs.field.setState({ mode: 'collapse', progress: 1 });
  },

  notes: `Let me start with a number.

[→] Every point of light appearing on your screen is one hour of work. One hour of somebody’s morning, somebody’s shift, somebody’s life. Watch them add up. A year of full-time work is about two thousand hours. A career — call it forty years, a full-time working life — is eighty thousand. *[the counter completes with the field]* There they are. All at once.

[→] Eighty thousand hours. That is how much of a human life goes into working — and every one of those hours is irreplaceable. You don’t get any of them back. They only move in one direction. And all of them, for almost everyone, get traded for one thing.

[→] Watch what happens to them. Everything you earn — all of it — condenses into… this.

[→] For most of human history, in one place or another, it looked like this. A shell.

[→] Then, for thousands of years, it looked like this.

[→] Then it looked like this — paper, and a promise.

[→] Then it stopped looking like anything at all. Numbers in a ledger.

[→] And lately — this.

[→] The forms could hardly be more different. A shell. A metal. A paper. A database entry. A protocol. They share no material, no weight, no age, no maker.

[→] So what is the thing that stays the same? Because whatever that is — *that* is what your eighty thousand hours become.

[→] That is the question.`
};
