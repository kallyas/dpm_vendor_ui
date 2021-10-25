import axios from'../../config/axios';
import { LOGIN_SUCCESS, LOGIN_ERROR} from './actionTypes';

const axiosInstance = axios.initiate();

export const login = ({username, password}) => async dispatch => {
    try{
        const data = await axiosInstance.post('/login', {username, password});
        return dispatch({
            type: LOGIN_SUCCESS,
            payload: data.data
        });
    } catch(error) {
        return dispatch({
            type: LOGIN_ERROR,
            payload: error
        });
    }
   }
   