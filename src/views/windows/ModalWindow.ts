import * as utils from "@pixi/utils";
import { Container, Graphics } from "pixi.js";
import { constants } from "../../constants";

export abstract class ModalWindow extends utils.EventEmitter {
  public view: Container;
  public content: Container;
  public popUpBackground: Graphics;

  protected constructor() {
    super();

    this.view = new Container();
    this.content = new Container();
    this.createScreenBackground();
    this.view.addChild(this.content);

    //** Create PopUp background.
    this.popUpBackground = new Graphics();
    this.content.addChild(this.popUpBackground);
    this.content.position.set(
      constants.GAME_AREA_SIZE_L / 2,
      constants.GAME_AREA_SIZE_S / 2
    );
  }

  createScreenBackground() {
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
