import { logger } from 'ms-logging';
import Sudoku from './sodoku';
import { isNullOrUndefined } from 'util';
import { mergeArrays, getPotentialValues } from './utils';

logger.info('sudoku solver');

function solve() {
  /**
   * load input
   * actually solve
   * return solved solution
   */
  const sudoku = new Sudoku();
  sudoku.setValue(0, 0, 6)
  sudoku.setValue(1, 0, 5)
  sudoku.setValue(2, 0, 9)
  sudoku.setValue(4, 0, 1)
  sudoku.setValue(6, 0, 2)
  sudoku.setValue(7, 0, 8)

  sudoku.setValue(0, 1, 1)
  sudoku.setValue(4, 1, 5)
  sudoku.setValue(7, 1, 3)

  sudoku.setValue(0, 2, 2)
  sudoku.setValue(3, 2, 8)
  sudoku.setValue(7, 2, 1)

  sudoku.setValue(3, 3, 1)
  sudoku.setValue(4, 3, 3)
  sudoku.setValue(5, 3, 5)
  sudoku.setValue(7, 3, 7)

  sudoku.setValue(0, 4, 8)
  sudoku.setValue(3, 4, 9)
  sudoku.setValue(8, 4, 2)

  sudoku.setValue(2, 5, 3)
  sudoku.setValue(4, 5, 7)
  sudoku.setValue(5, 5, 8)
  sudoku.setValue(6, 5, 6)
  sudoku.setValue(7, 5, 4)

  sudoku.setValue(0, 6, 3)
  sudoku.setValue(2, 6, 2)
  sudoku.setValue(5, 6, 9)
  sudoku.setValue(8, 6, 4)
  
  sudoku.setValue(5, 7, 1)
  sudoku.setValue(6, 7, 8)

  sudoku.setValue(2, 8, 8)
  sudoku.setValue(3, 8, 7)
  sudoku.setValue(4, 8, 6)

  sudoku.prettyPrint();
  /**
   * actually solve: 
   * 1. recursively go through each square
   * 2. check for horizontal line, vertical line, and square
   * 3. return result
   */

  let xValue = 0; // init
  let yValue = 0; // init
  let i = 0;
  for (; i < 1000; i++ ) {
    const currentVal = sudoku.getValue(xValue, yValue);
    if (isNullOrUndefined(currentVal)) {
      const existingValues = mergeArrays(
        sudoku.getHorizontalValues(xValue, yValue),
        sudoku.getVerticalValues(xValue, yValue),
        sudoku.getSquareValues(xValue, yValue),
      )
      const { isCertain, potentialValues } = getPotentialValues(existingValues);
      if (isCertain) {
        sudoku.setValue(xValue, yValue, potentialValues[0]);
      }
    }
    const { x, y } = sudoku.getNextCoordinates(xValue, yValue);
    xValue = x;
    yValue = y;
    if (sudoku.isComplete()) break;
  }
  logger.verbose(`solved in ${i} iterations`)
  sudoku.prettyPrint();
}
solve();
