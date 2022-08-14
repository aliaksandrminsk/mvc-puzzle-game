import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Loader } from "./Loader";
import { GameController } from "./controllers/GameController";
import { GameView } from "./views/GameView";
import { Game } from "./models/Game";

export class App {
  protected _gameModel: Game | null = null;
  protected _gameController: GameController | null = null;
  protected _gameView: GameView | null = null;
  protected app: PIXI.Application = new PIXI.Application({ resizeTo: window });

  run() {
    // Add to Dom
    document.body.appendChild(this.app.view);

    // load sprites
    const loader = new Loader(this.app.loader);
    loader.preload().then(() => this.start());
  }

  start() {
    // create game MVC
    this._gameModel = new Game();
    this._gameView = new GameView(this._gameModel);
    this._gameController = new GameController(this._gameModel, this._gameView);

    // add gameView to PIXI stage
    this.app.stage.addChild(this._gameView.container);

    this.app.ticker.add(() => {
      TWEEN.update();
    });
  }
}
