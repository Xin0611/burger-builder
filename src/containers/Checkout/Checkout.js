import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { purchaseInit } from '../../store/actions/';
class Checkout extends Component {

  componentDidMount () {
    this.props.onInitPurchase();
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    console.log('purchased' + this.props.purchased);
    let summary = <Redirect to='/'/>
    if(this.props.ingredients) {
      const purchasedRedirct = this.props.purchased ? <Redirect to='/'/> : null
      summary =
        <div>
          {purchasedRedirct}
          <CheckoutSummary 
            ingredients={this.props.ingredients} 
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
          <Route 
            path={this.props.match.path + '/contact-data'} 
            component={ContactData}/>
        </div>
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.bugerBuilder.ingredients,
    purchased: state.order.purchased
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onInitPurchase: () => dispatch(purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);