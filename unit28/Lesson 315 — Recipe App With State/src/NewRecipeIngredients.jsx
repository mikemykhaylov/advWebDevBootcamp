import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

function NewRecipeIngredients({ ingredients, newIngredient, inputHandler, addIngredient, changeIngredient }) {
  const ingredientsInputs = ingredients.map((ingredient, i) => {
    return (
      <Input 
        propName={`ingredient[${i}]`}
        propValue={ingredient}
        placeholder="Enter recipe ingredient..."
        inputHandler={changeIngredient}
        label={`Ingredient ${i + 1}`}
        // eslint-disable-next-line react/no-array-index-key
        key={i}
      />
    );
  });
  return (
    <div className="form__ingredients-wrap">
      {ingredientsInputs}
      <Input 
        propName='newIngredient'
        propValue={newIngredient}
        placeholder="Enter recipe ingredient..."
        inputHandler={inputHandler}
        label={`Ingredient ${ingredients.length + 1}`}
      />
      <button type="button" className="button form__ingredients-button" onClick={addIngredient}>
        +
      </button>
    </div>
  );
}

NewRecipeIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  newIngredient: PropTypes.string.isRequired,
  inputHandler: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  changeIngredient: PropTypes.func.isRequired,
};

export default NewRecipeIngredients;
