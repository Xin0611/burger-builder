import {
  AUTH_START,
  AUTH_SUCESS,
  AUTH_FAIL,
} from './actionTypes';

export const authStart = () => {
  return {
    type: AUTH_START
  }
}

export const authSucess = (authData) => {
  return {
    type: AUTH_SUCESS,
    authData
  }
}

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
  }
}