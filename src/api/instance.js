import axios from 'axios'

export function userInstance() {
    const instance = axios.create({
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials:true
    })
    return instance
}