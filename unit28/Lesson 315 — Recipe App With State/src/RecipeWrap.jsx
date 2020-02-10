import React from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import './RecipeWrap.scss';

function RecipeWrap({ recipes, removeRecipe }) {
  return (
    <div className="recipe-wrap">
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.key}
          recipe={recipe}
          removeRecipe={removeRecipe}
        />
      ))}
    </div>
  );
}

RecipeWrap.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeRecipe: PropTypes.func.isRequired
};

export default RecipeWrap;
