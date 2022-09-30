import { GameEvents } from "./GameEvents";
import { globalEvent } from "@billjs/event-emitter";

export class GameModel {
  protected _state: GameSate = GameSate.INTRO;

  public set state(value: GameSate) {
    this._state = value;
    globalEvent.fire(GameEvents.CHANGE_GAME_STATE, value);
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
