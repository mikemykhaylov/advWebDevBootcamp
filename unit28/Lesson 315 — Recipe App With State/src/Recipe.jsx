import React from 'react';
import PropTypes from 'prop-types';
import Ingredients from './Ingredients';
import './Recipe.scss';

function Recipe({ recipe, removeRecipe }) {
  const { title, imgUrl, instructions, ingredients, key } = recipe;
  return (
    <div className="recipe">
      <img src={imgUrl} alt={title} className="recipe__image" />
      <div className="recipe__description">
        <h2 className="recipe__title">{title}</h2>
        <h3 className="recipe__subtitle">Ingredients:</h3>
        <Ingredients ingredients={ingredients} />
        <h3 className="recipe__subtitle">Instructions:</h3>
        <p className="recipe__instructions">{instructions}</p>
        <button className="recipe__button-delete" type='button' onClick={() => removeRecipe(key)}>Delete</button>
      </div>
    </div>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    ingredients: PropTypes.array,
    instructions: PropTypes.string,
    imgUrl: PropTypes.string,
    key: PropTypes.number,
  }).isRequired,
  removeRecipe: PropTypes.func.isRequired
};

export default Recipe;
