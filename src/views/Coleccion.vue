<template>
  <section class="min-h-screen mt-30">
    <div class="max-w-[1900px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">

      <!-- Sidebar -->
      <aside class="md:col-span-1 bg-white p-6  shadow-md">
        <h3 class="text-xl font-bold mb-6 text-[#2b2b2b]">Colecciones</h3>

        <!-- Categorías -->
        <ul class="space-y-3 mb-8">
          <li><a href="#" class="block hover:text-[#ff4d6d]">Niños</a></li>
          <li><a href="#" class="block hover:text-[#ff4d6d]">Niñas</a></li>
          <li><a href="#" class="block hover:text-[#ff4d6d]">Bebés</a></li>
          <li><a href="#" class="block hover:text-[#ff4d6d]">Accesorios</a></li>
          <li><a href="#" class="block hover:text-[#ff4d6d]">Zapatos</a></li>
        </ul>

        <!-- Filtros -->
        <h4 class="text-lg font-semibold mb-3">Filtros</h4>

        <!-- Tallas -->
        <div class="mb-6">
          <p class="font-medium text-sm mb-2">Tallas</p>
          <div class="flex flex-wrap gap-2">
            <button v-for="size in sizes" :key="size"
              class="px-3 py-1 border rounded-full text-sm hover:bg-[#ff4d6d] hover:text-white transition">
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Colores -->
        <div class="mb-6">
          <p class="font-medium text-sm mb-2">Colores</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="color in colors" :key="color" :style="{ backgroundColor: color }"
              class="w-6 h-6 rounded-full border cursor-pointer hover:scale-110 transition"></span>
          </div>
        </div>

        <!-- Precio -->
        <div>
          <p class="font-medium text-sm mb-2">Precio</p>
          <input type="range" min="0" max="200" value="100" class="w-full accent-[#ff4d6d]" />
          <div class="flex justify-between text-sm mt-2">
            <span>$0</span>
            <span>$200</span>
          </div>
        </div>
      </aside>

      <!-- Grid de productos -->
      <main class="md:col-span-3">
        <h2 class="text-2xl font-bold mb-6">Colección destacada</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          <CommerceCard v-for="product in products" :key="product.id" :id="product.id" :title="product.name"
            :description="product.description" :imageUrl="product.image" :price="product.price" />

        </div>
      </main>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import CommerceCard from "@/components/cards/CommerceCard.vue"
import { getProducts } from "@/services/product.service" // si usas Supabase

const products = ref([])

const sizes = ["0-3m", "3-6m", "6-12m", "1-2y", "3-4y", "5-6y", "7-8y"]
const colors = ["#ff4d6d", "#2b84ff", "#facc15", "#10b981", "#9b59b6", "#000000"]


// 🔹 Si usas Supabase:
onMounted(async () => {
  const { data, error } = await getProducts()
  console.log(data)
  if (!error) products.value = data
  else console.error("Error al cargar productos:", error)
})


</script>