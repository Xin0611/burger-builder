import React, { Component } from 'react';

import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  }
  render () {
    const formElementsArray = [];
    for(let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    return (
      <div className={classes.Auth}>
        <form>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value} 
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            onChange={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button 
          btnType="Success"
          disabled={!this.state.formIsValid}
          >Submmit</Button>
        </form>
      </div>
    )
  }
}


export default Auth;