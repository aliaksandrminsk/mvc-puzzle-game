import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { GameController } from "./controllers/GameController";
import { GameView } from "./views/GameView";
import { Game } from "./models/Game";
import { constants } from "./constants";

export class App {
  protected _gameModel: Game | null = null;
  protected _gameController: GameController | null = null;
  protected _gameView: GameView | null = null;

  private render: PIXI.AbstractRenderer;

  constructor() {
    this.render = PIXI.autoDetectRenderer({
      width: constants.GAME_AREA_SIZE_L,
      height: constants.GAME_AREA_SIZE_S,
      backgroundColor: 0xff0000,
      resolution: window.devicePixelRatio,
    });
  }

  //** Prepare game for start.
  run() {
    // Add to Dom.
    document.body.appendChild(this.render.view);

    // load sprites
    const loader = new Loader(PIXI.Loader.shared);
    loader.preload().then(() => this.start());
  }

  //** Start game.
  start() {
    // Create game MVC.
    this._gameModel = new Game();
    this._gameView = new GameView(this._gameModel);
    this._gameController = new GameController(this._gameModel, this._gameView);

    // Size and resize game.
    window.addEventListener("resize", () => this.resize());
    this.resize();

    // Render game.
    this.render.render(this._gameView.container);
    const ticker = PIXI.Ticker.shared;
    ticker.add(() => {
      if (this._gameView) {
        this.render.render(this._gameView.container);
      }
    });
  }

  // Resize game.
  resize() {
    let w = constants.GAME_AREA_SIZE_L;
    let h = constants.GAME_AREA_SIZE_S;

    let heightRatio = 1,
      widthRation = 1;
    if (w > document.body.clientWidth) {
      widthRation = w / document.body.clientWidth;
    }
    if (h > document.body.clientHeight) {
      heightRatio = h / document.body.clientHeight;
    }
    if (widthRation > heightRatio) {
      h = h / widthRation;
      w = w / widthRation;
    } else {
      h = h / heightRatio;
      w = w / heightRatio;
    }
    this.render.view.style.width = w + "px";
    this.render.view.style.height = h + "px";
  }
}
