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
  public container: Container;
  private readonly grid: GridView;
  public readonly slider: TimerSlider;
  private _game: Game;
  private bg: Sprite | null = null;
  private modalWindow: ModalWindow | null = null;

  constructor(game: Game) {
    super();
    this._game = game;
    this.container = new Container();
    this.createBackground();

    this.grid = new GridView(this._game.grid);
    this.container.addChild(this.grid);

    const title = new Text("This is a PixiJS text", {
      fontFamily: "Arial",
      fontSize: 36,
      fill: 0xff1010,
      align: "center",
    });
    this.container.addChild(title);
    title.anchor.set(0.5);
    title.position.set(window.innerWidth / 2, 50);

    this.slider = new TimerSlider();
    this.container.addChild(this.slider);
    this.slider.pivot.set(this.slider.width / 2, this.slider.height / 2);
    this.slider.position.set(window.innerWidth / 2, 800);
  }

  createBackground() {
    this.bg = new Sprite(Texture.from("bg"));
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChildAt(this.bg, 0);
  }

  createGrid() {
    this.grid.createPuzzlePieces();
    this.grid.pivot.set(-75, 75);
    this.grid.x = window.innerWidth / 2 - this.grid.width / 2;
    this.grid.y = window.innerHeight / 2 - this.grid.height / 2;
  }

  removeGrid() {
    this.grid.removePuzzlePieces();
  }

  get gridView(): GridView {
    return this.grid;
  }

  showInstructionWindow() {
    this.modalWindow = new InstructionWindow();
    this.container.addChildAt(this.modalWindow.view, 2);

    this.modalWindow.view.x = window.innerWidth / 2;
    this.modalWindow.view.y = window.innerHeight / 2;
  }

  showLosingWindow() {
    this.modalWindow = new LosingWindow();
    this.container.addChildAt(this.modalWindow.view, 2);

    this.modalWindow.view.x = window.innerWidth / 2;
    this.modalWindow.view.y = window.innerHeight / 2;
  }
  showWinWindow() {
    this.modalWindow = new WinWindow();
    this.container.addChildAt(this.modalWindow.view, 2);

    this.modalWindow.view.x = window.innerWidth / 2;
    this.modalWindow.view.y = window.innerHeight / 2;
  }

  hideWindow() {
    if (this.modalWindow) {
      this.container.removeChild(this.modalWindow.view);
      this.modalWindow.destroy();
    }
  }
}
