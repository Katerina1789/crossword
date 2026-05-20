// parsePuzzle turns the puzzle string into a 2D grid of characters
export function parsePuzzle(puzzle) {
  return puzzle.split("\n").map((row) => row.split(""));
}
