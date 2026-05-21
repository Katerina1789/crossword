# Architecture

Below is a simple explanation of how the Crossword Solver works.

## System Overview

```text
┌─────────────────────┐
│ crosswordSolver.js  │  Main function
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│   validateInput()   │  Check puzzle and words
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│    parsePuzzle()    │  String -> 2D grid
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│     findSlots()     │  Find numbered word slots
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│       solve()       │  Backtracking search
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│   applySolution()   │  Grid -> solved output
└─────────────────────┘
```

## Main Flow

```text
Input puzzle + words
        │
        ▼
Validate input
        │
        ▼
Parse puzzle into grid
        │
        ▼
Find valid slots from 1 and 2 cells
        │
        ▼
Create empty solving grid
        │
        ▼
Try words with backtracking
        │
        ▼
Print solution or Error
```

## Module Responsibilities

### crosswordSolver.js

Main entry point of the project.

Responsibilities:

- Calls every helper function in order
- Stops early when validation fails
- Starts the backtracking solver
- Checks if there are zero, one or many solutions
- Prints the final output

### src/validateInput.js

Checks the raw input before the puzzle is parsed.

It validates:

- Puzzle is a string
- Puzzle is not empty
- Words is an array
- Words are non-empty strings
- Words contain only letters
- Words are unique
- Puzzle contains only `0`, `1`, `2`, `.`, and newlines
- Puzzle rows are rectangular
- Numbered starts match the number of words

### src/parsePuzzle.js

Converts the puzzle string into a grid.

Example:

```text
"10\n00"
```

becomes:

```js
[
  ["1", "0"],
  ["0", "0"],
];
```

### src/findSlots.js

Finds all valid word slots.

Important rules:

- `.` cells are blocked
- `0` cells can be used inside words
- `0` cells cannot start a new word slot
- `1` must start exactly one word
- `2` must start exactly two words

### src/backtracking.js

Contains the solving logic. Backtracking is used because the solver must explore multiple possible word placements and revert when conflicts occur. This guarantees correctness even when the puzzle has branching possibilities.

Main helpers:

- `solvingGrid()` creates the temporary grid
- `canPlaceWord()` checks if a word fits
- `placeWord()` writes a word into the grid
- `restoreWord()` undoes a placement
- `solve()` recursively tries every valid placement

### src/applySolution.js

Builds the final solved puzzle from the chosen solution.

It keeps blocked cells as `.` and replaces fillable cells with letters.

## Slot Detection Flow

```text
Visit each cell
   │
   ├─ If cell is "." -> skip
   │
   ├─ Check horizontal start
   │
   ├─ Check vertical start
   │
   └─ If cell is 1 or 2, compare real starts with its number
```

This prevents invalid puzzles from being accepted as solved.

## Backtracking Flow

```text
Take next slot
   │
   ├─ Try each unused word
   │
   ├─ Check length and letter conflicts
   │
   ├─ Place word
   │
   ├─ Recurse to next slot
   │
   └─ Restore grid before trying another word
```

When all slots are filled, the solver also checks that every word was used.

## Error Handling

The project prints an Error message when:

- The puzzle is empty
- The puzzle is not a string
- Words is not an array
- Words are invalid or duplicated
- Puzzle rows are malformed
- Numbered starts are wrong
- No valid solution exists
- More than one solution exists

## Testing Flow

The test suite uses Node.js built-in test runner.

```text
node --test
   │
   ├─ validateInput.test.js
   ├─ parsePuzzle.test.js
   ├─ findSlots.test.js
   ├─ backtracking.test.js
   ├─ applySolution.test.js
   └─ crosswordSolver.integration.test.js
```

Most files test one helper module directly. The integration test checks the full exported `crosswordSolver()` flow and important Error cases.

## Success Condition

A puzzle is solved only when:

1. The input is valid
2. All numbered starts create valid slots
3. Every slot is filled
4. Every word is used
5. Exactly one complete solution exists

## Summary

The project follows a simple pipeline:

```text
Validate -> Parse -> Find Slots -> Solve -> Print
```
