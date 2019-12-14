const instructors = [{ name: 'Colt' }, { name: 'Elie' }, { name: 'Matt' }];
instructors.find((val) => val.name === 'Colt');

instructors.findIndex((val) => val.name === 'Matt');

const str = 'Example string';
str.indexOf('g');

const nan = NaN;
const num = 1234;
Number.isFinite(nan);
Number.isFinite(num);
