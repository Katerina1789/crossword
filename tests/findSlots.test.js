import test from "node:test";
import assert from "node:assert/strict";
import { findSlots } from "../src/findSlots.js";
import { parsePuzzle } from "../src/parsePuzzle.js";

// findSlots: finds one valid horizontal slot from a 1 cell.
test("finds one horizontal slot", () => {
  const result = findSlots(parsePuzzle("100"));

  assert.equal(result.isValid, true);
  assert.equal(result.slots.length, 1);
  assert.equal(result.slots[0].length, 3);
});

// findSlots: finds two slots from a 2 cell.
test("finds two slots from a double start", () => {
  const result = findSlots(parsePuzzle("20\n0."));

  assert.equal(result.isValid, true);
  assert.equal(result.slots.length, 2);
  assert.deepEqual(
    result.slots.map((slot) => slot.length),
    [2, 2],
  );
});

// findSlots: allows 0 cells as word continuations.
test("allows zero cells as continuations", () => {
  const result = findSlots(parsePuzzle("10"));

  assert.equal(result.isValid, true);
  assert.equal(result.slots.length, 1);
});

// findSlots: rejects numbered cells that do not match real starts.
test("rejects wrong numbered starts", () => {
  assert.equal(findSlots(parsePuzzle("1")).isValid, false);
  assert.equal(findSlots(parsePuzzle("2\n0")).isValid, false);
});

// findSlots: rejects 0 cells that start separate slots.
test("rejects zero cells starting slots", () => {
  const result = findSlots(parsePuzzle("100\n..0"));

  assert.equal(result.isValid, false);
});
