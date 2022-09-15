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
    const { h, w, backgroundTexture = "" } = this.check_device();

    // Create game MVC.
    this._gameModel = new Game(backgroundTexture);
    this._gameView = new GameView(this._gameModel);
    this._gameController = new GameController(this._gameModel, this._gameView);

    // Size and resize game.
    window.addEventListener("resize", () => this.resize());
    this.render.view.style.display = "block";
    this.render.view.style.width = w + "px";
    this.render.view.style.height = h + "px";
    this.resize();
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

  // Get screen size.
  check_device() {
    let h = constants.GAME_AREA_SIZE_L;
    let w = constants.GAME_AREA_SIZE_S;
    let backgroundTexture;
    if (PIXI.utils.isMobile.phone) {
      if (window.innerHeight > window.innerWidth) {
        h = constants.GAME_AREA_SIZE_L;
        w = constants.GAME_AREA_SIZE_S;
        backgroundTexture = "bg_portrait";
      } else {
        h = constants.GAME_AREA_SIZE_S;
        w = constants.GAME_AREA_SIZE_L;
        backgroundTexture = "bg";
      }
    }
    if (!PIXI.utils.isMobile.phone && !PIXI.utils.isMobile.tablet) {
      h = constants.GAME_AREA_SIZE_S;
      w = constants.GAME_AREA_SIZE_L;
      backgroundTexture = "bg";
    }
    return {
      h,
      w,
      backgroundTexture,
    };
  }

  // Resize game.
  resize() {
    const ratio = constants.GAME_AREA_SIZE_L / constants.GAME_AREA_SIZE_S;
    let w, h;
    if (window.innerWidth / window.innerHeight >= ratio) {
      w = window.innerHeight * ratio;
      h = window.innerHeight;
    } else {
      w = window.innerWidth;
      h = window.innerWidth / ratio;
    }
    this.render.view.style.width = w + "px";
    this.render.view.style.height = h + "px";
  }
}
