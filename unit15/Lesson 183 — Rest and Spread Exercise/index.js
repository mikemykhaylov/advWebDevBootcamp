function smallestValue(...args) {
  return Math.min(...args);
}
function placeInMiddle(arr, vals) {
  const mid = Math.floor(arr.length / 2);
  arr.splice(mid, 0, ...vals);
  return arr;
}
function joinArrays(...args) {
  return args.reduce((accum, next) => [...accum, ...next], []);
}
function sumEvenArgs(...args) {
  return args
    .filter((element) => element % 2 === 0)
    .reduce((accum, next) => {
      accum += next;
      return accum;
    }, 0);
}
function flip(fn, thisArg, ...outerargs) {
  return (...innerargs) => {
    const args = [...outerargs, ...innerargs].slice(0, fn.length).reverse();
    return fn.call(thisArg, ...args);
  };
}
function bind(fn, thisArg, ...outerargs) {
  return (...innerargs) => {
    const args = [...outerargs, ...innerargs];
    console.log(args);
    return fn.call(thisArg, ...args);
  };
}
