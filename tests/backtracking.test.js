import test from "node:test";
import assert from "node:assert/strict";
import {
  canPlaceWord,
  placeWord,
  restoreWord,
  solve,
  solvingGrid,
} from "../src/backtracking.js";
import { findSlots } from "../src/findSlots.js";
import { parsePuzzle } from "../src/parsePuzzle.js";

// backtracking: creates a working grid with null fillable cells.
test("creates solving grid", () => {
  assert.deepEqual(solvingGrid(parsePuzzle("10\n0.")), [
    [null, null],
    [null, "."],
  ]);
});

// backtracking: checks word length and letter conflicts.
test("checks if a word can be placed", () => {
  const slot = {
    cells: [
      { r: 0, c: 0 },
      { r: 0, c: 1 },
    ],
  };
  const grid = [[null, "b"]];

  assert.equal(canPlaceWord(slot, "ab", grid), true);
  assert.equal(canPlaceWord(slot, "ac", grid), false);
  assert.equal(canPlaceWord(slot, "abc", grid), false);
});

// backtracking: places and restores a word.
test("places and restores a word", () => {
  const slot = {
    cells: [
      { r: 0, c: 0 },
      { r: 0, c: 1 },
    ],
  };
  const grid = [[null, null]];
  const changes = placeWord(slot, "ab", grid);

  assert.deepEqual(grid, [["a", "b"]]);
  restoreWord(changes, grid);
  assert.deepEqual(grid, [[null, null]]);
});

// backtracking: solves a valid simple puzzle.
test("finds one solution for a valid puzzle", () => {
  const grid = parsePuzzle("2001\n0..0\n1000\n0..0");
  const { slots } = findSlots(grid);
  const workGrid = solvingGrid(grid);
  const words = ["casa", "alan", "ciao", "anta"];
  const used = new Array(words.length).fill(false);
  const count = { count: 0 };
  const currentSolution = [];
  const solutions = [];

  solve(0, slots, words, workGrid, used, count, currentSolution, solutions);

  assert.equal(count.count, 1);
  assert.equal(solutions[0].length, 4);
});

// backtracking: does not accept unused words as a complete solution.
test("rejects incomplete word usage", () => {
  const slots = [
    {
      cells: [
        { r: 0, c: 0 },
        { r: 0, c: 1 },
      ],
    },
  ];
  const words = ["ab", "cd"];
  const grid = [[null, null]];
  const used = new Array(words.length).fill(false);
  const count = { count: 0 };
  const currentSolution = [];
  const solutions = [];

  solve(0, slots, words, grid, used, count, currentSolution, solutions);

  assert.equal(count.count, 0);
  assert.deepEqual(solutions, []);
});
