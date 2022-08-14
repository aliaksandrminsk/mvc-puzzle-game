import { PuzzleGridConfig } from "../PuzzleGridConfig";
import { PuzzlePiece } from "./PuzzlePiece";
import { Game } from "../models/Game";
import { Container, Sprite, Texture } from "pixi.js";
import * as utils from "@pixi/utils";

export class GameView extends utils.EventEmitter {
  public container: Container;
  private readonly grid: Container;
  private _game: Game;
  private bg: Sprite;

  constructor(game: Game) {
    super();
    this._game = game;
    this.container = new Container();
    this.createBackground();

    this.grid = new Container();
    this.grid.sortableChildren = true;
    this.container.addChild(this.grid);
    this.grid.x = window.innerWidth / 2;
    this.grid.y = window.innerHeight / 2;
    this.createPuzzlePieces();
  }

  createBackground() {
    //this.bg = new PIXI.Sprite(Globals.resources["bg"].texture);
    // this.bg = Sprite.from('bg');
    this.bg = new Sprite(Texture.from("bg"));

    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChild(this.bg);
  }

  createPuzzlePieces() {
    //this.pieces = [];

    let ids = PuzzleGridConfig.map((field) => field.id);
    PuzzleGridConfig.forEach((field) => {
      const random = Math.floor(Math.random() * ids.length); // [0, 8]
      const id = ids[random];
      ids = ids.filter((item) => item !== id);

      const piece = new PuzzlePiece(id, field);
      //piece.on('dragend', () => this.onPieceDragEnd(piece));
      this.grid.addChild(piece.sprite);
      this._game.pieces.push(piece);
    });
  }

  onPieceDragEnd(piece) {
    const pieceToReplace = this._game.pieces.find(
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
      const replaceField = pieceToReplace.field;
      pieceToReplace.setField(piece.field);
      piece.setField(replaceField);
    } else {
      piece.reset();
    }
  }
}
