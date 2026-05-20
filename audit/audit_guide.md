# Audit Guide for Crossword Solver

## Setup

1. Open the repository and verify `crosswordSolver.js` exists.
2. Run `node crosswordSolver.js` to test the function with the test cases below.

---

## Test Cases

### Test 1: Basic Puzzle (Simple Case)

**Command:**

```javascript
const puzzle = "2001\n0..0\n1000\n0..0";
const words = ["casa", "alan", "ciao", "anta"];

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
casa
i..l
anta
o..n
```

---

### Test 2: Complex Puzzle (Large Grid)

**Command:**

```javascript
const puzzle = `...1...........
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
const words = [
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

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
...s...........
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
..........s....
```

---

### Test 3: Different Word Order (Same Result)

**Command:**

```javascript
const puzzle = `...1...........
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
const words = [
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
].reverse();

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
...s...........
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
..........s....
```

---

### Test 4: Food Puzzle

**Command:**

```javascript
const puzzle = `..1.1..1...
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
const words = [
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

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
..p.f..v...
flour..eggs
..p.u..g...
..chicken..
..o.t..t...
pork..pasta
..n.s..b...
....t..l...
..cheese...
....a..s...
....k......
```

---

## Error Cases

### Test 5: Mismatch Between Words and Puzzle Starting Positions

**Command:**

```javascript
const puzzle = "2001\n0..0\n2000\n0..0";
const words = ["casa", "alan", "ciao", "anta"];

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
Error
```

**Reason:** The puzzle requires 5 starting words (2 + 1 + 2), but only 4 words were provided.

---

### Test 6: Invalid Starting Number (Higher than 2)

**Command:**

```javascript
const puzzle = "0001\n0..0\n3000\n0..0";
const words = ["casa", "alan", "ciao", "anta"];

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
Error
```

**Reason:** The puzzle contains a 3, which is not allowed. Any number greater than 2 is invalid.

---

### Test 7: Duplicate Words in List

**Command:**

```javascript
const puzzle = "2001\n0..0\n1000\n0..0";
const words = ["casa", "casa", "ciao", "anta"];

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
Error
```

**Reason:** The word list contains duplicates, which is not allowed.

---

### Test 8: Empty Puzzle

**Command:**

```javascript
const puzzle = "";
const words = ["casa", "alan", "ciao", "anta"];

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
Error
```

**Reason:** Puzzle string is empty.

---

### Test 9: Invalid Puzzle Format (Not a String)

**Command:**

```javascript
const puzzle = 123;
const words = ["casa", "alan", "ciao", "anta"];

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
Error
```

**Reason:** Puzzle must be a string.

---

### Test 10: Invalid Words Format (Not an Array)

**Command:**

```javascript
const puzzle = "2001\n0..0\n1000\n0..0";
const words = 123;

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
Error
```

**Reason:** Words must be an array.

---

### Test 11: Multiple Solutions (Ambiguous Puzzle)

**Command:**

```javascript
const puzzle = "2000\n0...\n0...\n0...";
const words = ["abba", "assa"];

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
Error
```

**Reason:** The puzzle has more than one valid solution, so it fails the uniqueness requirement.

---

### Test 12: No Valid Solution (Incompatible Words)

**Command:**

```javascript
const puzzle = "2001\n0..0\n1000\n0..0";
const words = ["aaab", "aaac", "aaad", "aaae"];

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
Error
```

**Reason:** No arrangement of these words produces a valid solution.

---

## Audit Checklist

Complete all items below:

- [ ] **File exists:** `crosswordSolver.js` is present in the repository.
- [ ] **Test 1 passes:** Basic puzzle solved correctly.
- [ ] **Test 2 passes:** Large grid puzzle solved correctly.
- [ ] **Test 3 passes:** Word order doesn't affect result.
- [ ] **Test 4 passes:** Food puzzle solved correctly.
- [ ] **Test 5 passes:** Mismatch error detected.
- [ ] **Test 6 passes:** Invalid number error detected.
- [ ] **Test 7 passes:** Duplicate words error detected.
- [ ] **Test 8 passes:** Empty puzzle error detected.
- [ ] **Test 9 passes:** Non-string puzzle error detected.
- [ ] **Test 10 passes:** Non-array words error detected.
- [ ] **Test 11 passes:** Multiple solutions error detected.
- [ ] **Test 12 passes:** No solution error detected.

---

## Bonus Checks (Optional)

- [ ] **Algorithm:** Is backtracking used to solve the puzzle?
- [ ] **Tests:** Does the project include a test file?
- [ ] **Test coverage:** Do tests check all edge cases?
- [ ] **Performance:** All tests complete within reasonable time (< 2s per test).
- [ ] **Code quality:** Functions are simple, readable, and beginner-friendly.
