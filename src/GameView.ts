//import { GameModel } from "./GameModel";
import { Container, Sprite, Texture } from "pixi.js";
//import * as utils from "@pixi/utils";
import { Text } from "pixi.js";
import { IntroPopUp } from "./popUps/IntroPopUp";
//import { BasePopUp } from "./popUps/BasePopUp";
import { LosingPopUp } from "./popUps/LosingPopUp";
import { WinPopUp } from "./popUps/WinPopUp";
import { GridView } from "./grid/GridView";
import { TimerSliderView } from "./timerSlider/TimerSliderView";
//import { gameConstants } from "./GameConstants";
//import { GameViewEvent } from "./_events/GameViewEvent";
//import { GameEvent } from "./_events/GameEvent";
//import { ModalWindowViewEvent } from "./_events/ModalWindowViewEvent";

export class GameView {
  public gridView: GridView;
  //public modalWindow: BasePopUp | null = null;
  //private readonly _game: GameModel;

  public introPopUp: IntroPopUp;
  public losingPopUp: LosingPopUp;
  public winPopUp: WinPopUp;

  public container: Container;
  public readonly slider: TimerSliderView;
  private readonly bg: Sprite;

  //private gameTimer: ReturnType<typeof setTimeout> | null = null;

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
    title.position.set(this.bg.width / 2, 200);

    //** Slider.
    this.slider = new TimerSliderView();
    this.container.addChild(this.slider);
    this.slider.position.set(this.bg.width / 2, this.bg.height / 2 + 370);

    //** Create PopUps.
    this.introPopUp = new IntroPopUp();
    this.container.addChild(this.introPopUp);

    this.losingPopUp = new LosingPopUp();
    this.container.addChild(this.losingPopUp);

    this.winPopUp = new WinPopUp();
    this.container.addChild(this.winPopUp);

    //** Initialization of game.
    //this.init();
    //this.gridView.create();
    // this.gridView.container.x =
    //   this.container.width / 2 - this.gridView.container.width / 2;
    // this.gridView.container.y =
    //   this.container.height / 2 - this.gridView.container.height / 2;

    //** Listener.
    //this.game.on(GameEvent.CHANGE_GAME_STATE, () => this.setGameState());
  }

  // get gridView(): GridView {
  //   return this._gridView;
  // }
  //
  // get game(): GameModel {
  //   return this._game;
  // }

  // init() {
  //   this.gridView.create();
  //   this.gridView.container.x =
  //     this.container.width / 2 - this.gridView.container.width / 2;
  //   this.gridView.container.y =
  //     this.container.height / 2 - this.gridView.container.height / 2;
  //
  //   // const modalWindow = this.showInstructionWindow();
  //   // modalWindow.once(ModalWindowViewEvent.BUTTON_CLICKED, () => {
  //   //   this.emit(GameViewEvent.START_BUTTON_CLICKED);
  //   // });
  // }

  // //** Show instruction modal window.
  // showInstructionWindow(): BasePopUp {
  //   this.modalWindow = new IntroPopUp();
  //   this.container.addChild(this.modalWindow.view);
  //   return this.modalWindow;
  // }
  //
  // //** Show losing modal window.
  // showLosingWindow(): BasePopUp {
  //   this.modalWindow = new LosingPopUp();
  //   this.container.addChild(this.modalWindow.view);
  //   return this.modalWindow;
  // }
  //
  // //** Show win modal window.
  // showWinWindow() {
  //   this.modalWindow = new WinPopUp();
  //   this.container.addChild(this.modalWindow.view);
  // }
  //
  // //** Hide modal window.
  // hideWindow() {
  //   if (this.modalWindow) {
  //     this.container.removeChild(this.modalWindow.view);
  //     this.modalWindow.destroy();
  //   }
  // }
}
