import * as PIXI from "pixi.js";
import { PuzzleGridConfig } from "./PuzzleGridConfig";
import { PuzzlePiece } from "./PuzzlePiece";

export class PuzzleGrid {
    constructor() {
        this.container = new PIXI.Container();
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight / 2;
        this.container.sortableChildren = true;
        this.createPuzzlePieces();
    }

    createPuzzlePieces() {
        this.pieces = [];

        let ids = PuzzleGridConfig.map(field => field.id);

        PuzzleGridConfig.forEach(field => {
            const random = Math.floor(Math.random() * ids.length); // [0, 8]
            const id = ids[random];
            ids = ids.filter(item => item !== id);

            const piece = new PuzzlePiece(id, field);
            piece.on('dragend', () => this.onPieceDragEnd(piece));
            this.container.addChild(piece.sprite);
            this.pieces.push(piece);
        });
    }

    onPieceDragEnd(piece) {
        const pieceToReplace = this.pieces.find(item =>
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