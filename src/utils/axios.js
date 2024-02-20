import axios from 'axios';

let cookies;

// Check if it's server-side rendering
if (typeof window === 'undefined') {
    cookies = require('next/headers').cookies;
} else {
    // If it's client-side rendering
    cookies = require('js-cookie');
}


const axiosServices = axios.create({ withCredentials: true, baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.resurgentes.org' })
// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //
const AUTH_TOKENS_KEY = "RES_AUTH";

axiosServices.interceptors.request.use(
    (config) => {
        let token;
        // Check if it's server-side rendering
        if (typeof window === 'undefined') {
            const tokenObject = cookies().get(AUTH_TOKENS_KEY)

            token = tokenObject ? tokenObject.value : null;
        } else {
            // If it's client-side rendering
            token = cookies.get(AUTH_TOKENS_KEY);
        }
        
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
);




export default axiosServices;
