import axiosServices from "./axios";
import Cookies from "js-cookie";

const AUTH_TOKENS_KEY = "RES_AUTH";

export const refreshToken = async () => {
    try {
        const response = await axiosServices.post('/auth/refresh-token')
        return response.data
    } catch (err) {
        console.error(err);
    }

}

export const toLike = async (url) => {
    
    try {
        const token = Cookies.get(AUTH_TOKENS_KEY)
        if (!token) throw {response:{status:401}}
        const resp = await axiosServices.post(`${url}/like`)
        return {
            status: resp.status,
            type: resp.data.result
        }
    } catch (err) {
        const pathname = window.location.pathname
        if (err.response.status === 401) window.location.href = '/auth/login?next=' + pathname
        console.error(err);
    }
}

export const toDislike = async (url) => {

    try {
        const token = Cookies.get(AUTH_TOKENS_KEY)
        if (!token) throw {response:{status:401}}
        const resp = await axiosServices.post(`${url}/dislike`)
        return {
            status: resp.status,
            type: resp.data.result
        }
    } catch (err) {
        const pathname = window.location.pathname
        if (err.response.status === 401) window.location.href = '/auth/login?next=' + pathname
        console.error(err);
    }
}

export const postComments = async (url, content) => {

    try {
        const token = Cookies.get(AUTH_TOKENS_KEY)
        if (!token) throw {response:{status:401}}
        const resp = await axiosServices.post(url, content)
        return resp.data
    } catch (err) {
        const pathname = window.location.pathname
        if (err.response.status === 401) window.location.href = '/auth/login?next=' + pathname
        console.error(err);
    }
}

export const highlighteComment = async (url) => {

    try {
        const token = Cookies.get(AUTH_TOKENS_KEY)
        if (!token) throw {response:{status:401}}
        const resp = await axiosServices.post(`${url}/highlight`)
        return resp.data
    } catch (err) {
        const pathname = window.location.pathname
        if (err.response.status === 401) window.location.href = '/auth/login?next=' + pathname
        console.error(err);
    }

}

export const resolveComment = async (url) => {

    try {
        const token = Cookies.get(AUTH_TOKENS_KEY)
        if (!token) throw {response:{status:401}}
        const resp = await axiosServices.post(`${url}/resolve`)
        return resp.data
    } catch (err) {
        const pathname = window.location.pathname
        if (err.response.status === 401) window.location.href = '/auth/login?next=' + pathname
        console.error(err);
    }

}