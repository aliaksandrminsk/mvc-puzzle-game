import { Text } from "pixi.js";
import { BasePopUp } from "./BasePopUp";
import { Button } from "../utils/Button";
import { globalEvent } from "@billjs/event-emitter";
import { GameEvents } from "../GameEvents";

export class LosingPopUp extends BasePopUp {
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
    //this.emit(ModalWindowViewEvent.BUTTON_CLICKED);
    globalEvent.fire(GameEvents.AGAIN_BUTTON_CLICKED);
  }

  destroy() {
    this.button.destroy();
    this.button.removeListener("pointerup", this.boundButtonUp);
  }
}
