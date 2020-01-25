import React, { Component } from 'react';
import Instructor from './Instructor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [
        {
          name: 'Tim',
          hobbies: ['Sailing', 'React'],
          key: 0,
        },
        {
          name: 'Matt',
          hobbies: ['Math', 'D3'],
          key: 1,
        },
        {
          name: 'Colt',
          hobbies: ['CSS', 'Hiking'],
          key: 2,
        },
        {
          name: 'Elie',
          hobbies: ['Music', 'ES2015'],
          key: 3,
        },
      ],
    };
    setTimeout(() => {
      const instructorIndex = Math.round(Math.random() * 3);
      const hobbieIndex = Math.round(Math.random());
      const { instructors } = this.state;
      const updatedInstructors = instructors.map((instr, i) => {
        if (i === instructorIndex) {
          return {
            ...instr,
            hobbies: [...instr.hobbies].splice(hobbieIndex, 1),
          };
        }
        return instr;
      });
      this.setState({ instructors: updatedInstructors });
    }, 3000);
  }

  render() {
    const { instructors } = this.state;
    return instructors.map((instructor) => (
      <Instructor name={instructor.name} hobbies={instructor.hobbies} key={instructor.name} />
    ));
  }
}

export default App;
