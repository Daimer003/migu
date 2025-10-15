<template>
  <div class="w-full min-h-screen flex pt-14">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Panel Admin</h2>
      <nav class="space-y-3">
        <button
          class="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 transition"
          :class="tab === 'products' ? 'bg-gray-200 font-semibold' : ''"
          @click="$emit('change-tab', 'products')"
        >
          🛍 Productos
        </button>
        <button
          class="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 transition"
          :class="tab === 'orders' ? 'bg-gray-200 font-semibold' : ''"
          @click="$emit('change-tab', 'orders')"
        >
          🚚 Órdenes
        </button>
      </nav>

      <div class="mt-6 border-t pt-4">
        <button
          class="w-full text-left px-4 py-2 rounded-md hover:bg-red-100 text-red-600 font-semibold transition"
          @click="logout"
        >
          🔒 Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="flex-1 p-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
defineProps({
  tab: String
})


import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'vue-router'
const { push } = useRouter()

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) alert(error.message)


  push('/dashboard')
}
</script>