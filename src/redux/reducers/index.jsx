import {combineReducers} from "redux"
import loginReducer from "./loginReducer"
import vehiclesReducer from "./getVehiclesReducer"
import routesReducer from "./getRoutesReducer"
import tripsReducer from "./getTripsReducer"
import staffReducer from "./getStaffReducer"
import ticketsReducer from "./getTicketsReducer"
import transactionReducer from "./getTransaction"

export default combineReducers({
  loginReducer,
  vehicles: vehiclesReducer,
  routes: routesReducer,
  trips: tripsReducer,
  tickets: ticketsReducer,
  staff: staffReducer,
  transactions: transactionReducer,
})
