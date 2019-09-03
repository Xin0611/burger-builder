import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL
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
    axios.post('./orders.json', orderData)
      .then( response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        dispatch(purchaseInit());
      })
      .catch( error => {dispatch(purchaseBurgerFail(error))})
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START
  }
}

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders
  }
}
export const fetchOrdersFail = (error) => {
  return {
    type: FETCH_ORDERS_FAIL,
    error
  }
}
export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START
  }
}
export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for(let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        dispatch(fetchOrdersSuccess(fetchOrders));
        } 
      })
      .catch(error => {dispatch(fetchOrdersFail(error))});
  }
}

