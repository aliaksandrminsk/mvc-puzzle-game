import { GridView } from "./GridView";
import { globalEvent, Event } from "@billjs/event-emitter";
import { GameEvents } from "../GameEvents";
import { GameSate } from "../GameModel";
import { PuzzlePieceView } from "../puzzlePiece/PuzzlePieceView";
import { PuzzlePieceController } from "../puzzlePiece/PuzzlePieceController";
import { puzzleGridPositions, puzzleGridValues } from "../config";
import { Point } from "pixi.js";
import { PuzzlePiece } from "../puzzlePiece/PuzzlePiece";

export class GridController {
  private readonly view: GridView;
  private puzzlePieces: PuzzlePieceController[] = [];

  constructor(gameView: GridView) {
    this.view = gameView;

    //** Create Grid.
    this.create();

    //** Add listener.
    globalEvent.on(GameEvents.CHANGE_GAME_STATE, (e: Event) =>
      this.setGameState(e)
    );
  }

  //** Remove all pieces.
  removeAllPuzzlePieces() {
    for (const piece of this.puzzlePieces) {
      this.view.container.removeChild(piece.view.sprite);
      piece.destroy();
    }
    this.puzzlePieces = [];
  }

  //** Remove one piece.
  removePuzzlePiece(piece: PuzzlePieceController) {
    for (let i = 0; i < this.puzzlePieces.length; i++) {
      if (this.puzzlePieces[i] === piece) {
        this.view.container.removeChild(piece.view.sprite);
        piece.destroy();
        this.puzzlePieces.splice(i, 1);
      }
    }
  }

  //** Create Grid.
  create() {
    const positions = [...puzzleGridPositions];
    const types = [...puzzleGridValues];
    while (positions.length > 0) {
      const positionsId = Math.floor(Math.random() * positions.length);
      const positionData = positions[positionsId];
      positions.splice(positionsId, 1);

      const typeId = Math.floor(Math.random() * types.length);
      const typeValue = types[typeId];
      types.splice(typeId, 1);

      const position = new Point(positionData.x, positionData.y);

      const puzzlePiece = new PuzzlePiece(typeValue, position);
      const puzzlePieceView = new PuzzlePieceView(typeValue);
      puzzlePieceView.setPosition(position);

      const puzzlePieceController = new PuzzlePieceController(
        puzzlePiece,
        puzzlePieceView
      );
      this.puzzlePieces.push(puzzlePieceController);
      this.view.container.addChild(puzzlePieceView.sprite);
    }
  }

  //** Handler of changing of game state.
  setGameState(event: Event) {
    if (event.data === GameSate.PLAY) {
      this.removeAllPuzzlePieces();
      this.create();
      this.enableInteractivity();
    } else {
      this.disableInteractivity();
    }
  }

  //** Enable grid.
  public enableInteractivity() {
    for (const piece of this.puzzlePieces) {
      piece.view.sprite.on(GameEvents.DRAG_END, () =>
        this.onPieceDragEnd(piece)
      );
      piece.setEnabled(true);
    }
  }

  //** Disable grid.
  public disableInteractivity() {
    for (const piece of this.puzzlePieces) {
      piece.view.sprite.removeAllListeners(GameEvents.DRAG_END);
      piece.setEnabled(false);
    }
  }

  //** Swap puzzle elements.
  onPieceDragEnd(piece: PuzzlePieceController) {
    const pieceToReplace = this.puzzlePieces.find(
      (item) =>
        item.view !== piece.view &&
        // piece.center to the right of the left side
        piece.view.sprite.x >= item.view.left &&
        // piece.center to the left of the right side
        piece.view.sprite.x <= item.view.right &&
        // piece.center below the top side
        piece.view.sprite.y <= item.view.bottom &&
        // piece.center above the bottom side
        piece.view.sprite.y >= item.view.top
    );

    //** If pieces have the same type then they will be destroyed.
    if (pieceToReplace && pieceToReplace.model.type === piece.model.type) {
      this.view.showExplosion(pieceToReplace.model.field); //Show explosion animation.

      this.removePuzzlePiece(piece);
      this.removePuzzlePiece(pieceToReplace);

      globalEvent.fire(GameEvents.FRUITS_MERGED, this.isWinCombination());
    } else {
      piece.reset();
    }
  }

  //** Check if player won game.
  public isWinCombination() {
    return this.puzzlePieces.length === 0 ? true : false;
  }
}
