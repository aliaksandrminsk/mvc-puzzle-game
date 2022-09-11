import { puzzleGridPositions } from "../config";
import { PuzzlePiece } from "./PuzzlePiece";
import { Container, Point } from "pixi.js";
import { Grid } from "../models/Grid";
import { EventType } from "../Event";

export class GridView extends Container {
  private _grid: Grid;

  constructor(grid: Grid) {
    super();
    this._grid = grid;
    this.sortableChildren = true;
  }

  //** Create puzzle elements.
  createPuzzlePieces() {
    const positions = [...puzzleGridPositions];
    const types = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];

    while (positions.length > 0) {
      const positionsId = Math.floor(Math.random() * positions.length);
      const positionData = positions[positionsId];
      positions.splice(positionsId, 1);

      const typeId = Math.floor(Math.random() * types.length);
      const typeValue = types[typeId];
      types.splice(typeId, 1);

      const piece = new PuzzlePiece(
        positionData.id,
        typeValue,
        new Point(positionData.x, positionData.y),
        positionData.area
      );
      this.addChild(piece.sprite);
      this._grid.pieces.push(piece);
    }
  }

  //** Remove puzzle elements.
  removePuzzlePieces() {
    for (const piece of this._grid.pieces) {
      this.removeChild(piece.sprite);
    }
    this._grid.pieces = [];
  }

  //** Swap puzzle elements.
  onPieceDragEnd(piece: PuzzlePiece) {
    const pieceToReplace = this._grid.pieces.find(
      (item) =>
        item !== piece &&
        // piece.center to the right of the left side
        piece.sprite.x >= item.left &&
        // piece.center to the left of the right side
        piece.sprite.x <= item.right &&
        // piece.center below the top side
        piece.sprite.y <= item.bottom &&
        // piece.center above the bottom side
        piece.sprite.y >= item.top
    );

    if (pieceToReplace) {
      const replaceField = pieceToReplace.field;
      const replaceArea = pieceToReplace.area;
      pieceToReplace.setPosition(piece.field, piece.area);
      piece.setPosition(replaceField, replaceArea);
      if (this.isWinCombination()) {
        window.dispatchEvent(new Event(EventType.WIN_GAME));
      }
    } else {
      piece.reset();
    }
  }

  //** Check win combination.
  public isWinCombination() {
    for (let areaId = 0; areaId < 4; areaId++) {
      const types = [];

      for (const piece of this._grid.pieces) {
        if (piece.area === areaId) {
          types.push(piece.type);
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
