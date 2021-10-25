import { GET_VEHICLES_SUCCESS, GET_VEHICLES_ERROR } from './actionTypes';
import {renewSession, getData} from './utils'

export const getVehicles = () => async dispatch => {
    try{
        const data = await getData('/vehicles');
        return dispatch({
            type: GET_VEHICLES_SUCCESS,
            payload: data.data
        });
    } catch(error) {
        const result = await renewSession(error);
        if(result.status !== 200) {
            return dispatch({
                type: GET_VEHICLES_ERROR,
                payload: error
            });
        } else {
            const data = await getData('/vehicles');
            return dispatch({
                type: GET_VEHICLES_SUCCESS,
                payload: data.data
            });
        }
    }
   }
   