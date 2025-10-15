<template>
  <section class="min-h-screen mt-15">
    <div class="max-w-[1900px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">

      <!-- Sidebar -->
      <aside class="md:col-span-1 bg-white p-6 shadow-md">
        <h3 class="text-xl font-bold mb-6 text-[#2b2b2b]">Colecciones</h3>

        <!-- Categorías -->
        <ul class="space-y-3 mb-8">
          <li v-for="cat in categories" :key="cat">
            <button
              @click="filters.category = cat"
              :class="[
                'block w-full text-left hover:text-[#ff4d6d] transition',
                filters.category === cat ? 'text-[#ff4d6d] font-semibold' : ''
              ]"
            >
              {{ cat }}
            </button>
          </li>
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
              @click="filters.size = size"
              :class="[
                'px-3 py-1 border rounded-full text-sm transition',
                filters.size === size
                  ? 'bg-[#ff4d6d] text-white border-[#ff4d6d]'
                  : 'hover:bg-[#ff4d6d] hover:text-white'
              ]"
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
              @click="filters.color = color"
              :style="{ backgroundColor: color }"
              :class="[
                'w-6 h-6 rounded-full border cursor-pointer transition',
                filters.color === color ? 'ring-2 ring-[#ff4d6d] scale-110' : 'hover:scale-110'
              ]"
            ></span>
          </div>
        </div>

        <!-- Precio -->
        <div>
          <p class="font-medium text-sm mb-2">Precio</p>
          <input
            type="range"
            min="0"
            max="200"
            v-model="filters.price"
            class="w-full accent-[#ff4d6d]"
          />
          <div class="flex justify-between text-sm mt-2">
            <span>$0</span>
            <span>${{ filters.price }}</span>
          </div>
        </div>
      </aside>

      <!-- Grid de productos -->
      <main class="md:col-span-3">
        <h2 class="text-2xl font-bold mb-6">Colección destacada</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <CommerceCard
            v-for="product in products"
            :key="product.id"
            :id="product.id"
            :title="product.name"
            :description="product.description"
            :imageUrl="product.image"
            :price="product.price"
          />
        </div>
      </main>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue"
import CommerceCard from "@/components/cards/CommerceCard.vue"
import { getProducts } from "@/services/product.service"

const products = ref([])

const categories = ["Niños", "Niñas", "Bebés", "Accesorios", "Zapatos"]
const sizes = ["0-3m", "3-6m", "6-12m", "1-2y", "3-4y", "5-6y", "7-8y"]
const colors = ["#ff4d6d", "#2b84ff", "#facc15", "#10b981", "#9b59b6", "#000000"]

// Objeto de filtros
const filters = reactive({
  category: null,
  size: null,
  color: null,
  price: 100
})

// Obtener productos
onMounted(async () => {
  const { data, error } = await getProducts(filters)
  if (!error) products.value = data
  else console.error("Error al cargar productos:", error)
})

// Mostrar en consola cuando cambie un filtro
watch(filters, (val) => {
  console.log("Filtros actuales:", val)
}, { deep: true })
</script>