<template>

  <slot v-if="user && role === 'authenticated'" />

  <div v-else class="flex w-full  items-center justify-center h-screen">
    <Login v-if="!user" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getUserAuth } from '@/services/user.service'
import Login from './Login.vue'

const user = ref(null)
const role = ref(null)
const loading = ref(true)

onMounted(async () => {
  const response = await getUserAuth()
  if (response) {
    user.value = response.user
    role.value = response.role
    loading.value = true
  } else {
    user.value = null
    role.value = null


    loading.value = false
  }
})

watch(
  () => user.value,
  async (newUser) => {
    if (newUser) {
      const response = await getUserAuth()
      user.value = response.user
      role.value = response.role
    } else {
      user.value = null
      role.value = null
    }
  }
)
</script>