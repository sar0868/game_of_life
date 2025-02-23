import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

// export interface IGame {}

export class Game {
  private gameField: GameField;
  private gameView: GameView;
  private stepDurationMs: number;

  constructor(
    gameField: GameField,
    gameView: GameView,
    stepDurationMs: number = 0
  ) {
    this.gameField = gameField;
    this.gameView = gameView;
    this.stepDurationMs = stepDurationMs;

    this.updateField();
  }

  // addFieldAndState(){
  //   const field = this.gameField.getState();
  //   this. gameView.updateGameField(field);

  // }

  updateField() {
    const state: Cell[][] = this.gameField.getState();
    this.gameView.updateGameField(state);
    this.gameView.updateGameState({
      isRunning: false,
      height: state.length,
      width: state[0].length,
    });
    this.toggleCallState();
    // this.gameView.updateGameState(state);
  }

  toggleCallState() {
    this.gameView.onCellClick(this.gameField.toggleCellState);
    const state: Cell[][] = this.gameField.getState();
    this.gameView.updateGameState({
      isRunning: false,
      height: state.length,
      width: state[0].length,
    });
    // this.gameView.updateGameField(state);
    // this.gameView.updateGameField(this.gameField.getState());
  }
}
