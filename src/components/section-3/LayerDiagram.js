// The credit tower (R3.1 §D — full rebuild of the R3 §A3 visual): three
// thin-stroke slabs, centered on one spine, each resting visibly on the one
// below — PAYMENT APPS on top, BANK DEPOSITS beneath it, BASE MONEY at the
// bottom. The geometry carries the argument.
//
// THE WIDTHS ARE THE POINT. Base is the narrowest slab and it is at the
// bottom; deposits is distinctly wider above it; apps is wider still on
// top. An inverted tower — more issued above than held beneath — is the
// bank-run mechanic drawn rather than asserted. The proportions are
// qualitatively honest, deliberately NOT to scale (no real ratio is
// displayed, no figures appear on screen, and none is implied); they say
// "each layer issues more than it holds", which is the true structural
// point, and nothing more precise than that.
//
// A slab sinks by SETTLE px for each slab that lands beneath it — the rest
// is visible, and it is state, not a one-shot gesture, so every
// reconstruction lands the same frame. Between slabs hangs a thin link line
// with an addressable caption; the caption copy belongs to the slide, never
// to this component (the reserved word of the §3.3 ladder lives in exactly
// one file). A `drop` line extends downward from the base slab into empty
// black — the tower’s bottom-most link, pointing at nothing.
//
// States: slabs individually revealed, links individually addressable,
// `foundation` (the upper slabs recede to dim outlines while the base takes
// the slide’s single allowed orange), and `drop`. applyState(state, {live})
// reconstructs everything; non-live applies snap.

const SLAB_H = 92;
const CENTER_X = 960;
const SETTLE = 7;

// Widths: narrowest at the bottom. See the note above — qualitative.
const SLABS = [
  { key: 'apps', label: 'PAYMENT APPS', width: 780, top: 168 },
  { key: 'deposits', label: 'BANK DEPOSITS', width: 600, top: 312 },
  { key: 'base', label: 'BASE MONEY', width: 420, top: 456 }
];

// What sits below each slab — how far it settles once those have landed.
const BELOW = { apps: ['deposits', 'base'], deposits: ['base'], base: [] };

// The links hang from the slab named in `from`, so they carry its settle.
const LINKS = [
  { key: 'l1', from: 'apps', top: 268 },
  { key: 'l2', from: 'deposits', top: 412 }
];

export function LayerDiagram() {
  const el = document.createElement('div');
  el.className = 's3f-tower';
  el.dataset.visible = 'true';

  const slabs = {};
  SLABS.forEach((spec) => {
    const slab = document.createElement('div');
    slab.className = 's3f-tower__slab';
    slab.dataset.layer = spec.key;
    slab.dataset.visible = 'false';
    slab.style.left = `${CENTER_X - spec.width / 2}px`;
    slab.style.top = `${spec.top}px`;
    slab.style.width = `${spec.width}px`;
    slab.style.height = `${SLAB_H}px`;

    const label = document.createElement('div');
    label.className = 's3f-tower__label';
    label.textContent = spec.label;
    slab.appendChild(label);

    el.appendChild(slab);
    slabs[spec.key] = slab;
  });

  const links = {};
  LINKS.forEach((spec) => {
    const link = document.createElement('div');
    link.className = 's3f-tower__link';
    link.dataset.link = spec.key;
    link.dataset.visible = 'false';
    link.style.left = `${CENTER_X}px`;
    link.style.top = `${spec.top}px`;

    const line = document.createElement('div');
    line.className = 's3f-tower__linkline';
    link.appendChild(line);

    const caption = document.createElement('p');
    caption.className = 's3f-tower__linkcaption';
    link.appendChild(caption);

    el.appendChild(link);
    links[spec.key] = { link, caption, from: spec.from };
  });

  // The held question: the bottom-most link, reaching into darkness.
  const drop = document.createElement('div');
  drop.className = 's3f-tower__drop';
  drop.dataset.visible = 'false';
  drop.style.left = `${CENTER_X}px`;
  drop.style.top = `${SLABS[2].top + SLAB_H + 8}px`;
  el.appendChild(drop);

  function applyState(state = {}, { live = false } = {}) {
    if (!live) {
      el.dataset.snap = 'true';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete el.dataset.snap;
      }));
    }

    el.dataset.visible = String(state.visible !== false);
    el.dataset.foundation = String(Boolean(state.foundation));

    const shown = state.slabs || {};
    const settleOf = (key) =>
      BELOW[key].filter((k) => shown[k]).length * SETTLE;

    Object.keys(slabs).forEach((key) => {
      slabs[key].dataset.visible = String(Boolean(shown[key]));
      slabs[key].style.setProperty('--settle', `${settleOf(key)}px`);
    });

    const linkState = state.links || {};
    Object.keys(links).forEach((key) => {
      const spec = linkState[key];
      const entry = links[key];
      entry.link.dataset.visible = String(Boolean(spec));
      entry.link.style.setProperty('--settle', `${settleOf(entry.from)}px`);
      if (spec && typeof spec === 'object' && spec.caption != null) {
        entry.caption.textContent = spec.caption;
      }
    });

    drop.dataset.visible = String(Boolean(state.drop));
  }

  function destroy() {}

  return { el, applyState, destroy };
}

export default LayerDiagram;
