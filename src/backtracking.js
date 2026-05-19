/*
Quick summary of how the project works so far:

1. Giannis validates all input cases (puzzle + words).
2. I parse the puzzle into a 2D grid and find all valid slots for the crossword (horizontal + vertical).
4. crosswordSolver() calls THIS function you will write here:
    - <functionname>(slots, words, grid)
5. Your part is to:
    - Assign each word to exactly one slot.
    - Handle crossing constraints (letters must match).
    - Use backtracking to explore possibilities.
    - Detect if:
        a) there is NO solution
        b) there is EXACTLY ONE solution
        c) there are MULTIPLE solutions


    You receive:
    1. slots: Array of slot objects
    [
    { cells: [{r,c}, {r,c}, ...], length: N },
    ...
    ]

    2. words: Array of strings (all lowercase, validated)

    3. grid: 2D array of characters (numbers, 0, dots)
    

    You must return:
    An object with one of the following shapes:

    1) No solution:
    { type: 'none' }

    2) Multiple solutions:
    { type: 'multiple' }

    3) Unique solution:
    {
      type: 'unique',
      solution: [
        { slot, word },
        { slot, word },
        ...
      ]
    }

    (The "solution" array is what applySolution() uses to fill the grid.)
*/

export function solvingGrid(grid){
  const newGrid=[]
for (let row=0;row<grid.length;row++){
  const newRow=[]
  for (let col=0;col<grid[row].length;col++){
      if(grid[row][col]=="."){
        newRow.push(".")
      } else {
        newRow.push(null)
      }
  }
newGrid.push(newRow)
}
return newGrid
}
export function canPlaceWord(slot, word, grid){
  if (slot.cells.length!==word.length){
    return false
  }
for (let i=0;i<slot.cells.length;i++){
    const r=slot.cells[i].r
  const c=slot.cells[i].c
if (grid[r][c]!==word[i] && grid[r][c]!=null){
return false
}
}
return true
}
export function placeWord(slot, word, grid){
const changes=[]
for (let i=0;i<slot.cells.length;i++){
  const r=slot.cells[i].r
  const c=slot.cells[i].c
  if (grid[r][c]===null){
   changes.push({
    r:r,
    c:c,
    previous:grid[r][c]
   })
    grid[r][c]=word[i]
  }
}
return changes
}
