import axiosServices from "./axios";


export const toLike = async (url) => {

    try{
        const resp = await axiosServices.post(`${url}/like`)
        return  {
            status: resp.status, 
            type: resp.data.result 
        }
    }catch(err){
        const pathname = window.location.pathname
        if(err.response.status===401) window.location.href= '/auth/login?next='+pathname
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
        const pathname = window.location.pathname
        if(err.response.status===401) window.location.href= '/auth/login?next='+pathname
        console.log(err);
    }
}

export const postComments = async (url, content) => {

    try{
        const resp = await axiosServices.post(url, content)
        return resp.data
    }catch(err){
        const pathname = window.location.pathname
        if(err.response.status===401) window.location.href= '/auth/login?next='+pathname
        console.log(err);
    }
}

export const highlighteComment = async (url) => {
    try{
        const resp = await axiosServices.post(`${url}/highlight`)
        return resp.data
    }catch(err){
        const pathname = window.location.pathname
        if(err.response.status===401) window.location.href= '/auth/login?next='+pathname
        console.log(err);
    }

}

export const resolveComment = async (url) => {
    try{
        const resp = await axiosServices.post(`${url}/resolve`)
        return resp.data
    }catch(err){
        const pathname = window.location.pathname
        if(err.response.status===401) window.location.href= '/auth/login?next='+pathname
        console.log(err);
    }

}