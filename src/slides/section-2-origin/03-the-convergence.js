// 2.3 — the convergence. Black; then the murmuration, full screen, thousands
// of agents, no leader. The advance runs the convergence: steering weights
// shift, the flock organizes into orbit around a brightening point, and the
// point resolves into the token — the same anonymous disc Section 1 poured a
// working life into. Then the line: nobody decides, everyone converges.

import { MurmurationField } from '../../components/section-2/MurmurationField.js';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '2-03-the-convergence',
  section: 'origin',
  number: 9,
  title: 'The Convergence',
  totalBuildSteps: 3,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's2o s2o-convergence';

    const fieldWrap = document.createElement('div');
    fieldWrap.className = 's2o-convergence__field';
    const field = MurmurationField();
    fieldWrap.appendChild(field.el);
    root.appendChild(fieldWrap);

    // The winning good — the deck’s neutral token, unchanged from Section 1:
    // literally 1.2's render (R7.1 §2), which is why `luminous-disc` leads the
    // class list. It was lost here at that refactor alongside 3.1's (R7.3 §5.1).
    const token = document.createElement('div');
    token.className = 'luminous-disc s1q-token s1q-token--small s2o-convergence__token';
    root.appendChild(token);

    const line = document.createElement('p');
    line.className = 's2o-convergence__line';
    line.textContent = 'Nobody decides. Everyone converges.';
    root.appendChild(line);

    container.appendChild(root);

    this._refs = {
      root, fieldWrap, field, token, line,
      appliedStep: 0, reconstruct: false
    };
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

    const n = Math.max(0, Math.min(3, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);
    // Reconstructed frames (direct entry, back-navigation) land instantly:
    // the snap attribute suppresses every transition for this apply.
    if (!live) {
      refs.root.dataset.snap = 'true';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete refs.root.dataset.snap;
      }));
    }

    setVisible(refs.fieldWrap, n >= 1);
    setVisible(refs.line, n >= 3);

    // Builds 0–1 want the phase-1 flock; builds 2–3 the converged orbit. The
    // field is only touched when the wanted phase changes, so e.g. stepping
    // 3 → 2 keeps the orbit running instead of re-seeding it.
    const wantPhase = n >= 2 ? 2 : 1;
    if (wantPhase !== refs.fieldPhase) {
      if (wantPhase === 2 && live && !prefersReducedMotion()) {
        // The convergence runs live from the flock the viewer is watching.
        refs.field.animate({
          onProgress: (p) => {
            if (p >= 0.78 && this._refs) setVisible(this._refs.token, true);
          },
          onDone: () => {
            if (this._refs) setVisible(this._refs.token, true);
          }
        });
      } else {
        refs.field.setState(wantPhase === 2 ? { phase: 2, progress: 1 } : { phase: 1 });
      }
      refs.fieldPhase = wantPhase;
    }

    // Token: hidden in phase 1; during the live convergence it resolves via
    // onProgress; on any reconstructed converged frame it is simply there.
    setVisible(refs.token, wantPhase === 2 && !(live && n === 2 && !prefersReducedMotion()));
  },

  notes: `[→] So how does a whole society pick its go-between good? Watch. No bird in this flock is in charge. Every one of them is just watching its neighbors and adjusting. And out of thousands of private decisions comes one coherent motion.

[→] Money converges exactly like this. Every trader privately asks: what will *others* accept? And because everyone is watching everyone, the choices collapse toward a single good. The most salable good wins — not by vote, not by decree, by convergence.

[→] Nobody decides, and everyone converges. Money is an emergent order — like language. Nobody invented English; no law requires it; hundreds of millions coordinated on it anyway, because a shared standard is worth more than a private preference. Now — governments have stamped, standardized, and monopolized money throughout history. That’s real, and we’ll get to it. But the phenomenon itself is older than any state, and it has never needed one to exist.`
};
