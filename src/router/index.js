import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 登录组件
import login from '@/views/login/login.vue'
import index from '@/views/index/index.vue'
const router = new VueRouter({
    routes:[
        {
            path:"/login",
            component:login
        },
        {
            path:"/index",
            component:index
        },
        {
            path:"/",
            component:login
        },
    ]
})

export default router
