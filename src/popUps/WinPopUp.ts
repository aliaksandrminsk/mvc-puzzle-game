import { Text } from "pixi.js";
import { BasePopUp } from "./BasePopUp";

export class WinPopUp extends BasePopUp {
  constructor() {
    super();

    //** Create PopUp background.
    this.popUpBackground.beginFill(0xff9ff9);
    this.popUpBackground.lineStyle(2, 0x000000);
    this.popUpBackground.drawCircle(0, 0, 200);

    //** Create title.
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
    console.log("Destroy win popUp!");
  }
}
