# Product Requirements Document (PRD) for Crossword Solver

## 1. Project Overview

The goal of this project is to create a **crosswordSolver** function that automatically solves empty crossword puzzles.

The function takes an empty puzzle and a list of words, then fills the puzzle cells using backtracking to find the unique valid solution.

The project focuses on understanding problem-solving with constraints, input validation, recursive algorithms and output formatting.

## 2. Functional Requirements

These are the mandatory behaviors required to pass the audit:

- Accept an empty puzzle (string format) and a word list (array).
- Validate input:
  - Puzzle must be a string with only numbers, `.` (dots), and `\n` (newlines).
  - Words list must be an array of non-empty strings.
  - No duplicate words allowed in the list.
  - Number of words must match the number of starting positions in the puzzle.
  - All numbers must be `1` or `2` (representing word directions: across and down).

- Solve the puzzle:
  - Numbers represent starting cells of words.
  - `.` represents blocked cells.
  - Find the unique valid arrangement of words.
  - Use backtracking to explore solutions.

- Return correct output:
  - Print the solved puzzle to console if a valid solution exists.
  - Print `'Error'` if puzzle is invalid, words don't fit, multiple solutions exist or no solution exists.

- Handle edge cases:
  - Empty puzzle
  - Wrong input types
  - Mismatched word/puzzle dimensions
  - Impossible configurations

## 3. Technical Requirements

These are the technical constraints required by the exercise:

- **Language:** JavaScript

- **File:** `crosswordSolver.js` containing the `crosswordSolver` function.

- **Code style:**
  - Simple, readable, beginner-friendly.
  - Use clear function and variable names.
  - Minimal comments.
  - No external libraries required.

- **Algorithm:** Backtracking recommended to efficiently search the solution space.

- **Testing:** Manual testing must follow the audit guide. Optional: add test files for the code.

## 4. Team Workflow and Tasks

### Giannis -> Input Validation

**Responsible for ensuring all inputs are correct before solving begins.**

(file: `src/validateInput.js`)

**Tasks**:

- Validate input type:
    - words must be an array
    - puzzle must be a string
- Validate characters (digits, dots, newlines)
- Validate all words are:
    - strings
    - not empty
    - unique
- Validate puzzle and words count match
- Return clear error messages for invalid cases

### Katerina -> Parsing, Output Formatting, Documentation

**Responsible for the beginning and end of the pipeline.**

(files: `crosswordSolver.js`, `src/parsePuzzle.js`, `src/findSlots`, `src/applySolution.js`, `README.md`, docs/, audit/)

**Tasks**:

- Convert puzzle string -> 2D grid
- Find all valid word slots starting at numbered cells
- Identify across and down slots
- Organize slots into a clean structure (+ Error Handling)
- Fill the grid with solved letters while keeping dots unchanged
- Call all functions to our main one
- Handle final printing
- README.md, audit_guide.md, architecture.md, project_structure.md

### Vasiliki -> Algorithm (Backtracking Solver)

**Responsible for the solving engine.**

(Files: `backtracking.js`, `src/utils.js`)

**Tasks:**

- Solve the crossword using backtracking
- Store placed letters or null for empty cells
- Check if a word can be placed in a slot
- Write a word into the grid and return previous values
- Restore previous cell values when backtracking
- Try all words for each slot recursively
- Detect:
    - 0 solutions -> Error
    - 1 solution -> OK
    - more than 1 solution -> Error
