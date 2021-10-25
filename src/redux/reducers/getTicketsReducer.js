import {GET_TICKETS_SUCCESS, GET_TICKETS_ERROR} from "../actions/actionTypes"

export default (state = {data: null, error: null}, action) => {
  switch (action.type) {
    case GET_TICKETS_SUCCESS:
      return {...state, data: action.payload}
    case GET_TICKETS_ERROR:
      return {...state, error: action.payload}
    default:
      return state
  }
}
