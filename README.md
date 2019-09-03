# sudoku-solver

### Outline:

Simple 9x9 sudoku solver that iteratively checks each empty square against the following:

1. Numbers that exist in horizontal row
2. Numbers that exist in vertical column
3. Numbers that exist in the 3x3 grid

If there is only one possible solution for a given empty square, the square is filled with the number

### Usage:

Fill up the existing values in `solver.js` and run `npm start`.

### Grid:

Uses `{x, y}` notation, where `x` is the horizontal row while `y` is the vertical column

### Enhancements:

1. Tree solver for cases where no simple solution can be found
2. Checker for alternative solutions
3. Add a proper initial value loader
