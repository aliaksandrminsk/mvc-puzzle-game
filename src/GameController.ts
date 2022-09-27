import { GameModel, GameSate } from "./GameModel";
import { GameView } from "./GameView";
import { gameConstants } from "./GameConstants";
import { globalEvent } from "@billjs/event-emitter";
import { GridController } from "./grid/GridController";
import { PopUpController } from "./popUps/PopUpController";
import { GameEvents } from "./GameEvents";

export class GameController {
  private readonly gameModel: GameModel;
  private readonly gameView: GameView;

  protected gridController: GridController;
  protected popUpController: PopUpController;

  private gameTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(game: GameModel, gameView: GameView) {
    this.gameModel = game;
    this.gameView = gameView;

    this.gridController = new GridController(
      this.gameModel.grid,
      this.gameView.gridView
    );
    this.gameView.gridView.container.x =
      this.gameView.container.width / 2 -
      this.gameView.gridView.container.width / 2;
    this.gameView.gridView.container.y =
      this.gameView.container.height / 2 -
      this.gameView.gridView.container.height / 2;

    this.popUpController = new PopUpController();
    this.popUpController.intro = this.gameView.introPopUp;
    this.popUpController.win = this.gameView.winPopUp;
    this.popUpController.losing = this.gameView.losingPopUp;
    this.popUpController.intro.show();

    //** Add listeners to the GameController.
    globalEvent.on(GameEvents.START_BUTTON_CLICKED, () => this.startGame());
    globalEvent.on(GameEvents.AGAIN_BUTTON_CLICKED, () => this.startGame());
    globalEvent.on(GameEvents.WIN_GAME, () => this.winGame());

    //globalEvent.on(GameEvent.CHANGE_GAME_STATE, () => this.setGameState());

    // this.gameView.gridView.on(GameViewEvent.CHANGE_PIECE_POS, () => {
    //   if (this.gameModel.grid.isWinCombination()) {
    //     this.winGame();
    //   }
    // });
  }

  //** Set state when user play a game.
  public startGame() {
    this.gameModel.state = GameSate.PLAY;
    //this.gameModel.grid.clear();
    //this.gameModel.grid.createPuzzlePieces();
    this.gameView.slider.start(gameConstants.GAME_DURATION);
    this.gameTimer = setTimeout(() => {
      this.loseGame();
      //globalEvent.fire(GameEvents.GAME_TIME_FINISHED);
      //this.emit(GameViewEvent.GAME_TIME_FINISHED);
    }, gameConstants.GAME_DURATION);
  }

  //** Set state of lose game.
  public loseGame() {
    this.gameView.slider.stop();
    this.gameModel.state = GameSate.LOSE;
  }

  //** Set state of win game.
  public winGame() {
    this.gameView.slider.stop();
    this.gameModel.state = GameSate.WIN;
    if (this.gameTimer) clearTimeout(this.gameTimer);
  }

  // setGameState() {
  //   this.gameView.hideWindow();
  //
  //   if (this.game.state === "start") {
  //     this.gridView.enableInteractivity();
  //     this.slider.start(gameConstants.GAME_DURATION);
  //     this.gameTimer = setTimeout(() => {
  //       this.emit(GameViewEvent.GAME_TIME_FINISHED);
  //     }, gameConstants.GAME_DURATION);
  //   } else if (this.game.state === "lose") {
  //     this.slider.stop();
  //     this.gridView.disableInteractivity();
  //     const modalWindow = this.showLosingWindow();
  //     modalWindow.once(ModalWindowViewEvent.BUTTON_CLICKED, () => {
  //       this.emit(GameViewEvent.AGAIN_BUTTON_CLICKED);
  //     });
  //   } else if (this.game.state === "win") {
  //     this.slider.stop();
  //     if (this.gameTimer) clearTimeout(this.gameTimer);
  //     this.gridView.disableInteractivity();
  //     this.showWinWindow();
  //   }
  // }
}
