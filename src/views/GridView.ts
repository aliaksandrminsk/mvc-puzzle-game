import { PuzzlePiece } from "./PuzzlePiece";
import { Container } from "pixi.js";
import { Grid } from "../models/Grid";
import { GameEvent } from "../events/GameEvent";
import { GameViewEvent } from "../events/GameViewEvent";
import * as utils from "@pixi/utils";

export class GridView extends utils.EventEmitter {
  private readonly _grid: Grid;
  public container: Container;

  constructor(grid: Grid) {
    super();
    this._grid = grid;
    this.container = new Container();
    this.container.sortableChildren = true;
    this.container.pivot.set(-75, 75);

    //** Listener.
    this.grid.on(GameEvent.CLEAR_GRID, () => this.clear());
    this.grid.on(GameEvent.GRID_UPDATED, () => this.create());
  }

  get grid(): Grid {
    return this._grid;
  }

  //** Create puzzle elements.
  create() {
    for (const piece of this.grid.pieces) {
      this.container.addChild(piece.sprite);
    }
  }

  //** Remove puzzle elements.
  clear() {
    for (const piece of this.grid.pieces) {
      this.container.removeChild(piece.sprite);
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
      this.emit(GameViewEvent.CHANGE_PIECE_POS);
    } else {
      piece.reset();
    }
  }
}
