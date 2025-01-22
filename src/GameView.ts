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
  private fieldView: HTMLDivElement;
  private field: Cell[][];

  constructor(el: HTMLElement, field: Cell[][] = [[]]) {
    this.fieldView = document.createElement("div");
    this.fieldView.classList.add("gameField");
    el.appendChild(this.fieldView);
    this.updateGameField(field);
    const controls: Element = document.createElement("div");
    controls.classList.add("gameControls");
    el.appendChild(controls);
  }

  displayGameField() {
    this.fieldView.innerHTML = "";
    for (let i = 0; i < this.field.length; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < this.field[0].length; j++) {
        const cell = document.createElement("div");
        const stateCell = this.field[i][j] === 1 ? "cell--alive" : "cell--dead";
        cell.classList.add("cell", stateCell);
        cell.setAttribute("row", i);
        row.appendChild(cell);
      }
      this.fieldView.appendChild(row);
    }
  }

  updateGameField(field: Cell[][]) {
    this.field = field;
    this.displayGameField();
    // this.field.innerHTML = "";
    // for (let i = 0; i < field.length; i++) {
    //   const row = document.createElement("div");
    //   row.classList.add("row");
    //   for (let j = 0; j < field[0].length; j++) {
    //     const cell = document.createElement("div");
    //     const stateCell = field[i][j] === 1 ? "cell--alive" : "cell--dead";
    //     cell.classList.add("cell", stateCell);
    //     row.appendChild(cell);
    //   }
    //   this.field.appendChild(row);
    // }
  }

  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }) {}
  onCellClick(cb: (x: number, y: number) => void) {
    this.fieldView.children.forEach((cell) => {
      x = cell.getClass();
    });
    throw new Error("Method not implemented.");
  }
  onGameStateChange(cb: (newState: boolean) => void) {
    throw new Error("Method not implemented.");
  }
  onFieldSizeChange(cb: (width: number, height: number) => void) {
    throw new Error("Method not implemented.");
  }
}
