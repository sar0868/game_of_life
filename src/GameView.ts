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

type gameState = {
  width?: number;
  height?: number;
  isRunning?: boolean;
};

export class GameView implements IGameView {
  private field: HTMLDivElement;
  private controls: HTMLDivElement;
  private fnCellClick: (x: number, y: number) => void;
  private fnBtnClick: (newState: boolean) => void;
  private fnFieldSizeChange: (height: number, width: number) => void;
  private gameState?: gameState;

  constructor(el: HTMLElement) {
    this.field = document.createElement("div");
    this.field.classList.add("gameField");
    el.appendChild(this.field);
    this.controls = document.createElement("div");
    this.controls.classList.add("gameControls");
    el.appendChild(this.controls);
    this.updateGameControls();
    //   item.addEventListener("change", () => {
    //     const height = Number(this.heightSize.value);
    //     const width = Number(this.widthSize.value);
    //     this.fnFieldSizeChange(height, width);
    //   });
    // });
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

  updateGameControls() {
    const isRunning = this.gameState?.isRunning;
    this.controls.innerHTML = `
    <button class="run-button run-button--${isRunning ? "runned" : "stopped"}">${isRunning ? "Stop" : "Play"}</button>
    <input type="number" class="field-size field-size--height" value='${this.gameState?.height}'/>
    <input type="number" class="field-size field-size--width" value='${this.gameState?.width}'/>`;
  }

  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }) {
    this.gameState = state;
    this.updateGameControls();
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
