import { GameModel, GameSate } from "./GameModel";
import { GameView } from "./GameView";
import { gameConstants } from "./GameConstants";
import { globalEvent, Event } from "@billjs/event-emitter";
import { GridController } from "./grid/GridController";
import { PopUpController } from "./popUps/PopUpController";
import { GameEvents } from "./GameEvents";
import { TimerSliderController } from "./timerSlider/TimerSliderController";
import { AbstractRenderer } from "pixi.js";

export class GameController {
  private readonly gameModel: GameModel;
  private readonly gameView: GameView;

  protected gridController: GridController;
  protected popUpController: PopUpController;
  protected timerSliderController: TimerSliderController;

  private gameTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(game: GameModel, gameView: GameView) {
    this.gameModel = game;
    this.gameView = gameView;

    //** Create controllers.
    this.gridController = new GridController(this.gameView.gridView);
    this.gameView.setGridPosition();

    this.popUpController = new PopUpController();
    this.popUpController.intro = this.gameView.introPopUp;
    this.popUpController.win = this.gameView.winPopUp;
    this.popUpController.losing = this.gameView.losingPopUp;
    this.popUpController.intro.show();

    this.timerSliderController = new TimerSliderController(
      this.gameView.slider
    );

    //** Add listeners to GameController.
    globalEvent.on(GameEvents.START_BUTTON_CLICKED, () => this.startGame());
    globalEvent.on(GameEvents.AGAIN_BUTTON_CLICKED, () => this.startGame());
    globalEvent.on(GameEvents.FRUITS_MERGED, (e) => this.mergeFruits(e));
    globalEvent.on(GameEvents.SCORE_UPDATED, () => this.updateScoreText());
  }

  //** Handler of click event to start or again button.
  public startGame() {
    this.gameModel.score = 0;
    this.gameModel.state = GameSate.PLAY;
    this.timerSliderController.start(gameConstants.GAME_DURATION);
    this.gameTimer = setTimeout(() => {
      this.loseGame();
    }, gameConstants.GAME_DURATION);
  }

  //** Handler of losing game.
  public loseGame() {
    this.timerSliderController.stop();
    this.gameModel.state = GameSate.LOSE;
  }

  //** Handler when fruits were merged.
  public mergeFruits(event: Event) {
    this.gameModel.score++;
    const isWinGame = event.data;
    if (isWinGame) {
      this.timerSliderController.stop();
      this.gameModel.state = GameSate.WIN;
      if (this.gameTimer) clearTimeout(this.gameTimer);
    }
  }

  //** Handler of updating score in model.
  updateScoreText() {
    this.gameView.scoreText.text = "Score: " + this.gameModel.score;
    this.gameView.setScoreTextPosition();
  }

  // Resize game.
  resize(renderer: AbstractRenderer) {
    let w = gameConstants.GAME_AREA_SIZE_L;
    let h = gameConstants.GAME_AREA_SIZE_S;

    let heightRatio = 1,
      widthRation = 1;
    if (w > document.body.clientWidth) {
      widthRation = w / document.body.clientWidth;
    }
    if (h > document.body.clientHeight) {
      heightRatio = h / document.body.clientHeight;
    }
    if (widthRation > heightRatio) {
      h = h / widthRation;
      w = w / widthRation;
    } else {
      h = h / heightRatio;
      w = w / heightRatio;
    }
    renderer.view.style.width = w + "px";
    renderer.view.style.height = h + "px";
  }
}
