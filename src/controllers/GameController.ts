import { Game } from "../models/Game";
import { GameView } from "../views/GameView";
import { EventType } from "../Event";
import { GridController } from "./GridController";

export class GameController {
  private _gameModel: Game;
  private _gameView: GameView;
  private readonly _gridController: GridController;

  private GAME_DURATION: number = 20000;

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
    window.addEventListener(EventType.INIT_GAME, () => this.initGame());
    window.addEventListener(EventType.START_GAME, () => this.startGame());
    window.addEventListener(EventType.LOSE_GAME, () => this.loseGame());
    window.addEventListener(EventType.WIN_GAME, () => this.winGame());

    //** Initialization of game.
    this.initGame();
  }

  private get gridController(): GridController {
    return this._gridController;
  }

  //** Initialization of game.
  public initGame() {
    this._gameView.createGrid();
    this._gameView.hideWindow();
    this._gameView.showInstructionWindow();
    this._gameView.slider.reset();
  }

  //** Start to play a game.
  public startGame() {
    this._gameView.removeGrid();
    this._gameView.createGrid();
    this._gameView.hideWindow();
    this.gridController.enableInteractivity();

    this.gameTimer = setTimeout(() => {
      if (this._gameView.gridView.isWinCombination()) {
        const event = new Event(EventType.WIN_GAME);
        window.dispatchEvent(event);
      } else {
        const event = new Event(EventType.LOSE_GAME);
        window.dispatchEvent(event);
      }
    }, this.GAME_DURATION);
    this._gameView.slider.start(this.GAME_DURATION);
  }

  //** Handler of losing a game.
  public loseGame() {
    this._gameView.slider.stop();
    this.gridController.disableInteractivity();
    this._gameView.hideWindow();
    this._gameView.showLosingWindow();
  }

  //** Handler of winning a game.
  public winGame() {
    this._gameView.slider.stop();
    if (this.gameTimer) clearTimeout(this.gameTimer);
    this.gridController.disableInteractivity();
    this._gameView.hideWindow();
    this._gameView.showWinWindow();
  }
}
