import { Game } from "../models/Game";
import { GameView } from "../views/GameView";

export class GameController {
  private _gameModel: Game;
  private _gameView: GameView;

  constructor(game: Game, gameView: GameView) {
    this._gameModel = game;
    this._gameView = gameView;
    this.initPuzzlePieces();
  }

  initPuzzlePieces() {
    for (const piece of this._gameModel.pieces) {
      piece.on("dragend", () => this._gameView.onPieceDragEnd(piece));
      piece.sprite.on("pointerdown", (e: any) => piece.onTouchStart(e));
      piece.sprite.on("pointermove", (e: any) => piece.onTouchMove(e));
      piece.sprite.on("pointerup", (e: any) => piece.onTouchEnd(e));
    }
  }
}
