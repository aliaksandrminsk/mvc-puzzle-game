import { Texture, Sprite, Graphics, Text } from "pixi.js";
import { ModalWindow } from "./ModalWindow";
import { EventType } from "../../Event";

export class LosingWindow extends ModalWindow {
  textureButton: Texture;
  textureButtonDown: Texture;
  button: Sprite;

  boundButtonDown = () => this.buttonDownHandler();
  boundButtonUp = () => this.buttonUpHandler();

  constructor() {
    super();

    const windowBackground = new Graphics();
    windowBackground.beginFill(0xffff00);
    windowBackground.lineStyle(5, 0xff0000);
    windowBackground.drawRect(0, 0, 300, 200);
    windowBackground.pivot.set(150, 100);
    this.content.addChild(windowBackground);

    const title = new Text("Failed", {
      fontFamily: "Arial",
      fontSize: 36,
      fill: 0xff1010,
      align: "center",
    });
    title.anchor.set(0.5);
    title.position.set(0, -80);
    this.content.addChild(title);

    this.textureButton = Texture.from("button");
    this.textureButtonDown = Texture.from("button_down");
    this.button = new Sprite(this.textureButton);
    this.button.anchor.set(0.5);
    this.button.position.set(0, 30);
    this.button.interactive = true;
    this.button.buttonMode = true;
    this.button.on("pointerdown", this.boundButtonDown);
    this.button.on("pointerup", this.boundButtonUp);
    this.button.on("pointerupoutside", this.boundButtonUp);
    this.content.addChild(this.button);
  }

  buttonDownHandler() {
    this.button.texture = this.textureButtonDown;
    const event = new Event(EventType.INIT_GAME);
    window.dispatchEvent(event);
  }

  buttonUpHandler() {
    this.button.texture = this.textureButton;
  }

  destroy() {
    this.button.removeListener("pointerdown", this.boundButtonDown);
    this.button.removeListener("pointerup", this.boundButtonUp);
    this.button.removeListener("pointerupoutside", this.boundButtonUp);
  }
}
