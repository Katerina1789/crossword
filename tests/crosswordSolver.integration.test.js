import test from "node:test";
import assert from "node:assert/strict";
import { crosswordSolver } from "../crosswordSolver.js";

function getOutput(puzzle, words) {
  let output = "";
  const originalLog = console.log;

  try {
    console.log = (value) => {
      output = value;
    };
    crosswordSolver(puzzle, words);
  } finally {
    console.log = originalLog;
  }

  return output;
}

function expectError(puzzle, words) {
  assert.ok(getOutput(puzzle, words).startsWith("Error"));
}

// crosswordSolver: solves the basic audit puzzle.
test("solves basic audit puzzle", () => {
  const output = getOutput("2001\n0..0\n1000\n0..0", [
    "casa",
    "alan",
    "ciao",
    "anta",
  ]);

  assert.equal(output, "casa\ni..l\nanta\no..n");
});

// crosswordSolver: rejects audit error cases.
test("returns Error for audit error cases", () => {
  expectError("2001\n0..0\n2000\n0..0", ["casa", "alan", "ciao", "anta"]);
  expectError("0001\n0..0\n3000\n0..0", ["casa", "alan", "ciao", "anta"]);
  expectError("2001\n0..0\n1000\n0..0", ["casa", "casa", "ciao", "anta"]);
  expectError("", ["casa", "alan", "ciao", "anta"]);
  expectError(123, ["casa", "alan", "ciao", "anta"]);
  expectError("2001\n0..0\n1000\n0..0", 123);
  expectError("2000\n0...\n0...\n0...", ["abba", "assa"]);
  expectError("2001\n0..0\n1000\n0..0", ["aaab", "aaac", "aaad", "aaae"]);
});

// crosswordSolver: rejects malformed slot edge cases.
test("returns Error for malformed slot edge cases", () => {
  expectError("1", ["a"]);
  expectError("2\n0", ["ab", "xy"]);
  expectError("100\n..0", ["abc"]);
  expectError("1\n00", ["aa"]);
});
