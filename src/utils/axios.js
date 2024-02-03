import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.resurgentes.org'

const axiosServices = axios.create({ baseURL })
// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //
const AUTH_TOKENS_KEY = "RES_AUTH";

axiosServices.interceptors.request.use(
    (config) => {
        const token = Cookies.get(AUTH_TOKENS_KEY)
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
);



export default axiosServices;
