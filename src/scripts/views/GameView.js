import {PuzzleGridConfig} from "../PuzzleGridConfig";
import * as PIXI from "pixi.js";
import {PuzzlePiece} from "./PuzzlePiece";

export class GameView extends PIXI.utils.EventEmitter {
    constructor(game) {
        super();
        this._game = game;
        this.container = new PIXI.Container();
        this.createBackground();

        this.grid = new PIXI.Container();
        this.grid.sortableChildren = true;
        this.container.addChild(this.grid);
        this.grid.x = window.innerWidth / 2;
        this.grid.y = window.innerHeight / 2;
        this.createPuzzlePieces();
    }

    createBackground() {
        //this.bg = new PIXI.Sprite(Globals.resources["bg"].texture);
        this.bg = PIXI.Sprite.from('bg');
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    }

    createPuzzlePieces() {
        //this.pieces = [];

        let ids = PuzzleGridConfig.map(field => field.id);
        PuzzleGridConfig.forEach(field => {
            const random = Math.floor(Math.random() * ids.length); // [0, 8]
            const id = ids[random];
            ids = ids.filter(item => item !== id);

            const piece = new PuzzlePiece(id, field);
            //piece.on('dragend', () => this.onPieceDragEnd(piece));
            this.grid.addChild(piece.sprite);
            this._game.pieces.push(piece);
        });
    }

    onPieceDragEnd(piece) {
        const pieceToReplace =  this._game.pieces.find(item =>
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