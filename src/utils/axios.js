import axios from 'axios';

const axiosServices = axios.create({ baseURL: 'http://localhost:3000' })
// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('persist:token')).token.replace(/['"]+/g, '');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
);

export default axiosServices;
