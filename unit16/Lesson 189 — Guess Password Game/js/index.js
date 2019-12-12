document.addEventListener('DOMContentLoaded', () => {
  const wordCount = 10;
  let guessCount = 4;
  let password = '';

  const start = document.getElementById('start');
  start.addEventListener('click', () => {
    toggleClasses(document.getElementById('start-screen'), 'hide', 'show');
    toggleClasses(document.getElementById('game-screen'), 'hide', 'show');
    startGame();
  });

  function toggleClasses(element, ...args) {
    console.log(element);
    for (let i = 0; i < args.length; i += 1) {
      element.classList.toggle(args[i]);
    }
  }

  function startGame() {
    // get random words and append them to the DOM
    const wordList = document.getElementById('word-list');
    const randomWords = getRandomValues(words, wordCount);
    randomWords.forEach((word) => {
      const li = document.createElement('li');
      li.innerText = word;
      wordList.appendChild(li);
    });

    // set a secret password and the guess count display
    [password] = getRandomValues(randomWords, 1);
    setGuessCount(guessCount);

    // add update listener for clicking on a word
    wordList.addEventListener('click', updateGame);
  }

  function getRandomValues(array, numberOfVals) {
    return shuffle(array).slice(0, numberOfVals);
  }

  function shuffle(array) {
    const arrayCopy = array.slice();
    for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1 -= 1) {
      // generate a random index between 0 and idx1 (inclusive)
      const idx2 = Math.floor(Math.random() * (idx1 + 1));

      // swap elements at idx1 and idx2
      const temp = arrayCopy[idx1];
      arrayCopy[idx1] = arrayCopy[idx2];
      arrayCopy[idx2] = temp;
    }
    return arrayCopy;
  }

  function setGuessCount(newCount) {
    guessCount = newCount;
    document.getElementById('guesses-remaining').innerText = `Guesses remaining: ${guessCount}.`;
  }

  function updateGame(e) {
    if (e.target.tagName === 'LI' && !e.target.classList.contains('disabled')) {
      // grab guessed word, check it against password, update view
      const guess = e.target.innerText;
      const similarityScore = compareWords(guess, password);
      e.target.classList.add('disabled');
      e.target.innerText = `${e.target.innerText} --> Matching Letters: ${similarityScore}`;
      setGuessCount(guessCount - 1);

      // check whether the game is over
      if (similarityScore === password.length) {
        toggleClasses(document.getElementById('winner'), 'hide', 'show');
        this.removeEventListener('click', updateGame);
      } else if (guessCount === 0) {
        toggleClasses(document.getElementById('loser'), 'hide', 'show');
        this.removeEventListener('click', updateGame);
      }
    }
  }

  function compareWords(word1, word2) {
    if (word1.length !== word2.length) throw new Error('Words must have the same length');
    let count = 0;
    for (let i = 0; i < word1.length; i += 1) {
      if (word1[i] === word2[i]) count += 1;
    }
    return count;
  }
});
