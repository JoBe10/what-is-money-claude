// Speaker-notes overlay (N to toggle). Stretch: pop into separate window for second monitor.
// Notes window sync uses BroadcastChannel when available, falling back to nothing.

const CHANNEL_NAME = 'what-is-money-deck-notes';

export class NotesOverlay {
  constructor(root) {
    this.root = root;
    this.slide = null;
    this.channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(CHANNEL_NAME) : null;
    this._build();
  }

  _build() {
    this.el = document.createElement('div');
    this.el.className = 'notes-overlay';
    this.el.innerHTML = `
      <div class="notes-card">
        <div class="notes-card__kicker" data-role="kicker">SPEAKER NOTES</div>
        <div class="notes-card__title" data-role="title"></div>
        <div class="notes-card__body" data-role="body"></div>
        <div class="notes-card__footer">
          <span data-role="meta"></span>
          <div class="notes-card__footer-actions">
            <button class="notes-card__pop-btn" type="button" data-role="copy-url">Copy slide URL</button>
            <button class="notes-card__pop-btn" type="button" data-role="pop">Open in second window ↗</button>
          </div>
        </div>
      </div>`;
    this.root.appendChild(this.el);
    this.kicker = this.el.querySelector('[data-role="kicker"]');
    this.title = this.el.querySelector('[data-role="title"]');
    this.body = this.el.querySelector('[data-role="body"]');
    this.meta = this.el.querySelector('[data-role="meta"]');
    this.popBtn = this.el.querySelector('[data-role="pop"]');
    this.copyUrlBtn = this.el.querySelector('[data-role="copy-url"]');
    this.popBtn.addEventListener('click', () => this._openNotesWindow());
    this.copyUrlBtn.addEventListener('click', () => this._copySlideUrl());
    // Click outside the card closes the overlay.
    this.el.addEventListener('click', (e) => {
      if (e.target === this.el) this.close();
    });
  }

  async _copySlideUrl() {
    const original = this.copyUrlBtn.textContent;
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.copyUrlBtn.textContent = 'Copied ✓';
    } catch (_) {
      // Fallback: select-and-copy via a temporary input. Rare in modern browsers.
      this.copyUrlBtn.textContent = 'Copy failed';
    }
    setTimeout(() => { this.copyUrlBtn.textContent = original; }, 1400);
  }

  // `deckNumber` is the slide's current position in the deck (1-based) — the
  // engine passes its own index so we never depend on `slide.number`, which
  // drifts whenever slides are inserted/removed without renumbering every file.
  setSlide(slide, deckNumber = null) {
    if (!slide) return;
    const sectionLabel = (slide.section || '').toUpperCase();
    this.kicker.textContent = sectionLabel ? `SECTION · ${sectionLabel}` : 'SPEAKER NOTES';
    this.title.textContent = slide.title || '';
    this.body.textContent = slide.notes || '(no notes for this slide)';
    // The body scrolls (long notes). Reset to the top so a new slide never opens
    // part-way down the previous slide's scroll offset.
    this.body.scrollTop = 0;
    const n = deckNumber ?? slide.number;
    this.meta.textContent = `SLIDE ${String(n ?? '').padStart(2, '0')}`;
    this.slide = {
      title: slide.title,
      notes: slide.notes,
      number: n,
      section: slide.section
    };
    // Broadcast for any open notes window.
    this.channel?.postMessage({
      type: 'slide',
      ...this.slide
    });
  }

  isOpen() { return this.el.getAttribute('data-open') === 'true'; }
  open() { this.el.setAttribute('data-open', 'true'); }
  close() { this.el.setAttribute('data-open', 'false'); }
  toggle() { this.isOpen() ? this.close() : this.open(); }

  _openNotesWindow() {
    // Open a stripped-down notes-only window. Re-broadcast current slide on load.
    const w = window.open('', 'deck-notes', 'width=720,height=900');
    if (!w) return;
    w.document.title = 'Speaker Notes';
    w.document.body.style.cssText = `
      margin: 0; padding: 40px 48px; background: #000; color: #fff;
      font-family: Inter, system-ui, sans-serif; line-height: 1.65; font-size: 16px;`;
    w.document.body.innerHTML = `
      <div id="k" style="color:#F7931A;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin-bottom:14px;"></div>
      <h1 id="t" style="font-weight:600;font-size:24px;letter-spacing:-0.02em;margin:0 0 24px 0;"></h1>
      <pre id="b" style="white-space:pre-wrap;font-family:inherit;color:rgba(255,255,255,0.75);margin:0;"></pre>`;
    const apply = (slide) => {
      if (!slide) return;
      w.document.getElementById('k').textContent =
        `SECTION · ${(slide.section || '').toUpperCase()}   ·   SLIDE ${String(slide.number ?? '').padStart(2, '0')}`;
      w.document.getElementById('t').textContent = slide.title || '';
      w.document.getElementById('b').textContent = slide.notes || '';
    };
    apply(this.slide);
    if (this.channel) {
      const ch = new w.BroadcastChannel(CHANNEL_NAME);
      ch.onmessage = (e) => apply(e.data);
    }
  }
}
