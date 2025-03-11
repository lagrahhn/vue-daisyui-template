import {createRouter, createWebHistory} from 'vue-router'

// 1.创建路由组件
import Home from "@/views/Home.vue";
import App from "@/App.vue";
import NotFound from "@/views/NotFound.vue";

// 2.将路由与组件进行映射
const routes = [
    {
        path: '/',
        component: App,
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: {
            title: "首页"
        }
    },
    {
        path: "/login",
        component: () => import("@/views/Login.vue"),
        meta: {
            title: "登录"
        }
    },
    {
        path: "/aboutme",
        component: () => import("@/views/AboutMe.vue"),
        meta: {
            title: "关于我"
        }
    },
    // {
    //     path: "/test",
    //     name: "test",
    //     component: () => import("@/views/Sidebar.vue"),
    // },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
        meta: {
            title: "注册"
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

// 3.创建router实例
const router = new createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    const publicPages = ['/login', '/register'];
    const loggedIn = localStorage.getItem('token')
    // 需要验证用户权限的路由
    const authRequired = !publicPages.includes(to.path);

    // 公共页面
    const userRole = localStorage.getItem('userRole') || 'guest';
    const roleRequired = to.meta.role;

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    if (roleRequired && userRole.toLowerCase() !== roleRequired.toLowerCase()) {
        return next('/403'); // 自定义权限不足页面
    }

    next();
})

export default router
