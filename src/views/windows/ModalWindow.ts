import * as utils from "@pixi/utils";
import { Container, Graphics } from "pixi.js";
import { constants } from "../../constants";

export abstract class ModalWindow extends utils.EventEmitter {
  public view: Container;
  public content: Container;

  protected constructor() {
    super();
    this.view = new Container();
    this.content = new Container();
    this.createWindowBackground();
    this.view.addChild(this.content);
  }

  createWindowBackground() {
    const graphics = new Graphics();
    graphics.beginFill(0x000000);
    graphics.drawRect(
      0,
      0,
      constants.GAME_AREA_SIZE_L,
      constants.GAME_AREA_SIZE_S
    );
    graphics.alpha = 0.2;
    this.view.addChild(graphics);
  }

  abstract destroy(): void;
}
