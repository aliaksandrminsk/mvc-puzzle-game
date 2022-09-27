//import * as utils from "@pixi/utils";
import { Container, Graphics } from "pixi.js";
import { gameConstants } from "../GameConstants";

export abstract class BasePopUp extends Container {
  public container: Container;
  public content: Container;
  public popUpBackground: Graphics;

  protected constructor() {
    super();

    this.container = new Container();
    this.content = new Container();
    this.createScreenBackground();
    this.container.addChild(this.content);

    //** Create PopUp background.
    this.popUpBackground = new Graphics();
    this.content.addChild(this.popUpBackground);
    this.content.position.set(
      gameConstants.GAME_AREA_SIZE_L / 2,
      gameConstants.GAME_AREA_SIZE_S / 2
    );
  }

  createScreenBackground() {
    const graphics = new Graphics();
    graphics.beginFill(0x000000);
    graphics.drawRect(
      0,
      0,
      gameConstants.GAME_AREA_SIZE_L,
      gameConstants.GAME_AREA_SIZE_S
    );
    graphics.alpha = 0.2;
    this.container.addChild(graphics);
  }

  show() {
    this.addChild(this.container);
  }

  hide() {
    this.removeChild(this.container);
  }

  abstract destroy(): void;
}
