import axiosServices from "./axios";
import axiosServerServices from "./axiosServer";

export const fetchProject = async ()=> {
    try{
        const resp = await axiosServerServices.get(`/projects/${process.env.NEXT_PUBLIC_PROJECTID}`)
        const project = await resp.data
        return project
    }catch(err){
        console.log(err);
    }
}

export const fetchProjectArticle = async ()=> {
    try{
        //await new Promise((resolve) => setTimeout(resolve, 3000))
        
        const resp = await axiosServerServices.get(`/projects/${process.env.NEXT_PUBLIC_PROJECTID}/articles`)
        const articles = await resp.data
        return articles
    }catch(err){
        console.log(err);
    }
}

export const fetchProjectComment = async ()=> {
    try{
        const resp = await axiosServerServices.get(`/projects/${process.env.NEXT_PUBLIC_PROJECTID}/comments`)
        const comments = await resp.data
        return comments
    }catch(err){
        console.log(err);
    }
}

export const fetchProjectEvents = async ()=> {
    try{
        //await new Promise((resolve) => setTimeout(resolve, 3000))
        const resp = await axiosServerServices.get(`/projects/${process.env.NEXT_PUBLIC_PROJECTID}/events`)
        const articles = await resp.data
        return articles
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