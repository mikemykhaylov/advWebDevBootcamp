const o = {
  name: 'Colt',
};
const o2 = o;
const o3 = {};
Object.assign(o3, o);
o2.name = 'Elie';
console.log(o.name);
console.log(o3.name);

const firstMap = new Map([
  [1, 2],
  [3, 4],
  [5, 6],
]);
const firstArr = Array.from(firstMap);
const secondSet = new Set(['foo', 'bar', 'baz']);
const secondArr = Array.from(secondSet);
