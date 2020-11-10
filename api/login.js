import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    withCredentials:true
})

export function userLogin(data) {
    return instance({
        url:'/login',
        method:'post',
        data
    })
}
