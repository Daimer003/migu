<template>
  <div class="min-h-screen flex bg-gray-100">
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
</script>