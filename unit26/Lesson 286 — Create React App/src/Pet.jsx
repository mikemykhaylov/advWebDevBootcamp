import React from 'react';
import HobbieList from './HobbieList';
import './Pet.css';

function Pet() {
  return (
    <div className="card">
      <h2 className="name">Moxie</h2>
      <img src="https://github.com/tigarcia/MOxie/raw/master/moxie.png" alt="Moxie, my cat" />
      <h5>Hobbies</h5>
      <HobbieList />
    </div>
  );
}

export default Pet;
