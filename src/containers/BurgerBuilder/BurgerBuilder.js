import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import {
  addIngredient,
  removeIngredient
} from '../../store/actions';



class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }
  componentDidMount () {
    // axios.get("https://react-my-burger-dd64e.firebaseio.com/ingredients.json")
    //   .then(response => this.setState({ingredients: response.data}))
    //   .catch(error => {this.setState({error: true})});
  }
  purchaseHandler = () => {
    this.setState({purchasing:true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing:false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum+el;
      },0);
      return sum > 0;
  }
  // addIngredientHandler = (type) => {
  //   const updateCount = this.state.ingredients[type] + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updateCount;
  //   const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
  //   this.setState({
  //     totalPrice: updatedPrice,
  //     ingredients: updatedIngredients
  //   })
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if(oldCount <= 0) {
  //     return;
  //   }
  //   const updateCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updateCount;
  //   const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
  //   this.setState({
  //     totalPrice: updatedPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }
  render() {
    //console.log(this.props.ingredients);
    const disabledInfo = {
      ...this.props.ingredients
    }

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if(this.props.ingredients) {
      burger =
      <Aux>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls 
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          price={this.props.totalPrice}
          purchasable={this.updatePurchaseState(this.props.ingredients)}
          ordered={this.purchaseHandler}
          />
        </Aux>
      orderSummary = <OrderSummary 
      ingredients={this.props.ingredients}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      totalPrice={this.props.totalPrice}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,   
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(BurgerBuilder, axios));

