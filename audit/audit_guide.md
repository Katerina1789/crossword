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

### Test 13 (done during the audit): Long input with a variety of characters

**Command:**

```javascript
const puzzle = `.2000001000..............200100.1........1...1.....
.0.....0....10001000.....0..0...0...1.20000000.....
.0...10000......0...1100000000100000000..0...10001.
.0.....0.....2000.1..0...0....0.0...0.0.100..0...0.
100010..200000....0..0........0.0...1000.0.10000.0.
.0..0...0....0.1000000001000....0...0........0...0.
.0.10000000..0....0..0..0.............1..........0.
....0...0...10001.......100000010000..0..200000....
....0...0....0..0.......0......0......0..0.........
........0.......1000001.....100000100000000.1......
......1...1.....0.....0........0..0...0..0..0...1..
..2000000000....0.1000000.200..0..0...0..0..10000..
..0...0...0...1000....0...0....0..0...10000.0...0..
..0...0...0.....0....1000000......0......0..10000..
..0...0...0.....0.1.......0.......0..10000000...0..
..1000001000..20000000.1..0.......0......0..100..1.
..0.....0.0...0...0....0..1001001.0......0.......0.
..10101.0.100000000....0.....0..0.0......0.......0.
..0.0.0.0.0...0...1000000000.0.100...101000000...0.
..10000.0.0...0........0.....0....1....0.0.......0.
..0.0.0.0.0...0..1000000000000000000.1000000000..0.
....0.0.0.0.1.0........0.....0....0....0.0.....1.0.
....0...1100000000010.....1.1000000....0.1000..100.
.........0..0......0......0..0.................0.0.
.........10000.....100000000000....................
.........0..0.............0........................`;
const words = [
    '80085', 'afro', 'agioldas',
    'alarm', 'alch', 'aleksis',
    'aptapt', 'armadillo', 'ayooo',
    'bananinichimpanzini', 'banyanya', 'bass',
    'bobs', 'bonecambalabu', 'booogaloo',
    'bouncingonmyboys', 'brrbrr', 'bussin',
    'cancer', 'cap', 'clown',
    'daniel', 'deez', 'dejavu',
    'delulu', 'dicusbom', 'discombob',
    'doomscrolling', 'dragondeez', 'drip',
    'eeeee', 'eeeeylmao', 'elare',
    'elpmee', 'eyooo', 'finna',
    'gigachad', 'gigigi', 'goofyahh',
    'gugugaga', 'gyatt', 'haduken',
    'hat', 'hoooraaaay', 'hooyeah',
    'imp', 'kiwwi', 'lirililarila',
    'luls', 'malding', 'maninja',
    'meme', 'middiff', 'moo',
    'nexus', 'nimis', 'nyancat',
    'ohio', 'onion', 'onionnight',
    'oprah', 'orion', 'oro',
    'peppa', 'ppp', 'rat',
    'ratio', 'raw', 'riperino',
    'rizz', 'rizzler', 'rizzz',
    'sahur', 'sahuur', 'saippuakivikauppias',
    'saudi$dollars', 'sigma', 'skibidi',
    'succ', 'succondeez', 'sus',
    'sussy', 'thhank', 'touchgrass',
    'tralalero ', 'transformers', 'tripitrop',
    'tuntuntuntuntun', 'unc', 'uwu',
    'zaza', 'zone01', 'zuggaaler'
];

crosswordSolver(puzzle, words);
```

**Expected Output:**

```
.succondeez..............delulu.e........p...z.....
.k.....e....dicusbom.....r..n...l...r.riperino.....
.i...eeeee......u...bananinichimpanzini..p...nexus.
.b.....z.....bobs.m..l...p....m.m...z.z.ppp..e...u.
gigigi..dejavu....e..a........p.e...zaza.a.80085.s.
.d..y...a....s.doomscrolling....e...z........1...s.
.i.banyanya..s....e..m..u.............h..........y.
....t...i...sigma.......lirililarila..a..brrbrr....
....t...e....n..r.......s......p......d..o.........
........l.......middiff.....tuntuntuntuntun.h......
......s...b.....a.....i........a..r...k..n..o...o..
..tralalero ....d.maninja.cap..p..i...e..c..orion..
..o...h...n...ohio....n...a....t..p...nimis.y...i..
..u...u...e.....l....malding......i......n..eyooo..
..c...u...c.....l.a.......c.......t..gugugaga...n..
..hoooraaaay..goofyahh.n..e.......r......o..hat..d.
..g.....g.m...i...o....y..rizzler.o......n.......i.
..ratio.i.booogaloo....a.....u..a.p......m.......s.
..a.h.p.o.a...a...onionnight.g.uwu...eeeeylmao...c.
..sahur.l.l...c........c.....g....b....l.b.......o.
..s.a.a.d.a...h..saippuakivikauppias.dragondeez..m.
....n.h.a.b.k.a........t.....a....s....r.y.....m.b.
....k...saudi$dollars.....a.aleksis....e.succ..oro.
.........l..w......a......f..e.................o.b.
.........clown.....transformers....................
.........h..i.............o........................
```

**Changes needed:** Comment out:
``` javascript
    // must contain only letters
    if (/[^a-zA-Z]/.test(element)) {
      return {
        isValid: false,
        msg: `Error: Word "${element}" contains invalid characters`,
      };
    }
```
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

