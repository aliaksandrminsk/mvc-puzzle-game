import { GridView } from "./GridView";
import { globalEvent, Event } from "@billjs/event-emitter";
import { GameEvents } from "../GameEvents";
import { GameSate } from "../GameModel";
import { GridEvents } from "./GridEvents";
import { PuzzlePieceView } from "../puzzlePiece/PuzzlePieceView";
import { PuzzlePieceController } from "../puzzlePiece/PuzzlePieceController";
import { puzzleGridPositions } from "../config";
import { Point } from "pixi.js";
import { PuzzlePiece } from "../puzzlePiece/PuzzlePiece";

export class GridController {
  private readonly view: GridView;
  private puzzlePieces: PuzzlePieceController[] = [];

  constructor(gameView: GridView) {
    this.view = gameView;

    //** Listener.
    globalEvent.on(GameEvents.CHANGE_GAME_STATE, (e: Event) =>
      this.setGameState(e)
    );
    globalEvent.on(GridEvents.CHANGE_PIECE_POS, () => {
      if (this.isWinCombination()) {
        globalEvent.fire(GameEvents.WIN_GAME);
      }
    });
    this.create();
  }

  clear() {
    for (const piece of this.puzzlePieces) {
      this.view.container.removeChild(piece.view.sprite);
      piece.destroy();
    }
    this.puzzlePieces = [];
  }

  create() {
    const positions = [...puzzleGridPositions];
    const types = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
    while (positions.length > 0) {
      const positionsId = Math.floor(Math.random() * positions.length);
      const positionData = positions[positionsId];
      positions.splice(positionsId, 1);

      const typeId = Math.floor(Math.random() * types.length);
      const typeValue = types[typeId];
      types.splice(typeId, 1);

      const puzzlePiece = new PuzzlePiece(
        typeValue,
        new Point(positionData.x, positionData.y),
        positionData.area
      );
      const puzzlePieceView = new PuzzlePieceView(typeValue);
      puzzlePieceView.sprite.x = positionData.x;
      puzzlePieceView.sprite.y = positionData.y;

      const puzzlePieceController = new PuzzlePieceController(
        puzzlePiece,
        puzzlePieceView
      );
      this.puzzlePieces.push(puzzlePieceController);
      this.view.container.addChild(puzzlePieceView.sprite);
    }
  }

  setGameState(event: Event) {
    if (event.data === GameSate.PLAY) {
      this.clear();
      this.create();
      this.enableInteractivity();
    } else {
      this.disableInteractivity();
    }
  }

  public enableInteractivity() {
    for (const piece of this.puzzlePieces) {
      piece.view.sprite.on(GameEvents.DRAG_END, () =>
        this.onPieceDragEnd(piece)
      );
      piece.setEnabled(true);
    }
  }

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

    if (pieceToReplace) {
      const replaceField = pieceToReplace.model.field;
      const replaceArea = pieceToReplace.model.area;
      pieceToReplace.setPosition(piece.model.field, piece.model.area);
      piece.setPosition(replaceField, replaceArea);
      //this.emit(GameViewEvent.CHANGE_PIECE_POS);
      globalEvent.fire(GridEvents.CHANGE_PIECE_POS);
    } else {
      piece.reset();
    }
  }

  public isWinCombination() {
    for (let areaId = 0; areaId < 4; areaId++) {
      const types = [];

      for (const piece of this.puzzlePieces) {
        if (piece.model.area === areaId) {
          types.push(piece.model.type);
        }
      }
      if (types.length !== 4) {
        return false;
      }
      for (let index = 1; index < types.length; index++) {
        if (types[index - 1] != types[index]) {
          return false;
        }
      }
    }
    return true;
  }
}
