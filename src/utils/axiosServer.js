import axios from 'axios';
import { cookies } from 'next/headers';

const axiosServerServices = axios.create({ baseURL: 'http://localhost:3000' })
// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServerServices.interceptors.request.use(
    (config) => {
        const token = cookies().get('auth').value;
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
);



export default axiosServerServices;
