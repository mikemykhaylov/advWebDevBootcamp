function doubleValues(arr) {
  const newArr = [];
  arr.forEach((val) => {
    const newval = val * 2;
    newArr.push(newval);
  });
  return newArr;
}

function onlyEvenValues(arr) {
  const evenNums = [];
  arr.forEach((val) => {
    if (val % 2 === 0) {
      evenNums.push(val);
    }
  });
  return evenNums;
}

function showFirstAndLast(arr) {
  const endings = [];
  arr.forEach((val) => {
    endings.push(val[0] + val[val.length - 1]);
  });
  return endings;
}

function addKeyAndValue(arr, key, value) {
  arr.forEach((val) => {
    val[key] = value;
  });
  return arr;
}

function vowelCount(str) {
  const chars = str.split('');
  const vowels = {};
  const allVowels = 'aeiou';
  chars.forEach((val) => {
    if (allVowels.indexOf(val) !== -1) {
      if (val in vowels) {
        vowels[val] += 1;
      } else {
        vowels[val] = 1;
      }
    }
  });
  return vowels;
}
