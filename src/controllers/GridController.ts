import { Grid } from "../models/Grid";
import { GridView } from "../views/GridView";

export class GridController {
  private _grid: Grid;
  private _gridView: GridView;

  constructor(grid: Grid, gridView: GridView) {
    this._grid = grid;
    this._gridView = gridView;
  }

  public setInteractive() {
    for (const piece of this._grid.pieces) {
      piece.sprite.interactive = true;
      piece.on("dragend", () => this._gridView.onPieceDragEnd(piece));
      piece.sprite.on("pointerdown", (e: any) => piece.onTouchStart(e));
      piece.sprite.on("pointermove", (e: any) => piece.onTouchMove(e));
      piece.sprite.on("pointerup", () => piece.onTouchEnd());
    }
  }
}
