'use server'
import axiosServerServices from "./axiosServer";
import { cookies } from 'next/headers';


const AUTH_TOKENS_KEY = "RES_AUTH";

export const refreshToken = async () => {
    try {
        const response = await axiosServerServices.post('/auth/refresh-token')
        return response.data
    } catch (err) {
        //cookies().delete(AUTH_TOKENS_KEY)
        console.log(err);
    }

}

export const login = async (body) => {
    try {
        const resp = await axiosServerServices.post('/auth/login', body)
        return {
            status: resp.status,
            expireInToken : exp,
            data: resp.data
        }
    } catch (err) {
        console.log(error);
        let error={
            status: err.response.status,
            data: err.response.data
        }
        throw new Error(JSON.stringify(error));
    }
}

export const register = async (body) => {
    try {
        const resp = await axiosServerServices.post('/auth/register', body)
        return {
            status: resp.status,
            data: resp.data
        }
    } catch (err) {
        let error={
            status: err.response.status,
            data: err.response.data
        }
        throw new Error(JSON.stringify(error));
    }
}

export const toLike = async (url) => {

    try {
        const resp = await axiosServerServices.post(`${url}/like`)
        return {
            status: resp.status,
            type: resp.data.result
        }
    } catch (err) {
        //const pathname = window.location.pathname
        //if (err.response.status === 401) window.location.href = '/auth/login?next=' + pathname
        console.log(err);
    }
}

export const toDislike = async (url) => {

    try {
        const resp = await axiosServerServices.post(`${url}/dislike`)
        return {
            status: resp.status,
            type: resp.data.result
        }
    } catch (err) {
        //const pathname = window.location.pathname
        //if (err.response.status === 401) window.location.href = '/auth/login?next=' + pathname
        console.log(err);
    }
}

export const postComments = async (url, content) => {

    try {
        const resp = await axiosServerServices.post(url, content)
        return resp.data
    } catch (err) {
        //const pathname = window.location.pathname
        //if (err.response.status === 401) window.location.href = '/auth/login?next=' + pathname
        console.log(err);
    }
}

export const highlighteComment = async (url) => {
    try {
        const resp = await axiosServerServices.post(`${url}/highlight`)
        return resp.data
    } catch (err) {
        //const pathname = window.location.pathname
        //if (err.response.status === 401) window.location.href = '/auth/login?next=' + pathname
        console.log(err);
    }

}

export const resolveComment = async (url) => {
    try {
        const resp = await axiosServerServices.post(`${url}/resolve`)
        return resp.data
    } catch (err) {
        //const pathname = window.location.pathname
        //if (err.response.status === 401) window.location.href = '/auth/login?next=' + pathname
        console.log(err);
    }

}