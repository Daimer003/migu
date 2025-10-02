<template>
  <section class="min-h-screen flex items-center justify-center bg-[#fff9f6] px-6 md:px-16 py-20">
    <div class="w-full max-w-3xl">
      <!-- Título -->
      <h1 class="text-4xl md:text-5xl font-extrabold text-[#ff4d6d] text-center mb-10">
        Contáctanos
      </h1>

      <!-- Formulario -->
      <form class="bg-white shadow-xl p-8 md:p-12 space-y-6">
        <input 
          type="text" 
          placeholder="Nombre" 
          class="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b84ff] transition"
        />
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          class="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b84ff] transition"
        />
        <textarea 
          placeholder="Mensaje" 
          rows="5" 
          class="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d6d] transition"
        ></textarea>
        
        <!-- Botón -->
        <button 
          type="submit" 
          class="w-full bg-[#2b84ff] text-white p-4 rounded-xl font-semibold text-lg shadow hover:bg-[#1a6fe0] transition transform hover:scale-105"
        >
          Enviar mensaje
        </button>
      </form>

      <!-- Texto extra -->
      <p class="text-center text-gray-600 mt-8">
        También puedes escribirnos a 
        <a href="mailto:hola@migu.com" class="text-[#ff4d6d] font-semibold hover:underline">hola@migu.com</a>
      </p>
    </div>
  </section>
</template>