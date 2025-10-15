<template>
  <section class="p-10">
    <div class="max-w-[1900px] mx-auto mt-30">
      <h2 class="text-3xl md:text-4xl font-bold mb-10 text-center text-[#2b2b2b]">
        Nuestros Productos
      </h2>

      <!-- 🔹 Mostrar skeletons mientras carga -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="n in 4"
          :key="n"
          class="bg-white shadow-md rounded-lg overflow-hidden animate-pulse"
        >
          <div class="bg-gray-300 h-[400px] w-full"></div>
          <div class="p-5 space-y-3">
            <div class="h-5 bg-gray-300 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="flex justify-between items-center pt-3">
              <div class="h-6 w-16 bg-gray-300 rounded"></div>
              <div class="h-8 w-20 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 🔹 Mostrar productos cuando cargan -->
      <swiper
        v-else
        :slides-per-view="1"
        :space-between="20"
        :breakpoints="{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 }
        }"
        navigation
        pagination
        class="pb-10"
      >
        <swiper-slide
          v-for="(product, index) in products"
          :key="product.id"
          class="relative group overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 bg-white"
        >
          <!-- Imagen -->
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full min-h-[400px] object-cover"
          />

          <!-- Contenido con colores -->
          <div :class="bgColors[index % bgColors.length]" class="relative z-20 p-5 -mt-6">
            <h3 class="text-lg font-bold mb-2 text-white">
              {{ product.name }}
            </h3>
            <p class="text-white/90 text-sm mb-4">
              {{ product.description }}
            </p>

            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-white">
                ${{ product.price.toLocaleString() }}
              </span>
              <button
                @click="goDetail(product.id)"
                class="px-4 py-2 rounded-full bg-white text-[#2b2b2b] font-medium text-sm shadow hover:bg-gray-200 transition transform hover:scale-105"
              >
                Ver más
              </button>
            </div>
          </div>

          <!-- Detalle gráfico flotante -->
          <svg
            class="absolute -top-3 -left-3 w-10 h-10 text-pink-400 opacity-70 group-hover:rotate-180 transition duration-500"
            fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { getProducts } from "@/services/product.service"

const router = useRouter()
const products = ref([])
const loading = ref(true)

const bgColors = [
  "bg-[#2b84ff]",
  "bg-[#d8f04d]",
  "bg-[#ff4d6d]",
  "bg-[#ff9be2]"
]

onMounted(async () => {
  try {
    const { data, error } = await getProducts()
    if (!error) products.value = data
  } catch (err) {
    console.error("Error al cargar productos:", err)
  } finally {
    loading.value = false
  }
})

const goDetail = (id) => {
  router.push(`/detalles/${id}`)
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>