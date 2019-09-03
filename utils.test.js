import chai from 'chai';
import { logger } from 'ms-logging';
import { mergeArrays, getPotentialValues } from './utils';

const should = chai.should();

describe('utils', () => {
  it('merge ararys', async () => {
    const x = mergeArrays([1, 2, 3], [4, 8], [9]);
    x.should.deep.equal([1, 2, 3, 4, 8, 9]);
  });

  it('get potential values', async () => {
    const x = mergeArrays([1, 2, 3], [4, 8], [9]);
    const { isCertain, potentialValues } = getPotentialValues(x);
    isCertain.should.equal(false);
    potentialValues.should.deep.equal([5, 6, 7]);
  });

  it('get potential values - certain', async () => {
    const x = mergeArrays([1, 2, 3], [4, 8], [9], [6, 7]);
    const { isCertain, potentialValues } = getPotentialValues(x);
    isCertain.should.equal(true);
    potentialValues.should.deep.equal([5]);
  });
});
