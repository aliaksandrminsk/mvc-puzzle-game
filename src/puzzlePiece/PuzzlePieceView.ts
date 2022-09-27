import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Point } from "pixi.js";
//import { GridViewViewEvent } from "../_events/GridViewEvent";
import { PuzzlePiece } from "./PuzzlePiece";
import { Sound } from "@pixi/sound";
import { GameEvents } from "../GameEvents";

export class PuzzlePieceView extends PIXI.utils.EventEmitter {
  sprite: PIXI.Sprite;
  touchPosition: Point = new Point(0, 0);
  dragging: boolean = false;
  pieceData: PuzzlePiece;
  clickSound: Sound;

  constructor(type: number, field: Point, area: number) {
    super();
    console.log("PuzzlePieceView constructor");
    this.pieceData = new PuzzlePiece(type, field, area);
    this.sprite = PIXI.Sprite.from(`puzzle${type}`);
    this.sprite.x = field.x;
    this.sprite.y = field.y;
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);
    this.sprite.scale.set(0.5);
    this.sprite.interactive = true;
    this.clickSound = Sound.from(PIXI.Loader.shared.resources.clickSound);
  }

  setEnabled(value: boolean) {
    console.log("setEnabled");
    if (value) {
      this.sprite.on("pointerdown", (e: PIXI.InteractionEvent) =>
        this.onTouchStart(e)
      );
      this.sprite.on("pointermove", (e: PIXI.InteractionEvent) =>
        this.onTouchMove(e)
      );
      this.sprite.on("pointerup", () => this.onTouchEnd());
    } else {
      this.sprite.removeAllListeners("pointerdown");
      this.sprite.removeAllListeners("pointermove");
      this.sprite.removeAllListeners("pointerup");
    }
  }

  onTouchStart(event: PIXI.InteractionEvent) {
    console.log("onTouchStart");

    // 1. save the position of the mouse cursor
    this.touchPosition = new Point(event.data.global.x, event.data.global.y);

    // 2. set the dragging state for this sprite
    this.dragging = true;
    this.sprite.zIndex = 2;
  }

  onTouchMove(event: PIXI.InteractionEvent) {
    console.log("onTouchMove");
    if (!this.dragging) {
      return;
    }

    // 1. get the coordinates of the cursor
    const currentPosition = { x: event.data.global.x, y: event.data.global.y };

    // 2. calculate the offset
    const offsetX = currentPosition.x - this.touchPosition.x;
    const offsetY = currentPosition.y - this.touchPosition.y;

    // 3. apply the resulting offset
    this.sprite.x = this.pieceData.field.x + offsetX;
    this.sprite.y = this.pieceData.field.y + offsetY;
  }

  reset() {
    console.log("reset 1", this.sprite.x, this.sprite.y);
    const tween = new TWEEN.Tween(this.sprite);
    tween.to({ x: this.pieceData.field.x, y: this.pieceData.field.y }, 300);
    tween.onStart(() => {
      this.sprite.zIndex = 1;
    });
    tween.onComplete(() => {
      this.sprite.zIndex = 0;
    });
    tween.easing(TWEEN.Easing.Back.Out);
    tween.start();
    this.sprite.x = this.pieceData.field.x;
    this.sprite.y = this.pieceData.field.y;
    console.log("reset 2", this.sprite.x, this.sprite.y);
  }

  onTouchEnd() {
    console.log("onTouchEnd");
    this.dragging = false;
    this.sprite.zIndex = 1;
    this.emit(GameEvents.DRAG_END);
    this.clickSound.play();
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

  setPosition(field: Point, area: number) {
    this.pieceData.field = field;
    this.pieceData.area = area;
    this.reset();
  }
}
