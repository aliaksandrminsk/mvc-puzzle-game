import { PuzzlePiece } from "../views/PuzzlePiece";
import { EventType } from "../Event";
import * as utils from "@pixi/utils";
import { puzzleGridPositions } from "../config";
import { Point } from "pixi.js";

export class Grid extends utils.EventEmitter {
  public _pieces: Array<PuzzlePiece> = [];

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

      const piece = new PuzzlePiece(
        positionData.id,
        typeValue,
        new Point(positionData.x, positionData.y),
        positionData.area
      );
      pieces.push(piece);
    }
    this.pieces = pieces;
  }

  public clear() {
    this.emit(EventType.CLEAR_GRID);
    this._pieces = [];
  }

  public set pieces(arr: Array<PuzzlePiece>) {
    this._pieces = arr;
    this.emit(EventType.GRID_UPDATED);
  }

  public get pieces() {
    return this._pieces;
  }

  //** Check win combination.
  public isWinCombination() {
    for (let areaId = 0; areaId < 4; areaId++) {
      const types = [];

      for (const piece of this.pieces) {
        if (piece.area === areaId) {
          types.push(piece.type);
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
