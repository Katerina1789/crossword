import test from "node:test";
import assert from "node:assert/strict";
import { validateInput } from "../src/validateInput.js";

// validateInput: accepts correct puzzle and words.
test("accepts valid input", () => {
  const result = validateInput("2001\n0..0\n1000\n0..0", [
    "casa",
    "alan",
    "ciao",
    "anta",
  ]);

  assert.equal(result.isValid, true);
});

// validateInput: rejects wrong input types.
test("rejects wrong input types", () => {
  assert.equal(validateInput(123, ["word"]).isValid, false);
  assert.equal(validateInput("10", 123).isValid, false);
});

// validateInput: rejects empty values and invalid words.
test("rejects empty input and invalid words", () => {
  assert.equal(validateInput("", ["word"]).isValid, false);
  assert.equal(validateInput("10", [""]).isValid, false);
  assert.equal(validateInput("10", ["word1"]).isValid, false);
});

// validateInput: rejects duplicate words.
test("rejects duplicate words", () => {
  const result = validateInput("2001\n0..0\n1000\n0..0", [
    "casa",
    "casa",
    "ciao",
    "anta",
  ]);

  assert.equal(result.isValid, false);
});

// validateInput: rejects invalid puzzle characters.
test("rejects invalid puzzle characters", () => {
  const result = validateInput("100\n0x0", ["abc"]);

  assert.equal(result.isValid, false);
});

// validateInput: rejects malformed row shapes.
test("rejects non-rectangular puzzle rows", () => {
  assert.equal(validateInput("1\n00", ["aa"]).isValid, false);
  assert.equal(validateInput("10\n0\n", ["aa"]).isValid, false);
});

// validateInput: rejects mismatch between starts and words.
test("rejects word count mismatch", () => {
  const result = validateInput("2001\n0..0\n2000\n0..0", [
    "casa",
    "alan",
    "ciao",
    "anta",
  ]);

  assert.equal(result.isValid, false);
});
