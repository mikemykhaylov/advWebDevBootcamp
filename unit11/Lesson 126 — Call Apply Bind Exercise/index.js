function arrayFrom(arrayLikeObject) {
  return [].slice.call(arrayLikeObject);
}
function sumEvenArguments(...args) {
  return [].slice.call(args).reduce((accum, next) => {
    if (next % 2 === 0) {
      const newaccum = accum + next;
      return newaccum;
    }
    return accum;
  }, 0);
}
function invokeMax(fn, num) {
  let max = 0;
  return (...args) => {
    if (max >= num) {
      return 'Maxed Out!';
    }
    max += 1;
    return fn.apply(this, args);
  };
}
function once(fn, thisArg) {
  let hasBeenCalled = false;
  return (...args) => {
    if (!hasBeenCalled) {
      hasBeenCalled = true;
      return fn.apply(thisArg, args);
    }
    return undefined;
  };
}
function bind(fn, thisArg, ...outerargs) {
  return (...innerargs) => {
    const allarguments = outerargs.concat(innerargs);
    return fn.apply(thisArg, allarguments);
  };
}
function flip(fn, thisArg, ...outerargs) {
  return (...innerargs) => {
    const allarguments = outerargs
      .concat(innerargs)
      .slice(0, fn.length)
      .reverse();
    return fn.apply(thisArg, allarguments);
  };
}
