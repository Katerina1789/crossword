// validateInput checks puzzle format, word list, duplicates and basic rules
export function validateInput(puzzle, words) {
  // puzzle must be a string
  if (typeof puzzle !== "string") {
    return { isValid: false, msg: "Error: Puzzle must be a string" };
  }

  // puzzle cannot be empty
  if (puzzle.trim().length === 0) {
    return { isValid: false, msg: "Error: Puzzle string is empty" };
  }

  // words must be an array
  if (!Array.isArray(words)) {
    return { isValid: false, msg: "Error: Words must be an array" };
  }

  // word list cannot be empty
  if (words.length === 0) {
    return { isValid: false, msg: "Error: Word list is empty" };
  }

  // all words must be valid strings
  for (const element of words) {
    // must be a non-empty string
    if (typeof element !== "string" || element === "") {
      return {
        isValid: false,
        msg: "Error: Word list contains invalid or empty strings",
      };
    }

    // must contain only letters
    if (/[^a-zA-Z]/.test(element)) {
      return {
        isValid: false,
        msg: `Error: Word "${element}" contains invalid characters`,
      };
    }
  }

  // no duplicate words allowed
  if (new Set(words).size !== words.length) {
    return { isValid: false, msg: "Error: Duplicate words were found" };
  }

  // validate puzzle characters + count starting numbers
  let totalStarts = 0;
  for (const element of puzzle) {
    // puzzle must contain only digits 0/1/2, dots, or newlines
    if (!"012.\n".includes(element)) {
      return {
        isValid: false,
        msg: "Error: Puzzle contains invalid characters",
      };
    }

    // count required starting words
    if (element === "1" || element === "2") {
      totalStarts += Number(element);
    }
  }

  // all rows must exist and have the same length
  const rows = puzzle.split("\n");
  const firstRowLength = rows[0].length;
  for (const row of rows) {
    if (row.length === 0 || row.length !== firstRowLength) {
      return { isValid: false, msg: "Error: Puzzle rows are not rectangular" };
    }
  }

  // number of required words must match provided words
  if (totalStarts !== words.length) {
    return {
      isValid: false,
      msg: "Error: Mismatch between word count and grid starts",
    };
  }

  return { isValid: true };
}
