import {GET_TRANSACTIONS_SUCCESS, GET_TRANSACTIONS_ERROR} from "./actionTypes"
import {renewSession, getData} from "./utils"

const processTransactions = (dispatch, data) => {
  const filteredData = data.map((transaction) => {
    const {
      amount,
      payee_number,
      payer_number,
      status,
      date_created,
    } = transaction
    const [date, time] = date_created.split("T")
    const bookedTime = time.split(".")[0]
    return {
      date,
      bookedTime,
      amount,
      payee_number,
      payer_number,
      status,
      date_created,
    }
  })
  return dispatch({
    type: GET_TRANSACTIONS_SUCCESS,
    payload: filteredData,
  })
}

export const getTransactions = (id) => async (dispatch) => {
  try {
    const data = await getData("/mm_transactions")
    return processTransactions(dispatch, data.data)
  } catch (error) {
    const result = await renewSession(error)
    if (result.status !== 200) {
      return dispatch({
        type: GET_TRANSACTIONS_ERROR,
        payload: error,
      })
    } else {
      const data = await getData("/mm_transactions")
      return processTransactions(dispatch, data.data)
    }
  }
}
