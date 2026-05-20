// findSlots finds all valid word slots starting at numbered cells
export function findSlots(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const slots = [];

  // scans the grid for horizontal and vertical slots
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c];

      // ignore dots entirely
      if (cell === ".") continue;

      // horizontal slot starting at (r,c)
      if (
        (c === 0 || grid[r][c - 1] === ".") && // left blocked
        c + 1 < cols &&
        grid[r][c + 1] !== "." // right open
      ) {
        const cells = [];
        let cc = c;
        while (cc < cols && grid[r][cc] !== ".") {
          cells.push({ r, c: cc });
          cc++;
        }
        if (cells.length >= 2) {
          slots.push({ cells, length: cells.length });
        }
      }

      // vertical slot starting at (r,c)
      if (
        (r === 0 || grid[r - 1][c] === ".") && // above blocked
        r + 1 < rows &&
        grid[r + 1][c] !== "." // below open
      ) {
        const cells = [];
        let rr = r;
        while (rr < rows && grid[rr][c] !== ".") {
          cells.push({ r: rr, c });
          rr++;
        }
        if (cells.length >= 2) {
          slots.push({ cells, length: cells.length });
        }
      }
    }
  }

  return { slots };
}
