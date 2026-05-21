import test from "node:test";
import assert from "node:assert/strict";
import { parsePuzzle } from "../src/parsePuzzle.js";

// parsePuzzle: converts each row into arrays of characters.
test("converts puzzle string into a 2D grid", () => {
  assert.deepEqual(parsePuzzle("10\n0."), [
    ["1", "0"],
    ["0", "."],
  ]);
});

// parsePuzzle: keeps all puzzle symbols unchanged.
test("keeps puzzle symbols unchanged", () => {
  assert.deepEqual(parsePuzzle("201.\n0..1"), [
    ["2", "0", "1", "."],
    ["0", ".", ".", "1"],
  ]);
});
