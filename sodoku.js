import { logger } from "ms-logging";

export default class Sudoku {
  constructor() {
    this._matrix = createEmptyMatrix();
  }

  get matrix() {
    return this._matrix;
  }

  setValue(x, y, val) {
    if (val > 9 || val < 1) throw new Error(`value ${val} out of bounds`);
    if (x > 8 || x < 0) throw new Error(`x ${x} out of bounds`);
    if (y > 8 || y < 0) throw new Error(`y ${x} out of bounds`);
    this._matrix[y][x] = val;
  }

  getValue(x, y) {
    return this._matrix[y][x];
  }

  // eslint-disable-next-line class-methods-use-this
  getNextCoordinates(x, y) {
    let xx = x;
    let yy = y;
    if (xx === 8 && yy === 8) {
      xx = 0;
      yy = 0;
    } else if (xx === 8) { // bump down
      xx = 0;
      yy += 1;
    } else {
      xx += 1;
    }
    return {
      x: xx,
      y: yy,
    }
  }

  getNextValue(x, y) {
    const { x: xx, y: yy } = this.getNextCoordinates(x, y);
    return this.getValue(xx, yy);
  }

  getHorizontalValues(x, y) {
    const values = this._matrix[y];
    return values.filter(v => v !== undefined);
  }

  getVerticalValues(x, y) {
    const values = [];
    for (let i = 0; i <= 8; i++) {
      values.push(this.getValue(x, i));
    }    
    return values.filter(v => v !== undefined);
  }  

  getSquareValues(x, y) {
    const getBounds = (coordinate) => {
      let LB = 0; // lowerbound
      let UB = 0; // upperbound
      if (coordinate <= 2) {
        UB = 2;
      } else if (coordinate <= 5) {
        LB = 3;
        UB = 5;
      } else {
        LB = 6;
        UB = 8;
      }
      return {
        LB,
        UB,
      }
    }
    const { LB: xLB, UB: xUB } = getBounds(x);
    const { LB: yLB, UB: yUB } = getBounds(y);

    const values = [];
    for (let i = xLB; i <= xUB; i++ ) {
      for (let ii = yLB; ii <= yUB; ii++) {
        values.push(this.getValue(i, ii));
      }
    }
    return values.filter(v => v !== undefined);
  }    

  countTotalFilled() {
    let countHolder = 0;
    for (let i = 0; i < 9; i++) {
      const count = this._matrix[i].filter(v => v !== undefined).length;
      countHolder += count;
    }
    return countHolder;
  }

  isComplete() {
    return this.countTotalFilled() === 81;
  }

  ppV(x, y) {
    return (this.getValue(x, y) || ' ');
  }

  prettyPrintRow(y) {
    console.log(`| ${this.ppV(0, y)} ${this.ppV(1, y)} ${this.ppV(2, y)} | ${this.ppV(3, y)} ${this.ppV(4, y)} ${this.ppV(5, y)} | ${this.ppV(6, y)} ${this.ppV(7, y)} ${this.ppV(8, y)} |`);
  }

  prettyPrintVerticalShell() {
    console.log('—————————————————————————')
  }

  prettyPrint() {
    this.prettyPrintVerticalShell();
    this.prettyPrintRow(0);
    this.prettyPrintRow(1);
    this.prettyPrintRow(2);
    this.prettyPrintVerticalShell();
    this.prettyPrintRow(3);
    this.prettyPrintRow(4);
    this.prettyPrintRow(5);
    this.prettyPrintVerticalShell();
    this.prettyPrintRow(6);
    this.prettyPrintRow(7);
    this.prettyPrintRow(8);
    this.prettyPrintVerticalShell();
  }
}

function createEmptyMatrix() {
  const x = new Array(9);
  for (let i = 0; i < x.length; i++) {
    x[i] = new Array(9);
  }
  return x;
}