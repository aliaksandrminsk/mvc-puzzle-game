import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { GameController } from "./GameController";
import { GameView } from "./GameView";
import { GameModel } from "./GameModel";
import { gameConstants } from "./GameConstants";

export class App {
  private render: PIXI.AbstractRenderer;

  constructor() {
    this.render = PIXI.autoDetectRenderer({
      width: gameConstants.GAME_AREA_SIZE_L,
      height: gameConstants.GAME_AREA_SIZE_S,
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
    const gameModel = new GameModel();
    const gameView = new GameView();
    new GameController(gameModel, gameView);

    // Size and resize game.
    window.addEventListener("resize", () => this.resize());
    this.resize();

    // Render game.
    this.render.render(gameView.container);
    const ticker = PIXI.Ticker.shared;
    ticker.add(() => {
      if (gameView) {
        this.render.render(gameView.container);
      }
    });
  }

  // Resize game.
  resize() {
    let w = gameConstants.GAME_AREA_SIZE_L;
    let h = gameConstants.GAME_AREA_SIZE_S;

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
