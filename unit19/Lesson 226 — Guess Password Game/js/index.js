document.addEventListener('DOMContentLoaded', () => {
  const wordCount = 10;
  let guessCount = 4;
  let password = '';

  d3.select('#start').on('click', () => {
    d3.select('#start-screen')
      .classed('hide', !d3.select('#start-screen').classed('hide'))
      .classed('show', !d3.select('#start-screen').classed('show'));
    d3.select('#game-screen')
      .classed('hide', !d3.select('#game-screen').classed('hide'))
      .classed('show', !d3.select('#game-screen').classed('show'));
    startGame();
  });

  function toggleClasses(element, ...args) {
    console.log(element);
    for (let i = 0; i < args.length; i += 1) {
      element.classed(args[i], !element.classed(args[i]));
    }
  }

  function startGame() {
    // get random words and append them to the DOM
    const randomWords = getRandomValues(words, wordCount);
    randomWords.forEach((word) => {
      d3.select('#word-list')
        .append('li')
        .text(word);
    });

    // set a secret password and the guess count display
    [password] = getRandomValues(randomWords, 1);
    setGuessCount(guessCount);

    // add update listener for clicking on a word
    d3.select('#word-list').on('click', updateGame);
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
    d3.select('#guesses-remaining').text(`Guesses remaining: ${guessCount}.`);
  }

  function updateGame() {
    if (d3.event.target.tagName === 'LI' && !d3.event.target.classList.contains('disabled')) {
      // grab guessed word, check it against password, update view
      const guess = d3.event.target.innerText;
      const similarityScore = compareWords(guess, password);
      d3.event.target.classList.add('disabled');
      d3.event.target.innerText = `${d3.event.target.innerText} --> Matching Letters: ${similarityScore}`;
      setGuessCount(guessCount - 1);

      // check whether the game is over
      if (similarityScore === password.length) {
        toggleClasses(d3.select('#winner'), 'hide', 'show');
        d3.select('#word-list').on('click', null);
      } else if (guessCount === 0) {
        toggleClasses(d3.select('#loser'), 'hide', 'show');
        d3.select('#word-list').on('click', null);
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
