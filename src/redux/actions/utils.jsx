import Api from'../../config/axios';

export const renewSession = async (error) => {
    const axios = Api.initiate();
    const refreshToken = await localStorage.getItem('DPMRefreshToken');
    if(error.response && (error.response.status === 401 || error.message === 'Token has expired') && refreshToken) {
        try{
            const result = await axios.post('/token/refresh', {}, {headers: {Authorization: `Bearer ${refreshToken}`}});
            localStorage.setItem('DPMAccessToken', result.data.access_token);
            Api.ACCESS_TOKEN = result.data.access_token;
            return result;
        } catch(err) {
            await localStorage.removeItem('DPMAccessToken');
            await localStorage.removeItem('DPMRefreshToken');
            return err;
        }

    } else{
        return error;
    }
}

export const getData = (url) => {
    const axios = Api.initiate();
    return axios.get(`/v1.0${url}`)
};

export const createData = (url, payload) => {
    const axios = Api.initiate();
    return axios.post(`/v1.0${url}`, payload);
}

export const updateData = (url, payload) => {
    const axios = Api.initiate();
    return axios.put(`/v1.0${url}`, payload);
}
