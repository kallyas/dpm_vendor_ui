import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class Api {
    static axiosInstance = axios;
    static ACCESS_TOKEN = localStorage.getItem('DPMAccessToken');
    static initiate() {
        const baseURL = process.env.REACT_APP_baseURL;
        Api.axiosInstance.defaults.baseURL = baseURL;
        Api.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${Api.ACCESS_TOKEN}`;
        Api.axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
        return Api.axiosInstance.create();
    }
}

export default Api;