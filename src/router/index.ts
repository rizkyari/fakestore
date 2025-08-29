import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const Login = () => import('@/pages/Login.vue')
const Products = () => import('@/pages/Products.vue')
const ProductDetail = () => import('@/pages/ProductDetail.vue')
const Cart = () => import('@/pages/Cart.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/products'},
        { path: '/login', component: Login},
        { path: '/products', component: Products},
        { path: '/product/:id', component: ProductDetail},
        { path: '/cart', component: Cart},
    ],
    scrollBehavior() {
        return { top: 0 }
    }
});

router.beforeEach((to, _from, next) => {
    const auth = useAuthStore();

    const isLoggedIn = !!auth.token || !!localStorage.getItem("token");
    const isLoginPage = to.path === "/login";

    if(isLoggedIn && isLoginPage) {
        next("/");
        return;
    }

    const requiresAuth = ["/products", "/cart"].includes(to.path) || to.path.startsWith("/product/");
    if(requiresAuth && !isLoggedIn) {
        next({ path: "/login", query: { redirect: to.fullPath }});
        return;
    }

    next();
})

export default router;