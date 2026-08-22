import { KeyboardController } from './KeyboardController.js';
import { TouchController } from './TouchController.js';
import { NotesOverlay } from './NotesOverlay.js';
import { OverviewGrid } from './OverviewGrid.js';

const CANVAS_W = 1920;
const CANVAS_H = 1080;
// The standard boundary is a ~300ms crossfade (R2.2 §B): the outgoing slide
// dissolves while the incoming rises over it — never through black. Black is
// a beat, not a seam: darkness on screen only ever comes from a slide that
// authored it (the cold open, 2.1's build 0), never from navigation.
const CROSSFADE_MS = 300;
const IDLE_HIDE_MS = 2000;
const URL_WRITE_DEBOUNCE_MS = 100;
const SESSION_STORAGE_KEY = 'deck-state';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export class SlideEngine {
  constructor({ root, slides, sections }) {
    this.root = root;
    this.slides = slides;
    this.sections = sections;
    this.transitioning = false;
    this.activeContainer = null;
    this.activeSlideId = null;
    this.jumpBuffer = '';
    this.jumpMode = false;
    this.idleTimer = null;
    this._urlWriteTimer = null;

    // Initial state — URL takes precedence over sessionStorage. sessionStorage
    // is a safety net for HMR reloads where the URL is still authoritative but
    // we also want to recover the in-slide build step.
    const initial = this._determineInitialState();
    this.index = initial.slideIndex;
    this.buildStep = 0;          // start at 0; restored to initial.buildStep after render
    this._pendingBuildStep = initial.buildStep;

    this._mount();
  }

  _mount() {
    this.root.innerHTML = '';
    this.shell = document.createElement('div');
    this.shell.className = 'deck-shell';

    this.canvas = document.createElement('div');
    this.canvas.className = 'deck-canvas';
    this.shell.appendChild(this.canvas);

    // UI chrome — slide counter + thin progress bar at viewport bottom.
    this.chrome = document.createElement('div');
    this.chrome.className = 'deck-chrome';

    this.counter = document.createElement('div');
    this.counter.className = 'deck-counter';
    this.chrome.appendChild(this.counter);

    const progress = document.createElement('div');
    progress.className = 'deck-progress';
    this.progressFill = document.createElement('div');
    this.progressFill.className = 'deck-progress__fill';
    progress.appendChild(this.progressFill);
    this.chrome.appendChild(progress);

    // Fullscreen toggle — only rendered where the Fullscreen API is usable
    // (iOS Safari doesn’t support it for non-video elements, so the button is
    // omitted there rather than shown as a dead control). Lives in the chrome
    // so it fades with the slide counter on idle.
    if (document.documentElement.requestFullscreen) {
      this.fullscreenBtn = document.createElement('button');
      this.fullscreenBtn.type = 'button';
      this.fullscreenBtn.className = 'deck-fullscreen-btn';
      this.fullscreenBtn.setAttribute('aria-label', 'Toggle fullscreen');
      this.fullscreenBtn.innerHTML = '<i class="ti ti-maximize"></i>';
      this.fullscreenBtn.addEventListener('click', () => this._toggleFullscreen());
      this.chrome.appendChild(this.fullscreenBtn);
      document.addEventListener('fullscreenchange', () => {
        const icon = document.fullscreenElement ? 'ti-minimize' : 'ti-maximize';
        this.fullscreenBtn.innerHTML = `<i class="ti ${icon}"></i>`;
      });
    }

    this.jumpIndicator = document.createElement('div');
    this.jumpIndicator.className = 'jump-indicator';
    this.jumpIndicator.textContent = 'Jump to —';

    this.root.appendChild(this.shell);
    this.root.appendChild(this.chrome);
    this.root.appendChild(this.jumpIndicator);

    this.notes = new NotesOverlay(this.root);
    this.overview = new OverviewGrid(this.root, this.slides, this.sections, (i) => {
      this.overview.close();
      this.goTo(i);
    });
    this.help = this._buildHelp();
  }

  _buildHelp() {
    const el = document.createElement('div');
    el.className = 'help-overlay';
    el.innerHTML = `
      <div class="help-card">
        <div class="help-card__title">Keyboard Shortcuts</div>
        ${this._helpRow('→ / Space', 'Next build step or slide')}
        ${this._helpRow('←', 'Previous build step or slide')}
        ${this._helpRow('↓', 'Force next build step')}
        ${this._helpRow('↑', 'Force previous build step')}
        ${this._helpRow('Esc', 'Toggle overview grid')}
        ${this._helpRow('F', 'Toggle fullscreen')}
        ${this._helpRow('N', 'Toggle speaker notes')}
        ${this._helpRow('?', 'This help overlay')}
        ${this._helpRow('g  digits  ⏎', 'Jump to slide number')}
      </div>`;
    this.root.appendChild(el);
    return {
      el,
      toggle: () => el.setAttribute('data-open', el.getAttribute('data-open') === 'true' ? 'false' : 'true'),
      close: () => el.setAttribute('data-open', 'false')
    };
  }

  _helpRow(keys, label) {
    return `<div class="help-card__row"><span class="help-card__keys">${keys}</span><span>${label}</span></div>`;
  }

  start() {
    this._installResize();
    this._installIdle();
    this._installKeyboard();
    this._installTouch();
    this._installHashChange();
    this._resize();
    this._render(this.index, {
      initial: true,
      targetBuildStep: this._pendingBuildStep
    });
    this._pendingBuildStep = 0;
    this._showChrome();
  }

  // Honor manual hash edits in the URL bar — `#14` or `#2-08-the-pattern`.
  // Query-param edits still need a reload (no input event fires for the search string).
  _installHashChange() {
    window.addEventListener('hashchange', () => {
      const idx = this._readSlideFromUrl();
      if (idx != null && idx !== this.index) this.goTo(idx);
    });
  }

  _installResize() {
    const onResize = () => this._resize();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
  }

  _resize() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Letterbox by scaling to fit; the 16:9 canvas keeps its aspect.
    const scale = Math.min(vw / CANVAS_W, vh / CANVAS_H);
    this.canvas.style.transform = `translate(-50%, -50%) scale(${scale})`;
    this.canvas.style.left = '50%';
    this.canvas.style.top = '50%';
    this.canvas.style.position = 'absolute';
  }

  _installIdle() {
    const reveal = () => {
      this._showChrome();
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => this._hideChrome(), IDLE_HIDE_MS);
    };
    window.addEventListener('mousemove', reveal);
    window.addEventListener('keydown', reveal);
    // Touch input also wakes the chrome — it then fades after the same idle delay.
    window.addEventListener('touchstart', reveal, { passive: true });
    reveal();
  }

  _installTouch() {
    this.touch = new TouchController({
      onNext: () => this.advance(),
      onPrev: () => this.retreat(),
      // Suppress tap/swipe navigation while any overlay owns the screen.
      isBlocked: () => (
        this.notes.isOpen() ||
        this.overview.isOpen() ||
        this.help.el.getAttribute('data-open') === 'true'
      )
    });
  }

  _showChrome() { this.chrome.setAttribute('data-hidden', 'false'); }
  _hideChrome() { this.chrome.setAttribute('data-hidden', 'true'); }

  _installKeyboard() {
    this.keyboard = new KeyboardController({
      onNext: () => this.advance(),
      onPrev: () => this.retreat(),
      onForceNextStep: () => this.advanceStep(true),
      onForcePrevStep: () => this.retreatStep(true),
      onToggleOverview: () => this.overview.toggle(this.index),
      onToggleFullscreen: () => this._toggleFullscreen(),
      onToggleNotes: () => this.notes.toggle(),
      onToggleHelp: () => this.help.toggle(),
      onJump: (n) => this.goTo(n - 1),
      onShowJumpIndicator: (buf) => this._setJumpIndicator(buf),
      onHideJumpIndicator: () => this._setJumpIndicator(null),
      onCloseAllOverlays: () => this._closeOverlays()
    });
  }

  _setJumpIndicator(buf) {
    if (buf == null || buf === '') {
      this.jumpIndicator.setAttribute('data-open', 'false');
    } else {
      this.jumpIndicator.textContent = `Jump to — ${buf}`;
      this.jumpIndicator.setAttribute('data-open', 'true');
    }
  }

  _closeOverlays() {
    let closed = false;
    if (this.notes.isOpen()) { this.notes.close(); closed = true; }
    if (this.overview.isOpen()) { this.overview.close(); closed = true; }
    if (this.help.el.getAttribute('data-open') === 'true') { this.help.close(); closed = true; }
    return closed;
  }

  _toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  // ----- Navigation -----

  advance() {
    if (this.transitioning) return;
    const slide = this.slides[this.index];
    if (slide && this.buildStep < (slide.totalBuildSteps || 0)) {
      this.advanceStep();
      return;
    }
    if (this.index < this.slides.length - 1) {
      this._render(this.index + 1, { direction: 'forward' });
    }
  }

  retreat() {
    if (this.transitioning) return;
    if (this.buildStep > 0) {
      this.retreatStep();
      return;
    }
    if (this.index > 0) {
      // Within a scene group (R2.1 §A), ← hands the shared scene off in
      // reverse — restoring the previous slide's end state, the stage of
      // the scene the viewer just came from. A slide's build-0 birth state
      // (often black) is never a valid landing inside a continuous scene.
      // Outside groups the deck-wide convention is unchanged: ← enters the
      // previous slide at build 0 (↑ remains the jump-to-end key).
      const current = this.slides[this.index];
      const prev = this.slides[this.index - 1];
      const withinGroup = Boolean(
        current && prev && current.sceneGroup &&
        current.sceneGroup === prev.sceneGroup
      );
      this._render(this.index - 1, { direction: 'backward', jumpToEnd: withinGroup });
    }
  }

  advanceStep(force = false) {
    const slide = this.slides[this.index];
    if (!slide) return;
    const max = slide.totalBuildSteps || 0;
    if (this.buildStep < max) {
      this.buildStep += 1;
      slide.buildStep?.(this.buildStep);
      this._persistState();
    } else if (force && this.index < this.slides.length - 1) {
      // ↓ at end of slide hops to next slide.
      this._render(this.index + 1, { direction: 'forward' });
    }
  }

  retreatStep(force = false) {
    const slide = this.slides[this.index];
    if (!slide) return;
    if (this.buildStep > 0) {
      this.buildStep -= 1;
      slide.buildStep?.(this.buildStep);
      this._persistState();
    } else if (force && this.index > 0) {
      this._render(this.index - 1, { direction: 'backward', jumpToEnd: true });
    }
  }

  goTo(targetIndex) {
    if (this.transitioning) return;
    if (targetIndex < 0 || targetIndex >= this.slides.length) return;
    if (targetIndex === this.index) return;
    const direction = targetIndex > this.index ? 'forward' : 'backward';
    this._render(targetIndex, { direction });
  }

  // ----- Rendering / transitions -----

  async _render(targetIndex, { direction = 'forward', initial = false, jumpToEnd = false, targetBuildStep = 0 } = {}) {
    const next = this.slides[targetIndex];
    if (!next) return;

    const current = this.slides[this.index];
    const isContinuous = !initial && this._isContinuousTransition(current, next, direction);
    const maxBuildStep = next.totalBuildSteps || 0;
    const resolvedBuildStep = jumpToEnd
      ? maxBuildStep
      : targetBuildStep > 0 && targetBuildStep <= maxBuildStep
        ? targetBuildStep
        : 0;

    this.transitioning = true;
    try {
      if (isContinuous) {
        // Shared-DOM transition: a `continuesFrom` chain or a within-group
        // handoff (R2.1 §A). No fade to black, no unmount — the incoming
        // slide adopts the container (and any scene layer cached on it) and
        // animates from its current state; only slide-local overlays
        // transition. Works identically in both directions.
        current?.onExit?.({ continuous: true, direction, container: this.activeContainer });
        if (this.activeContainer) this.activeContainer.dataset.slideId = next.id;
        this.activeSlideId = next.id;
        this.index = targetIndex;
        this.buildStep = 0;
        next.onEnter?.({
          continuous: true,
          direction,
          container: this.activeContainer,
          fromId: current?.id,
          targetBuildStep: resolvedBuildStep
        });
        if (resolvedBuildStep > 0) {
          this.buildStep = resolvedBuildStep;
          next.buildStep?.(resolvedBuildStep);
        }
      } else {
        // Standard transition (R2.2 §B): mount the incoming slide over the
        // outgoing one and crossfade — the outgoing dissolves as the incoming
        // rises, with no black frame between. The outgoing slide is torn down
        // only after the fade, so its last frame is what dissolves. Reduced
        // motion: an instant cut.
        const outgoing = !initial ? this.activeContainer : null;
        const outgoingSlide = !initial ? current : null;
        const container = document.createElement('div');
        container.className = 'deck-slide';
        container.dataset.slideId = next.id;
        this.canvas.appendChild(container);
        next.render(container);
        this.activeContainer = container;
        this.activeSlideId = next.id;
        this.index = targetIndex;
        this.buildStep = 0;
        // Force layout before transition.
        // eslint-disable-next-line no-unused-expressions
        container.offsetHeight;
        container.setAttribute('data-active', 'true');
        // The incoming slide's entrance runs concurrent with the crossfade —
        // onEnter fires as the fade starts, so a slide that choreographs its
        // own arrival (the section openers' animate-in) rises while the
        // outgoing dissolves instead of leaving a dark window after it.
        next.onEnter?.({
          continuous: false,
          direction,
          container,
          targetBuildStep: resolvedBuildStep
        });
        if (resolvedBuildStep > 0) {
          this.buildStep = resolvedBuildStep;
          next.buildStep?.(resolvedBuildStep);
        }
        await this._crossfade(outgoing, container);
        if (outgoingSlide) {
          outgoingSlide.onExit?.({ continuous: false, direction, container: outgoing });
        }
        outgoing?.remove();
      }
      this._updateChrome();
      this._persistState();
      this.notes.setSlide(next, this.index + 1);
    } finally {
      this.transitioning = false;
    }
  }

  _isContinuousTransition(current, next, direction) {
    if (!current || !next) return false;
    // Continuity groups (R2.1 §A): slides declaring the same `sceneGroup`
    // share one continuous visualization. At a within-group boundary the
    // engine performs a handoff instead of the teardown → fade → mount
    // transition, in both directions. Direct entry and refresh never take
    // this path (`initial` guards the call site), so any group slide still
    // reconstructs its full scene state from scratch when mounted cold.
    if (current.sceneGroup && current.sceneGroup === next.sceneGroup) return true;
    if (direction === 'forward' && next.continuesFrom === current.id) return true;
    if (direction === 'backward' && current.continuesFrom === next.id) return true;
    return false;
  }

  // One gesture, two layers: the incoming slide rises (opacity + a slight
  // settle of scale) while the outgoing dissolves in place beneath it. On
  // the initial mount there is no outgoing layer — the deck simply fades in.
  // Reduced motion: both layers snap — an instant cut, no crossfade.
  _crossfade(outgoing, incoming) {
    if (prefersReducedMotion()) {
      incoming.style.opacity = '1';
      incoming.style.transform = 'scale(1)';
      if (outgoing) outgoing.style.opacity = '0';
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      incoming.style.transition = `opacity ${CROSSFADE_MS}ms ease-out, transform ${CROSSFADE_MS}ms ease-out`;
      incoming.style.opacity = '0';
      incoming.style.transform = 'scale(0.985)';
      if (outgoing) {
        outgoing.style.transition = `opacity ${CROSSFADE_MS}ms ease-out`;
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          incoming.style.opacity = '1';
          incoming.style.transform = 'scale(1)';
          if (outgoing) outgoing.style.opacity = '0';
          setTimeout(resolve, CROSSFADE_MS);
        });
      });
    });
  }

  _updateChrome() {
    const total = this.slides.length;
    const n = this.index + 1;
    const pad = String(total).length;
    this.counter.textContent = `${String(n).padStart(pad, '0')} / ${String(total).padStart(pad, '0')}`;
    const pct = ((this.index + 1) / total) * 100;
    this.progressFill.style.width = `${pct}%`;
  }

  // ----- Persistence: URL + sessionStorage -----

  // Resolves the initial slide index + build step from URL (query > hash) and
  // sessionStorage. URL wins; sessionStorage supplies the build step when it
  // matches the URL slide, otherwise it’s a fallback for the slide too.
  _determineInitialState() {
    const fromUrl = this._readSlideFromUrl();
    const fromStorage = this._readSessionStorage();

    if (fromUrl != null) {
      let buildStep = 0;
      if (fromStorage && fromStorage.slideIndex === fromUrl) {
        buildStep = fromStorage.buildStep || 0;
      }
      return { slideIndex: fromUrl, buildStep };
    }
    if (fromStorage) {
      return { slideIndex: fromStorage.slideIndex, buildStep: fromStorage.buildStep || 0 };
    }
    return { slideIndex: 0, buildStep: 0 };
  }

  // Accepts:
  //   ?slide=14                       → 1-based slide number
  //   ?slide=2-08-the-pattern         → matches against slide.id
  //   #14 / #2-08-the-pattern         → same forms via hash
  // Query parameter wins if both are present.
  _readSlideFromUrl() {
    const url = new URL(window.location.href);
    let token = url.searchParams.get('slide');
    if (!token && url.hash) token = url.hash.replace(/^#/, '');
    if (!token) return null;

    // Numeric: 1-based slide number.
    if (/^\d+$/.test(token)) {
      const n = parseInt(token, 10);
      if (n >= 1 && n <= this.slides.length) return n - 1;
      return null;
    }

    // Otherwise treat as slide id (exact match).
    const idx = this.slides.findIndex((s) => s.id === token);
    return idx >= 0 ? idx : null;
  }

  _readSessionStorage() {
    try {
      const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (typeof parsed.slideIndex !== 'number') return null;
      if (parsed.slideIndex < 0 || parsed.slideIndex >= this.slides.length) return null;
      return parsed;
    } catch (_) {
      return null;
    }
  }

  // Persist both URL (debounced) and sessionStorage (immediate). Called on every
  // slide change AND every build-step change so HMR can restore the in-slide state.
  _persistState() {
    this._writeSessionStorage();
    this._scheduleUrlWrite();
  }

  _writeSessionStorage() {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
        slideIndex: this.index,
        buildStep: this.buildStep
      }));
    } catch (_) { /* sessionStorage may be unavailable; ignore */ }
  }

  _scheduleUrlWrite() {
    clearTimeout(this._urlWriteTimer);
    this._urlWriteTimer = setTimeout(() => this._writeUrl(), URL_WRITE_DEBOUNCE_MS);
  }

  _writeUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set('slide', String(this.index + 1));
    // Strip the hash so a stale `#14` doesn’t shadow the query param after we
    // navigated past it.
    url.hash = '';
    history.replaceState(null, '', url.toString());
  }
}
