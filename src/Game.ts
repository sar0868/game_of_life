import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

// export interface IGame {}

export class Game {
  private gameField: IGameField;
  private gameView: IGameView;
  private stepDurationMs: number;

  constructor(
    gameField: GameField,
    gameView: GameView,
    stepDurationMs: number = 0
  ) {
    this.gameField = gameField;
    this.gameView = gameView;
    this.stepDurationMs = stepDurationMs;

    this.addField();
    this.toggleCallState();
  }

  addField() {
    const state: Cell[][] = this.gameField.getState();
    this.gameView.updateGameField(state);
    this.gameView.updateGameState({
      isRunning: false,
      width: state[0].length,
      height: state.length,
    });
  }

  toggleCallState() {
    this.gameView.onCellClick(this.gameField.toggleCellState);
    this.gameView.updateGameField(this.gameField.getState());
  }
}
