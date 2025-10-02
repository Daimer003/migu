<template>
  <div
    class="bg-white shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition"
  >
    <!-- Imagen -->
    <img
      :src="imageUrl"
      :alt="title"
      class="w-full h-140 object-cover"
    />

    <!-- Contenido -->
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
      <p class="text-gray-600 text-sm mb-3">{{ description }}</p>

      <div class="flex justify-between items-center mb-3">
        <span class="text-xl font-bold text-[#ff4d6d]">${{ price }}</span>
      </div>

      <!-- Botones -->
      <div class="flex gap-2">
        <button
          class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 text-sm  hover:bg-gray-300 transition"
          @click="push('/detalles/1')"
        >
          Ver Detalles
        </button>
        <button
          class="flex-1 px-4 py-2 bg-[#2b84ff] text-white text-sm  hover:bg-[#1a6fe0] transition"
          @click="push('/verificar')"
        >
          Comprar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';


const { push } =useRouter()

defineProps({
  title: String,
  description: String,
  imageUrl: String,
  price: [String, Number],
})

defineEmits(["view-details", "buy"])
</script>