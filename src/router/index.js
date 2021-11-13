import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FreeCourse from '../views/Freecourse.vue'
import ActualCourse from '../views/Actualcourse.vue'
import LightCourse from '../views/Lightcourse.vue'
import FreeCourseDetail from "../views/FreeCourseDetail.vue"
import Search from "../views/Search.vue"
import PaySuccess from "../views/PaySuccess";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/free-course',
        name: 'FreeCourse',
        component: FreeCourse
    },
    {
        path: '/ActualCourse',
        name: 'ActualCourse',
        component: ActualCourse
    },
    {
        path: '/LightCourse',
        name: 'LightCourse',
        component: LightCourse
    },
    {
        path: '/free/detail/:pk',
        name: 'FreeCourseDetail',
        component: FreeCourseDetail
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/pay/success',
        name: 'PaySuccess',
        component: PaySuccess
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
