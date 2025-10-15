<!-- src/components/ui/Toast.vue -->
<template>
  <TransitionGroup name="toast-fade" tag="div" class="fixed top-6  right-6 ml-6 z-50 flex flex-col gap-4">
    <div v-for="(toast, index) in toasts" :key="toast.id" :class="[
      'px-4 py-3 rounded-2xl shadow-xl text-white max-w-sm w-full flex items-start gap-3',
      toastClasses(toast.type)
    ]">
      <div class="flex-1">
        <p class="font-semibold text-base">{{ toast.title }}</p>
        <p class="text-sm text-white/90" v-if="toast.message">{{ toast.message }}</p>
      </div>
      <button @click="removeToast(index)" class="text-white text-xl leading-none">&times;</button>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { reactive } from 'vue'

const toasts = reactive([])

const showToast = ({ title, message = '', type = 'info', duration = 3000 }) => {
  const id = Date.now() + Math.random()
  toasts.push({ id, title, message, type })

  setTimeout(() => {
    const index = toasts.findIndex(t => t.id === id)
    if (index !== -1) toasts.splice(index, 1)
  }, duration)
}

const removeToast = (index) => {
  toasts.splice(index, 1)
}

const toastClasses = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-600';
    case 'error':
      return 'bg-[#b7015f]';
    case 'warning':
      return 'bg-yellow-500 text-black';
    case 'info':
    default:
      return 'bg-sky-600';
  }
}

// exportar para usar globalmente
defineExpose({ showToast })
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.4s ease;
}

.toast-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>