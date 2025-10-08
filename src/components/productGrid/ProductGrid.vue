<template>
  <section class="p-10">
    <div class="max-w-[1900px] mx-auto mt-30">
      <h2 class="text-3xl md:text-4xl font-bold mb-10 text-center text-[#2b2b2b]">
        Nuestros Productos
      </h2>

      <swiper
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
          <img :src="product.image" :alt="product.name" class="w-full min-h-[400px] object-cover" />

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
import { getProducts } from "@/services/product.service" // si usas Supabase
// import { products as localProducts } from "@/data/data" // si usas datos locales

const router = useRouter()
const products = ref([])

const bgColors = [
  "bg-[#2b84ff]",
  "bg-[#d8f04d]",
  "bg-[#ff4d6d]",
  "bg-[#ff9be2]"
]

// 🔹 Si usas Supabase:
onMounted(async () => {
  const { data, error } = await getProducts()
  console.log(data)
  if (!error) products.value = data
  else console.error("Error al cargar productos:", error)
})

// 🔹 Si prefieres usar datos locales por ahora, comenta el bloque anterior y descomenta esto:
// products.value = localProducts

const goDetail = (id) => {
  router.push(`/detalles/${id}`)
}
</script>