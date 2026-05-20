// applySolution fills the grid with solved letters based on slot assignments
export function applySolution(originalGrid, solution) {
  // copies original grid so we don't modify it directly
  const out = originalGrid.map((row) => [...row]);

  // solution is an array of { slot, word }
  for (const { slot, word } of solution) {
    for (let i = 0; i < slot.cells.length; i++) {
      const { r, c } = slot.cells[i];
      out[r][c] = word[i];
    }
  }

  return out.map((row) => row.join("")).join("\n");
}
