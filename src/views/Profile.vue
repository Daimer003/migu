<template>
  <section class="min-h-screen mt-30 ">
    <div class="max-w-3xl mx-auto px-6 py-10">
      <!-- Encabezado -->
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Mi Perfil
      </h2>

      <!-- Card de perfil -->
      <div class="bg-white shadow p-6">
        <!-- Foto de perfil (opcional) -->
        <div class="flex justify-center mb-6">
          <div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
            <span>👤</span>
          </div>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input
              v-model="user.name"
              type="text"
              placeholder="Tu nombre"
              class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2b84ff] focus:outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              v-model="user.email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2b84ff] focus:outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Teléfono (opcional)</label>
            <input
              v-model="user.phone"
              type="tel"
              placeholder="+57 300 000 0000"
              class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2b84ff] focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Preferencias</label>
            <select
              v-model="user.preference"
              class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2b84ff] focus:outline-none"
            >
              <option value="">Selecciona una</option>
              <option value="promotions">Promociones y descuentos</option>
              <option value="events">Eventos especiales</option>
              <option value="both">Ambos</option>
            </select>
          </div>

          <!-- Botón -->
          <div class="pt-4">
            <button
              type="submit"
              class="w-full py-3 bg-[#2b84ff] text-white text-lg font-semibold rounded-lg hover:bg-[#1a6fe0] transition"
            >
              Guardar perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue"

const user = ref({
  name: "",
  email: "",
  phone: "",
  preference: ""
})

const saveProfile = () => {
  alert("Perfil guardado con éxito ✅")
  console.log("Perfil del usuario:", user.value)
}
</script>