function Classroom() {
  const instructors = ['Colt', 'Elie'];
  return {
    getInstructor() {
      return instructors.slice();
    },
    addInstrucror(name) {
      instructors.push(name);
      return instructors.slice();
    },
  };
}
function specialMultiply(a, b) {
  if (b) {
    return a * b;
  }
  return (c) => a * c;
}
function guessingGame(amount) {
  const answer = Math.floor(Math.random() * 10);
  let guesses = 0;
  return (guess) => {
    guesses += 1;
    if (guesses >= amount) {
      return 'You are all done playing!';
    }
    if (guess > answer) {
      return "You're too high!";
    }
    if (guess < answer) {
      return "You're too low!";
    }
    return 'You got it!';
  };
}
