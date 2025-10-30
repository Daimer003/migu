<template>

  <slot v-if="user && role === 'authenticated'" />

  <div v-else class="flex w-full  items-center justify-center h-screen">
    <Login v-if="!user" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import Login from './Login.vue'

const user = ref(null)
const role = ref(null)
const loading = ref(true)

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  user.value = data.user
  role.value = data.user?.role || 'authenticated'
  loading.value = false

  const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
    user.value = session?.user || null
    role.value = session?.user ? 'authenticated' : null
  })

  onUnmounted(() => {
    listener.subscription.unsubscribe()
  })
})
</script>