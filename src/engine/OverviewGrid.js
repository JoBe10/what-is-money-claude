// Esc-toggled grid of slide tiles. v1 shows static labels — live thumbnails would be
// pricey to keep in sync, and the labels alone are enough for navigation.

export class OverviewGrid {
  constructor(root, slides, sections, onSelect) {
    this.root = root;
    this.slides = slides;
    this.sections = sections;
    this.onSelect = onSelect;
    this._build();
  }

  _build() {
    this.el = document.createElement('div');
    this.el.className = 'overview-grid';

    const header = document.createElement('div');
    header.className = 'overview-grid__header';
    header.innerHTML = `
      <span>OVERVIEW · ${this.slides.length} SLIDES</span>
      <span>Esc to close · Click to jump</span>`;
    this.el.appendChild(header);

    const tiles = document.createElement('div');
    tiles.className = 'overview-grid__tiles';
    this.tileEls = this.slides.map((slide, i) => {
      const tile = document.createElement('div');
      tile.className = 'overview-tile';
      tile.innerHTML = `
        <div class="overview-tile__index">${String(i + 1).padStart(2, '0')}</div>
        <div class="overview-tile__section">${(slide.section || '').toUpperCase()}</div>
        <div class="overview-tile__label">${slide.title || '(untitled)'}</div>`;
      tile.addEventListener('click', () => this.onSelect(i));
      tiles.appendChild(tile);
      return tile;
    });
    this.el.appendChild(tiles);
    this.root.appendChild(this.el);
  }

  isOpen() { return this.el.getAttribute('data-open') === 'true'; }

  open(currentIndex = 0) {
    this.tileEls.forEach((t, i) => {
      t.setAttribute('data-current', i === currentIndex ? 'true' : 'false');
    });
    this.el.setAttribute('data-open', 'true');
  }

  close() { this.el.setAttribute('data-open', 'false'); }

  toggle(currentIndex = 0) {
    this.isOpen() ? this.close() : this.open(currentIndex);
  }
}
