import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/input';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Your Name'
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
      street: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Street'
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
      zipCode: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'ZIP Code'
          },
          value: '',
          validation: {
              required: true,
              minLength: 5,
              maxLength: 5,
              isNumeric: true
          },
          valid: false,
          touched: false
      },
      country: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Country'
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
      email: {
          elementType: 'input',
          elementConfig: {
              type: 'email',
              placeholder: 'Your E-Mail'
          },
          value: '',
          validation: {
              required: true,
              isEmail: true
          },
          valid: false,
          touched: false
      },
      deliveryMethod: {
          elementType: 'select',
          elementConfig: {
              options: [
                  {value: 'fastest', displayValue: 'Fastest'},
                  {value: 'cheapest', displayValue: 'Cheapest'}
              ]
          },
          value: '',
          validation: {},
          valid: true
      }
  },
    loading: false
  }

  formChangeHandler = (event) => {

  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Ping',
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
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        //console.log(error);
        this.setState({loading: false});
      });
  }
  render () {
    const formElementsArray = [];
    for(let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value} 
            onChange={this.formChangeHandler}/>
        ))}
        <Button 
          btnType="Success"
          clicked={this.orderHandler}>Order</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;