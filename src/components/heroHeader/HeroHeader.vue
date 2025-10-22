<script setup lang="ts">
import HeroPattern from '../HeroPattern.vue';

</script>

<template>
  <section class="relative bg-[#fff9f6] w-full h-[80vh] flex items-center justify-center text-center">
    <!-- Imagen de fondo -->
    <img src="@/assets/bg-migu.webp" alt="Fondo decorativo"
      class="absolute inset-0 w-full h-full object-cover opacity-5 grayscale" />

    <!-- Overlay para mejorar contraste (opcional) -->
    <!--div class="absolute inset-0 bg-black bg-opacity-00"></div-->

    <div class="flex flex-col lg:flex-row justify-center items-center relative z-10 px-4 w-full gap-10 max-w-[1200px]">
      <div class="flex flex-col items-start w-full">
        <!-- Título -->
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Bienvenido a MiGÚ
        </h1>

        <!-- Texto atractivo -->
        <p class="text-lg text-start md:text-xl mb-6">
          Somos fabricantes que transforman la imaginación en piezas únicas.
          Diseños originales, calidad de fábrica y un universo lleno de color
          pensado para sorprender.
        </p>

        <!-- Botón -->
        <button
          class="px-6 py-3 rounded-lg bg-[#2b84ff] text-white font-medium text-lg shadow-md hover:bg-[#1a6fe0] transition">
          Ver colecciones
        </button>
      </div>


      <HeroPattern />
    </div>


  </section>
</template>