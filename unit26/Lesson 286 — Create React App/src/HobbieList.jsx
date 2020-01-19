import React from 'react';

function HobbieList() {
  const liStyle = { fontSize: '1.5em' };
  const hobbies = ['Sleeping', 'Eating', 'Hugging'];
  return (
    <ul>
      {hobbies.map((h, i) => <li key={i} style={liStyle}>{h}</li>)}
    </ul>
  );
}

export default HobbieList;
