import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }
  componentDidMount () {
    axios.get("https://react-my-burger-dd64e.firebaseio.com/ingredients.json")
      .then(response => this.setState({ingredients: response.data}))
      .catch(error => {this.setState({error: true})});
  }
  purchaseHandler = () => {
    this.setState({purchasing:true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing:false});
  }

  purchaseContinueHandler = () => {
    //alert('You contine!');
    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'xin',
        address: {
          street: 'Teststreet 1',
          zipcode: '95131',
          country: 'US'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        //console.log(error);
        this.setState({loading: false, purchasing: false});
      });
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum+el;
      },0);
      this.setState({purchasable: sum > 0});
  }
  addIngredientHandler = (type) => {
    const updateCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updateCount;
    const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updateCount;
    const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if(this.state.ingredients) {
      burger =
      <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          />
        </Aux>
      orderSummary = <OrderSummary 
      ingredients={this.state.ingredients}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      totalPrice={this.state.totalPrice}
      />
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHanlder(BurgerBuilder, axios);