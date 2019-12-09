function doubleValues(arr) {
  return arr.map((val) => {
    const doubleval = val * 2;
    return doubleval;
  });
}

function valTimesIndex(arr) {
  return arr.map((val, index) => {
    const valueTimesIndex = val * index;
    return valueTimesIndex;
  });
}

function extractKey(arr, key) {
  return arr.map((val) => val[key]);
}

function extractFullName(arr) {
  return arr.map((val) => `${val.first} ${val.last}`);
}
