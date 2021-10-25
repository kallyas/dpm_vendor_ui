import {
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_SUCCESS,
} from "../actions/actionTypes"

export default (state = {data: null, error: null}, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_SUCCESS:
      return {...state, data: action.payload}
    case GET_TRANSACTIONS_ERROR:
      return {...state, error: action.payload}
    default:
      return state
  }
}
