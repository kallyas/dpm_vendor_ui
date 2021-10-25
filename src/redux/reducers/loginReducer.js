import { LOGIN_ERROR, LOGIN_SUCCESS } from '../actions/actionTypes';

export default (state = {data: null, error: null}, action) => {
    switch (action.type) {
     case LOGIN_SUCCESS:
      return { ...state, data: action.payload}
     case LOGIN_ERROR:
       return { ...state, error: action.payload}
     default:
      return state
  }
};
