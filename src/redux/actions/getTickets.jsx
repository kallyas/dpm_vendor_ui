import {GET_TRIPS_ERROR, GET_TICKETS_SUCCESS} from "./actionTypes"
import {renewSession, getData} from "./utils"

const processTickets = (dispatch, data) => {
  const filteredData = data.map((entry) => {
    const {
      id,
      ticket_capacity,
      status_id,
      ticket_number,
      ticket_request_id,
      date_created,
      phone_number,
      start_point,
      destination,
      status_name,
    } = entry
    const [date, time] = date_created.split("T")
    const bookedTime = time.split(".")[0]
    return {
      id,
      ticket_capacity,
      status_id,
      ticket_number,
      ticket_request_id,
      date,
      time,
      bookedTime,
      phone_number,
      start_point,
      destination,
      status_name,
    }
  })

  return dispatch({
    type: GET_TICKETS_SUCCESS,
    payload: filteredData,
  })
}

export const getTickets = (id) => async (dispatch) => {
  try {
    const data = await getData(`/trip_tickets/${id}`)
    return processTickets(dispatch, data.data)
  } catch (error) {
    const result = await renewSession(error)
    if (result.status !== 200) {
      return dispatch({
        type: GET_TRIPS_ERROR,
        payload: error,
      })
    } else {
      const data = await getData(`/trip_tickets/${id}`)
      return processTickets(dispatch, data.data)
    }
  }
}
