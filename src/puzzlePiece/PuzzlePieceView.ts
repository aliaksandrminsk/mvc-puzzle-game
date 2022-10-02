import { Sprite, Point } from "pixi.js";

export class PuzzlePieceView {
  public sprite: Sprite;

  constructor(type: number) {
    this.sprite = Sprite.from(`puzzle${type}`);
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);
    this.sprite.scale.set(0.5);
    this.sprite.interactive = true;
  }

  setPosition(position: Point) {
    this.sprite.position = position;
  }

  get left() {
    return this.sprite.x - this.sprite.width / 2;
  }

  get right() {
    return this.sprite.x + this.sprite.width / 2;
  }

  get top() {
    return this.sprite.y - this.sprite.height / 2;
  }

  get bottom() {
    return this.sprite.y + this.sprite.height / 2;
  }
}
