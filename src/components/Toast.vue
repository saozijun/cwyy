<template>
  <transition name="fade">
    <div v-if="visible" class="toast-wrapper">
      <div class="toast-message">{{ message }}</div>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const visible = ref(false)
const message = ref('')
let timer = null

const show = (msg, duration = 2000) => {
  if (timer) {
    clearTimeout(timer)
  }
  message.value = msg
  visible.value = true
  timer = setTimeout(() => {
    visible.value = false
  }, duration)
}

defineExpose({
  show
})
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  z-index: 9999;
  text-align: center;
  pointer-events: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 