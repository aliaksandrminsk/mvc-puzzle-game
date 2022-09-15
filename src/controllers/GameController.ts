import { Game } from "../models/Game";
import { GameView } from "../views/GameView";
import { EventType } from "../Event";
import { GridController } from "./GridController";
import { constants } from "../constants";

export class GameController {
  private readonly _gameModel: Game;
  private readonly _gameView: GameView;
  private readonly _gridController: GridController;

  private gameTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(game: Game, gameView: GameView) {
    this._gameModel = game;
    this._gameView = gameView;

    // Grid controller, performs manipulation on the GridModel and handles the GridView.
    this._gridController = new GridController(
      this.gameModel.grid,
      this.gameView.gridView
    );

    //** Add listeners to the GameController
    window.addEventListener(EventType.INIT_GAME, () => this.initGame());
    window.addEventListener(EventType.START_GAME, () => this.startGame());
    window.addEventListener(EventType.LOSE_GAME, () => this.loseGame());
    window.addEventListener(EventType.WIN_GAME, () => this.winGame());

    //** Initialization of game.
    this.initGame();
  }

  private get gameView(): GameView {
    return this._gameView;
  }

  private get gameModel(): Game {
    return this._gameModel;
  }

  private get gridController(): GridController {
    return this._gridController;
  }

  //** Initialization of game.
  public initGame() {
    this.gameView.createGrid();
    this.gameView.hideWindow();
    this.gameView.showInstructionWindow();
    this.gameView.slider.reset();
  }

  //** Start to play a game.
  public startGame() {
    this.gameView.removeGrid();
    this.gameView.createGrid();
    this.gameView.hideWindow();
    this.gridController.enableInteractivity();

    this.gameTimer = setTimeout(() => {
      if (this.gameView.gridView.isWinCombination()) {
        const event = new Event(EventType.WIN_GAME);
        window.dispatchEvent(event);
      } else {
        const event = new Event(EventType.LOSE_GAME);
        window.dispatchEvent(event);
      }
    }, constants.GAME_DURATION);
    this._gameView.slider.start(constants.GAME_DURATION);
  }

  //** Handler of losing a game.
  public loseGame() {
    this.gameView.slider.stop();
    this.gridController.disableInteractivity();
    this.gameView.hideWindow();
    this.gameView.showLosingWindow();
  }

  //** Handler of winning a game.
  public winGame() {
    this.gameView.slider.stop();
    if (this.gameTimer) clearTimeout(this.gameTimer);
    this.gridController.disableInteractivity();
    this.gameView.hideWindow();
    this.gameView.showWinWindow();
  }
}
