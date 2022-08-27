import { Graphics, Text } from "pixi.js";
import { ModalWindow } from "./ModalWindow";

export class WinWindow extends ModalWindow {
  constructor() {
    super();

    const windowBackground = new Graphics();
    windowBackground.beginFill(0xffff00);
    windowBackground.lineStyle(5, 0xff0000);
    windowBackground.drawRect(0, 0, 300, 200);
    windowBackground.pivot.set(150, 100);
    this.content.addChild(windowBackground);

    const title = new Text("Nice work", {
      fontFamily: "Arial",
      fontSize: 36,
      fill: 0xff1010,
      align: "center",
    });
    title.anchor.set(0.5);
    title.position.set(0, -80);
    this.content.addChild(title);
  }
}
