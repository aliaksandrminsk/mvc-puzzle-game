import { Graphics, Text } from "pixi.js";
import { ModalWindow } from "./ModalWindow";
import { EventType } from "../../Event";
import { Button } from "../Button";
import { constants } from "../../constants";

export class InstructionWindow extends ModalWindow {
  button: Button;
  boundButtonUp = () => this.buttonUpHandler();

  constructor() {
    super();

    const windowBackground = new Graphics();
    windowBackground.beginFill(0xff9ff9);
    windowBackground.lineStyle(2, 0x000000);
    windowBackground.drawRect(0, 0, 540, 300);
    windowBackground.pivot.set(270, 150);
    this.content.addChild(windowBackground);
    this.content.position.set(
      constants.GAME_AREA_SIZE_L / 2,
      constants.GAME_AREA_SIZE_S / 2
    );

    const title = new Text("MERGE ALL SIMILAR ITEMS\n BEFORE TIME RUNS OUT", {
      fontFamily: "Arial",
      fontSize: 36,
      fill: 0x001010,
      align: "center",
      fontWeight: "600",
    });
    title.pivot.set(title.width / 2, title.height / 2);
    title.position.set(0, -65);
    this.content.addChild(title);

    this.button = new Button("Start");
    this.button.position.set(0, 72);
    this.content.addChild(this.button);
    this.button.interactive = true;
    this.button.on("pointerup", this.boundButtonUp);
  }

  buttonUpHandler() {
    const event = new Event(EventType.START_GAME);
    window.dispatchEvent(event);
  }

  destroy() {
    this.button.removeListener("pointerup", this.boundButtonUp);
    this.button.destroy();
  }
}
