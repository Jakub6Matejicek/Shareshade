export default class ShareShade {
  constructor(options) {
    if (!options || !options.selector || !options.background) {
      throw new Error('ShareShade requires "selector" and "background" options.');
    }

    this.selector = options.selector;
    this.background = options.background;
    this.opacity = options.opacity || 1;
    this.className = 'shareshade-overlay';

    this.injectStyle();

    this._resizeHandler = () => this.update(this.background);
    window.addEventListener('resize', this._resizeHandler);

    this.update(this.background);
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

  update(styles) {
    if (!styles) return;

    const elements = document.querySelectorAll(this.selector);
    if (!elements.length) return;

    let minTop = Infinity, minLeft = Infinity, maxRight = -Infinity, maxBottom = -Infinity;

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

    const boundingWidth = maxRight - minLeft;
    const boundingHeight = maxBottom - minTop;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const left = rect.left + window.scrollX;

      const overlay = document.createElement('div');
      overlay.className = this.className;
      overlay.style.position = 'absolute';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '-1';
      overlay.style.backgroundImage = this.background.startsWith('url') ? `url("${this.background}")` : this.background;
      overlay.style.backgroundSize = `${boundingWidth}px ${boundingHeight}px`;
      overlay.style.backgroundRepeat = 'no-repeat';
      overlay.style.backgroundPosition = `-${left - minLeft}px -${top - minTop}px`;
      overlay.style.opacity = this.opacity;

      const computedStyle = getComputedStyle(el);
      const isAbs = computedStyle.position === 'absolute';

      if (isAbs) {
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
      } else {
        if (computedStyle.position === 'static') {
          el.style.position = 'relative';
        }
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
      }

      const old = el.querySelector(`.${this.className}`);
      if (old) old.remove();

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
