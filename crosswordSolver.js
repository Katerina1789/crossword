// crosswordSolver.js
import { validateInput } from './src/validateInput.js';

function crosswordSolver(emptyPuzzle, words) {
    const validation = validateInput(emptyPuzzle, words);

    if (validation.isValid === false) {
        console.log(validation.msg); 
        return;
    }

    console.log("OK: Valid Input."); 
}

// Example data to run it right now
const puzzle = ''
const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(puzzle, words);