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
  // private table: HTMLDivElement;
  private field: HTMLDivElement;
  fn;

  constructor(el: HTMLElement) {
    this.field = document.createElement("div");
    this.field.classList.add("gameField");
    el.appendChild(this.field);
    const controls: Element = document.createElement("div");
    controls.classList.add("gameControls");
    el.appendChild(controls);
  }

  updateGameField(field: Cell[][]) {
    this.field.innerHTML = "";
    for (let i = 0; i < field.length; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < field[0].length; j++) {
        const cell = document.createElement("div");
        const stateCell = field[i][j] === 1 ? "cell--alive" : "cell--dead";
        cell.setAttribute("row", String(i));
        cell.setAttribute("col", String(j));
        cell.classList.add("cell", stateCell);
        cell.addEventListener("click", () => this.fn(i, j));
        row.appendChild(cell);
      }
      this.field.appendChild(row);
    }
  }

  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }) {}
  // onCellClick(cb: (x: number, y: number) => void) {
  //   return (x: number, y: number) => {
  //     cb(x, y);
  //   };
  // }
  onCellClick(cb: (x: number, y: number) => void) {
    this.fn = (x, y) => cb(x, y);
  }
  onGameStateChange(cb: (newState: boolean) => void) {
    throw new Error("Method not implemented.");
  }
  onFieldSizeChange(cb: (width: number, height: number) => void) {
    throw new Error("Method not implemented.");
  }
}
