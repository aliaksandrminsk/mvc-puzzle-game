import { Text } from "pixi.js";
import { ModalWindow } from "./ModalWindow";
import { Button } from "../Button";
import { ModalViewEvent } from "../../events/ModalViewEvent";

export class LosingWindow extends ModalWindow {
  button: Button;
  boundButtonUp = () => this.buttonUpHandler();

  constructor() {
    super();

    //** Create PopUp background.
    this.popUpBackground.beginFill(0xff9ff9);
    this.popUpBackground.lineStyle(2, 0x000000);
    this.popUpBackground.drawCircle(0, 0, 200);

    //** Create title.
    const title = new Text("Failed", {
      fontFamily: "Arial",
      fontSize: 100,
      fill: 0x001010,
      align: "center",
      fontWeight: "800",
    });
    title.pivot.set(title.width / 2, title.height / 2);
    title.position.set(0, 0);
    this.content.addChild(title);

    //Create button.
    this.button = new Button("Try again!");
    this.button.position.set(0, 275);
    this.content.addChild(this.button);
    this.button.interactive = true;
    this.button.on("pointerup", this.boundButtonUp);
  }

  //** Handler of click to button.
  buttonUpHandler() {
    this.emit(ModalViewEvent.BUTTON_CLICKED);
  }

  destroy() {
    this.button.destroy();
    this.button.removeListener("pointerup", this.boundButtonUp);
  }
}
