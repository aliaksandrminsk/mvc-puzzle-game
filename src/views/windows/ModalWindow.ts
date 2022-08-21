import * as utils from "@pixi/utils";
import { Container, Graphics } from "pixi.js";

export class ModalWindow extends utils.EventEmitter {
  public view: Container;
  public content: Container;

  constructor() {
    super();
    this.view = new Container();
    this.content = new Container();
    this.createWindowBackground();
    this.view.addChild(this.content);
  }

  createWindowBackground() {
    const graphics = new Graphics();
    graphics.beginFill(0x000000);
    graphics.drawRect(0, 0, window.innerWidth, window.innerHeight);
    graphics.alpha = 0.2;
    graphics.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
    graphics.interactive = true;
    this.view.addChild(graphics);
  }

  destroy() {
    console.log("destroy");
  }
}
