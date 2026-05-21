// solvingGrid creates a working grid where dots stay and other cells become null
export function solvingGrid(grid) {
  const newGrid = [];

  // build new grid row by row
  for (let row = 0; row < grid.length; row++) {
    const newRow = [];

    // copy dots, replace other cells with null
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === ".") {
        newRow.push(".");
      } else {
        newRow.push(null);
      }
    }

    newGrid.push(newRow);
  }

  return newGrid;
}

// canPlaceWord checks if a word fits in a slot without conflicts
export function canPlaceWord(slot, word, grid) {
  // length must match
  if (slot.cells.length !== word.length) {
    return false;
  }

  // check each cell for conflicts
  for (let i = 0; i < slot.cells.length; i++) {
    const r = slot.cells[i].r;
    const c = slot.cells[i].c;

    // conflict if grid has a different letter
    if (grid[r][c] !== word[i] && grid[r][c] != null) {
      return false;
    }
  }

  return true;
}

// placeWord writes a word into the grid and records changed cells
export function placeWord(slot, word, grid) {
  const changes = [];

  // fill each cell of the slot
  for (let i = 0; i < slot.cells.length; i++) {
    const r = slot.cells[i].r;
    const c = slot.cells[i].c;

    // only write into empty cells
    if (grid[r][c] === null) {
      changes.push({ r, c, previous: null });
      grid[r][c] = word[i];
    }
  }

  return changes;
}

// restoreWord undoes changes made by placeWord
export function restoreWord(changes, grid) {
  // restore each changed cell
  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];
    grid[change.r][change.c] = change.previous;
  }
}

// solve tries words in each slot using backtracking and tracks solutions
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
  // stop early if more than one solution found
  if (count.count > 1) return;

  // all slots filled -> found a solution
  if (slotIndex === slots.length) {
    if (used.includes(false)) return;

    count.count++;
    if (count.count === 1) {
      solution.push([...currentSolution]);
    }
    return;
  }

  const slot = slots[slotIndex];

  // try each unused word
  for (let i = 0; i < words.length; i++) {
    if (used[i]) continue;

    const word = words[i];

    // check if word fits
    if (canPlaceWord(slot, word, grid)) {
      used[i] = true;

      // place word and record changes
      const changes = placeWord(slot, word, grid);
      currentSolution.push({ slot, word });

      // recurse to next slot
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

      // undo placement
      currentSolution.pop();
      restoreWord(changes, grid);
      used[i] = false;
    }
  }
}
