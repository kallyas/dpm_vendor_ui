import { GET_STAFF_SUCCESS, GET_STAFF_ERROR } from '../actions/actionTypes';

export default (state = {data: null, error: null}, action) => {
    switch (action.type) {
     case GET_STAFF_SUCCESS:
      return { ...state, data: action.payload}
     case GET_STAFF_ERROR:
       return { ...state, error: action.payload}
     default:
      return state
  }
};
