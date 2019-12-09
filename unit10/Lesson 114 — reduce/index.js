function extractValue(arr, key) {
  return arr.reduce((accum, next) => {
    accum.push(next[key]);
    return accum;
  }, []);
}
function vowelCount(str) {
  const vowels = 'aeiou';
  return str.split('').reduce((accum, next) => {
    if (vowels.includes(next)) {
      if (next in accum) {
        accum[next] += 1;
      } else {
        accum[next] = 1;
      }
    }
    return accum;
  }, {});
}
function addKeyAndValue(arr, key, value) {
  return arr.reduce((accum, next, i) => {
    accum[i][key] = value;
    return accum;
  }, arr);
}
function partition(arr, callback) {
  return arr.reduce(
    (accum, next) => {
      if (callback(next)) {
        accum[0].push(next);
      } else {
        accum[1].push(next);
      }
      return accum;
    },
    [[], []],
  );
}
