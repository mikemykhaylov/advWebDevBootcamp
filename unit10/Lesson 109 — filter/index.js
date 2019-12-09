function filterByValue(arr, key) {
  return arr.filter((val) => val[key]);
}
function find(arr, searchValue) {
  return arr.filter((val) => val === searchValue)[0];
}
function findInObj(arr, key, searchValue) {
  return arr.filter((val) => val[key] === searchValue)[0];
}
function removeVowels(str) {
  const vowels = 'aeoui';
  return str
    .toLowerCase()
    .split('')
    .filter((val) => !vowels.includes(val))
    .join('');
}
function doubleOddNumbers(arr) {
  return arr.filter((val) => val % 2 !== 0).map((val) => val * 2);
}
