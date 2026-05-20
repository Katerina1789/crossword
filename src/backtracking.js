// Creates a working copy of the grid: walls ('.') are kept, fillable cells become null
export function solvingGrid(grid) {
  const newGrid = [];
  for (let row = 0; row < grid.length; row++) {
    const newRow = [];
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] == ".") {
        newRow.push(".");
      } else {
        newRow.push(null);
      }
    }
    newGrid.push(newRow);
  }
  return newGrid;
}
// Returns true if the word can be placed in the slot without conflicting with already-placed letters
export function canPlaceWord(slot, word, grid) {
  if (slot.cells.length !== word.length) {
    return false;
  }
  for (let i = 0; i < slot.cells.length; i++) {
    const r = slot.cells[i].r;
    const c = slot.cells[i].c;
    if (grid[r][c] !== word[i] && grid[r][c] != null) {
      return false;
    }
  }
  return true;
}
// Places the word into the grid and returns the list of cells that were changed (for undo)
export function placeWord(slot, word, grid) {
  const changes = [];
  for (let i = 0; i < slot.cells.length; i++) {
    const r = slot.cells[i].r;
    const c = slot.cells[i].c;
    if (grid[r][c] === null) {
      changes.push({
        r: r,
        c: c,
        previous: null,
      });
      grid[r][c] = word[i];
    }
  }
  return changes;
}
// Undoes a placeWord call by restoring each changed cell to its previous value
export function restoreWord(changes, grid) {
  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];
    grid[change.r][change.c] = change.previous;
  }
}
// Recursive backtracking: tries every unused word for the current slot,
// counts solutions found, and stops early once count exceeds 1
export function solve(
  slotIndex,
  slots,
  words,
  grid,
  used,
  count,
  currentSolution,
  solution,
) {
  if (count.count > 1) return;
  if (slotIndex === slots.length) {
    count.count++;
    if (count.count === 1) {
      solution.push([...currentSolution]);
    }
    return;
  }

  const slot = slots[slotIndex];
  for (let i = 0; i < words.length; i++) {
    if (used[i]) continue;

    const word = words[i];
    if (canPlaceWord(slot, word, grid)) {
      used[i] = true;
      const changes = placeWord(slot, word, grid);
      currentSolution.push({ slot, word });
      solve(
        slotIndex + 1,
        slots,
        words,
        grid,
        used,
        count,
        currentSolution,
        solution,
      );
      currentSolution.pop();
      restoreWord(changes, grid);
      used[i] = false;
    }
  }
}
