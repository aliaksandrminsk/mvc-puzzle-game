import { GameModel, GameSate } from "./GameModel";
import { GameView } from "./GameView";
import { gameConstants } from "./GameConstants";
import { globalEvent } from "@billjs/event-emitter";
import { GridController } from "./grid/GridController";
import { PopUpController } from "./popUps/PopUpController";
import { GameEvents } from "./GameEvents";
import { TimerSliderController } from "./timerSlider/TimerSliderController";

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

    //** Add listeners to the GameController.
    globalEvent.on(GameEvents.START_BUTTON_CLICKED, () => this.startGame());
    globalEvent.on(GameEvents.AGAIN_BUTTON_CLICKED, () => this.startGame());
    globalEvent.on(GameEvents.WIN_GAME, () => this.winGame());
  }

  //** Set state when user play a game.
  public startGame() {
    this.gameModel.state = GameSate.PLAY;
    this.timerSliderController.start(gameConstants.GAME_DURATION);
    this.gameTimer = setTimeout(() => {
      this.loseGame();
    }, gameConstants.GAME_DURATION);
  }

  //** Set state of lose game.
  public loseGame() {
    this.timerSliderController.stop();
    this.gameModel.state = GameSate.LOSE;
  }

  //** Set state of win game.
  public winGame() {
    this.timerSliderController.stop();
    this.gameModel.state = GameSate.WIN;
    if (this.gameTimer) clearTimeout(this.gameTimer);
  }
}
