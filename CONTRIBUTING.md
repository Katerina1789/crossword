# Contributing Guide

This project is developed by three contributors working in parallel.  
The goal of this guide is to keep the workflow clean, simple and easy to audit.

---

## Branching

- Create a branch `dev` where everyone uploads their changes.  
- On branch `main` we will have the final merge once all tasks regarding the code are completed.  

---

## Commits

- Use **conventional commits** to keep commit history readable and consistent.  
- Each commit message must start with a type, followed by a short description.  
- Commit messages should be:  
  - short,  
  - self-explanatory and  
  - focused.  
- Conventional Commits Basic Dictionary:  
    - `feat: a new feature`  
    feat(<filename>): add slot detection logic  

    - `fix: a bug fix`
    fix(<filename>): correct overlap check

    - `refactor: code restructuring without changing behavior`
    refactor(<filename>): simplify backtracking loop

    - `docs: documentation changes`
    docs(<filename>): update README with usage example

    - `test: adding or updating tests`
    test(<filename>): add multi-solution test case

    - `style: formatting only (no logic changes)`
    style(<filename>): format indentation in helpers.js

    - `chore: maintenance tasks`
    chore(<filename>): update .gitignore

---

## Code Style

- Keep functions minimal, beginner friendly and focused.  
- Prefer clear, readable code over complex one.  
- Use comments for logic flow or/and navigation.  
- Allowed language is JavaScript.  
- No external libraries required.  

---

## Testing

- Add unit tests for any isolated logic (input validation, word placement checks, output formatting).  
- Manual testing must follow the audit_guide.md.  

---

## Project Structure

Keep the project structure simple, organized and easy to navigate:  

```
crossword/
├── crosswordSolver.js
├── audit/
├── docs/
├── tests/
├── src/  
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

---

## Communication

Use direct messages on Discord/schedule calls or campus meetings for any questions, discussions or updates related to the project.

---

***Let's learn new things and improve as a team!***
