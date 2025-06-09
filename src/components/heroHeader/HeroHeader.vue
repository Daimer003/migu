<template>
    <section class="relative w-full h-[80vh] flex items-center justify-center text-center">
      <!-- Imagen de fondo -->
      <img
        src="@/assets/bg-migu.webp"
        alt="Fondo decorativo"
        class="absolute inset-0 w-full h-full object-cover opacity-5 grayscale"
      />
  
      <!-- Overlay para mejorar contraste (opcional) -->
      <!--div class="absolute inset-0 bg-black bg-opacity-00"></div-->
  
      <!-- Contenido -->
      <div class="relative z-10 text-black px-4 max-w-2xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Bienvenido a MiGÚ</h1>
        <p class="text-lg md:text-xl">Un espacio donde la imaginación cobra vida.</p>
      </div>
    </section>
  </template>