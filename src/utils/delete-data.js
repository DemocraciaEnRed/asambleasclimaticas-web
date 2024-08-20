import axiosServices from "./axios";
import Cookies from "js-cookie";

const AUTH_TOKENS_KEY = "RES_AUTH";

export const deleteComment = async (url) => {

    const token = Cookies.get(AUTH_TOKENS_KEY)
    try {
        if (!token) throw { response: { status: 401 } }
        const resp = await axiosServices.delete(url)
        return resp.data
    } catch (err) {
        console.error(err);
        const pathname = window.location.pathname
        if (err.response.status === 401) window.location.href = '/auth/login?next=' + pathname
        let returnError = { status: err.response.status, message: err.response.data.message }
        throw returnError
    }

}