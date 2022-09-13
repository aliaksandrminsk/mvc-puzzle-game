import { Sprite, Container, Text, Texture } from "pixi.js";

export class Button extends Container {
  private readonly background: Sprite;

  private boundButtonDown = () => this.buttonDownHandler();
  private boundButtonUp = () => this.buttonUpHandler();

  constructor(titleText: string | number | undefined) {
    super();

    //** Background.
    const backgroundTexture = Texture.from("png_button");
    this.background = new Sprite(backgroundTexture);
    this.background.pivot.set(
      this.background.width / 2,
      this.background.height / 2
    );
    this.background.interactive = true;
    this.background.buttonMode = true;
    this.background.on("pointerdown", this.boundButtonDown);
    this.background.on("pointerup", this.boundButtonUp);
    this.background.on("pointerupoutside", this.boundButtonUp);
    this.addChild(this.background);

    //** Title.
    const title = new Text(titleText, {
      fontFamily: "Arial",
      fontWeight: "600",
      fontSize: 36,
      fill: 0x001010,
      align: "center",
    });
    title.pivot.set(title.width / 2, title.height / 2);
    this.addChild(title);
  }
  buttonDownHandler() {
    this.background.alpha = 0.7;
  }

  buttonUpHandler() {
    this.background.alpha = 1;
  }

  destroy() {
    super.destroy();
    this.background.removeListener("pointerdown", this.boundButtonDown);
    this.background.removeListener("pointerup", this.boundButtonUp);
    this.background.removeListener("pointerupoutside", this.boundButtonUp);
  }
}
