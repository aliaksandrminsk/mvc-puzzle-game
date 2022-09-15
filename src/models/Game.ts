import { Grid } from "./Grid";

export class Game {
  protected _grid: Grid;
  public backgroundTexture: string = "";

  constructor(backgroundTexture: string = "") {
    this._grid = new Grid();
    this.backgroundTexture = backgroundTexture;
  }

  public get grid(): Grid {
    return this._grid;
  }
}
