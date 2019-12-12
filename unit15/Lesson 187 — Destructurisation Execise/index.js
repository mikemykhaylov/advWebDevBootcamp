function displayStudentInfo(obj) {
  const { first, last } = obj;
  return `Your full name is ${first} ${last}`;
}
function printFullName({ first, last }) {
  return `Your full name is ${first} ${last}`;
}
function createStudent({ likesJavaScript = true, likesES2015 = true } = {}) {
  if (likesJavaScript) {
    if (likesES2015) {
      return 'The student likes JavaScript and ES2015!';
    }
    return 'The student likes JavaScript!';
  }
  if (likesES2015) {
    return 'The student likes ES2015!';
  }
  return 'The student does not like much...';
}
function reverseArray(arr) {
  for (let i = 0; i < arr.length / 2; i += 1) {
    [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
  }
  return arr;
}
