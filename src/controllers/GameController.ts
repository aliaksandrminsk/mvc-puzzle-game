import { Game } from "../models/Game";
import { GameView } from "../views/GameView";
import { EventType } from "../Event";
import { GridController } from "./GridController";

export class GameController {
  private readonly _gameModel: Game;
  private readonly _gameView: GameView;
  private readonly _gridController: GridController;

  constructor(game: Game, gameView: GameView) {
    this._gameModel = game;
    this._gameView = gameView;

    // Grid controller, performs manipulation on the GridModel and handles the GridView.
    this._gridController = new GridController(
      this.gameModel.grid,
      this.gameView.gridView
    );

    //** Add listeners to the GameController.
    this.gameView.on(EventType.START_GAME, () => this.startGame());
    this.gameView.on(EventType.WIN_GAME, () => this.winGame());
    this.gameView.on(EventType.LOSE_GAME, () => this.loseGame());
  }

  private get gameView(): GameView {
    return this._gameView;
  }

  private get gameModel(): Game {
    return this._gameModel;
  }

  //** Set state when user play a game.
  public startGame() {
    this.gameModel.grid.clear();
    this.gameModel.grid.createPuzzlePieces();
    this.gameModel.state = "start";
  }

  //** Set state of lose game.
  public loseGame() {
    this.gameModel.state = "lose";
  }

  //** Set state of win game.
  public winGame() {
    this.gameModel.state = "win";
  }
}
