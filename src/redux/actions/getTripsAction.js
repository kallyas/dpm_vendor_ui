import {GET_TRIPS_ERROR, GET_TRIPS_SUCCESS} from "./actionTypes"
import {renewSession, getData} from "./utils"

const processData = (dispatch, data) => {
  const filteredData = data.map((entry) => {
    const {
      id,
      route: {destination, start_point},
      setoff_time,
      vehicle: {number_plate, capacity},
      tp_fare,
      vehicle_id,
      route_id,
    } = entry
    const [date, time] = setoff_time.split("T")
    return {
      id,
      destination,
      start_point,
      number_plate,
      tp_fare,
      date,
      time,
      setoff_time,
      vehicle_id,
      route_id,
      capacity,
    }
  })

  return dispatch({
    type: GET_TRIPS_SUCCESS,
    payload: filteredData,
  })
}

export const getTrips = () => async (dispatch) => {
  try {
    const data = await getData("/trips?page=1&limit=100")
    return processData(dispatch, data.data)
  } catch (error) {
    const result = await renewSession(error)
    if (result.status !== 200) {
      return dispatch({
        type: GET_TRIPS_ERROR,
        payload: error,
      })
    } else {
      const data = await getData("/trips?page=1&limit=100")
      return processData(dispatch, data.data)
    }
  }
}

export const getSingleTrip = (id) => async (dispatch) => {
  try {
    const data = await getData(`/route_trips/${id}`)
    return processData(dispatch, data.data)
  } catch (error) {
    const result = await renewSession(error)
    if (result.status !== 200) {
      return dispatch({
        type: GET_TRIPS_ERROR,
        payload: error,
      })
    } else {
      const data = await getData(`route_trips/${id}`)
      return processData(dispatch, data.data)
    }
  }
}
