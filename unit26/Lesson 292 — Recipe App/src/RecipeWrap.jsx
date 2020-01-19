import React from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import './RecipeWrap.css';

function RecipeWrap({ recipes }) {
  return (
    <div className="recipe-wrap">
      {recipes.map(({
        title, ingredients, instructions, img, key,
      }) => (
        <Recipe
          key={key}
          title={title}
          ingredients={ingredients}
          instructions={instructions}
          img={img}
        />
      ))}
    </div>
  );
}

RecipeWrap.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeWrap;
