let counter = 0;
function incCounter() {
  counter += 1;
  console.log('counter: ', counter);
}

function runLater(callback, time) {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = callback();
      resolve(res);
    }, time);
  });
  return p;
}

runLater(incCounter, 1000)
  .then(() => runLater(incCounter, 2000))
  .then(() => runLater(incCounter, 3000));
