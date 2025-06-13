<template>
  <div class="page-container">
    <div class="header">
      <span class="close-icon" @click="close">×</span>
      <h1 class="title">信息填报</h1>
      <span class="more-icon">···</span>
    </div>
    <div class="success-content">
      <div class="success-icon">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="40" fill="#1DD1A1"/>
          <path d="M26 41.5L36.5 52L54.5 34" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h2 class="success-title">预约成功</h2>
      <p class="success-message">将在床位空余后尽快和您联系, 请<br>保持手机通畅。</p>
      <button class="close-btn" @click="close">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const close = () => {
  router.push('/details')
}
</script>

<style scoped>
.page-container {
  background-color: #fff;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.close-icon,
.more-icon {
  font-size: 1.5rem;
  color: #333;
  font-weight: 300;
  cursor: pointer;
}

.more-icon {
  font-weight: bold;
  letter-spacing: 2px;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.success-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  text-align: center;
}

.success-icon {
  margin-bottom: 2rem;
}

.success-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.success-message {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 3rem 0;
  line-height: 1.6;
}

.close-btn {
  width: 100%;
  max-width: 340px;
  padding: 0.8rem;
  background-color: #1dd1a1;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
}
</style> 