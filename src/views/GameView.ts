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
    this.container.addChild(this.gridView);

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

    //** Listener.
    this.game.on(GameEvent.CHANGE_GAME_STATE, () => this.setGameState());

    //** Initialization of game.
    this.setGameState();
  }

  get gridView(): GridView {
    return this._gridView;
  }

  get game(): Game {
    return this._game;
  }

  setGameState() {
    if (this.game.state === "init") {
      this.gridView.create();
      this.gridView.x = this.container.width / 2 - this.gridView.width / 2;
      this.gridView.y = this.container.height / 2 - this.gridView.height / 2;

      const modalWindow = this.showInstructionWindow();
      modalWindow.once("click", () => {
        this.emit(GameViewEvent.START_GAME);
      });
    } else if (this.game.state === "start") {
      this.hideWindow();
      this.gridView.enableInteractivity();
      this.gridView.on("pieceSwap", () => {
        if (this.game.grid.isWinCombination()) {
          this.emit(GameViewEvent.WIN_GAME);
        }
      });
      this.slider.start(constants.GAME_DURATION);
      this.gameTimer = setTimeout(() => {
        if (this.game.grid.isWinCombination()) {
          this.emit(GameViewEvent.WIN_GAME);
        } else {
          this.emit(GameViewEvent.LOSE_GAME);
        }
      }, constants.GAME_DURATION);
    } else if (this.game.state === "lose") {
      this.slider.stop();
      this.gridView.disableInteractivity();
      this.hideWindow();
      const modalWindow = this.showLosingWindow();
      modalWindow.once("click", () => {
        this.emit(GameViewEvent.START_GAME);
      });
    } else if (this.game.state === "win") {
      this.slider.stop();
      if (this.gameTimer) clearTimeout(this.gameTimer);
      this.gridView.disableInteractivity();
      this.hideWindow();
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
