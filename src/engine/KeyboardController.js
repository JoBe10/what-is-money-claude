// Translates raw keyboard events into deck-level actions.
// Handles the `g <digits> Enter` jump sequence; everything else is a single keybinding.

export class KeyboardController {
  constructor(handlers) {
    this.h = handlers;
    this.jumpBuffer = null; // null when not in jump mode; string of digits otherwise.
    window.addEventListener('keydown', (e) => this._handle(e));
  }

  _handle(e) {
    // Ignore key events while typing into inputs (defensive; deck has none today).
    const target = e.target;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
      return;
    }

    // Jump-buffer mode: digits accumulate, Enter commits, Escape cancels.
    if (this.jumpBuffer !== null) {
      if (e.key === 'Enter') {
        const n = parseInt(this.jumpBuffer, 10);
        this.jumpBuffer = null;
        this.h.onHideJumpIndicator?.();
        if (!Number.isNaN(n) && n > 0) this.h.onJump?.(n);
        e.preventDefault();
        return;
      }
      if (e.key === 'Escape') {
        this.jumpBuffer = null;
        this.h.onHideJumpIndicator?.();
        e.preventDefault();
        return;
      }
      if (/^[0-9]$/.test(e.key)) {
        this.jumpBuffer += e.key;
        this.h.onShowJumpIndicator?.(this.jumpBuffer);
        e.preventDefault();
        return;
      }
      // Any other key cancels jump mode and falls through.
      this.jumpBuffer = null;
      this.h.onHideJumpIndicator?.();
    }

    switch (e.key) {
      case 'ArrowRight':
      case ' ': // Space
      case 'PageDown':
        this.h.onNext?.();
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        this.h.onPrev?.();
        e.preventDefault();
        break;
      case 'ArrowDown':
        this.h.onForceNextStep?.();
        e.preventDefault();
        break;
      case 'ArrowUp':
        this.h.onForcePrevStep?.();
        e.preventDefault();
        break;
      case 'Escape':
        if (!this.h.onCloseAllOverlays?.()) {
          this.h.onToggleOverview?.();
        }
        e.preventDefault();
        break;
      case 'f':
      case 'F':
        this.h.onToggleFullscreen?.();
        e.preventDefault();
        break;
      case 'n':
      case 'N':
        this.h.onToggleNotes?.();
        e.preventDefault();
        break;
      case '?':
        this.h.onToggleHelp?.();
        e.preventDefault();
        break;
      case 'g':
      case 'G':
        // Begin a jump sequence.
        this.jumpBuffer = '';
        this.h.onShowJumpIndicator?.('');
        e.preventDefault();
        break;
      default:
        break;
    }
  }
}
