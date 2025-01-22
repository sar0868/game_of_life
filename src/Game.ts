import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

export interface IGame {}

export class Game implements IGame {
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
  }
}

//Game - создание поля (GameField), отрисовка игры (GameView), статус игры.
// Поле и кнопки(размеры, старт, пауза?, скорость)
