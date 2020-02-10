import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from './Icons/CloseIcon';
import Input from './Input';
import NewRecipeIngredients from './NewRecipeIngredients';
import './Form.scss';

function Form({ inputHandler, toggleForm, newRecipe, addIngredient, addRecipe, changeIngredient }) {
  return (
    <div className="container">
      <form className="form" onSubmit={addRecipe}>
        <div className="form__title-wrap">
          <h2 className="form__title">Add new recipe:</h2>
          <button type="button" className="icon-wrap" onClick={() => toggleForm(false)}>
            <CloseIcon />
          </button>
        </div>
        <Input 
          propName="title"
          propValue={newRecipe.title}
          placeholder="Enter recipe title..."
          inputHandler={inputHandler}
          label="Title"
        />
        <NewRecipeIngredients
          ingredients={newRecipe.ingredients}
          newIngredient={newRecipe.newIngredient}
          inputHandler={inputHandler}
          addIngredient={addIngredient}
          changeIngredient={changeIngredient}
        />
        <Input 
          propName="instructions"
          propValue={newRecipe.instructions}
          placeholder="Enter recipe instructions..."
          inputHandler={inputHandler}
          label="Instructions"
        />
        <Input 
          propName="imgUrl"
          propValue={newRecipe.imgUrl}
          placeholder="Enter recipe image URL..."
          inputHandler={inputHandler}
          label="Image URL"
        />
        <button type="submit" className="button form__submit-button">
          Add
        </button>
      </form>
    </div>
  );
}

Form.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  changeIngredient: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  newRecipe: PropTypes.shape({
    title: PropTypes.string,
    ingredients: PropTypes.array,
    instructions: PropTypes.string,
    imgUrl: PropTypes.string,
    newIngredient: PropTypes.string,
  }).isRequired,
};

export default Form;
