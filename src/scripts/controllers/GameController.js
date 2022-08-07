export class GameController {

    constructor(game, gameView) {
        this._gameModel = game;
        this._gameView = gameView;
        this.initPuzzlePieces();
    }

    initPuzzlePieces() {
        for(let piece of this._gameModel.pieces) {
            piece.on('dragend', () => this._gameView.onPieceDragEnd(piece));
            piece.sprite.on("pointerdown", (e) => piece.onTouchStart(e));
            piece.sprite.on("pointermove", (e) => piece.onTouchMove(e));
            piece.sprite.on("pointerup", (e) => piece.onTouchEnd(e));
        };
    }
}