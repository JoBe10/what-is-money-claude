import { ClaimObject } from './ClaimObject.js';
import { CarrierShell } from './CarrierShell.js';

export function CarrierStressStage({ className = '' } = {}) {
  const el = document.createElement('div');
  el.className = `s4-stress-stage ${className}`.trim();
  el.setAttribute('role', 'img');
  el.setAttribute(
    'aria-label',
    'A monetary claim and carrier ready for conceptual stress testing'
  );

  // R7.4 §D.1: the four corner brackets that used to frame this stage are
  // deleted. They were the only unexplained mark in Section 4 — a viewfinder
  // motif that appeared on one slide, meant nothing, and asked to be decoded.
  // `frameVisible` survives as an accepted-and-ignored option so the call site
  // that passes it keeps its build map readable; nothing renders.

  const scene = document.createElement('div');
  scene.className = 's4-stress-stage__scene';

  const shell = CarrierShell({ className: 's4-stress-stage__shell' });
  scene.appendChild(shell.el);

  const claimStage = document.createElement('div');
  claimStage.className = 's4-stress-stage__claim-stage';
  const claim = ClaimObject({ className: 's4-stress-stage__claim' });
  claimStage.appendChild(claim.el);
  scene.appendChild(claimStage);

  el.append(scene);

  function applyState({ frameVisible = false } = {}) {
    el.dataset.frameVisible = String(frameVisible);

    claim.applyState({
      visible: true,
      emphasis: 'focus'
    });
    shell.applyState({
      visible: true,
      focus: 'none'
    });
  }

  function destroy() {
    claim.destroy();
    shell.destroy();
    el.remove();
  }

  applyState({ frameVisible: false });
  return { el, applyState, destroy };
}

export default CarrierStressStage;
