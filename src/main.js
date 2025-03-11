// import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import router from "@/router/index.js";
import axios from "axios";


axios.defaults.withCredentials = false; // 配置跨域请求时是否携带凭证
// axios.defaults.baseURL = "http://49.233.169.30:8080/api";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.timeout = 5000; // 请求超时时间

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 添加 Bearer 前缀
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
)

axios.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code === 10006) {
            // Message({
            //     type: "error",
            //     message: "登录已失效，请重新登录"
            // });
            setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userInfo")
                router.push("/login");
            }, 500);
        }
        return response;
    },
    (err) => {
        return Promise.reject(err);
    }
)

createApp(App).use(router).mount('#app')
