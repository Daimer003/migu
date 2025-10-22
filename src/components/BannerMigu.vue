<template>
  <section
    class="relative w-full h-[500px] flex items-center justify-center text-center bg-cover bg-center mt-30 transition-all duration-1000 ease-in-out"
    :style="{ backgroundImage: `url('${images[currentIndex]}')` }"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- Contenido -->
    <div class="relative z-10 max-w-3xl px-6">
      <h1 class="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
        Descubre lo nuevo
      </h1>
      <p class="mt-4 text-lg md:text-xl text-gray-100 drop-shadow-md">
        Fabricamos piezas únicas que elevan tu estilo y tu espacio.
      </p>
      <button
        class="mt-6 bg-[#debcc2] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#c7a4aa] transition"
      >
        Ver Colección
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const images = [
  '/assets/shop/migu-img-2.jpg',
  '/assets/shop/migu-img-4.jpg',
  '/assets/shop/migu-img-2.jpg',
  '/assets/shop/migu-img-2.jpg'
]

const currentIndex = ref(0)
let intervalId = null

const changeImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

onMounted(() => {
  intervalId = setInterval(changeImage, 5000) // cambia cada 5 segundos
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
section {
  transition: background-image 1s ease-in-out;
}
</style>