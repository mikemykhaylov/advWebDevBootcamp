function tripleAndFilter(arr) {
  return arr.map((value) => value * 3).filter((value) => value % 5 === 0);
}
function doubleOddNumbers(arr) {
  return arr.filter((val) => val % 2 !== 0).map((val) => val * 2);
}
function mapFilterAndReduce(arr) {
  return arr
    .map((val) => val.firstName)
    .filter((val) => val.length < 5)
    .reduce((acc, next) => {
      acc[next] = next.length;
      return acc;
    }, {});
}
const createStudentObj = (first, last) => ({ firstName: first, lastName: last });
const instructor = {
  firstName: 'Colt',
  sayHi() {
    setTimeout(() => {
      console.log(`Hello ${this.firstName}`);
    }, 1000);
  },
};
