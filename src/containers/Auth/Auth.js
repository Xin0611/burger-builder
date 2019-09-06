import React, { Component } from 'react';
import { connect } from 'react-redux'

import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { auth } from '../../store/actions'

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
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
  }
    return isValid;
  }
  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    let formIsValid = true;
    for(let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }
    this.setState({controls: updatedOrderForm, formIsValid});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
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
        <form onSubmit={this.submitHandler}>
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
          // disabled={!this.state.formIsValid}
          >Submmit</Button>
        </form>
      </div>
    )
  }
}
// const mapStateToProps = state => {
//   return {
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password))
  }
}

export default connect(null, mapDispatchToProps)(Auth);