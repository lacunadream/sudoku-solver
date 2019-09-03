export const mergeArrays = (...theArgs) => {
  const merged = theArgs.reduce((prev, current) => {
    return prev.concat(current);
  }, []);
  return merged;
}

export const getPotentialValues = (existingValues) => {
  const valueSet = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const potentialValues = valueSet.filter(v => {
    return existingValues.indexOf(v) < 0
  })
  const isCertain = potentialValues.length === 1;
  return {
    isCertain,
    potentialValues,
  }
}
