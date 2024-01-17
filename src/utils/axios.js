import axios from 'axios';
import { getCookie } from 'cookies-next';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.resurgentes.org'

const axiosServices = axios.create({ baseURL })
// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
    (config) => {
        const token = getCookie('auth');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
);

axiosServices.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if(error.response.status === 401) {
        const resp = axios.post(baseURL+'/auth/reset/' +getCookie('auth'))
    }
    return Promise.reject(error);
  });

export default axiosServices;
