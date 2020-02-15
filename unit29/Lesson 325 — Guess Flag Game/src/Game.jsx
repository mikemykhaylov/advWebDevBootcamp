import React, { Component } from 'react';
import ky from 'ky';
import GameControlls from './GameControlls';
import Flag from './Flag';
import GameStatus from './GameStatus';
import './Game.scss';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      gameState: 0,
      currentGuess: '',
      currentCountryIndex: null,
    };
    //  GameState :
    //  0 — Guessing
    //  1 — Correct Guess
    //  2 — Incorrect Guess
    this.selectCountries = this.selectCountries.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.acceptChoice = this.acceptChoice.bind(this);
  }

  componentDidMount() {
    this.selectCountries();
  }

  selectCountries() {
    const countries = [];
    ky.get('https://restcountries.eu/rest/v2/all')
      .json()
      .then((val) => {
        for (let i = 0; i < 4; i += 1) {
          const randCountry = val[Math.floor(Math.random() * val.length)];
          const { name, flag: flagURL } = randCountry;
          countries.push({ name, flagURL });
        }
        const currentCountryIndex = Math.floor(Math.random() * countries.length);
        this.setState({ countries, currentCountryIndex, gameState: 0 });
      });
  }

  handleChoice(e) {
    this.setState({ currentGuess: e.target.value });
  }

  acceptChoice(e) {
    e.preventDefault();
    const { countries, currentGuess, currentCountryIndex } = this.state;
    if (currentGuess === countries[currentCountryIndex].name) {
      this.setState({ gameState: 1 });
    } else {
      this.setState({ gameState: 2 });
    }
  }

  render() {
    const { countries, gameState, currentCountryIndex } = this.state;
    let flag = null;
    if (countries.length) {
      flag = countries[currentCountryIndex].flagURL;
    }
    let controlls;
    if (gameState === 0) {
      controlls = (
        <GameControlls
          countries={countries}
          handleChoice={this.handleChoice}
          acceptChoice={this.acceptChoice}
        />
      );
    } else {
      controlls = (
        <GameStatus
          status={gameState}
          currentCountry={countries[currentCountryIndex].name}
          selectCountries={this.selectCountries}
        />
      );
    }
    return (
      <div className="container game__container">
        {controlls}
        <Flag flagURL={flag} />
      </div>
    );
  }
}

export default Game;
