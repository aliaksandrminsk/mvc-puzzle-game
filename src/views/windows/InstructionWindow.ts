import { Text } from "pixi.js";
import { ModalWindow } from "./ModalWindow";
import { Button } from "../components/Button";
import { ModalWindowViewEvent } from "../../events/ModalWindowViewEvent";

export class InstructionWindow extends ModalWindow {
  button: Button;
  boundButtonUp = () => this.buttonUpHandler();

  constructor() {
    super();

    //** Create PopUp background.
    this.popUpBackground.beginFill(0xff9ff9);
    this.popUpBackground.lineStyle(2, 0x000000);
    this.popUpBackground.drawRect(0, 0, 540, 300);
    this.popUpBackground.pivot.set(270, 150);

    //** Create title.
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

    //Create button.
    this.button = new Button("Start");
    this.button.position.set(0, 72);
    this.content.addChild(this.button);
    this.button.interactive = true;
    this.button.on("pointerup", this.boundButtonUp);
  }

  //** Handler of click to button.
  buttonUpHandler() {
    this.emit(ModalWindowViewEvent.BUTTON_CLICKED);
  }

  destroy() {
    this.button.removeListener("pointerup", this.boundButtonUp);
    this.button.destroy();
  }
}
