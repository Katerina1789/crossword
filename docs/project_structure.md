# Project Structure

A complete beginner-friendly overview of all files and what they do.

## Directory Tree

```text
crossword/
├── audit/
│   ├── audit.sh             # Runs audit tests 1-12
│   └── audit_guide.md       # Manual audit instructions
├── docs/
│   ├── PRD.md               # Product requirements
│   ├── architecture.md      # Code flow and module integration
│   └── project_structure.md # This file
├── src/
│   ├── applySolution.js     # Creates the solved puzzle output
│   ├── backtracking.js      # Recursive solving algorithm
│   ├── findSlots.js         # Finds valid numbered crossword slots
│   ├── parsePuzzle.js       # Converts puzzle text into a grid
│   └── validateInput.js     # Validates puzzle and word input
├── tests/
│   ├── applySolution.test.js
│   ├── backtracking.test.js
│   ├── crosswordSolver.integration.test.js
│   ├── findSlots.test.js
│   ├── parsePuzzle.test.js
│   └── validateInput.test.js
├── .gitignore               # Files and Directorys ignored by Git
├── CONTRIBUTING.md          # Team contribution rules
├── LICENSE                  # MIT License
├── README.md                # Main project explanation
├── audit_results.txt        # Generated audit output
├── crosswordSolver.js       # Main exported solver function
├── package-lock.json        # Exact npm dependency versions
└── package.json             # Node project configuration
```

## Root Files

### crosswordSolver.js

**What it is:** Main file of the project.

**What it does:**

1. Validates input
2. Parses the puzzle
3. Finds crossword slots
4. Creates a solving grid
5. Runs backtracking
6. Prints the solved puzzle or an Error

The example call at the bottom is commented out so importing the file does not automatically run it.

### package.json

**What it is:** Node.js project configuration.

**Important parts:**

```json
{
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
```

`"type": "module"` allows the project to use `import` and `export`.

### package-lock.json

**What it is:** npm lock file.

**What it does:** Keeps dependency versions stable between machines.

### README.md

**What it is:** Main project guide.

**What it includes:**

- Description
- Features
- Usage example
- Test command
- Audit command
- Team names
- License

### CONTRIBUTING.md

**What it is:** Team workflow guide.

**What it includes:**

- Branching rules
- Commit message format
- Code style
- Testing expectations
- Communication notes

### LICENSE

**What it is:** MIT License file.

**What it means:** The project can be used, copied and modified under the MIT license terms.

### .gitignore

**What it is:** Git ignore rules.

**What it ignores:**

- `node_modules/`
- logs
- build Directorys
- editor files
- environment files

## src Directory

The `src/` Directory contains small helper modules used by `crosswordSolver.js`.

### src/validateInput.js

**Purpose:** Check input before solving.

**Checks:**

- Puzzle is a string
- Puzzle is not empty
- Words is an array
- Words are strings
- Words are not empty
- Words contain only letters
- Words are not duplicated
- Puzzle uses valid characters
- Puzzle rows are rectangular
- Numbered starts match word count

### src/parsePuzzle.js

**Purpose:** Convert puzzle text into a 2D grid.

Example:

```js
"10\n00";
```

becomes:

```js
[
  ["1", "0"],
  ["0", "0"],
];
```

### src/findSlots.js

**Purpose:** Find all valid crossword slots.

Rules:

- `1` starts one word
- `2` starts two words
- `0` is a fillable continuation cell
- `.` is a blocked cell

This file also rejects invalid starting positions.

### src/backtracking.js

**Purpose:** Solve the puzzle recursively.

Functions:

- `solvingGrid()` prepares a temporary grid
- `canPlaceWord()` checks if a word fits
- `placeWord()` writes a word into the grid
- `restoreWord()` undoes a word placement
- `solve()` tries all possible word placements

### src/applySolution.js

**Purpose:** Create the final printable result.

It copies the original grid, fills the solved letters and joins the rows back into a string.

## audit Directory

### audit/audit_guide.md

**Purpose:** Manual audit instructions.

It contains the official test cases and expected outputs from Piscine JavaScript.

### audit/audit.sh

**Purpose:** Automated audit runner.

Run it with:

```bash
bash audit/audit.sh
```
- to create an `audit_results.txt`
- OR print directly to the Terminal.

## tests Directory

The `tests/` Directory contains unit tests for helper files and one integration test for the full solver.

### tests/validateInput.test.js

Checks input validation rules and edge cases.

### tests/parsePuzzle.test.js

Checks puzzle string to grid conversion.

### tests/findSlots.test.js

Checks numbered slot detection and invalid starting positions.

### tests/backtracking.test.js

Checks solving grid creation, word placement, restore behavior and recursive solving.

### tests/applySolution.test.js

Checks final output creation and confirms the original grid is not mutated.

### tests/crosswordSolver.integration.test.js

Checks the complete exported solver flow with success and Error cases.

## Running Tests

Run tests with:

```bash
npm test OR node --test
```

The tests cover:

- Individual helper functions
- Audit success and Error cases
- Invalid slot shapes
- Malformed grids
- Edge cases found during audit

## docs Directory

### docs/PRD.md

Product requirements document.

### docs/architecture.md

Explains how files and functions connect.

### docs/project_structure.md

Explains the repository tree and file purposes.

## Generated Files

### audit_results.txt

Created by `audit/audit.sh`.

It contains the expected output, real output and PASS/FAIL result for audit tests 1-12.

## Main Idea

The repository is intentionally small:

```text
Input -> Validate -> Parse -> Find Slots -> Solve -> Print
```

Each source file handles one simple part of that flow.
