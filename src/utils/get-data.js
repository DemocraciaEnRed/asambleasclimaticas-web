import axiosServices from "./axios";
import axiosServerServices from "./axiosServer";

export const fetchProject = async (projectId)=> {
    try{
        const resp = await axiosServerServices.get(`/projects/${projectId}`)
        const project = await resp.data
        return project
    }catch(err){
        console.log(err);
    }
}

export const fetchProjectVersion = async (projectId, version)=> {
    try{
        const resp = await axiosServerServices.get(`/projects/${projectId}/versions/${version}`)
        const projectVersion = await resp.data
        return projectVersion
    }catch(err){
        console.log(err);
    }
}

export const fetchProjectArticle = async (projectId)=> {
    try{
        //await new Promise((resolve) => setTimeout(resolve, 3000))
        
        const resp = await axiosServerServices.get(`/projects/${projectId}/articles`)
        const articles = await resp.data
        return articles
    }catch(err){
        console.log(err);
    }
}

export const fetchProjectComment = async (projectId)=> {
    try{
        const resp = await axiosServerServices.get(`/projects/${projectId}/comments`)
        const comments = await resp.data
        return comments
    }catch(err){
        console.log(err);
    }
}

export const fetchProjectEvents = async (projectId)=> {
    try{
        //await new Promise((resolve) => setTimeout(resolve, 3000))
        const resp = await axiosServerServices.get(`/projects/${projectId}/events`)
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