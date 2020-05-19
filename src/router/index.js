import Vue from 'vue'
import Router from 'vue-router'


//使用vue-router
Vue.use(Router)

const router = new Router({
    // 路由表
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/home'),
        },
        {
            path: '/layout',
            name: 'Layout',
            component: () => import('@/views/layOut'),
        },
    ]
})


export default router;