import { GET_STAFF_ERROR, GET_STAFF_SUCCESS } from './actionTypes';
import {renewSession, getData} from './utils'

export const getStaff = () => async dispatch => {
    try{
        const data = await getData('/vendor/users');
        return dispatch({
            type: GET_STAFF_SUCCESS,
            payload: data.data
        });
    } catch(error) {
        const result = await renewSession(error);
        if(result.status !== 200) {
            return dispatch({
                type: GET_STAFF_ERROR,
                payload: error
            });
        } else {
            const data = await getData('/vendor/users');
            return dispatch({
                type: GET_STAFF_SUCCESS,
                payload: data.data
            });
        }
    }
   }
   