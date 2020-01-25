import React, { Component } from 'react';
import Box from './Box';
import './BoxWrap.css';

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

class BoxWrap extends Component {
  constructor(props) {
    super(props);
    this.state = { boxes: [] };
    const { boxes: boxesState } = this.state;
    for (let i = 0; i < 40; i += 1) {
      const randomColor = getRandomColor();
      boxesState.push({ key: i, color: randomColor });
    }
    setInterval(() => {
      this.setState(({ boxes: prevBoxes }) => {
        const boxIndex = Math.floor(Math.random() * prevBoxes.length);
        const updatedBoxesState = prevBoxes.map((box, i) => {
          if (i === boxIndex) {
            return {
              ...box,
              color: getRandomColor(),
            };
          }
          return box;
        });
        return { boxes: updatedBoxesState };
      });
    }, 300);
  }

  render() {
    const { boxes: boxesState } = this.state;
    const boxes = boxesState.map((box) => <Box key={box.key} color={box.color} />);
    return <div className="box__wrap">{boxes}</div>;
  }
}

export default BoxWrap;
