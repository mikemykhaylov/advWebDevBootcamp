const obj = {
  name: 'Elie',
  isCool: true,
  job: 'Intstructor',
  friendsWith: 'Colt',
};
const { name, isCool, ...data } = obj;

const obj2 = { ...obj, name: 'Colt', friendsWith: 'Elie' };
