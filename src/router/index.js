import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 登录组件
import login from '@/views/login/login.vue'
const router = new VueRouter({
    routes:[
        {
            path:"/login",
            component:login
        },
        {
            path:"/",
            component:login
        },
    ]
})

export default router
