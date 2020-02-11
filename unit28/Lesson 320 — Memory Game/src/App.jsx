import React, { Component } from "react";
import generateColors from "./ColorGenerator";
import Header from "./Header";
import BoxesWrap from "./BoxesWrap";
import Box from './Box';

class MemoryGame extends Component {
  constructor(props) {
    super(props);
    const colors = generateColors(8);
    this.state = {
      colors,
      choices: []
    };
    this.newGame = this.newGame.bind(this);
    this.makeChoice = this.makeChoice.bind(this);
    this.compareChoices = this.compareChoices.bind(this);
  }

  makeChoice(key) {
    this.setState(
      prevState => {
        const { colors, choices } = prevState;
        const chosenBox = colors.find(val => val.key === key);
        const chosenBoxIndex = colors.findIndex(val => val.key === key);
        colors[chosenBoxIndex].opened = true;
        choices.push(chosenBox);
        return {
          colors,
          choices
        };
      },
      () => {
        if (this.state.choices.length === 2) {
          setTimeout(this.compareChoices, 500);
        }
      }
    );
  }

  compareChoices() {
    this.setState(
      prevState => {
        const { colors, choices } = prevState;
        if (choices[0].color !== choices[1].color) {
          const firstBoxIndex = colors.findIndex(
            val => val.key === choices[0].key
          );
          const secondBoxIndex = colors.findIndex(
            val => val.key === choices[1].key
          );
          colors[firstBoxIndex].opened = false;
          colors[secondBoxIndex].opened = false;
        }
        return {
          colors,
          choices: []
        };
      },
      () => {
        if (this.state.colors.every(val => val.opened === true)) {
          setTimeout(this.newGame, 500);
        }
      }
    );
  }

  newGame() {
    const colors = generateColors(8);
    this.setState({ colors, choices: [] });
  }

  render() {
    return (
      <div className="MemoryGame">
        <Header newGame={this.newGame} />
        <BoxesWrap>
          {this.state.colors.map(color => (
            <Box colorObj={color} makeChoice={this.makeChoice} key={color.key} />
          ))}
        </BoxesWrap>
      </div>
    );
  }
}

export default MemoryGame;
