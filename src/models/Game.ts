import { Grid } from "./Grid";

export class Game {
  protected _grid: Grid;
  public backgroundTexture: string = "";

  constructor() {
    this._grid = new Grid();
  }

  public get grid(): Grid {
    return this._grid;
  }
}
