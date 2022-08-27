import { puzzleGridPositions, puzzleGridTypes } from "../config";
import { PuzzlePiece } from "./PuzzlePiece";
import { Container, Point } from "pixi.js";
import { Grid } from "../models/Grid";

export class GridView extends Container {
  private _grid: Grid;

  constructor(grid: Grid) {
    super();
    this._grid = grid;
    this.sortableChildren = true;
  }

  createPuzzlePieces() {
    let positions = [...puzzleGridPositions];
    let types = [...puzzleGridTypes];

    puzzleGridPositions.forEach((field) => {
      const positionsId = Math.floor(Math.random() * positions.length);
      const positionData = positions[positionsId];
      positions = positions.filter((item) => item.id !== positionData.id);

      const typeId = Math.floor(Math.random() * types.length);
      const typeData = types[typeId];
      types = types.filter((item) => item.id !== typeData.id);

      const piece = new PuzzlePiece(
        positionData.id,
        typeData.type,
        new Point(field.x, field.y)
      );
      //piece.on('dragend', () => this.onPieceDragEnd(piece));

      this.addChild(piece.sprite);
      this._grid.pieces.push(piece);
    });
  }

  removePuzzlePieces() {
    for (const piece of this._grid.pieces) {
      this.removeChild(piece.sprite);
    }
    this._grid.pieces = [];
  }

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
      pieceToReplace.setField(piece.field);
      piece.setField(replaceField);
    } else {
      piece.reset();
    }
  }
}
