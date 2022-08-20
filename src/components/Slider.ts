import { Container } from "pixi.js";

export class Slider extends Container {
  constructor() {
    super();
    const background = new PIXI.Graphics();
    background.beginFill(0x000000);
    background.drawRect(0, 0, 1000, 20);
    background.endFill();
    this.addChild(background);

    this.progress = new PIXI.Graphics();
    this.progress.beginFill(0xffffff);
    this.progress.drawRect(0, 0, 700, 50);
    this.progress.endFill();
    this.addChild(this.progress);
  }

  setProgress(percentage) {
    this.progress = new PIXI.Graphics();
    this.progress.beginFill(0xff0000);
    this.progress.drawRect(0, 0, 200, 50);
    this.progress.endFill();
    this.addChild(this.progress);
  }
}
