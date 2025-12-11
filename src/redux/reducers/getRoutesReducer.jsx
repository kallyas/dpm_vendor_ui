import { GET_ROUTES_ERROR, GET_ROUTES_SUCCESS } from '../actions/actionTypes';

export default (state = {data: null, error: null}, action) => {
    switch (action.type) {
     case GET_ROUTES_SUCCESS:
      return { ...state, data: action.payload}
     case GET_ROUTES_ERROR:
       return { ...state, error: action.payload}
     default:
      return state
  }
};
