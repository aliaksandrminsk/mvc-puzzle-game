import { IntroPopUp } from "./IntroPopUp";
import { LosingPopUp } from "./LosingPopUp";
import { WinPopUp } from "./WinPopUp";
import { globalEvent, Event } from "@billjs/event-emitter";

import { GameEvents } from "../GameEvents";
import { GameSate } from "../GameModel";

export class PopUpController {
  public intro: IntroPopUp | null = null;
  public losing: LosingPopUp | null = null;
  public win: WinPopUp | null = null;

  constructor() {
    globalEvent.on(GameEvents.CHANGE_GAME_STATE, (e: Event) =>
      this.setGameState(e)
    );
  }

  setGameState(e: Event) {
    this.hidePopUps();
    if (e.data === GameSate.INTRO) {
      if (this.intro) this.intro.show();
    } else if (e.data === GameSate.LOSE) {
      if (this.losing) this.losing.show();
    } else if (e.data === GameSate.WIN) {
      if (this.win) this.win.show();
    }
  }

  protected hidePopUps() {
    if (this.intro) this.intro.hide();
    if (this.losing) this.losing.hide();
    if (this.win) this.win.hide();
  }
}
