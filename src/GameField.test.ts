import { GameField } from "./GameField";

describe("GameField", () => {
  describe("public interface", () => {
    it("it is class", () => {
      expect(GameField).toBeInstanceOf(Function);
      expect(new GameField()).toBeInstanceOf(GameField);
    });

    it("has a function getState", () => {
      const gameField = new GameField();

      expect(gameField.getState).toBeInstanceOf(Function);
      expect(gameField.getState()).toEqual([[]]);
    });
  });

  describe("functional test", () => {
    const height: number = 3;
    const width: number = 2;
    let gameField: GameField;
    beforeEach(() => {
      gameField = new GameField(height, width);
    });

    it("supports settings side from constructor", () => {
      expect(gameField.getState()).toEqual([
        [0, 0],
        [0, 0],
        [0, 0],
      ]);
    });

    it("has .toggleCellState method", () => {
      expect(gameField.toggleCellState).toBeInstanceOf(Function);
      const [x1, y1] = [0, 0];
      const [x2, y2] = [2, 1];
      gameField.toggleCellState(x1, y1);
      gameField.toggleCellState(x2, y2);
      expect(gameField.getState()).toEqual([
        [1, 0],
        [0, 0],
        [0, 1],
      ]);
      gameField.toggleCellState(x2, y2);
      expect(gameField.getState()).toEqual([
        [1, 0],
        [0, 0],
        [0, 0],
      ]);
    });

    it("has method .nextGeneration", () => {
      expect(gameField.nextGeneration).toBeInstanceOf(Function);
      const [x1, y1] = [0, 0];
      const [x2, y2] = [2, 1];
      gameField.toggleCellState(x1, y1);
      gameField.toggleCellState(x2, y2);
      expect(gameField.getState()).toEqual([
        [1, 0],
        [0, 0],
        [0, 1],
      ]);
      gameField.nextGeneration();
      expect(gameField.getState()).toEqual([
        [0, 0],
        [0, 0],
        [0, 0],
      ]);
      gameField.toggleCellState(0, 0);
      gameField.toggleCellState(1, 0);
      gameField.toggleCellState(0, 1);
      expect(gameField.getState()).toEqual([
        [1, 1],
        [1, 0],
        [0, 0],
      ]);
      gameField.nextGeneration();
      expect(gameField.getState()).toEqual([
        [1, 1],
        [1, 1],
        [0, 0],
      ]);
    });
  });
});
