import { createRouter, createWebHistory } from "vue-router";

const Register = () => import('@/pages/Register.vue')
const Login = () => import('@/pages/Login.vue')
const Products = () => import('@/pages/Products.vue')
const Cart = () => import('@/pages/Cart.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/products'},
        { path: '/login', component: Login},
        { path: '/register', component: Register},
        { path: '/products', component: Products},
        { path: '/cart', component: Cart},
    ]
})

export default router;