import { Container, Graphics } from "pixi.js";

export class TimerSliderView extends Container {
  protected progress: Graphics | null = null;

  constructor() {
    super();
    const background = new Graphics();
    background.beginFill(0x000000);
    background.drawRect(0, 0, 500, 20);
    background.endFill();
    this.pivot.set(background.width / 2, background.height / 2);
    this.addChild(background);
  }

  setProgress(value: number) {
    if (this.progress) this.removeChild(this.progress);
    this.progress = new Graphics();
    this.progress.beginFill(0xff0000);
    this.progress.drawRect(0, 5, (value * 500) / 100, 10);
    this.progress.endFill();
    this.addChild(this.progress);
  }
}
