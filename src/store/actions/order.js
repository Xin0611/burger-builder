import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START
} from './actionTypes';

import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: PURCHASE_BURGER_FAIL,
    error
  }
}


export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('./orders', orderData)
      .then( response => {dispatch(purchaseBurgerSuccess(response.data, orderData))})
      .catch( error => {dispatch(purchaseBurgerFail(error))})
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START
  }
}