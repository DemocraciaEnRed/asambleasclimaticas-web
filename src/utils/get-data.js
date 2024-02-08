'use server'

import axiosServices from "./axios"


/* PROJECT DATA */

export const fetchProjectId = async (projectId, version) => {
    try {
        let url = `/projects/${projectId}`
        if (version) url += `/versions/${version}`
        const resp = await axiosServices.get(url)
        const project = await resp.data
        return project
    } catch (err) {
        console.error(err);
    }
}


export const fetchArticleProjectId = async (projectId, version) => {
    try {
        //await new Promise((resolve) => setTimeout(resolve, 3000))
        let url = `/projects/${projectId}`
        if (version) url += `/versions/${version}`
        url += '/articles'
        const resp = await axiosServices.get(url)
        const articles = await resp.data
        return articles
    } catch (err) {
        console.error(err);
    }
}

export const fetchStatsProjectId = async (projectId, version) => {
    try {
        //await new Promise((resolve) => setTimeout(resolve, 3000))
        let url = `/projects/${projectId}/stats`
        const resp = await axiosServices.get(url)
        const stats = await resp.data
        return stats
    } catch (err) {
        console.error(err);
    }
}

export const fetchCommentProjectId = async (projectId, version) => {
    try {
        let url = `/projects/${projectId}`
        if (version) url += `/versions/${version}`
        url += '/comments'
        const resp = await axiosServices.get(url)
        const comments = await resp.data
        return comments
    } catch (err) {
        console.error(err);
    }
}


export const fetchEventsProjectId = async (projectId) => {
    try {
        //await new Promise((resolve) => setTimeout(resolve, 3000))
        const resp = await axiosServices.get(`/projects/${projectId}/events`)
        const articles = await resp.data
        return articles
    } catch (err) {
        console.error(err);
    }
}

export const fetchGeneralComments = async (url) => {
    try {
        const resp = await axiosServices.get(url)
        return await resp.data

    } catch (err) {
        console.error(err);
    }
}

/* USER DATA */

export const fetchUserMe = async () => {
    try {
        const res = await axiosServices.get('/users/me')
        const user = await res.data.user
        if (user) return user
    } catch (err) {
        console.error(err);
    }
}

export const verifyToken = async (token) => {
    try {
        const res = await axiosServices.get(`/auth/verify/${token}`)
        return {
            status: res.status,
            message: res.data.message
        }
    } catch (err) {
        //console.error(err);
        return err
    }
}

/* OTHERS */

export const fetchCountries = async () => {
    try {
        const resp = await axiosServices.get('/misc/countries')
        const countries = await resp.data
        return (countries)
    } catch (err) {
        console.error(err);
    }
}

/* ADMIN */

export const adminFetchProjects = async (page, limit) => {

    let url = '/admin/projects'
    if (page || limit) url += '?'
    if (limit) url += `limit=${limit}`
    if (page) url += `&page=${page}`
    try {
        const resp = await axiosServices(url)
        const projectsData = await resp.data
        return (projectsData)
    } catch (err) {
        console.error(err);
    }

}

export const adminFetchProjectsByAuthor = async (authorId) => {
    try {
        let url = `/projects?author=${authorId}`
        const resp = await axiosServices.get(url)
        console.log(resp);
        const project = await resp.data
        return project
    } catch (err) {
        console.error(err);
    }
}

export const adminFetchUsers = async (page, limit) => {

    let url = '/admin/users'
    if (page || limit) url += '?'
    if (limit) url += `limit=${limit}`
    if (page) url += `&page=${page}`
    try {
        const resp = await axiosServices(url)
        const usersData = await resp.data
        return (usersData)
    } catch (err) {
        console.error(err);
    }

}

export const adminFetchUserId = async (id) => {

    try {
        const resp = await axiosServices(`/admin/users/${id}`)
        const userData = await resp.data
        return (userData)
    } catch (err) {
        console.error(err);
    }

}

export const adminFetchAuthors = async (page, limit) => {

    let url = '/admin/users/authors'
    if (page || limit) url += '?'
    if (limit) url += `limit=${limit}`
    if (page) url += `&page=${page}`
    try {
        const resp = await axiosServices(url)
        const usersData = await resp.data
        return (usersData)
    } catch (err) {
        console.error(err);
    }

}

export const adminFetchUsersCsv = async () => {

    try {
        const res = await axiosServices('/admin/users/csv', {
            responseType: 'blob'
        })
        return {
            status: res.status,
            headers: res.headers,
            data: res.data,

        }
    } catch (err) {
        console.error(err);
    }

}