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
});
