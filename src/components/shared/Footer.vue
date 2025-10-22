<template>
  <footer class="bg-[#f9f9f9] text-gray-700 pt-12 pb-6">
    <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

      <!-- Logo / Descripción -->
      <div>
        <h2 class="text-2xl font-bold text-[#ff4d6d]">MiGÚ Kids</h2>
        <p class="mt-3 text-sm text-gray-600">
          Ropa divertida, cómoda y con estilo para los más pequeños.
        </p>
      </div>

      <!-- Colecciones -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Colecciones</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="hover:text-[#ff4d6d]">Niños</a></li>
          <li><a href="#" class="hover:text-[#ff4d6d]">Niñas</a></li>
          <li><a href="#" class="hover:text-[#ff4d6d]">Bebés</a></li>
          <li><a href="#" class="hover:text-[#ff4d6d]">Accesorios</a></li>
        </ul>
      </div>

      <!-- Enlaces útiles -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Ayuda</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="hover:text-[#ff4d6d]">Guía de tallas</a></li>
          <li><a href="#" class="hover:text-[#ff4d6d]">Envíos y devoluciones</a></li>
          <li><a href="#" class="hover:text-[#ff4d6d]">Preguntas frecuentes</a></li>
          <li><a href="#" class="hover:text-[#ff4d6d]">Contáctanos</a></li>
        </ul>
      </div>

      <!-- Redes Sociales -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Síguenos</h3>
        <div class="flex space-x-4">
          <a href="https://www.facebook.com/migushopco" target="_blank" class="w-8 h-8 flex items-center justify-center rounded-full bg-[#ff4d6d] text-white hover:bg-[#e63b58] transition p-1">
           <IconFacebook />
          </a>
          <a href="https://www.instagram.com/migushopco/" target="_blank" class="w-8 h-8 flex items-center justify-center rounded-full bg-[#ff4d6d] text-white hover:bg-[#e63b58] transition p-1">
           <IconInstagram />
          </a>
          <a href="https://www.tiktok.com/@migushopco" target="_blank" class="w-8 h-8 flex items-center justify-center rounded-full bg-[#ff4d6d] text-white hover:bg-[#e63b58] transition p-1">
           <IconTiktok />
          </a>
        </div>
      </div>
    </div>

    <!-- Línea inferior -->
    <div class="mt-10 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
      © 2025 MiGÚ Kids. Todos los derechos reservados.
    </div>
  </footer>
</template>

<script setup>
import IconFacebook from '../icons/IconFacebook.vue';
import IconInstagram from '../icons/IconInstagram.vue';
import IconTiktok from '../icons/IconTiktok.vue';



// Si usas FontAwesome, asegúrate de tenerlo importado en tu proyecto.
// También puedes reemplazar los <i> por <svg> de Heroicons si prefieres.
</script>