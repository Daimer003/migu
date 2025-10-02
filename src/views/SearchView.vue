<template>
  <section class="min-h-screen mt-30">
    <div class="max-w-5xl mx-auto px-6 py-10">
      <!-- Buscador -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Buscar productos</h1>
        <input
          v-model="query"
          type="text"
          placeholder="Escribe el nombre de un producto..."
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2b84ff] focus:outline-none"
        />
      </div>

      <!-- Resultados -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-40 object-cover rounded-md mb-4"
          />
          <h2 class="text-lg font-semibold text-gray-800">{{ product.name }}</h2>
          <p class="text-sm text-gray-500 mb-2">{{ product.description }}</p>
          <p class="text-[#ff4d6d] font-bold text-lg mb-3">${{ product.price }}</p>
          <button
            @click="addToCart(product)"
            class="w-full py-2 bg-[#2b84ff] text-white font-medium rounded-lg hover:bg-[#1a6fe0] transition"
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      <!-- No hay resultados -->
      <div v-else class="text-center text-gray-500 mt-10">
        <p>No encontramos productos con "<span class="font-semibold">{{ query }}</span>"</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue"
import { products } from "@/data/data"
import { useCart } from "@/composables/useCart"

const { addToCart } = useCart()

const query = ref("")

// Filtrar productos según búsqueda
const filteredProducts = computed(() => {
  if (!query.value) return []   // 👈 ahora no devuelve nada si no hay búsqueda
  return products.filter((p) =>
    p.name.toLowerCase().includes(query.value.toLowerCase())
  )
})
</script>