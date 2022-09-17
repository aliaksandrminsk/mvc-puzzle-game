import { PuzzlePiece } from "../views/PuzzlePiece";
import * as utils from "@pixi/utils";
import { puzzleGridPositions } from "../config";
import { Point } from "pixi.js";
import { GameEvent } from "../events/GameEvent";

export class Grid extends utils.EventEmitter {
  public _pieces: Array<PuzzlePiece> = [];

  constructor() {
    super();
    this.createPuzzlePieces();
  }

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

  //** Clear puzzle pieces.
  public clear() {
    this.emit(GameEvent.CLEAR_GRID);
    this._pieces = [];
  }

  //** Setter/Getter pieces.
  public set pieces(arr: Array<PuzzlePiece>) {
    this._pieces = arr;
    this.emit(GameEvent.GRID_UPDATED);
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
