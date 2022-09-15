import { Grid } from "./Grid";
import * as utils from "@pixi/utils";
import { EventType } from "../Event";

export class Game extends utils.EventEmitter {
  public backgroundTexture: string = "";

  protected _grid: Grid;
  protected _state: string = "";

  constructor(backgroundTexture: string = "") {
    super();
    this._grid = new Grid();
    this.backgroundTexture = backgroundTexture;
  }

  public get grid(): Grid {
    return this._grid;
  }

  public set state(value: string) {
    this._state = value;
    this.emit(EventType.CHANGE_GAME_STATE);
  }

  public get state(): string {
    return this._state;
  }
}
