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
    this.bg = new Sprite(Texture.from("bg"));
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
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
    title.position.set(window.innerWidth / 2, 80);

    //** Slider
    this.slider = new TimerSlider();
    this.container.addChild(this.slider);
    this.slider.pivot.set(this.slider.width / 2, this.slider.height / 2);
    this.slider.position.set(window.innerWidth / 2, 800);
  }

  get gridView(): GridView {
    return this.grid;
  }

  //** Create game area.
  createGrid() {
    this.grid.createPuzzlePieces();
    this.grid.pivot.set(-75, 75);
    this.grid.x = window.innerWidth / 2 - this.grid.width / 2;
    this.grid.y = window.innerHeight / 2 - this.grid.height / 2;
  }

  //** Clear game area.
  removeGrid() {
    this.grid.removePuzzlePieces();
  }

  //** Show instruction modal window.
  showInstructionWindow() {
    this.modalWindow = new InstructionWindow();
    this.container.addChild(this.modalWindow.view);

    this.modalWindow.view.x = window.innerWidth / 2;
    this.modalWindow.view.y = window.innerHeight / 2;
  }

  //** Show losing modal window.
  showLosingWindow() {
    this.modalWindow = new LosingWindow();
    this.container.addChild(this.modalWindow.view);

    this.modalWindow.view.x = window.innerWidth / 2;
    this.modalWindow.view.y = window.innerHeight / 2;
  }

  //** Show win modal window.
  showWinWindow() {
    this.modalWindow = new WinWindow();
    this.container.addChild(this.modalWindow.view);

    this.modalWindow.view.x = window.innerWidth / 2;
    this.modalWindow.view.y = window.innerHeight / 2;
  }

  //** Hide modal window.
  hideWindow() {
    if (this.modalWindow) {
      this.container.removeChild(this.modalWindow.view);
      this.modalWindow.destroy();
    }
  }
}
