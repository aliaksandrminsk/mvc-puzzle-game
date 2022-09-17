import { Grid } from "../models/Grid";
import { GridView } from "../views/GridView";

export class GridController {
  private readonly _grid: Grid;
  private readonly _gridView: GridView;

  constructor(grid: Grid, gridView: GridView) {
    this._grid = grid;
    this._gridView = gridView;
  }

  public get grid(): Grid {
    return this._grid;
  }

  public get gridView(): GridView {
    return this._gridView;
  }
}
