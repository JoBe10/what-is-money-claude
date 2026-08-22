// 4.01 — the section entry.
//
// R7 §1.1: the image-led opener and the define-the-job slide are merged. Section
// 3's closing waypoint crossfades straight into this frame, so the section has
// no title card and no opener painting: the third question ignites, dissolves,
// and the first thing the viewer sees is the phrase itself, put under a lens.
// The old opener’s one necessary sentence — the section turns to analyzing the
// store of value from first principles — opens this slide’s script.

import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 4;

export default {
  id: '4-01-define-the-job',
  section: 'ideal-store',
  number: 23,
  title: 'What Exactly Is Being Stored?',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-define-job';

    const phrase = document.createElement('div');
    phrase.className = 's4-define-job__phrase';

    const prefix = document.createElement('span');
    prefix.className = 's4-define-job__prefix';
    prefix.textContent = 'STORE OF';

    const value = document.createElement('span');
    value.className = 's4-define-job__value';
    value.textContent = 'VALUE';
    phrase.append(prefix, document.createTextNode(' '), value);
    root.appendChild(phrase);

    const question = document.createElement('div');
    question.className = 's4-define-job__question';
    question.textContent = 'What exactly is being stored?';
    root.appendChild(question);

    const prompt = document.createElement('div');
    prompt.className = 's4-define-job__prompt';
    prompt.textContent = 'Start where money is earned.';
    root.appendChild(prompt);

    container.appendChild(root);

    this._refs = {
      root,
      phrase,
      prefix,
      value,
      question,
      prompt,
      appliedStep: 0,
      reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    markReconstruct(this._refs, ctx);
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

    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    // Build 0 is the authored black beat the waypoint dissolves into; the
    // phrase holds through the emphasis and clears as the question lands in
    // its place.
    refs.phrase.dataset.visible = String(n === 1 || n === 2);
    refs.prefix.dataset.quiet = String(n === 2);
    refs.value.dataset.emphasised = String(n === 2);
    refs.question.dataset.visible = String(n >= 3);
    refs.prompt.dataset.visible = String(n >= 4);
  },

  notes: `[→] So let’s take that third question and answer it properly — from first principles. When people talk about stores of value they normally jump straight to the properties: scarce, durable, portable, and off we go. But before we can ask what makes a store of value good, we have to know what the job is. So look at the phrase itself.

[→] Store of *value*. That word is doing all the work, and it is the one nobody defines. Because value is not a substance. It is not a quantity of stuff you can weigh out, pour into a container, and seal.

[→] So what exactly is being stored? Until we can answer that, a list of properties is a list about nothing.

[→] And the clearest way to answer it is to start where money is earned. So let me show you the smallest example I can think of.`
};
