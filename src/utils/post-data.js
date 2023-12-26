import axiosServices from "./axios";

export const toLike = async (url) => {
    try{
        const resp = await axiosServices.post(`${url}/like`)
        return  {
            status: resp.status, 
            type: resp.data.result 
        }
    }catch(err){
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
        console.log(err);
    }
}