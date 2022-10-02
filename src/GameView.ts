import { Container, Sprite, Texture } from "pixi.js";
import { Text } from "pixi.js";
import { IntroPopUp } from "./popUps/IntroPopUp";
import { LosingPopUp } from "./popUps/LosingPopUp";
import { WinPopUp } from "./popUps/WinPopUp";
import { GridView } from "./grid/GridView";
import { TimerSliderView } from "./timerSlider/TimerSliderView";

export class GameView {
  public container: Container;

  public gridView: GridView;
  public slider: TimerSliderView;

  public introPopUp: IntroPopUp;
  public losingPopUp: LosingPopUp;
  public winPopUp: WinPopUp;

  public scoreText: Text;

  protected bg: Sprite;

  constructor() {
    this.container = new Container();

    //** Background
    this.bg = new Sprite(Texture.from("bg"));
    this.container.addChild(this.bg);

    //** Puzzle grid.
    this.gridView = new GridView();
    this.container.addChild(this.gridView.container);

    //** Title
    const title = new Text("Puzzle Game", {
      fontFamily: "Arial",
      fontSize: 50,
      fontWeight: "600",
      fill: 0x0010ff,
      align: "center",
    });
    this.container.addChild(title);
    title.pivot.set(title.width / 2, title.height / 2);
    title.position.set(this.bg.width / 2, 60);

    //** Score
    this.scoreText = new Text("", {
      fontFamily: "Arial",
      fontSize: 25,
      fontWeight: "600",
      fill: 0x001000,
      align: "center",
    });
    this.container.addChild(this.scoreText);
    this.setScoreTextPosition();

    //** Slider.
    this.slider = new TimerSliderView();
    this.container.addChild(this.slider);
    this.slider.position.set(this.bg.width / 2, this.bg.height / 2 + 390);

    //** Create PopUps.
    this.introPopUp = new IntroPopUp();
    this.container.addChild(this.introPopUp);

    this.losingPopUp = new LosingPopUp();
    this.container.addChild(this.losingPopUp);

    this.winPopUp = new WinPopUp();
    this.container.addChild(this.winPopUp);
  }

  setGridPosition() {
    this.gridView.container.x =
      this.bg.width / 2 - this.gridView.container.width / 2;
    this.gridView.container.y =
      this.bg.height / 2 - this.gridView.container.height / 2 + 20;
  }

  setScoreTextPosition() {
    this.scoreText.pivot.set(
      this.scoreText.width / 2,
      this.scoreText.height / 2
    );
    this.scoreText.position.set(this.bg.width / 2, 120);
  }
}
