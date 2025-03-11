<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import UserApi from '../api/user'

const router = useRouter()

// 表单数据
const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  email: ''
})

// 状态管理
const loading = ref(false)
const errorMessage = ref('')
// 新增跳转状态
const isRedirecting = ref(false)

// 手机号验证正则
const phoneRegExp = /^1[3-9]\d{9}$/

// 注册处理
const handleRegister = async () => {
  // 重置错误信息
  errorMessage.value = ''

  // 密码验证
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }

  // 手机号格式验证
  if (!phoneRegExp.test(form.value.phone)) {
    errorMessage.value = '请输入有效的手机号码'
    return
  }

  try {
    loading.value = true

    // 构造请求数据
    const payload = {
      username: form.value.username,
      password: form.value.password,
      phone: form.value.phone,
      email: form.value.email || null // 邮箱可为空
    }

    console.log(payload)
    // 发送注册请求
    const response = await UserApi.register(payload);

    // 处理响应
    if (response.data.code === 200) {
      // 显示成功状态
      errorMessage.value = '注册成功，即将跳转到登录页面...'
      isRedirecting.value = true
      // 1秒跳转延时
      setTimeout(async () => {
        await router.push('/login')
        isRedirecting.value = false
      }, 1000)
    } else {
      errorMessage.value = response.data.message || '注册失败'
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || '请求失败，请稍后重试'
    console.error('注册失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- 在原有模板中添加跳转动画 -->
  <div v-if="isRedirecting" class="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center">
    <div class="neumorphic-success p-6 rounded-2xl flex items-center gap-3 animate-pulse">
      <span class="loading loading-spinner text-success"></span>
      <span class="text-lg font-semibold">正在跳转到登录页面...</span>
    </div>
  </div>
  <!-- 修改错误提示部分 -->
  <div
      v-if="errorMessage"
      :class="[
      'mt-6 p-4 rounded-xl flex items-center gap-2',
      isRedirecting ? 'neumorphic-success' : 'neumorphic-error'
    ]"
  >
    <svg :class="[
      'h-6 w-6 shrink-0',
      isRedirecting ? 'text-success' : 'text-error'
    ]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path v-if="isRedirecting" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
    {{ errorMessage }}
  </div>


  <div class="min-h-screen flex items-center justify-center p-4">
    <div
        class="fixed inset-0 z-0 bg-cover bg-center"
    ></div>

    <div class="neumorphic-container w-full max-w-md p-8 rounded-2xl backdrop-blur-sm">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">用户注册</h1>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- 用户名 -->
        <div class="space-y-2">
          <label class="text-lg font-semibold text-gray-700">用户名</label>
          <input
              v-model="form.username"
              type="text"
              placeholder="请输入用户名"
              class="neumorphic-input w-full p-4 rounded-xl"
              required
          />
        </div>

        <!-- 手机号 -->
        <div class="space-y-2">
          <label class="text-lg font-semibold text-gray-700">手机号</label>
          <input
              v-model="form.phone"
              type="tel"
              placeholder="请输入手机号码"
              class="neumorphic-input w-full p-4 rounded-xl"
              pattern="[0-9]{11}"
              required
          />
        </div>

        <!-- 密码 -->
        <div class="space-y-2">
          <label class="text-lg font-semibold text-gray-700">密码</label>
          <input
              v-model="form.password"
              type="password"
              placeholder="至少8位字符"
              class="neumorphic-input w-full p-4 rounded-xl"
              required
              minlength="8"
          />
        </div>

        <!-- 确认密码 -->
        <div class="space-y-2">
          <label class="text-lg font-semibold text-gray-700">确认密码</label>
          <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="再次输入密码"
              class="neumorphic-input w-full p-4 rounded-xl"
              required
          />
        </div>

        <!-- 邮箱（可选） -->
        <div class="space-y-2">
          <label class="text-lg font-semibold text-gray-700">邮箱（可选）</label>
          <input
              v-model="form.email"
              type="email"
              placeholder="example@domain.com"
              class="neumorphic-input w-full p-4 rounded-xl"
          />
        </div>

        <!-- 注册按钮 -->
        <button
            type="submit"
            class="neumorphic-button w-full py-4 text-xl font-bold rounded-xl transition-all"
            :disabled="loading"
        >
          <span v-if="!loading">立即注册</span>
          <span v-else class="flex items-center justify-center gap-2">
            <span class="loading loading-spinner"></span>
            注册中...
          </span>
        </button>

        <!-- 登录链接 -->
        <p class="text-center text-gray-600">
          已有账号？
          <RouterLink
              to="/login"
              class="text-blue-600 hover:text-blue-800 font-semibold"
          >
            立即登录
          </RouterLink>
        </p>
      </form>

      <!-- 错误提示 -->
      <div
          v-if="errorMessage"
          class="neumorphic-error mt-6 p-4 rounded-xl flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 新增成功状态样式 */
.neumorphic-success {
  background: #dcfce7;
  box-shadow: inset 3px 3px 6px #22c55e,
  inset -3px -3px 6px #ffffff;
  color: #166534;
}

/* 修改原错误提示样式为通用提示样式 */
.neumorphic-error {
  background: #fee2e2;
  box-shadow: inset 3px 3px 6px #fca5a5,
  inset -3px -3px 6px #ffffff;
  color: #dc2626;
}

/* 新增背景相关样式 */
.bg-cover {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('../assets/login_background.jpg');
}

/* 修改容器样式增强对比度 */
.neumorphic-container {
  background: rgba(240, 240, 243, 0.93); /* 提高透明度 */
  position: relative;
  box-shadow: 10px 10px 21px #d3d3d6,
  -10px -10px 21px #ffffff;
}

/*!* 新增错误提示样式 *!
.neumorphic-error {
  background: #fee2e2;
  box-shadow: inset 3px 3px 6px #fca5a5,
  inset -3px -3px 6px #ffffff;
  color: #dc2626;
}*/


/* 调整交互状态 */
.neumorphic-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 7px 7px 14px #d3d3d6,
  -7px -7px 14px #ffffff;
}

/* 增强输入框对比度 */
.neumorphic-input {
  background: #f0f0f3;
  border: none;
  box-shadow: inset 5px 5px 10px #d3d3d6,
  inset -5px -5px 10px #ffffff;
  transition: all 0.2s ease;
}

</style>
