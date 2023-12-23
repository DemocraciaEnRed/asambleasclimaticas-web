import axiosServices from "./axios";
import axiosServerServices from "./axiosServer";

export const fetchProject = async ()=> {
    try{
        const resp = await axiosServerServices.get(`/projects/${process.env.PROJECTID}`)
        const project = await resp.data
        return project
    }catch(err){
        console.log(err);
    }
}

export const fetchProjectArticle = async ()=> {
    try{
        //await new Promise((resolve) => setTimeout(resolve, 3000))
        
        const resp = await axiosServerServices.get(`/projects/${process.env.PROJECTID}/articles`)
        const articles = await resp.data
        return articles
    }catch(err){
        console.log(err);
    }
}

export const fetchProjectComment = async ()=> {
    try{
        const resp = await axiosServerServices.get(`/projects/${process.env.PROJECTID}/comments`)
        const comments = await resp.data
        return comments
    }catch(err){
        console.log(err);
    }
}

export const fetchUserMe = async  () => {
    try{
        const res = await axiosServerServices.get('/users/me')
        const user = await res.data
        if(user) return user
    }catch(err){
        console.log(err);
    }
}

export const verifyToken=async (token)=>{
    const res = await axiosServices.get(`/auth/verify/${token}`)
    return {
        status:res.status,
        message:res.data.message
        }
}