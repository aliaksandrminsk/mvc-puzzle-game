import { PuzzlePieceView } from "./PuzzlePieceView";
import { PuzzlePiece } from "./PuzzlePiece";
import { Loader, InteractionEvent, Point } from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { GameEvents } from "../GameEvents";
import { Sound } from "@pixi/sound";

export class PuzzlePieceController {
  public view: PuzzlePieceView;
  public model: PuzzlePiece;

  protected touchPosition: Point = new Point(0, 0);
  protected dragging: boolean = false;
  protected clickSound: Sound;

  constructor(model: PuzzlePiece, view: PuzzlePieceView) {
    this.view = view;
    this.model = model;
    this.clickSound = Sound.from(Loader.shared.resources.clickSound);
  }

  setEnabled(value: boolean) {
    if (value) {
      this.view.sprite.on("pointerdown", (e: InteractionEvent) =>
        this.onTouchStart(e)
      );
      this.view.sprite.on("pointermove", (e: InteractionEvent) =>
        this.onTouchMove(e)
      );
      this.view.sprite.on("pointerup", () => this.onTouchEnd());
    } else {
      this.view.sprite.removeAllListeners("pointerdown");
      this.view.sprite.removeAllListeners("pointermove");
      this.view.sprite.removeAllListeners("pointerup");
    }
  }

  onTouchStart(event: InteractionEvent) {
    // 1. save the position of the mouse cursor
    this.touchPosition = new Point(event.data.global.x, event.data.global.y);

    // 2. set the dragging state for this sprite
    this.dragging = true;
    this.view.sprite.zIndex = 2;
  }

  onTouchMove(event: InteractionEvent) {
    if (!this.dragging) {
      return;
    }

    // 1. get the coordinates of the cursor
    const currentPosition = { x: event.data.global.x, y: event.data.global.y };

    // 2. calculate the offset
    const offsetX = currentPosition.x - this.touchPosition.x;
    const offsetY = currentPosition.y - this.touchPosition.y;

    // 3. apply the resulting offset
    this.view.sprite.x = this.model.field.x + offsetX;
    this.view.sprite.y = this.model.field.y + offsetY;
  }

  reset() {
    const tween = new TWEEN.Tween(this.view.sprite);
    tween.to({ x: this.model.field.x, y: this.model.field.y }, 300);
    tween.onStart(() => {
      this.view.sprite.zIndex = 1;
    });
    tween.onComplete(() => {
      this.view.sprite.zIndex = 0;
    });
    tween.easing(TWEEN.Easing.Back.Out);
    tween.start();
    this.view.sprite.x = this.model.field.x;
    this.view.sprite.y = this.model.field.y;
  }

  onTouchEnd() {
    this.dragging = false;
    this.view.sprite.zIndex = 1;
    this.view.sprite.emit(GameEvents.DRAG_END);
    this.clickSound.play();
  }

  setPosition(field: Point) {
    this.model.field = field;
    this.reset();
  }

  destroy() {
    this.view.sprite.removeAllListeners("pointerdown");
    this.view.sprite.removeAllListeners("pointermove");
    this.view.sprite.removeAllListeners("pointerup");
    this.view.sprite.destroy();
  }
}
