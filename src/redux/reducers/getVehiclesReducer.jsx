import { GET_VEHICLES_ERROR, GET_VEHICLES_SUCCESS } from '../actions/actionTypes';

export default (state = {data: null, error: null}, action) => {
    switch (action.type) {
     case GET_VEHICLES_SUCCESS:
      return { ...state, data: action.payload}
     case GET_VEHICLES_ERROR:
       return { ...state, error: action.payload}
     default:
      return state
  }
};
