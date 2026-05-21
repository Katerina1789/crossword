import test from "node:test";
import assert from "node:assert/strict";
import { applySolution } from "../src/applySolution.js";
import { parsePuzzle } from "../src/parsePuzzle.js";

// applySolution: fills letters into the original puzzle shape.
test("applies solution to original grid", () => {
  const grid = parsePuzzle("10\n0.");
  const solution = [
    {
      slot: {
        cells: [
          { r: 0, c: 0 },
          { r: 0, c: 1 },
        ],
      },
      word: "ab",
    },
  ];

  assert.equal(applySolution(grid, solution), "ab\n0.");
});

// applySolution: does not mutate the original grid.
test("does not mutate original grid", () => {
  const grid = parsePuzzle("10");
  const solution = [
    {
      slot: {
        cells: [
          { r: 0, c: 0 },
          { r: 0, c: 1 },
        ],
      },
      word: "ab",
    },
  ];

  applySolution(grid, solution);

  assert.deepEqual(grid, [["1", "0"]]);
});
