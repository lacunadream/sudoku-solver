import chai from 'chai';
import Sudoku from './sodoku';
import { logger } from 'ms-logging';

const should = chai.should();

describe('sudoku class', () => {
  it('should generate empty sudoku box', async () => {
    const ss = new Sudoku();
    ss.matrix.length.should.equal(9)
    ss.matrix[0].length.should.equal(9);
    ss.matrix[8].length.should.equal(9);
  });

  it('should set value correctly', async () => {
    const sudoku = new Sudoku();
    sudoku.setValue(0, 0, 7);
    sudoku.matrix[0][0].should.equal(7)
  })

  it('should set value correctly', async () => {
    const sudoku = new Sudoku();
    sudoku.setValue(8, 2, 1);
    sudoku.matrix[2][8].should.equal(1)
  })  

  it('should get value correctly', async () => {
    const sudoku = new Sudoku();
    sudoku.setValue(2, 7, 5);
    const x = sudoku.getValue(2, 7);
    x.should.equal(5);
  })    

  it('should get next value correctly', async () => {
    const sudoku = new Sudoku();
    sudoku.setValue(2, 7, 5);
    const x = sudoku.getNextValue(1, 7);
    x.should.equal(5);
  })   
  
  it('should get next row value correctly', async () => {
    const sudoku = new Sudoku();
    sudoku.setValue(0, 3, 4);
    const x = sudoku.getNextValue(8, 2);
    x.should.equal(4);
  })   
  
  it('should get next [8, 8] correctly', async () => {
    const sudoku = new Sudoku();
    sudoku.setValue(0, 0, 2);
    const x = sudoku.getNextValue(8, 8);
    x.should.equal(2);
  })     
  
  it('should get horizontal values', async () => {
    const sudoku = new Sudoku();
    sudoku.setValue(1, 3, 4);
    sudoku.setValue(5, 3, 8);
    sudoku.setValue(8, 3, 9);
    const x = sudoku.getHorizontalValues(2, 3);
    x.should.deep.equal([4, 8, 9]);
  })
  
  it('should get vertical values', async () => {
    const sudoku = new Sudoku();
    sudoku.setValue(4, 0, 1);
    sudoku.setValue(4, 2, 2);
    sudoku.setValue(4, 8, 3);
    sudoku.setValue(5, 8, 5);
    const x = sudoku.getVerticalValues(4, 3);
    x.should.deep.equal([1, 2, 3]);
  })
  
  it('should get square values', async () => {
    const sudoku = new Sudoku();
    sudoku.setValue(6, 0, 1);
    sudoku.setValue(6, 1, 2);
    sudoku.setValue(6, 2, 3);
    sudoku.setValue(7, 0, 4);
    sudoku.setValue(7, 1, 5);
    sudoku.setValue(8, 1, 8);    
    sudoku.setValue(8, 2, 9);    
    sudoku.setValue(5, 8, 7);
    const x = sudoku.getSquareValues(7, 2);
    x.should.deep.equal([1, 2, 3, 4, 5, 8, 9]);
  })  
});
