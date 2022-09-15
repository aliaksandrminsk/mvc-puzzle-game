import { Grid } from "../models/Grid";
import { GridView } from "../views/GridView";

export class GridController {
  private _grid: Grid;
  private _gridView: GridView;

  constructor(grid: Grid, gridView: GridView) {
    this._grid = grid;
    this._gridView = gridView;
  }
}
