//import { BasePopUp } from "./BasePopUp";
import { IntroPopUp } from "./IntroPopUp";
import { LosingPopUp } from "./LosingPopUp";
import { WinPopUp } from "./WinPopUp";
//import { ModalWindowViewEvent } from "../_events/ModalWindowViewEvent";
import { globalEvent, Event } from "@billjs/event-emitter";
//import { GameViewEvent } from "../_events/GameViewEvent";
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
    // const modalWindow = this.showInstructionWindow();
    // (modalWindow as IntroPopUp).button.once(
    //   ModalWindowViewEvent.BUTTON_CLICKED,
    //   () => {
    //     globalEvent.fire(GameViewEvent.START_BUTTON_CLICKED);
    //     //this.emit(GameViewEvent.START_BUTTON_CLICKED);
    //   }
    // );
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

  //** Show instruction modal window.
  // showInstructionWindow(): BasePopUp {
  //   this.view = new IntroPopUp();
  //   this.container.addChild(this.modalWindow.view);
  //   return this.modalWindow;
  // }
  //
  // //** Show losing modal window.
  // showLosingWindow(): BasePopUp {
  //   this.modalWindow = new LosingPopUp();
  //   this.container.addChild(this.modalWindow.view);
  //   return this.modalWindow;
  // }
  //
  // //** Show win modal window.
  // showWinWindow() {
  //   this.modalWindow = new WinPopUp();
  //   this.container.addChild(this.modalWindow.view);
  // }
  //
  // //** Hide modal window.
  // hideWindow() {
  //   if (this.modalWindow) {
  //     this.container.removeChild(this.modalWindow.view);
  //     this.modalWindow.destroy();
  //   }
  // }
}
