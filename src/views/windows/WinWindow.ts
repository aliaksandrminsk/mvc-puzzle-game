import { Graphics, Text } from "pixi.js";
import { ModalWindow } from "./ModalWindow";
import { constants } from "../../constants";

export class WinWindow extends ModalWindow {
  constructor() {
    super();

    const windowBackground = new Graphics();
    windowBackground.beginFill(0xff9ff9);
    windowBackground.lineStyle(2, 0x000000);
    windowBackground.drawCircle(0, 0, 200);
    this.content.addChild(windowBackground);
    this.content.position.set(
      constants.GAME_AREA_SIZE_L / 2,
      constants.GAME_AREA_SIZE_S / 2
    );

    const title = new Text("Nice\n work", {
      fontFamily: "Arial",
      fontSize: 100,
      fill: 0x001010,
      align: "center",
      fontWeight: "800",
    });
    title.pivot.set(title.width / 2, title.height / 2);
    title.position.set(0, 0);
    this.content.addChild(title);
  }
  destroy() {
    console.log("Destroy WinWindow!");
  }
}
