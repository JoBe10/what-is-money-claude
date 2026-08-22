// The shared scene layer of the `exchange-triangle` continuity group
// (R2.2 §B.1). The two triangle slides — the coincidence-of-wants slide and
// the discovery slide — share one scene: the drawn triangle persists across
// the boundary untorn, and at a handoff only each slide's text overlay
// crossfades while the scene layer animates between its modes (the cycle
// arcs of 2.1 yield to the traveling goods of 2.2, and back). Any cold
// mount (direct entry, refresh, standard transition) reconstructs the scene
// from scratch — the group changes transitions, never state ownership.
//
// The scene element carries the attributes the triad CSS keys on:
// `data-mode` ("world" | "discovery") plus the active slide's `data-step` /
// `data-live` / `data-step-live` / `data-snap` — one stage, two readings.

import { buildTriad, goodToken, travelPath } from './_triad.js';

// The travel legs of 2.2 (§C.2: goods ride the triangle's drawn edges).
// Shared here so the traced-path layer and the goods use identical geometry.
export const FISH_LEG_1 = travelPath('fisherman', 'sandal-maker', 'outer');
export const FISH_LEG_2 = travelPath('sandal-maker', 'farmer', 'inner');
export const SANDALS_LEG = travelPath('sandal-maker', 'fisherman', 'outer');
export const GRAIN_LEG = travelPath('farmer', 'sandal-maker', 'inner');

export function ensureTriadScene(container) {
  const cached = container.__triadScene;
  if (cached && cached.el.isConnected) return cached;

  const el = document.createElement('div');
  el.className = 's2o s2o-triadscene';

  const stage = document.createElement('div');
  stage.className = 's2o-triad';
  const triad = buildTriad(stage);

  // The discovery slide's travel layer, part of the persistent scene: the
  // fish's traced legs, the held-unconsumed ring, the three goods. World
  // mode keeps them hidden; discovery mode reveals and drives them.
  const svgNS = 'http://www.w3.org/2000/svg';
  const traceSvg = document.createElementNS(svgNS, 'svg');
  traceSvg.setAttribute('viewBox', '0 0 1920 1080');
  traceSvg.classList.add('s2o-triad__svg');
  const traces = [FISH_LEG_1, FISH_LEG_2].map((d, i) => {
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', d);
    path.classList.add('s2o-discovery__trace');
    path.dataset.leg = String(i + 1);
    traceSvg.appendChild(path);
    return path;
  });
  // Dash geometry for the draw-in, measured once the paths are laid out.
  requestAnimationFrame(() => {
    traces.forEach((p) => {
      const len = Math.ceil(p.getTotalLength());
      p.style.strokeDasharray = String(len);
      p.style.setProperty('--len', String(len));
    });
  });
  stage.appendChild(traceSvg);

  const holdRing = document.createElement('div');
  holdRing.className = 's2o-discovery__hold';
  stage.appendChild(holdRing);

  const goods = {
    fish: goodToken('fish'),
    sandals: goodToken('sandals'),
    grain: goodToken('grain')
  };
  Object.values(goods).forEach((g) => stage.appendChild(g));

  el.appendChild(stage);
  container.appendChild(el);
  const scene = { el, stage, triad, traces, holdRing, goods };
  container.__triadScene = scene;
  return scene;
}

// On a continuous exit the incoming slide adopts the scene; on a real exit
// the engine tears the container down — only the cache entry must go.
export function releaseTriadScene(container, continuous) {
  if (!container || continuous) return;
  delete container.__triadScene;
}
