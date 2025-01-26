import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

export interface IGame {}

export class Game implements IGame {
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
  }
}
