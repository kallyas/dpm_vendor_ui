import {GET_TRIPS_ERROR, GET_TRIPS_SUCCESS} from "../actions/actionTypes"

export default (state = {data: null, error: null}, action) => {
  switch (action.type) {
    case GET_TRIPS_SUCCESS:
      return {...state, data: action.payload}
    case GET_TRIPS_ERROR:
      return {...state, error: action.payload}
    default:
      return state
  }
}
