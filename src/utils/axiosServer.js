import axios from 'axios';
import { cookies } from 'next/headers';

const axiosServerServices = axios.create({ withCredentials: true, baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.resurgentes.org' })
// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //
const AUTH_TOKENS_KEY = "RES_AUTH";

axiosServerServices.interceptors.request.use(
    (config) => {
        const token = cookies().get(AUTH_TOKENS_KEY)
        if (token) {
            const tokenValue = token.value;
            config.headers['Authorization'] = 'Bearer ' + tokenValue;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
);




export default axiosServerServices;
