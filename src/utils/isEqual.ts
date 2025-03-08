const isEqual = <T>(a: T, b: T): boolean => {
  if (a === b) return true;
  return JSON.stringify(a) === JSON.stringify(b);
};
export default isEqual;
