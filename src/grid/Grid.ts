import { PuzzlePieceView } from "../puzzlePiece/PuzzlePieceView";
//import * as utils from "@pixi/utils";
import { puzzleGridPositions } from "../config";
import { Point } from "pixi.js";
//import { GameEvent } from "../_events/GameEvent";
//import { GridEvents } from "./GridEvents";
//import { globalEvent } from "@billjs/event-emitter";

export class Grid {
  public _pieces: Array<PuzzlePieceView> = [];

  //constructor() {
  //this.createPuzzlePieces();
  //}

  //** Create puzzle pieces.
  public createPuzzlePieces() {
    const positions = [...puzzleGridPositions];
    const types = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
    const pieces = [];

    while (positions.length > 0) {
      const positionsId = Math.floor(Math.random() * positions.length);
      const positionData = positions[positionsId];
      positions.splice(positionsId, 1);

      const typeId = Math.floor(Math.random() * types.length);
      const typeValue = types[typeId];
      types.splice(typeId, 1);

      const piece = new PuzzlePieceView(
        typeValue,
        new Point(positionData.x, positionData.y),
        positionData.area
      );
      pieces.push(piece);
    }
    this.pieces = pieces;
  }

  //** Clear puzzle pieces.
  //public clear() {
  //globalEvent.fire(GridEvents.CLEAR_GRID);
  //this._pieces = [];
  //}

  //** Setter/Getter pieces.
  public set pieces(arr: Array<PuzzlePieceView>) {
    this._pieces = arr;
    //globalEvent.fire(GridEvents.GRID_UPDATED);
  }

  public get pieces() {
    return this._pieces;
  }

  //** Check win combination.
  public isWinCombination() {
    for (let areaId = 0; areaId < 4; areaId++) {
      const types = [];

      for (const piece of this.pieces) {
        if (piece.pieceData.area === areaId) {
          types.push(piece.pieceData.type);
        }
      }
      if (types.length !== 4) {
        return false;
      }
      for (let index = 1; index < types.length; index++) {
        if (types[index - 1] != types[index]) {
          return false;
        }
      }
    }
    return true;
  }
}
