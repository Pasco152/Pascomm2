import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    withCredentials:true
})

export function userSendsms(data) {
    return instance({
        url:'/sendsms',
        method:'post',
        data
    })
}

export function userRegister(data) {
    return instance({
        url:'/register',
        method:'post',
        data
    })
}

export function codeUrl() {
    return process.env.VUE_APP_BASEURL+'captcha?type=sendsms'
}
