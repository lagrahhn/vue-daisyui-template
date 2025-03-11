<script setup>

import {ref} from 'vue';
import {useRouter} from 'vue-router';
import UserAPI from '@/api/user';

const errorMessage = ref('');
const isRedirecting = ref(false)
const router = useRouter();
const form = ref({
  username: '',
  password: ''
});

const handleSubmit = async (e) => {
  e.preventDefault();
  errorMessage.value = '';
  isRedirecting.value = false;

  // console.log(!form.value.username || !form.value.password.value)

  if (!form.value.username || !form.value.password) {
    errorMessage.value = '用户名和密码不能为空';
    return;
  }

  try {
    const res = await UserAPI.login(form.value);
    if (res.data.code === 200) {
      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('userRole', res.data.data.userRole); // 需要后端返回role

      // 显示加载状态
      errorMessage.value = '登录成功，正在跳转...';
      isRedirecting.value = true;
      // 1秒后跳转
      setTimeout(async () => {
        await router.push('/home');
        isRedirecting.value = false;
      }, 1000);
    } else {
      errorMessage.value = '用户名或密码错误';
    }
  } catch (error) {
    errorMessage.value = '登录失败，请稍后重试';
    console.error('登陆失败:', error.response.data.message);
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <!-- 背景图片 -->
    <div class="fixed inset-0 z-0 bg-cover bg-center"></div>

    <!-- 加载覆盖层 -->
    <div v-if="isRedirecting" class="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center">
      <div class="neumorphic-success p-6 rounded-2xl flex items-center gap-3 animate-pulse">
        <span class="loading loading-spinner text-success"></span>
        <span class="text-lg font-semibold">正在跳转到首页...</span>
      </div>
    </div>

    <!-- 登录表单容器 -->
    <div class="neumorphic-container w-full max-w-md p-8 rounded-2xl backdrop-blur-sm">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">用户登录</h1>

      <!-- 动态提示信息 -->
      <div
          v-if="errorMessage"
          :class="[
          'p-4 rounded-xl mb-6',
          isRedirecting ? 'neumorphic-success' : 'neumorphic-error'
        ]"
      >
        <div class="flex items-center gap-2">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="[
              'h-6 w-6 flex-shrink-0',
              isRedirecting ? 'text-success' : 'text-error'
            ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                v-if="isRedirecting"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
            />
            <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
      </div>

      <!-- 错误提示 -->
      <!--      <div v-if="errorMessage" class="neumorphic-error p-4 rounded-xl mb-6">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span>{{ errorMessage }}</span>
              </div>
            </div>-->

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 用户名输入 -->
        <div class="space-y-2">
          <label class="text-lg font-semibold text-gray-700">用户名</label>
          <input
              type="text"
              placeholder="请输入用户名"
              class="neumorphic-input w-full p-4 rounded-xl"
              v-model="form.username"
              required
              autocomplete="username"
          />
        </div>

        <!-- 密码输入 -->
        <div class="space-y-2">
          <label class="text-lg font-semibold text-gray-700">密码</label>
          <input
              type="password"
              placeholder="请输入密码"
              class="neumoric-input w-full p-4 rounded-xl"
              v-model="form.password"
              required
              autocomplete="current-password"
          />
        </div>

        <!-- 登录按钮 -->
        <button
            type="submit"
            class="neumorphic-button w-full py-4 text-xl font-bold rounded-xl transition-all"
        >
          立即登录
        </button>

        <!-- 注册链接 -->
        <p class="text-center text-gray-600">
          没有账号？
          <RouterLink
              to="/register"
              class="text-blue-600 hover:text-blue-800 font-semibold"
          >
            立即注册
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 背景图片样式 */
.bg-cover {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('../assets/login_background.jpg');
  background-color: #f0f0f3; /* 备用背景色 */
}

/* 新拟态容器 */
.neumorphic-container {
  background: rgba(240, 240, 243, 0.9);
  box-shadow: 10px 10px 21px #d3d3d6,
  -10px -10px 21px #ffffff;
}

/* 错误提示样式 */
.neumorphic-error {
  background: #fee2e2;
  box-shadow: inset 2px 2px 4px #fca5a5,
  inset -2px -2px 4px #ffffff;
  color: #dc2626;
}

/* 输入框样式 */
.neumorphic-input {
  background: #f0f0f3;
  border: none;
  box-shadow: inset 5px 5px 10px #d3d3d6,
  inset -5px -5px 10px #ffffff;
  transition: all 0.2s ease;
}

.neumorphic-input:focus {
  outline: none;
  box-shadow: inset 3px 3px 6px #d3d3d6,
  inset -3px -3px 6px #ffffff;
}

/* 按钮样式 */
.neumorphic-button {
  background: linear-gradient(145deg, #f0f0f3, #ffffff);
  box-shadow: 5px 5px 10px #d3d3d6,
  -5px -5px 10px #ffffff;
  color: #4a5568;
}

.neumorphic-button:active {
  box-shadow: inset 5px 5px 10px #d3d3d6,
  inset -5px -5px 10px #ffffff;
}

/* 毛玻璃效果 */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* 提高对比度 */
.text-gray-800 {
  color: #2d3748;
}

.text-blue-600 {
  color: #2563eb;
}

/* 新增成功状态样式 */
.neumorphic-success {
  background: #dcfce7;
  box-shadow: inset 2px 2px 4px #22c55e,
  inset -2px -2px 4px #ffffff;
  color: #166534;
}

/* 错误提示样式保持不变 */
.neumorphic-error {
  background: #fee2e2;
  box-shadow: inset 2px 2px 4px #fca5a5,
  inset -2px -2px 4px #ffffff;
  color: #dc2626;
}

.text-success {
  color: #166534;
}

.text-error {
  color: #dc2626;
}
</style>
