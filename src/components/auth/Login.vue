<template>
  <div class="flex items-center justify-center h-screen w-full">
    <div class="bg-white p-6 rounded-md shadow-md w-80 space-y-4">
      <h2 class="text-xl font-bold text-center">Login</h2>
      <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded" />
      <input v-model="password" type="password" placeholder="Contraseña" class="w-full border p-2 rounded" />
      <button @click="login" class="w-full bg-blue-500 text-white py-2 rounded-md">Iniciar sesión</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const email = ref('')
const password = ref('')

async function login() {
  const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
  if (error) alert(error.message)
  else location.reload()
}
</script>