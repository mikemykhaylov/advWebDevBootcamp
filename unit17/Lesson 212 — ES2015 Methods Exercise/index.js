function copyObject(obj) {
  return Object.assign(obj);
}
function checkIfFinite(...arg) {
  return Number.isFinite(arg[0]);
}
function areAllNumbersFinite(arr) {
  return arr.every(Number.isFinite);
}
function convertArrayLikeObject(obj) {
  return Array.from(obj);
}
function displayEvenArguments(...nums) {
  return nums.filter((val) => val % 2 === 0);
}
