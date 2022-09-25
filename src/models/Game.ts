import { Grid } from "./Grid";
import * as utils from "@pixi/utils";
import { GameEvent } from "../events/GameEvent";

export class Game extends utils.EventEmitter {
  protected _grid: Grid;
  protected _state: string = "init";

  constructor() {
    super();
    this._grid = new Grid();
  }

  public get grid(): Grid {
    return this._grid;
  }

  public set state(value: string) {
    this._state = value;
    this.emit(GameEvent.CHANGE_GAME_STATE);
  }

  public get state(): string {
    return this._state;
  }
}
