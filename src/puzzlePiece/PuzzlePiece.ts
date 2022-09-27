import { Point } from "pixi.js";

export class PuzzlePiece {
  field: Point;
  type: number;
  area: number;

  constructor(type: number, field: Point, area: number) {
    this.type = type;
    this.field = field;
    this.area = area;
  }
}
