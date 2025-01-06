import { Cell } from "./types/Cell";

interface IGameField {
  toggleCellState(x: number, y: number);
  nextGeneration();
  setSize(width: number, height: number);
  getState(): Cell[][];
}

export class GameField implements IGameField {
  private field: Cell[][];
  constructor(height: number = 1, width: number = 0) {
    const arr = Array(height);
    for (let i = 0; i < height; i++) {
      arr[i] = [];
      for (let j = 0; j < width; j++) {
        arr[i].push(0);
      }
    }
    this.field = arr;
  }

  toggleCellState(x: number, y: number) {
    this.field[x][y] = this.field[x][y] === 0 ? 1 : 0;
  }

  nextGeneration() {
    const field2 = this.field;
    const height = field2.length;
    const width = field2[0].length;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const count = this.countNeighbours(i, j);
        if (this.field[i][j] === 1) {
          if (count === 2 || count === 3) {
            field2[i][j] = 1;
          } else {
            field2[i][j] = 0;
          }
        } else if (count === 3) {
          field2[i][j] = 1;
        }
      }
    }
    this.field = field2;
  }

  countNeighbours(row: number, col: number): number {
    let result: number = 0;
    const neighbour: string[] = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let x: number = row + i;
        let y: number = col + j;
        if (x < 0) {
          x = this.field.length - 1;
        } else if (x === this.field.length) {
          x = 0;
        }
        if (y < 0) {
          y = this.field[0].length - 1;
        } else if (y === this.field[0].length) {
          y = 0;
        }
        if (x === row && y === col) {
          continue;
        }
        const args = String(x) + String(y);
        if (neighbour.indexOf(args) === -1) {
          result += this.field[x][y];
          neighbour.push(args);
        }
      }
    }
    return result;
  }

  getState(): Cell[][] {
    return this.field;
  }

  setSize(width: number, height: number) {
    const newField = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 0)
    );
    const rows = this.field.length > height ? height : this.field.length;
    const columns = this.field[0].length > width ? width : this.field[0].length;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        newField[i][j] = this.field[i][j];
      }
    }
    this.field = newField;
  }
}
