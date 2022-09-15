import { Container, Graphics } from "pixi.js";

export class TimerSlider extends Container {
  protected progress: Graphics | null = null;
  protected interval: ReturnType<typeof setInterval> | null = null;

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

  start(duration: number) {
    const endTime = Date.now() + duration;
    this.interval = setInterval(() => {
      const millis = endTime - Date.now();
      let value = (100 * millis) / duration;
      if (millis < 0) value = 0;
      this.setProgress(value);
    }, 100);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
  }

  reset() {
    this.setProgress(100);
  }
}
