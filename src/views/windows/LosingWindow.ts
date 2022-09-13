import { Graphics, Text } from "pixi.js";
import { ModalWindow } from "./ModalWindow";
import { EventType } from "../../Event";
import { Button } from "../Button";

export class LosingWindow extends ModalWindow {
  button: Button;
  boundButtonUp = () => this.buttonUpHandler();

  constructor() {
    super();

    const windowBackground = new Graphics();
    windowBackground.beginFill(0xff9ff9);
    windowBackground.lineStyle(2, 0x000000);
    windowBackground.drawCircle(0, 0, 200);
    this.content.addChild(windowBackground);

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

    this.button = new Button("Try again!");
    this.button.position.set(0, 272);
    this.content.addChild(this.button);
    this.button.interactive = true;
    this.button.on("pointerup", this.boundButtonUp);
  }

  buttonUpHandler() {
    const event = new Event(EventType.START_GAME);
    window.dispatchEvent(event);
  }

  destroy() {
    this.button.destroy();
    this.button.removeListener("pointerup", this.boundButtonUp);
  }
}
