const pr1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('First resolved');
  }, 3000);
});
const pr2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Second resolved');
  }, 3000);
});
const pr3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Third resolved');
  }, 3000);
});

const promises = [pr1, pr2, pr3];
Promise.all(promises).then((val) => console.log(val));
