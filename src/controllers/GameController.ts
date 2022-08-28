import { Game } from "../models/Game";
import { GameView } from "../views/GameView";
import { EventType } from "../Event";
import { GridController } from "./GridController";

export class GameController {
  private _gameModel: Game;
  private _gameView: GameView;
  private readonly _gridController: GridController;

  private gameTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(game: Game, gameView: GameView) {
    this._gameModel = game;
    this._gameView = gameView;

    // Grid controller, performs manipulation on the GridModel and handles the GridView.
    this._gridController = new GridController(
      this._gameModel.grid,
      this._gameView.gridView
    );

    //** Add listeners to the GameController
    window.addEventListener(EventType.START_GAME, () => this.startGame());
    window.addEventListener(EventType.INIT_GAME, () => this.initGame());
    window.addEventListener(EventType.LOSE_GAME, () => this.loseGame());
    window.addEventListener(EventType.WIN_GAME, () => this.winGame());

    //** Initialization of game.
    this.initGame();
  }

  private get gridController(): GridController {
    return this._gridController;
  }

  public initGame() {
    this._gameView.removeGrid();
    this._gameView.createGrid();
    this._gameView.hideWindow();
    this._gameView.showInstructionWindow();
    this._gameView.slider.reset();
  }

  public startGame() {
    this._gameView.hideWindow();
    this.gridController.setInteractive();

    this.gameTimer = setTimeout(() => {
      if (this._gameView.gridView.isWinCombination()) {
        const event = new Event(EventType.WIN_GAME);
        window.dispatchEvent(event);
      } else {
        const event = new Event(EventType.LOSE_GAME);
        window.dispatchEvent(event);
      }
    }, 20000);
    this._gameView.slider.start(20000);
  }

  public loseGame() {
    this._gameView.slider.stop();
    this._gameView.hideWindow();
    this._gameView.showLosingWindow();
  }

  public winGame() {
    this._gameView.slider.stop();
    if (this.gameTimer) clearTimeout(this.gameTimer);
    this._gameView.hideWindow();
    this._gameView.showWinWindow();
  }
}
