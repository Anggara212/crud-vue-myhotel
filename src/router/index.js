//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'reservasi.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/reservasi/IndexReservasi.vue')
    },
    {
        path: '/create',
        name: 'reservasi.create',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/reservasi/CreateReservasi.vue')
    },
    {
        path: '/edit/:id',
        name: 'reservasi.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/reservasi/EditReservasi.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router