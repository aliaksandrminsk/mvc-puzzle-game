import { puzzleGridPositions, puzzleGridTypes } from "../config";
import { PuzzlePiece } from "./PuzzlePiece";
import { Game } from "../models/Game";
import { Container, Sprite, Texture } from "pixi.js";
import * as utils from "@pixi/utils";
import { Point, Text } from "pixi.js";
import { InstructionWindow } from "./windows/InstructionWindow";
import { ModalWindow } from "./windows/ModalWindow";
import { LosingWindow } from "./windows/LosingWindow";
import { WinWindow } from "./windows/WinWindow";

export class GameView extends utils.EventEmitter {
  public container: Container;
  private grid: Container | null = null;
  private _game: Game;
  private bg: Sprite | null = null;
  private modalWindow: ModalWindow | null = null;

  constructor(game: Game) {
    super();
    this._game = game;
    this.container = new Container();
    this.createBackground();

    const title = new Text("This is a PixiJS text", {
      fontFamily: "Arial",
      fontSize: 36,
      fill: 0xff1010,
      align: "center",
    });
    this.container.addChild(title);
    title.anchor.set(0.5);
    title.position.set(window.innerWidth / 2, 50);
  }

  createBackground() {
    this.bg = new Sprite(Texture.from("bg"));
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChildAt(this.bg, 0);
  }

  createGrid() {
    this.grid = new Container();
    this.grid.sortableChildren = true;
    this.container.addChildAt(this.grid, 1);
    this.createPuzzlePieces();
    this.grid.pivot.set(-75, 75);
    this.grid.x = window.innerWidth / 2 - this.grid.width / 2;
    this.grid.y = window.innerHeight / 2 - this.grid.height / 2;
  }

  removeGrid() {
    if (this.grid) {
      this.container.removeChild(this.grid);
    }
    this.grid = null;
    this._game.pieces = [];
  }

  // removePuzzlePieces() {
  //   //this._game.pieces.push(piece);
  //   for (let item of this._game.pieces) {
  //     this.grid.removeChild(piece.sprite);
  //   }
  // }

  createPuzzlePieces() {
    let positions = [...puzzleGridPositions];
    let types = [...puzzleGridTypes];

    puzzleGridPositions.forEach((field) => {
      const positionsId = Math.floor(Math.random() * positions.length);
      const positionData = positions[positionsId];
      positions = positions.filter((item) => item.id !== positionData.id);

      const typeId = Math.floor(Math.random() * types.length);
      const typeData = types[typeId];
      types = types.filter((item) => item.id !== typeData.id);

      const piece = new PuzzlePiece(
        positionData.id,
        typeData.type,
        new Point(field.x, field.y)
      );
      //piece.on('dragend', () => this.onPieceDragEnd(piece));
      if (this.grid) {
        this.grid.addChild(piece.sprite);
        this._game.pieces.push(piece);
      }
    });
  }

  onPieceDragEnd(piece: PuzzlePiece) {
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

  showInstructionWindow() {
    this.modalWindow = new InstructionWindow();
    this.container.addChildAt(this.modalWindow.view, 2);

    this.modalWindow.view.x = window.innerWidth / 2;
    this.modalWindow.view.y = window.innerHeight / 2;
  }

  showLosingWindow() {
    this.modalWindow = new LosingWindow();
    this.container.addChildAt(this.modalWindow.view, 2);

    this.modalWindow.view.x = window.innerWidth / 2;
    this.modalWindow.view.y = window.innerHeight / 2;
  }
  showWinWindow() {
    this.modalWindow = new WinWindow();
    this.container.addChildAt(this.modalWindow.view, 2);

    this.modalWindow.view.x = window.innerWidth / 2;
    this.modalWindow.view.y = window.innerHeight / 2;
  }

  hideWindow() {
    if (this.modalWindow) {
      this.container.removeChild(this.modalWindow.view);
      this.modalWindow.destroy();
    }
  }
}
