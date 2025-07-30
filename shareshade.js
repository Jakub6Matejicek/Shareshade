export default class ShareShade {
  constructor(options) {
    if (!options || !options.selector || !options.background) {
      throw new Error('ShareShade requires "selector" and "background" options.');
    }

    this.selector = options.selector;
    this.background = options.background;
    this.opacity = options.opacity ?? 1;
    this.className = 'shareshade-overlay';

    this._resizeHandler = () => this.update();
    window.addEventListener('resize', this._resizeHandler);

    this.injectStyle();
    this.update();
  }

  injectStyle() {
    if (document.getElementById('__shareshade-style')) return;

    const style = document.createElement('style');
    style.id = '__shareshade-style';
    style.textContent = `
      .${this.className} {
        position: absolute;
        z-index: -1;
        pointer-events: none;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: inherit;
      }
    `;
    document.head.appendChild(style);
  }

  update() {
    const elements = document.querySelectorAll(this.selector);
    if (!elements.length) return;

    let minTop = Infinity;
    let minLeft = Infinity;
    let maxRight = -Infinity;
    let maxBottom = -Infinity;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const left = rect.left + window.scrollX;
      const right = left + rect.width;
      const bottom = top + rect.height;

      minTop = Math.min(minTop, top);
      minLeft = Math.min(minLeft, left);
      maxRight = Math.max(maxRight, right);
      maxBottom = Math.max(maxBottom, bottom);
    });

    const width = maxRight - minLeft;
    const height = maxBottom - minTop;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const left = rect.left + window.scrollX;

      const overlay = document.createElement('div');
      overlay.className = this.className;
      overlay.style.backgroundImage = this.background.startsWith('url')
        ? `url("${this.background}")`
        : this.background;
      overlay.style.backgroundSize = `${width}px ${height}px`;
      overlay.style.backgroundPosition = `-${left - minLeft}px -${top - minTop}px`;
      overlay.style.opacity = this.opacity;
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.right = '0';
      overlay.style.bottom = '0';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '-1';

      const computed = getComputedStyle(el);
      if (computed.position === 'static') el.style.position = 'relative';

      const existing = el.querySelector(`.${this.className}`);
      if (existing) existing.remove();

      el.appendChild(overlay);
    });
  }

  destroy() {
    window.removeEventListener('resize', this._resizeHandler);
    const elements = document.querySelectorAll(this.selector);
    elements.forEach(el => {
      const overlay = el.querySelector(`.${this.className}`);
      if (overlay) overlay.remove();
    });
  }
}
