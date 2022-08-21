import { Game } from "../models/Game";
import { GameView } from "../views/GameView";
import { EventType } from "../Event";

export class GameController {
  private _gameModel: Game;
  private _gameView: GameView;

  constructor(game: Game, gameView: GameView) {
    this._gameModel = game;
    this._gameView = gameView;
    this.initGame();

    // attach listeners to the GameController
    this.attachListeners();
  }

  public initGame() {
    this._gameView.createGrid();
    this._gameView.showInstructionWindow();
  }

  public startGame() {
    this._gameView.hideWindow();
    this.initPuzzlePieces();
  }

  public loseGame() {
    //this._gameView.showLosingWindow();
  }

  public winGame() {
    //this._gameView.showWinWindow();
  }

  protected initPuzzlePieces() {
    for (const piece of this._gameModel.pieces) {
      piece.on("dragend", () => this._gameView.onPieceDragEnd(piece));
      piece.sprite.on("pointerdown", (e: any) => piece.onTouchStart(e));
      piece.sprite.on("pointermove", (e: any) => piece.onTouchMove(e));
      piece.sprite.on("pointerup", (e: any) => piece.onTouchEnd(e));
    }
  }

  private attachListeners() {
    window.addEventListener(EventType.START_GAME, () => this.startGame());
    window.addEventListener(EventType.INIT_GAME, () => this.initGame());
    window.addEventListener(EventType.LOSE_GAME, () => this.loseGame());
    window.addEventListener(EventType.WIN_GAME, () => this.winGame());
  }
}
