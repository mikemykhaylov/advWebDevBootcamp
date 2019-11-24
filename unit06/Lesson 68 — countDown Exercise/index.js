function countDown(time) {
  let secondsLeft = time;
  const interval = setInterval(() => {
    secondsLeft -= 1;
    if (secondsLeft === 0) {
      console.log('Ring! Ring! Ring!');
      clearInterval(interval);
      return;
    }
    console.log(`Timer: ${secondsLeft}`);
  }, 1000);
}

countDown(10);
