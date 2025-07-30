declare module 'shareshade' {
  interface ShareShadeOptions {
    selector: string;
    background: string;
    opacity?: number;
  }

  export default class ShareShade {
    constructor(options: ShareShadeOptions);
    update(): void;
    destroy(): void;
  }
}