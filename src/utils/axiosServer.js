import axios from 'axios';
import { cookies } from 'next/headers';

const axiosServerServices = axios.create({ baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.resurgentes.org' })
// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServerServices.interceptors.request.use(
    (config) => {
        const token = cookies().get('auth')
        if (token) {
            const tokenValue = token.value;
            config.headers['Authorization'] = 'Bearer ' + tokenValue;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
);




export default axiosServerServices;
