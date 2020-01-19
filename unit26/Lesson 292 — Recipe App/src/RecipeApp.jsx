import React from 'react';
import PropTypes from 'prop-types';
import RecipeWrap from './RecipeWrap';
import Header from './Header';

function RecipeApp({ recipes }) {
  return (
    <div className="RecipeApp">
      <Header />
      <RecipeWrap recipes={recipes} />
    </div>
  );
}

RecipeApp.defaultProps = {
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
      img:
        'https://assets.bonappetit.com/photos/5a6f48f94f860a026c60fd71/3:2/w_5120,c_limit/pasta-carbonara.jpg',
      key: 1,
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
      img:
        'https://i.dietdoctor.com/wp-content/uploads/2015/12/DD-14.jpg?auto=compress%2Cformat&w=4800&h=3200&fit=crop',
      key: 2,
    },
    {
      title: 'Pasta',
      ingredients: [
        'Cloud bread',
        '3 eggs',
        '110 g cream cheese',
        '1 pinch salt',
        '½ tbsp (4 g) ground psyllium husk powder',
        '½ tsp (2.5 g) baking powder',
        '¼ tsp cream of tartar (optional)',
        'Filling',
        '4 tbsp mayonnaise',
        '150 g bacon',
        '50 g lettuce',
        '1 tomato, thinly sliced',
      ],
      instructions: 'Mix ingredients, make pasta',
      img:
        'https://i.dietdoctor.com/wp-content/uploads/2016/03/DD-51-2.jpg?auto=compress%2Cformat&w=4800&h=3200&fit=crop',
      key: 3,
    },
  ],
};

RecipeApp.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
};

export default RecipeApp;
