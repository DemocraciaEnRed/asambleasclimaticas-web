import { useRouter } from "next/router";
import axiosServices from "./axios";
import { getCookie } from 'cookies-next';


export const toLike = async (url) => {

    try{
        const resp = await axiosServices.post(`${url}/like`)
        return  {
            status: resp.status, 
            type: resp.data.result 
        }
    }catch(err){
        if(err.response.status===401) window.location.href= '/auth/login'
        console.log(err);
    }
}

export const toDislike = async (url) => {

    try{
        const resp = await axiosServices.post(`${url}/dislike`)
        return  {
            status: resp.status, 
            type: resp.data.result 
        }
    }catch(err){
        if(err.response.status===401) window.location.href= '/auth/login'
        console.log(err);
    }
}

export const postComments = async (url, content) => {

    try{
        const resp = await axiosServices.post(url, content)
        return resp.data
    }catch(err){
        if(err.response.status===401) window.location.href= '/auth/login'
        console.log(err);
    }
}