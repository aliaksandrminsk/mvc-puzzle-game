//import { PuzzlePieceView } from "../puzzlePiece/PuzzlePieceView";
import { Container } from "pixi.js";
//import * as PIXI from "pixi.js";
//import { Grid } from "./Grid";
//import { GameEvent } from "../_events/GameEvent";
//import { GameViewEvent } from "../_events/GameViewEvent";
//import * as utils from "@pixi/utils";
//import { GridViewViewEvent } from "../_events/GridViewEvent";
//import { globalEvent } from "@billjs/event-emitter";
//import { GridEvents } from "./GridEvents";
//import { GameEvents } from "../GameEvents";

export class GridView {
  //private readonly _grid: Grid;
  public container: Container;

  constructor() {
    //super();
    //this._grid = grid;
    this.container = new Container();
    this.container.sortableChildren = true;
    this.container.pivot.set(-75, 75);

    // this.container.interactive = true;
    // this.container.on("pointerdown", () => {
    //   console.log("pointerdown 12");
    // });

    // //** Listener.
    // this.grid.on(GameEvent.CLEAR_GRID, () => this.clear());
    // this.grid.on(GameEvent.GRID_UPDATED, () => this.create());
  }

  // get grid(): Grid {
  //   return this._grid;
  // }

  //** Create puzzle elements.
  // create(pieces: Array<PuzzlePieceView>) {
  //   for (const piece of pieces) {
  //     this.container.addChild(piece.sprite);
  //   }
  // }
  //
  // //** Remove puzzle elements.
  // clear(pieces: Array<PuzzlePieceView>) {
  //   for (const piece of pieces) {
  //     this.container.removeChild(piece.sprite);
  //   }
  // }

  // public enableInteractivity() {
  //   for (const piece of this._grid.pieces) {
  //     piece.on(GameEvents.DRAG_END, () => this.onPieceDragEnd(piece));
  //     piece.setEnabled(true);
  //   }
  // }
  //
  // public disableInteractivity() {
  //   for (const piece of this._grid.pieces) {
  //     piece.removeAllListeners(GameEvents.DRAG_END);
  //     piece.setEnabled(false);
  //   }
  // }
  //
  // //** Swap puzzle elements.
  // onPieceDragEnd(piece: PuzzlePieceView) {
  //   const pieceToReplace = this._grid.pieces.find(
  //     (item) =>
  //       item !== piece &&
  //       // piece.center to the right of the left side
  //       piece.sprite.x >= item.left &&
  //       // piece.center to the left of the right side
  //       piece.sprite.x <= item.right &&
  //       // piece.center below the top side
  //       piece.sprite.y <= item.bottom &&
  //       // piece.center above the bottom side
  //       piece.sprite.y >= item.top
  //   );
  //
  //   if (pieceToReplace) {
  //     const replaceField = pieceToReplace.pieceData.field;
  //     const replaceArea = pieceToReplace.pieceData.area;
  //     pieceToReplace.setPosition(piece.pieceData.field, piece.pieceData.area);
  //     piece.setPosition(replaceField, replaceArea);
  //     //this.emit(GameViewEvent.CHANGE_PIECE_POS);
  //     globalEvent.fire(GridEvents.CHANGE_PIECE_POS);
  //   } else {
  //     piece.reset();
  //   }
  // }
}
