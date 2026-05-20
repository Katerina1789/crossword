export function validateInput(puzzle, words) {
  // 1. Validate 'puzzle' type
  if (typeof puzzle !== "string") {
    return { isValid: false, msg: "Error: Puzzle must be a string" };
  }

  // 2. Ensure the puzzle string is not empty or just whitespace
  if (puzzle.trim().length === 0) {
    return { isValid: false, msg: "Error: Puzzle string is empty" };
  }
  // 3. Validate 'words' structure
  if (!Array.isArray(words)) {
    return { isValid: false, msg: "Error: Invalid word list format" };
  }
  // 4. Ensure word list is not empty
  if (words.length === 0) {
    return { isValid: false, msg: "Error: Word list is empty" };
  }
  // 5. Validate individual word integrity
  for (const element of words) {
    // Check if item is a non-empty string
    if (typeof element !== "string" || element === "") {
      return {
        isValid: false,
        msg: "Error: Word list contains invalid or empty strings",
      };
    }
    // Check for symbols/numbers in words (Regular Expression: only letters allowed)
    if (/[^a-zA-Z]/.test(element)) {
      return {
        isValid: false,
        msg: `Error: Word "${element}" contains invalid characters`,
      };
    }
  }
  // 6. Check for duplicate words
  if (new Set(words).size !== words.length) {
    return { isValid: false, msg: "Error: Duplicate words found" };
  }

  let totalStarts = 0;
  // 7. Validate puzzle characters and count required words
  for (const element of puzzle) {
    if (!"012.\n".includes(element)) {
      return {
        isValid: false,
        msg: "Error: Puzzle contains unauthorized characters",
      };
    }
    // Accumulate the number of words that must start in the grid
    if (element === "1" || element === "2") {
      totalStarts += Number(element);
    }
  }
  // 8. Verify the math: Provided words must match grid requirements
  if (totalStarts !== words.length) {
    return {
      isValid: false,
      msg: "Error: Mismatch between word count and grid starts",
    };
  }

  return { isValid: true };
}
