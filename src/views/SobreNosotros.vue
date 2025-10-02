<template>
  <section class="min-h-screen flex items-center justify-center px-6 md:px-16 bg-[#fff9f6] py-20">
    <div class="max-w-6xl w-full text-center">

      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="/assets/logo-migu.webp" alt="Logo migu" class="w-[130px]" />
      </div>

      <!-- Título -->
      <h1 class="text-4xl md:text-5xl font-extrabold text-[#ff4d6d] mb-12">
        Sobre Nosotros
      </h1>

      <!-- Contenido en columnas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

        <!-- Bloque 1 -->
        <div class="bg-white shadow-md p-6 rounded-lg flex flex-col items-center">
          <div class="text-pink-400 text-6xl mb-4">☁️</div>
          <p class="text-gray-700 text-md leading-relaxed">
            "Creamos ropa con propósito: prendas que se adaptan a las necesidades de todos los niños,
            incluyendo aquellos con condiciones especiales, para que puedan sentirse libres,
            cómodos y seguros en su día a día."
          </p>
        </div>

        <!-- Bloque 2 -->
        <div class="bg-white shadow-md p-6 rounded-lg flex flex-col items-center">
          <div class="text-blue-500 text-6xl mb-4">👁️</div>
          <p class="text-gray-700 text-md leading-relaxed">
            "Creemos en una moda inclusiva: nuestras prendas combinan funcionalidad, estilo y accesibilidad
            para que todos los niños —sin excepción— puedan vestirse con facilidad,
            sentirse bien y expresarse con libertad."
          </p>
        </div>

        <!-- Bloque 3 -->
        <div class="bg-white shadow-md p-6 rounded-lg flex flex-col items-center">
          <div class="text-red-500 text-6xl mb-4">🧩</div>
          <p class="text-gray-700 text-md leading-relaxed">
            "Nuestros tejidos de alta tecnología están diseñados para brindar confort,
            regulación térmica y máxima suavidad, con materiales libres de químicos agresivos,
            ideales para pieles sensibles."
          </p>
        </div>

      </div>
    </div>
  </section>
</template>