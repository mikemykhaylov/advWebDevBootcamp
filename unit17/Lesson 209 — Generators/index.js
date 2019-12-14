function* pauseAndContinue(num) {
  for (let i = 0; i < num; i += 1) {
    yield i;
  }
}

const gen = pauseAndContinue(5);
console.log('1', gen.next());
console.log('2', gen.next());
console.log('3', gen.next());
console.log('4', gen.next());
console.log('5', gen.next());
console.log('6', gen.next());

const gen2 = pauseAndContinue(5);
for (const iterator of gen2) {
  console.log(iterator);
}
