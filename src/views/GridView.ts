import { PuzzlePiece } from "./PuzzlePiece";
import { Container } from "pixi.js";
import { Grid } from "../models/Grid";
import { EventType } from "../Event";

export class GridView extends Container {
  private readonly _grid: Grid;

  constructor(grid: Grid) {
    super();
    this._grid = grid;
    this.sortableChildren = true;

    //** Listener.
    this.grid.on(EventType.CLEAR_GRID, () => this.removePuzzlePieces());
  }

  get grid(): Grid {
    return this._grid;
  }

  //** Create puzzle elements.
  createPuzzlePieces() {
    for (const piece of this.grid.pieces) {
      this.addChild(piece.sprite);
    }
  }

  //** Remove puzzle elements.
  removePuzzlePieces() {
    for (const piece of this.grid.pieces) {
      this.removeChild(piece.sprite);
    }
  }

  public enableInteractivity() {
    for (const piece of this._grid.pieces) {
      piece.on("dragend", () => this.onPieceDragEnd(piece));
      piece.setEnabled(true);
    }
  }

  public disableInteractivity() {
    for (const piece of this._grid.pieces) {
      piece.removeAllListeners("dragend");
      piece.setEnabled(false);
    }
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
      this.emit("pieceSwap");
    } else {
      piece.reset();
    }
  }
}
