import axios from 'axios';

class Api {
    static axiosInstance = axios;
    static ACCESS_TOKEN = localStorage.getItem('DPMAccessToken');
    static initiate() {
        const baseURL = import.meta.env.VITE_APP_baseURL;
        Api.axiosInstance.defaults.baseURL = baseURL;
        Api.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${Api.ACCESS_TOKEN}`;
        Api.axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
        return Api.axiosInstance.create();
    }
}

export default Api;