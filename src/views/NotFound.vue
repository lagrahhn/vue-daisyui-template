<script setup>

import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="text-center">
      <div class="hero">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-9xl font-bold text-error mb-4">404</h1>
            <p class="text-2xl mb-8">页面不存在或已丢失</p>
            <div class="join">
              <button
                  class="btn btn-primary join-item"
                  @click="router.push('/')"
              >
                返回首页
              </button>
              <button
                  class="btn btn-outline join-item"
                  @click="router.go(-1)"
              >
                后退一步
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
