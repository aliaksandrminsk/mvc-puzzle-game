import { Grid } from "../models/Grid";
import { GridView } from "../views/GridView";
import * as PIXI from "pixi.js";

export class GridController {
  private _grid: Grid;
  private _gridView: GridView;

  constructor(grid: Grid, gridView: GridView) {
    this._grid = grid;
    this._gridView = gridView;
  }

  public enableInteractivity() {
    for (const piece of this._grid.pieces) {
      piece.sprite.interactive = true;
      piece.on("dragend", () => this._gridView.onPieceDragEnd(piece));
      piece.sprite.on("pointerdown", (e: PIXI.InteractionEvent) =>
        piece.onTouchStart(e)
      );
      piece.sprite.on("pointermove", (e: PIXI.InteractionEvent) =>
        piece.onTouchMove(e)
      );
      piece.sprite.on("pointerup", () => piece.onTouchEnd());
    }
  }

  public disableInteractivity() {
    for (const piece of this._grid.pieces) {
      piece.sprite.interactive = false;
      piece.removeAllListeners("dragend");
      piece.sprite.removeAllListeners("pointerdown");
      piece.sprite.removeAllListeners("pointermove");
      piece.sprite.removeAllListeners("pointerup");
    }
  }
}
