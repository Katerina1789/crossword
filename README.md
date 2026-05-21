# Crossword Solver

[![JavaScript](https://img.shields.io/badge/JavaScript-Code-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Testing-F28C28?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-FF0000?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![Zone01](https://img.shields.io/badge/Zone01-Athens-1E00FF?style=for-the-badge&logo=codeforces&logoColor=white)](https://zone01.gr)

A small JavaScript project that solves empty crossword puzzles using validation, slot detection and backtracking as part of the Zone01 Athens curriculum.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Repository Structure](#repository-structure)
- [Requirements](#requirements)
- [How to Run](#how-to-run)
- [Usage](#usage)
- [Testing](#testing)
- [Audit](#audit)
- [Documentation](#documentation)
- [Team](#team)
- [License](#license)

## Description

`crosswordSolver(puzzle, words)` receives a puzzle string and a list of words.

The puzzle uses:

| Symbol | Meaning             |
| ------ | ------------------- |
| `.`    | Blocked cell        |
| `0`    | Empty fillable cell |
| `1`    | Start of one word   |
| `2`    | Start of two words  |
| `\n`   | New row             |

The solver prints the completed crossword when exactly one valid solution exists.

If the input is invalid, has no solution or has multiple solutions, it prints the appropriate Error message.

## Features

### Core Features

- Validates puzzle type, characters and rectangular shape
- Validates word list type, empty values and duplicate words
- Checks that word count matches numbered starts
- Finds slots only from numbered starting cells
- Uses backtracking to try possible word placements
- Detects no solution and multiple solutions
- Prints the solved puzzle to the console

### Error Handling

The project prints explanatory Error messages, for example:

```text
Error: Puzzle must be a string
Error: Word list is empty
Error: No valid solution
Error: Multiple solutions found
```

## Repository Structure

```text
crossword/
├── audit/                  # Audit guide and audit runner
├── docs/                   # Project documentation
├── src/                    # Helper modules
├── tests/                  # Unit and integration tests
├── crosswordSolver.js      # Main exported solver function
├── package.json            # Node project settings
├── package-lock.json       # Locked dependency versions
├── CONTRIBUTING.md         # Team contribution guide
├── LICENSE                 # MIT license
└── README.md               # Project overview
```

## Requirements

- Node.js (required to run the solver)
- npm (optional, can be used for development tools and running tests)

No runtime dependencies are required.

## How to Run

The testing example call at the bottom of `crosswordSolver.js` is commented out.

To run a quick manual example:

1. Open `crosswordSolver.js`
2. Uncomment the last few lines:

```js
/*
 Testing example
const puzzle = "2001\n0..0\n2000\n0..0";
const words = ["casa", "alan", "ciao", "anta"];

crosswordSolver(puzzle, words);
*/
```

3. Run:

```bash
node ./crosswordSolver.js
```

## Usage 

Update the last few lines of `crosswordSolver.js` with your own puzzle and word list, for example:
```js
const puzzle = "2001\n0..0\n1000\n0..0";
const words = ["casa", "alan", "ciao", "anta"];

crosswordSolver(puzzle, words);
```

Expected output:

```text
casa
i..l
anta
o..n
```

## Testing

Run the unit tests:

```bash
npm test OR node --test
```

This project uses Node.js built-in test runner with files inside `tests/`.

## Audit

Run the audit script:

```bash
bash audit/audit.sh
```

The script runs audit tests 1-12 and:
- Prints the rsults to the terminal
- Saves the results in `audit_results.txt` and comment out:
```bash
// node --input-type=module > audit_results.txt <<'NODE'
```

The results include the expected output, real output and PASS/FAIL status.

## Documentation

- [`PRD`](docs/PRD.md) explains the project requirements.
- [`Architecture`](docs/architecture.md) explains the code flow.
- [`Project Structure`](docs/project_structure.md) explains each file and directory.
- [`Audit Guide`](audit/audit_guide.md) contains the manual audit cases.

## Team

- Katerina Kasdanastasi
- Giannis Athanasopoulos
- Vasiliki Xanthioti

## License

[MIT License](./LICENSE)
