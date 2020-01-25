import React from 'react';
import PropTypes from 'prop-types';
import Ingredients from './Ingredients';
import './Recipe.css';

function Recipe({ title, img, instructions, ingredients }) {
  return (
    <div className="recipe">
      <img src={img} alt={title} className="recipe__image" />
      <div className="recipe__description">
        <h2 className="recipe__title">{title}</h2>
        <h3 className="recipe__subtitle">Ingredients:</h3>
        <Ingredients ingredients={ingredients} />
        <h3 className="recipe__subtitle">Instructions:</h3>
        <p className="recipe__instructions">{instructions}</p>
      </div>
    </div>
  );
}

Recipe.defaultProps = {
  img: 'https://via.placeholder.com/400',
};

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  instructions: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Recipe;
