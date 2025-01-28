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
  private fnCellClick: (x: number, y: number) => void;
  private btnRun: HTMLButtonElement;
  private heightSize: HTMLInputElement;
  private widthSize: HTMLInputElement;

  constructor(el: HTMLElement) {
    this.field = document.createElement("div");
    this.field.classList.add("gameField");
    el.appendChild(this.field);
    el.appendChild(this.addControls());
  }

  addControls(): Element {
    const controls: Element = document.createElement("div");
    controls.classList.add("gameControls");
    this.btnRun = document.createElement("button");
    this.btnRun.classList.add("run-button", "run-button--stopped");
    this.btnRun.innerHTML = "Play";
    controls.appendChild(this.btnRun);

    this.heightSize = document.createElement("input");

    this.heightSize.classList.add(".field-size.field-size--height");
    this.widthSize = document.createElement("input");
    this.widthSize.setAttribute("type", "number");
    this.widthSize.classList.add(".field-size.field-size--width");
    controls.appendChild(this.heightSize);
    controls.appendChild(this.widthSize);

    return controls;
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
        cell.addEventListener("click", () => this.fnCellClick(i, j));
        row.appendChild(cell);
      }
      this.field.appendChild(row);
    }
  }

  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }) {
    const classesBtn = this.btnRun.classList;
    if (state.isRunning) {
      if (classesBtn.contains("run-button--stopped")) {
        classesBtn.replace("run-button--stopped", "run-button--runned");
        this.btnRun.innerHTML = "Stop";
      }
    } else {
      if (classesBtn.contains("run-button--runned"))
        classesBtn.replace("run-button--runned", "run-button--stopped");
      this.btnRun.innerHTML = "Play";
    }
    this.heightSize.value = String(state.height);
    this.widthSize.value = "3";
  }
  onCellClick(cb: (x: number, y: number) => void) {
    this.fnCellClick = (x: number, y: number) => cb(x, y);
  }
  onGameStateChange(cb: (newState: boolean) => void) {
    throw new Error("Method not implemented.");
  }
  onFieldSizeChange(cb: (width: number, height: number) => void) {
    throw new Error("Method not implemented.");
  }
}
