import { Cell } from "./types/Cell";

export interface IGameView {
  updateGameField(field: Cell[][]);
  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  });
  onCellClick(cb: (x: number, y: number) => void);
  onGameStateChange(cb: (newState: boolean) => void);
  onFieldSizeChange(cb: (width: number, height: number) => void);
}

export class GameView implements IGameView {
  private table: HTMLDivElement;

  constructor(el: HTMLElement) {
    const field: Element = document.createElement("div");
    field.classList.add("gameField");
    el.appendChild(field);
    const controls: Element = document.createElement("div");
    controls.classList.add("gameControls");
    el.appendChild(controls);
    this.table = document.createElement("div");
    this.table.classList.add("table");
  }

  updateGameField(field: Cell[][]) {
    for (let i = 0; i < field.length; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < field[0].length; j++) {
        const cell = document.createElement("div");
        const stateCell = field[i][j] === 1 ? "cell--alive" : "cell--dead";
        cell.classList.add("cell", stateCell);
        row.appendChild(cell);
      }
      this.table.appendChild(row);
    }
    // el.appendChild(table);
  }

  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }) {}
  onCellClick(cb: (x: number, y: number) => void) {
    throw new Error("Method not implemented.");
  }
  onGameStateChange(cb: (newState: boolean) => void) {
    throw new Error("Method not implemented.");
  }
  onFieldSizeChange(cb: (width: number, height: number) => void) {
    throw new Error("Method not implemented.");
  }
}
