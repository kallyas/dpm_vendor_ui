import { GET_ROUTES_ERROR, GET_ROUTES_SUCCESS} from './actionTypes';
import {renewSession, getData} from './utils'

export const getRoutes = () => async dispatch => {
    try{
        const data = await getData('/routes');
        const mappedData = data.data.map(entry => { // this makes route.trips equal to the length of an array returned on trips
            entry.trips = entry.trips.length;
            return entry
        })
        return dispatch({
            type: GET_ROUTES_SUCCESS,
            payload: mappedData
        });
    } catch(error) {
        const result = await renewSession(error);
        if(result.status !== 200) {
            return dispatch({
                type: GET_ROUTES_ERROR,
                payload: error
            });
        } else {
            const data = await getData('/routes');
            const mappedData = data.data.map(entry => { // this makes trips equal to the length of an array returned on trips
                entry.trips = entry.trips.length;
                return entry
            })
            return dispatch({
                type: GET_ROUTES_SUCCESS,
                payload: mappedData
            });
        }
    }
   }
   