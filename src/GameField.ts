import { Cell } from "./types/Cell";

interface IGameField {
  toggleCellState(x: number, y: number);
  nextGeneration();
  setSize(width: number, height: number);
  getState(): Cell[][];
}

export class GameField implements IGameField {
  private field: Cell[][];
  constructor(height: number = 0, width: number = 0) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) this.field[i][j] = 0;
    }
  }

  toggleCellState(x: number, y: number) {
    this.field[x][y] = this.field[x][y] === 0 ? 1 : 0;
  }
  nextGeneration() {
    throw new Error("Method not implemented.");
  }
  setSize(width: number, height: number) {
    throw new Error("Method not implemented.");
  }
  getState(): Cell[][] {
    return this.field;
  }
}
