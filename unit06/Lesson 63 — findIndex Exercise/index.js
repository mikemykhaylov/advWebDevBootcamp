const numbers = [1, 2, 3, 4, 5];
function findIndex(array, callback) {
  for (let i = 0; i < array.length; i += 1) {
    if (callback(array[i])) {
      return i;
    }
  }
  return -1;
}
const checkResult = findIndex(numbers, (element) => element === 5);

console.log(checkResult);
