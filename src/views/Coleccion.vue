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
            <button
              v-for="size in sizes"
              :key="size"
              class="px-3 py-1 border rounded-full text-sm hover:bg-[#ff4d6d] hover:text-white transition"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Colores -->
        <div class="mb-6">
          <p class="font-medium text-sm mb-2">Colores</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="color in colors"
              :key="color"
              :style="{ backgroundColor: color }"
              class="w-6 h-6 rounded-full border cursor-pointer hover:scale-110 transition"
            ></span>
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
          <div
            v-for="(product, index) in products"
            :key="index"
            class="bg-white shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition"
          >
            <img :src="product.image" :alt="product.name" class="w-full h-140 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
              <p class="text-gray-600 text-sm mb-3">{{ product.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-[#ff4d6d]">${{ product.price }}</span>
                <button class="px-4 py-2 bg-[#2b84ff] text-white text-sm rounded-lg hover:bg-[#1a6fe0] transition">
                  Ver más
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </section>
</template>

<script setup>
import { products } from "@/data/data"

const sizes = ["0-3m", "3-6m", "6-12m", "1-2y", "3-4y", "5-6y", "7-8y"];
const colors = ["#ff4d6d", "#2b84ff", "#facc15", "#10b981", "#9b59b6", "#000000"];
</script>