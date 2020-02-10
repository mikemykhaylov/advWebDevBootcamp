import React, { Component } from 'react';
import Form from './Form';
import Header from './Header';
import RecipeWrap from './RecipeWrap';

class RecipeApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          title: 'Pasta',
          ingredients: [
            '100g pancetta',
            '50g pecorino cheese',
            '50g parmesan',
            '3 large eggs',
            '350g spaghetti',
            '2 plump garlic cloves, peeled and left whole',
            '50g unsalted butter',
            'sea salt and freshly grated black pepper',
          ],
          instructions: 'Mix ingredients, make pasta',
          imgUrl:
            'https://assets.bonappetit.com/photos/5a6f48f94f860a026c60fd71/3:2/w_5120,c_limit/pasta-carbonara.jpg',
          key: 0,
        },
        {
          title: 'Classic Bacon and Eggs',
          ingredients: [
            '4 eggs',
            '75 g bacon, in slices',
            'cherry tomatoes (optional)',
            'fresh parsley (optional)',
          ],
          instructions: 'Mix ingredients, make bacon and eggs',
          imgUrl:
            'https://i.dietdoctor.com/wp-content/uploads/2015/12/DD-14.jpg?auto=compress%2Cformat&w=4800&h=3200&fit=crop',
          key: 1,
        },
        {
          title: 'Cloud bread',
          ingredients: [
            '3 eggs',
            '110 g cream cheese',
            '1 pinch salt',
            '½ tbsp (4 g) ground psyllium husk powder',
            '½ tsp (2.5 g) baking powder',
            '¼ tsp cream of tartar (optional)',
            '4 tbsp mayonnaise',
            '150 g bacon',
            '50 g lettuce',
            '1 tomato, thinly sliced',
          ],
          instructions: 'Mix ingredients, make pasta',
          imgUrl:
            'https://i.dietdoctor.com/wp-content/uploads/2016/03/DD-51-2.jpg?auto=compress%2Cformat&w=4800&h=3200&fit=crop',
          key: 2,
        },
      ],
      newRecipe: {
        title: '',
        ingredients: [],
        instructions: '',
        newIngredient: '',
        imgUrl: '',
        key: '',
      },
      showForm: false,
      nextRecipeIndex: 3,
    };
    this.newRecipeBoilerplate = {
      title: '',
      ingredients: [],
      instructions: '',
      newIngredient: '',
      imgUrl: '',
      key: '',
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.changeIngredient = this.changeIngredient.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
  }

  toggleForm(formState) {
    this.setState(() => ({ showForm: formState }));
  }

  inputHandler(e) {
    const updatedProperty = {
      [e.target.name]: e.target.value,
    };
    this.setState((prevState) => {
      return {
        newRecipe: {
          ...prevState.newRecipe,
          ...updatedProperty,
        },
      };
    });
  }

  addIngredient() {
    this.setState((prevState) => {
      const { ingredients, newIngredient } = prevState.newRecipe;
      ingredients.push(newIngredient);
      return {
        newRecipe: {
          ...prevState.newRecipe,
          ingredients,
          newIngredient: '',
        },
      };
    });
  }

  changeIngredient(e) {
    const { name, value } = e.target;
    const index = +name.split('[').pop().split(']')[0];
    this.setState((prevState) => {
      const ingredients = [...prevState.newRecipe.ingredients];
      ingredients[index] = value;
      return {
        newRecipe: {
          ...prevState.newRecipe,
          ingredients
        }
      }
    })
  }

  addRecipe(e) {
    e.preventDefault();
    this.toggleForm(false);
    this.setState((prevState) => {
      const newRecipe = (({ title, ingredients, instructions, imgUrl }) => ({
        title,
        ingredients,
        instructions,
        imgUrl,
      }))(prevState.newRecipe);
      newRecipe.key = prevState.nextRecipeIndex;
      const recipes = prevState.recipes.concat(newRecipe);
      return {
        recipes,
        newRecipe: {
          ...this.newRecipeBoilerplate,
        },
        nextRecipeIndex: prevState.nextRecipeIndex + 1
      };
    });
  }

  removeRecipe(key) {
    this.setState((prevState) => {
      const recipes = prevState.recipes.filter((val) => val.key !== key);
      return {
        recipes
      };
    })
  }

  render() {
    const { recipes, showForm, newRecipe } = this.state;
    const FormComponent = showForm ? (
      <Form
        newRecipe={newRecipe}
        inputHandler={this.inputHandler}
        toggleForm={this.toggleForm}
        addIngredient={this.addIngredient}
        changeIngredient={this.changeIngredient}
        addRecipe={this.addRecipe}
      />
    ) : null;
    return (
      <div className="RecipeApp">
        <Header toggleForm={this.toggleForm} />
        {FormComponent}
        <div className="container">
          <RecipeWrap recipes={recipes} removeRecipe={this.removeRecipe} />
        </div>
      </div>
    );
  }
}

export default RecipeApp;
