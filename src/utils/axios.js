import axios from 'axios';
import { getCookie } from 'cookies-next';


const axiosServices = axios.create({ baseURL: process.env.APIURL })
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

export default axiosServices;
