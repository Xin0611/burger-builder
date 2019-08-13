import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0
  }

  addIngredientHandler = (type) => {
    const updateCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updateCount;
    const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients
    })
  }
  render() {
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientAdded={this.addIngredientHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;