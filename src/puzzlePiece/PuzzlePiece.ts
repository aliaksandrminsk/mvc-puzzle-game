import { Point } from "pixi.js";

export class PuzzlePiece {
  field: Point;
  type: number;

  constructor(type: number, field: Point) {
    this.type = type;
    this.field = field;
  }
}
