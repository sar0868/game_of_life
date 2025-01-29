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
  onFieldSizeChange(cb: (height: number, width: number) => void);
}

export class GameView implements IGameView {
  // private table: HTMLDivElement;
  private field: HTMLDivElement;
  private fnCellClick: (x: number, y: number) => void;
  private fnBtnClick: (newState: boolean) => void;
  private fnFieldSizeChange: (height: number, width: number) => void;
  private btnRun: HTMLButtonElement;
  private heightSize: HTMLInputElement;
  private widthSize: HTMLInputElement;

  constructor(el: HTMLElement) {
    this.field = document.createElement("div");
    this.field.classList.add("gameField");
    el.appendChild(this.field);
    el.appendChild(this.addControls());
    el.querySelectorAll("input[type='number'].field-size").forEach((item) => {
      item.addEventListener("change", () => {
        const height = Number(this.heightSize.value);
        const width = Number(this.widthSize.value);
        this.fnFieldSizeChange(height, width);
      });
    });
  }

  addControls(): HTMLDivElement {
    const controls: HTMLDivElement = document.createElement("div");
    controls.classList.add("gameControls");
    this.btnRun = document.createElement("button");
    this.btnRun.classList.add("run-button", "run-button--stopped");
    this.btnRun.innerHTML = "Play";
    controls.appendChild(this.btnRun);

    this.heightSize = document.createElement("input");
    this.heightSize.setAttribute("type", "number");
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
    this.btnRun.addEventListener("click", () =>
      this.fnBtnClick(state.isRunning)
    );
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
    this.widthSize.value = String(state.width);
  }
  onCellClick(cb: (x: number, y: number) => void) {
    this.fnCellClick = (x: number, y: number) => cb(x, y);
  }
  onGameStateChange(cb: (newState: boolean) => void) {
    this.fnBtnClick = (newState: boolean) => {
      newState = newState ? false : true;
      cb(newState);
    };
  }
  onFieldSizeChange(cb: (height: number, width: number) => void) {
    this.fnFieldSizeChange = (height: number, width: number) => {
      cb(height, width);
    };
  }
}
