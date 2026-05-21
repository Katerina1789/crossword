// imports used to access helper functions
import { validateInput } from "./src/validateInput.js";
import { parsePuzzle } from "./src/parsePuzzle.js";
import { findSlots } from "./src/findSlots.js";
import { solvingGrid, solve } from "./src/backtracking.js";
import { applySolution } from "./src/applySolution.js";

// crosswordSolver connects all parts
export function crosswordSolver(puzzle, words) {
  try {
    // validate puzzle + words
    const validation = validateInput(puzzle, words);
    if (!validation.isValid) {
      console.log(validation.msg);
      return;
    }

    // convert puzzle string -> 2D grid
    const grid = parsePuzzle(puzzle);

    // find all slots in the grid
    const found = findSlots(grid);
    if (!found.isValid) {
      console.log(found.msg);
      return;
    }
    const { slots } = found;

    // prepare working grid for backtracking
    const workGrid = solvingGrid(grid);

    // backtracking state
    const used = new Array(words.length).fill(false);
    const count = { count: 0 };
    const currentSolution = [];
    const solutions = [];

    // run solver
    solve(0, slots, words, workGrid, used, count, currentSolution, solutions);

    // no solution
    if (count.count === 0) {
      console.log("Error: No valid solution");
      return;
    }

    // multiple solutions
    if (count.count > 1) {
      console.log("Error: Multiple solutions found");
      return;
    }

    // unique solution -> print filled puzzle
    const output = applySolution(grid, solutions[0]);
    console.log(output);
  } catch {
    console.log("Error: Unexpected failure");
  }
}

/*
 Testing example
const puzzle = "2001\n0..0\n2000\n0..0";
const words = ["casa", "alan", "ciao", "anta"];

crosswordSolver(puzzle, words);
*/
