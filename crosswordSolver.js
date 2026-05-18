// imports used to access helper functions
import { validateInput } from './src/validateInput.js';
import { parsePuzzle } from './src/parsePuzzle.js';
import { findSlots } from './src/findSlots.js';
// import { <functionname> } from './src/backtracking.js';
import { applySolution } from './src/applySolution.js';

// crosswordSolver connects all parts
export function crosswordSolver(puzzle, words) {
  try {
    // validate puzzle + words
    const validation = validateInput(puzzle, words)
    if (!validation.isValid) {
      console.log(validation.msg)
      return
    }

    // convert puzzle string -> 2D grid
    const grid = parsePuzzle(puzzle)

    // find all slots in the grid
    const { slots } = findSlots(grid)

    // TODO: enable this once backtracking is implemented
    console.log("Backtracking solver not implemented yet")
    return

    /*
    Backtracking Implementation:
     const result = <functionname>(slots, words, grid)

     if (result.type === 'none') {
       console.log('Error: No valid solution')
       return
     }

     if (result.type === 'multiple') {
       console.log('Error: Multiple solutions found')
       return
     }

     console.log(applySolution(grid, result.solution))
    */

  } catch (err) {
    console.log(`Error: ${err.message}`)
  }
}

// Testing example
const puzzle = '2001\n0..0\n2000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(puzzle, words)
