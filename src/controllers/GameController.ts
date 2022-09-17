import { Game } from "../models/Game";
import { GameView } from "../views/GameView";
import { GridController } from "./GridController";
import { GameViewEvent } from "../events/GameViewEvent";

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
    this.gameView.on(GameViewEvent.START_BUTTON_CLICKED, () =>
      this.startGame()
    );
    this.gameView.on(GameViewEvent.AGAIN_BUTTON_CLICKED, () =>
      this.startGame()
    );
    this.gameView.on(GameViewEvent.GAME_TIME_FINISHED, () => this.loseGame());
    this.gameView.gridView.on(GameViewEvent.CHANGE_PIECE_POS, () => {
      if (this.gameModel.grid.isWinCombination()) {
        this.winGame();
      }
    });
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
