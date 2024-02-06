'use server'
import axiosServices from "./axios";
import axiosServerServices from "./axiosServer";

export const fetchProjectId = async (projectId,version)=> {
    try{
        let url = `/projects/${projectId}`
        if(version) url += `/versions/${version}`
        const resp = await axiosServerServices.get(url)
        const project = await resp.data
        return project
    }catch(err){
        console.log(err);
    }
}


export const fetchProjectArticle = async (projectId,version)=> {
    try{
        //await new Promise((resolve) => setTimeout(resolve, 3000))
        let url = `/projects/${projectId}`
        if(version) url += `/versions/${version}`
        url += '/articles'
        const resp = await axiosServerServices.get(url)
        const articles = await resp.data
        return articles
    }catch(err){
        console.log(err);
    }
}

export const fetchProjectComment = async (projectId, version)=> {
    try{
        let url = `/projects/${projectId}`
        if(version) url += `/versions/${version}`
        url += '/comments'
        const resp = await axiosServerServices.get(url)
        const comments = await resp.data
        return comments
    }catch(err){
        console.log(err);
    }
}

export const fetchGeneralComments = async (url) =>{
    try {
        const resp = await axiosServerServices.get(url)
        return await resp.data

    } catch (err) {
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
        const user = await res.data.user
        if(user) return user
    }catch(err){
        console.log(err);
    }
}

export const verifyToken=async (token)=>{
    try{
        const res = await axiosServices.get(`/auth/verify/${token}`)
        return {
            status:res.status,
            message:res.data.message
            }
    }catch(err){
        //console.log(err);
        return err
    }
}

export const fetchCountries = async  () => {
    try{
        const resp = await axiosServices.get('/misc/countries')
        const countries = await resp.data
        return(countries)
    }catch(err){
        console.log(err);
    }
}