import { Grid } from "./grid/Grid";
import { GameEvents } from "./GameEvents";
import { globalEvent } from "@billjs/event-emitter";

export class GameModel {
  protected _grid: Grid;
  protected _state: GameSate = GameSate.INTRO;

  constructor() {
    this._grid = new Grid();
  }

  public get grid(): Grid {
    return this._grid;
  }

  public set state(value: GameSate) {
    this._state = value;
    globalEvent.fire(GameEvents.CHANGE_GAME_STATE, value);
    //this.emit(GameEvent.CHANGE_GAME_STATE);
  }

  public get state(): GameSate {
    return this._state;
  }
}

export enum GameSate {
  INTRO,
  PLAY,
  WIN,
  LOSE,
}
