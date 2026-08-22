// Translates touch gestures into deck navigation. The touch counterpart of
// KeyboardController — takes the same kind of handlers object and calls
// onNext / onPrev. Additive: desktop keyboard navigation is untouched.
//
// Two gesture types:
//   - Tap: a touch with little horizontal travel. The left third of the
//     viewport reverses; the right two-thirds advances (asymmetric on purpose —
//     most taps are "next").
//   - Swipe: a touch with ≥ SWIPE_THRESHOLD px of horizontal travel. Swipe left
//     advances, swipe right reverses. Vertical drift is ignored.

const SWIPE_THRESHOLD = 60;       // min horizontal px for a swipe
const DEBOUNCE_MS = 300;          // ignore further nav within this window
const TAP_LEFT_FRACTION = 1 / 3;  // left third of the viewport = previous
const VERTICAL_DRAG_MIN = 80;     // a drag this tall (and mostly vertical) is not navigation

export class TouchController {
  constructor(handlers) {
    this.h = handlers;
    this._lastNavTime = 0;
    this._startX = 0;
    this._startY = 0;
    this._ignoreGesture = false;
    this._install();
  }

  _install() {
    // Passive listeners — we never preventDefault here; interfering browser
    // gestures (zoom, double-tap, overscroll) are disabled via CSS touch-action.
    window.addEventListener('touchstart', (e) => this._onStart(e), { passive: true });
    window.addEventListener('touchend', (e) => this._onEnd(e), { passive: true });
  }

  _onStart(e) {
    // A multi-finger gesture (pinch / two-finger) is never navigation.
    this._ignoreGesture = e.touches.length > 1;
    const t = e.changedTouches[0];
    this._startX = t.clientX;
    this._startY = t.clientY;
  }

  _onEnd(e) {
    if (this._ignoreGesture) { this._ignoreGesture = false; return; }
    // Another finger is still down — wait for the final lift.
    if (e.touches.length > 0) return;

    const now = Date.now();
    if (now - this._lastNavTime < DEBOUNCE_MS) return;

    // While an overlay (notes / overview / help) is open, its own touch targets
    // own the interaction — don't navigate underneath it.
    if (this.h.isBlocked && this.h.isBlocked()) return;

    // A touch that began on a button / link (e.g. the fullscreen control) drives
    // that control, not slide navigation.
    if (_endedOnInteractive(e.target)) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - this._startX;
    const dy = t.clientY - this._startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // A deliberate vertical drag is neither a tap nor a horizontal swipe.
    if (absDy > VERTICAL_DRAG_MIN && absDy > absDx * 2) return;

    if (absDx >= SWIPE_THRESHOLD) {
      // Swipe — left advances, right reverses.
      if (dx < 0) this.h.onNext && this.h.onNext();
      else this.h.onPrev && this.h.onPrev();
    } else {
      // Tap — zone is decided by where the touch began.
      const fraction = this._startX / Math.max(1, window.innerWidth);
      if (fraction < TAP_LEFT_FRACTION) this.h.onPrev && this.h.onPrev();
      else this.h.onNext && this.h.onNext();
    }
    this._lastNavTime = now;
  }
}

// Walks a few levels up from the touch target looking for an interactive
// control. Used so taps on the fullscreen button don't also flip a slide.
function _endedOnInteractive(target) {
  let el = target;
  for (let i = 0; el && i < 8; i++) {
    const tag = el.tagName;
    if (tag === 'BUTTON' || tag === 'A') return true;
    el = el.parentElement;
  }
  return false;
}

export default TouchController;
