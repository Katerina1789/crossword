#!/usr/bin/env bash

cd "$(dirname "$0")/.."

node --input-type=module <<'NODE' 
// node --input-type=module > audit_results.txt <<'NODE'

import { crosswordSolver } from "./crosswordSolver.js";

// Detect if output is a TTY (terminal)
const isTTY = process.stdout.isTTY;

// Colors only if writing to terminal
const GREEN = isTTY ? "\x1b[32m" : "";
const RED = isTTY ? "\x1b[31m" : "";
const CYAN = isTTY ? "\x1b[36m" : "";
const YELLOW = isTTY ? "\x1b[33m" : "";
const RESET = isTTY ? "\x1b[0m" : "";

// Test counter
let passedCount = 0;
let totalTests = 12;

function getOutput(puzzle, words) {
  let output = "";
  const originalLog = console.log;

  console.log = (value) => {
    output = value;
  };

  crosswordSolver(puzzle, words);
  console.log = originalLog;

  return output;
}

function printCase(name, puzzle, words, expected, errorOnly = false) {
  const actual = getOutput(puzzle, words);
  const passed = errorOnly ? actual.startsWith("Error") : actual === expected;

  if (passed) passedCount++;

  const divider = `${CYAN}────────────────────────────────────────────${RESET}`;

  console.log(divider);
  console.log(`${CYAN}${name}${RESET}`);
  console.log(divider);

  console.log(`${YELLOW}Expected:${RESET}`);
  console.log(expected);
  console.log("");

  console.log(`${YELLOW}Actual:${RESET}`);
  console.log(actual);
  console.log("");

  console.log(passed ? `${GREEN}✔ PASS${RESET}` : `${RED}✘ FAIL${RESET}`);
  console.log("");
}

const simplePuzzle = "2001\n0..0\n1000\n0..0";
const simpleWords = ["casa", "alan", "ciao", "anta"];

printCase("Test 1: Basic Puzzle", simplePuzzle, simpleWords, "casa\ni..l\nanta\no..n");

const summerPuzzle = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`;
const summerWords = [
  "sun",
  "sunglasses",
  "suncream",
  "swimming",
  "bikini",
  "beach",
  "icecream",
  "tan",
  "deckchair",
  "sand",
  "seaside",
  "sandals",
];
const summerOutput = `...s...........
..sunglasses...
...n....u......
.s......n...s..
.w....deckchair
bikini..r...n..
.m.....seaside.
.m.b....a.a....
.icecream.n....
.n.a......d....
.g.c.....tan...
...h......l....
..........s....`;

printCase("Test 2: Complex Puzzle", summerPuzzle, summerWords, summerOutput);
printCase("Test 3: Different Word Order", summerPuzzle, [...summerWords].reverse(), summerOutput);

const foodPuzzle = `..1.1..1...
10000..1000
..0.0..0...
..1000000..
..0.0..0...
1000..10000
..0.1..0...
....0..0...
..100000...
....0..0...
....0......`;
const foodWords = [
  "popcorn",
  "fruit",
  "flour",
  "chicken",
  "eggs",
  "vegetables",
  "pasta",
  "pork",
  "steak",
  "cheese",
];
const foodOutput = `..p.f..v...
flour..eggs
..p.u..g...
..chicken..
..o.t..t...
pork..pasta
..n.s..b...
....t..l...
..cheese...
....a..s...
....k......`;

printCase("Test 4: Food Puzzle", foodPuzzle, foodWords, foodOutput);
printCase("Test 5: Word Count Mismatch", "2001\n0..0\n2000\n0..0", simpleWords, "Error", true);
printCase("Test 6: Invalid Number", "0001\n0..0\n3000\n0..0", simpleWords, "Error", true);
printCase("Test 7: Duplicate Words", simplePuzzle, ["casa", "casa", "ciao", "anta"], "Error", true);
printCase("Test 8: Empty Puzzle", "", simpleWords, "Error", true);
printCase("Test 9: Puzzle Not String", 123, simpleWords, "Error", true);
printCase("Test 10: Words Not Array", simplePuzzle, 123, "Error", true);
printCase("Test 11: Multiple Solutions", "2000\n0...\n0...\n0...", ["abba", "assa"], "Error", true);
printCase("Test 12: No Valid Solution", simplePuzzle, ["aaab", "aaac", "aaad", "aaae"], "Error", true);

// Final summary
console.log(`${CYAN}============================================${RESET}`);
console.log(`${CYAN}Final Result:${RESET}`);
console.log(`${GREEN}${passedCount}${RESET} / ${totalTests} tests passed`);
console.log(`${CYAN}============================================${RESET}`);

NODE
