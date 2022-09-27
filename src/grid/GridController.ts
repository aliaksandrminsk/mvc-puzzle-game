import { GridView } from "./GridView";
import { Grid } from "./Grid";
import { globalEvent, Event } from "@billjs/event-emitter";
//import { GameViewEvent } from "../_events/GameViewEvent";
//import { GameEvent } from "../_events/GameEvent";
//import { gameConstants } from "../GameConstants";
//import { ModalWindowViewEvent } from "../_events/ModalWindowViewEvent";
import { GameEvents } from "../GameEvents";
import { GameSate } from "../GameModel";
//import { GameEvent } from "../_events/GameEvent";
import { GridEvents } from "./GridEvents";
import { PuzzlePieceView } from "../puzzlePiece/PuzzlePieceView";

export class GridController {
  private readonly model: Grid;
  private readonly view: GridView;

  constructor(game: Grid, gameView: GridView) {
    this.model = game;
    this.view = gameView;

    globalEvent.on(GameEvents.CHANGE_GAME_STATE, (e: Event) =>
      this.setGameState(e)
    );

    //** Listener.
    //globalEvent.on(GridEvents.CLEAR_GRID, () => this.clear());
    //globalEvent.on(GridEvents.GRID_UPDATED, () => this.create());

    globalEvent.on(GridEvents.CHANGE_PIECE_POS, () => {
      if (this.model.isWinCombination()) {
        globalEvent.fire(GameEvents.WIN_GAME);
        //this.winGame();
      }
    });

    this.create();
  }

  clear() {
    //console.log("clear");
    for (const piece of this.model.pieces) {
      this.view.container.removeChild(piece.sprite);
      //piece.destroy();
    }
    this.model.pieces = [];
  }

  create() {
    console.log("create");
    this.model.createPuzzlePieces();
    for (const piece of this.model.pieces) {
      this.view.container.addChild(piece.sprite);
    }
  }

  setGameState(event: Event) {
    //this.gameView.hideWindow();
    if (event.data === GameSate.PLAY) {
      // for (const piece of this.model.pieces) {
      //   this.view.enableInteractivity(piece);
      // }
      //console.log("setGameState PLAY");

      this.clear();
      this.create();
      this.enableInteractivity();

      // this.slider.start(gameConstants.GAME_DURATION);
      // this.gameTimer = setTimeout(() => {
      //   this.emit(GameViewEvent.GAME_TIME_FINISHED);
      // }, gameConstants.GAME_DURATION);
    } else {
      // for (const piece of this.model.pieces) {
      //   this.view.disableInteractivity(piece);
      // }
      // console.log("setGameState not PLAY");

      //this.slider.stop();
      this.disableInteractivity();
      //const modalWindow = this.showLosingWindow();
      //modalWindow.once(ModalWindowViewEvent.BUTTON_CLICKED, () => {
      //this.emit(GameViewEvent.AGAIN_BUTTON_CLICKED);
      //});
    } //else if (event.data === GameSate.WIN) {
    //for (const piece of this.model.pieces) {
    // this.view.disableInteractivity(piece);
    //}

    //this.slider.stop();
    //if (this.gameTimer) clearTimeout(this.gameTimer);
    //this.view.disableInteractivity();
    //this.showWinWindow();
    //}
  }

  public enableInteractivity() {
    console.log("enableInteractivity");
    for (const piece of this.model.pieces) {
      piece.on(GameEvents.DRAG_END, () => this.onPieceDragEnd(piece));
      piece.setEnabled(true);
    }
  }

  public disableInteractivity() {
    console.log("disableInteractivity");
    for (const piece of this.model.pieces) {
      piece.removeAllListeners(GameEvents.DRAG_END);
      piece.setEnabled(false);
    }
  }

  //** Swap puzzle elements.
  onPieceDragEnd(piece: PuzzlePieceView) {
    const pieceToReplace = this.model.pieces.find(
      (item) =>
        item !== piece &&
        // piece.center to the right of the left side
        piece.sprite.x >= item.left &&
        // piece.center to the left of the right side
        piece.sprite.x <= item.right &&
        // piece.center below the top side
        piece.sprite.y <= item.bottom &&
        // piece.center above the bottom side
        piece.sprite.y >= item.top
    );

    if (pieceToReplace) {
      console.log(
        "onPieceDragEnd",
        piece.pieceData.field,
        pieceToReplace.pieceData.field
      );

      const replaceField = pieceToReplace.pieceData.field;
      const replaceArea = pieceToReplace.pieceData.area;
      pieceToReplace.setPosition(piece.pieceData.field, piece.pieceData.area);
      piece.setPosition(replaceField, replaceArea);
      //this.emit(GameViewEvent.CHANGE_PIECE_POS);
      globalEvent.fire(GridEvents.CHANGE_PIECE_POS);
    } else {
      piece.reset();
    }
  }
}
