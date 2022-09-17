import { Game } from "../models/Game";
import { Container, Sprite, Texture } from "pixi.js";
import * as utils from "@pixi/utils";
import { Text } from "pixi.js";
import { InstructionWindow } from "./windows/InstructionWindow";
import { ModalWindow } from "./windows/ModalWindow";
import { LosingWindow } from "./windows/LosingWindow";
import { WinWindow } from "./windows/WinWindow";
import { GridView } from "./GridView";
import { TimerSlider } from "./TimerSlider";
import { constants } from "../constants";
import { GameViewEvent } from "../events/GameViewEvent";
import { GameEvent } from "../events/GameEvent";
import { ModalWindowViewEvent } from "../events/ModalWindowViewEvent";

export class GameView extends utils.EventEmitter {
  private readonly _gridView: GridView;
  private readonly _game: Game;

  public container: Container;
  public readonly slider: TimerSlider;
  private readonly bg: Sprite;
  public modalWindow: ModalWindow | null = null;

  private gameTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(game: Game) {
    super();
    this._game = game;
    this.container = new Container();

    //** Background
    this.bg = new Sprite(Texture.from(game.backgroundTexture));
    this.container.addChild(this.bg);

    //** Puzzle grid.
    this._gridView = new GridView(this._game.grid);
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

    //** Slider
    this.slider = new TimerSlider();
    this.container.addChild(this.slider);
    this.slider.position.set(this.bg.width / 2, this.bg.height / 2 + 370);

    //** Initialization of game.
    this.init();

    //** Listener.
    this.game.on(GameEvent.CHANGE_GAME_STATE, () => this.setGameState());
  }

  get gridView(): GridView {
    return this._gridView;
  }

  get game(): Game {
    return this._game;
  }

  init() {
    this.gridView.create();
    this.gridView.container.x =
      this.container.width / 2 - this.gridView.container.width / 2;
    this.gridView.container.y =
      this.container.height / 2 - this.gridView.container.height / 2;

    const modalWindow = this.showInstructionWindow();
    modalWindow.once(ModalWindowViewEvent.BUTTON_CLICKED, () => {
      this.emit(GameViewEvent.START_BUTTON_CLICKED);
    });
  }

  setGameState() {
    this.hideWindow();

    if (this.game.state === "start") {
      this.gridView.enableInteractivity();
      this.slider.start(constants.GAME_DURATION);
      this.gameTimer = setTimeout(() => {
        this.emit(GameViewEvent.GAME_TIME_FINISHED);
      }, constants.GAME_DURATION);
    } else if (this.game.state === "lose") {
      this.slider.stop();
      this.gridView.disableInteractivity();
      const modalWindow = this.showLosingWindow();
      modalWindow.once(ModalWindowViewEvent.BUTTON_CLICKED, () => {
        this.emit(GameViewEvent.AGAIN_BUTTON_CLICKED);
      });
    } else if (this.game.state === "win") {
      this.slider.stop();
      if (this.gameTimer) clearTimeout(this.gameTimer);
      this.gridView.disableInteractivity();
      this.showWinWindow();
    }
  }

  //** Show instruction modal window.
  showInstructionWindow(): ModalWindow {
    this.modalWindow = new InstructionWindow();
    this.container.addChild(this.modalWindow.view);
    return this.modalWindow;
  }

  //** Show losing modal window.
  showLosingWindow(): ModalWindow {
    this.modalWindow = new LosingWindow();
    this.container.addChild(this.modalWindow.view);
    return this.modalWindow;
  }

  //** Show win modal window.
  showWinWindow() {
    this.modalWindow = new WinWindow();
    this.container.addChild(this.modalWindow.view);
  }

  //** Hide modal window.
  hideWindow() {
    if (this.modalWindow) {
      this.container.removeChild(this.modalWindow.view);
      this.modalWindow.destroy();
    }
  }
}
