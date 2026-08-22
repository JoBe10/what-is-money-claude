// 3.1 — the three functions. The neutral token from 1.2 returns center —
// the callback anchor — and the three functions radiate from it on thin
// spokes: store of value left, medium of exchange right, unit of account
// beneath. The continuity line lands last: the functions are Section 2's
// competition dimensions seen from the inside. Build 0 is the authored
// black beat before the token returns.

import { glyph } from '../../components/section-2/glyphs.js';

const FUNCTIONS = [
  { key: 'sov', glyph: 'through-time', name: 'STORE OF VALUE', sub: 'moves value through time.' },
  { key: 'moe', glyph: 'between-people', name: 'MEDIUM OF EXCHANGE', sub: 'moves value between people.' },
  { key: 'uoa', glyph: 'measure', name: 'UNIT OF ACCOUNT', sub: 'measures value.' }
];

const CONTINUITY =
  'Across time. Across space. Across scale. The three dimensions of the competition — seen from the inside.';

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '3-01-the-three-functions',
  section: 'function',
  number: 15,
  title: 'The Three Functions',
  totalBuildSteps: 5,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's3f s3f-functions';

    // The callback anchor is literally 1.2's token — the same render, not a
    // resemblance (R7.1 §2). `luminous-disc` carries the object; `s1q-token`
    // carries only its arrival, and `--small` its 120px diameter. R7.3 §5.1:
    // the class was lost here when the disc's identity moved out of
    // `s1q-token`, which left the three functions radiating from a bare glow.
    const token = document.createElement('div');
    token.className = 'luminous-disc s1q-token s1q-token--small s3f-functions__token';
    root.appendChild(token);

    const spokes = {};
    const fns = {};
    FUNCTIONS.forEach((spec) => {
      const spoke = document.createElement('div');
      spoke.className = 's3f-functions__spoke';
      spoke.dataset.fn = spec.key;
      root.appendChild(spoke);
      spokes[spec.key] = spoke;

      const fn = document.createElement('div');
      fn.className = 's3f-functions__fn';
      fn.dataset.fn = spec.key;

      const g = document.createElement('div');
      g.className = 's3f-functions__glyph';
      g.innerHTML = glyph(spec.glyph, 56);
      fn.appendChild(g);

      const text = document.createElement('p');
      text.className = 's3f-functions__text';
      const name = document.createElement('span');
      name.className = 's3f-functions__name';
      name.textContent = spec.name;
      const sub = document.createElement('span');
      sub.className = 's3f-functions__sub';
      sub.textContent = ` — ${spec.sub}`;
      text.append(name, sub);
      fn.appendChild(text);

      root.appendChild(fn);
      fns[spec.key] = fn;
    });

    const continuity = document.createElement('p');
    continuity.className = 's3f-functions__continuity';
    continuity.textContent = CONTINUITY;
    root.appendChild(continuity);

    container.appendChild(root);

    this._refs = {
      root, token, spokes, fns, continuity,
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

    const n = Math.max(0, Math.min(5, Number(step) || 0));
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

    setVisible(refs.token, n >= 1);
    ['sov', 'moe', 'uoa'].forEach((key, index) => {
      setVisible(refs.spokes[key], n >= index + 2);
      setVisible(refs.fns[key], n >= index + 2);
    });
    setVisible(refs.continuity, n >= 5);
  },

  notes: `[→] Here’s the go-between good again — the thing every trade in the world now has on one side of it. Watch what it’s actually being asked to do.

[→] First: hold value between the moment you earn and the moment you spend. A money is a store of value — it moves value *through time*. Sometimes an afternoon. Sometimes a working life.

[→] Second: be the thing both sides of a trade will take. A money is a medium of exchange — it moves value *between people*, across any distance the trade can reach.

[→] Third, the quiet one: once everything trades against the same good, everything gets *priced* in it. A money is a unit of account — the measuring stick of value itself.

[→] And notice — you’ve seen these three before. Survives across time. Across space. Across scale. The dimensions that decided the competition in Section One’s history are exactly the three functions, seen from the inside. The market wasn’t selecting arbitrarily. It was selecting for the job.`
};
