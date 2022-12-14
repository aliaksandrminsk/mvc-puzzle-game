import { GameEvents } from "./GameEvents";
import { globalEvent } from "@billjs/event-emitter";

export class GameModel {
  protected _state: GameSate = GameSate.INTRO;
  protected _score = 0;

  public set state(value: GameSate) {
    this._state = value;
    globalEvent.fire(GameEvents.CHANGE_GAME_STATE, value);
  }

  public get state(): GameSate {
    return this._state;
  }

  public set score(value: number) {
    this._score = value;
    globalEvent.fire(GameEvents.SCORE_UPDATED, value);
  }

  public get score(): number {
    return this._score;
  }
}

export enum GameSate {
  INTRO,
  PLAY,
  WIN,
  LOSE,
}
