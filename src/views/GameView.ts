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

export class GameView extends utils.EventEmitter {
  private readonly grid: GridView;
  private _game: Game;

  public container: Container;
  public readonly slider: TimerSlider;
  private readonly bg: Sprite;
  private modalWindow: ModalWindow | null = null;

  constructor(game: Game) {
    super();
    this._game = game;
    this.container = new Container();

    //** Background
    this.bg = new Sprite(Texture.from(game.backgroundTexture));
    this.container.addChild(this.bg);

    //** Puzzle grid.
    this.grid = new GridView(this._game.grid);
    this.container.addChild(this.grid);

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
  }

  get gridView(): GridView {
    return this.grid;
  }

  //** Create game area.
  createGrid() {
    this.grid.createPuzzlePieces();
    this.grid.pivot.set(-75, 75);
    this.grid.x = this.container.width / 2 - this.grid.width / 2;
    this.grid.y = this.container.height / 2 - this.grid.height / 2;
  }

  //** Clear game area.
  removeGrid() {
    this.grid.removePuzzlePieces();
  }

  //** Show instruction modal window.
  showInstructionWindow() {
    this.modalWindow = new InstructionWindow();
    this.container.addChild(this.modalWindow.view);
  }

  //** Show losing modal window.
  showLosingWindow() {
    this.modalWindow = new LosingWindow();
    this.container.addChild(this.modalWindow.view);
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
