<template>
  <section class="min-h-screen mt-30">
    <div class="max-w-3xl mx-auto px-6 py-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Mi Perfil
      </h2>

      <div class="bg-white shadow p-6 rounded-lg">
        <form @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre de usuario</label>
            <input
              v-model="user.username"
              type="text"
              placeholder="Tu nombre de usuario"
              class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2b84ff] focus:outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
            <input
              v-model="user.birthday"
              type="date"
              class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2b84ff] focus:outline-none"
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

          <div class="flex items-center space-x-2">
            <input
              v-model="user.newsletter"
              type="checkbox"
              id="newsletter"
              class="rounded text-[#2b84ff] focus:ring-[#2b84ff]"
            />
            <label for="newsletter" class="text-sm text-gray-700">
              Deseo recibir novedades y descuentos
            </label>
          </div>

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
import { registerUser } from "@/services/user.service"

const user = ref({
  username: "",
  birthday: "",
  phone: "",
  newsletter: false
})

const saveProfile = async () => {
  try {


    const { error } = await registerUser(null, user.value)
    if (error) throw error

    alert("✅ Perfil guardado con éxito.")
  } catch (error) {
    console.error("Error al guardar perfil:", error.message)
    alert("❌ Hubo un problema al guardar el perfil.")
  }
}
</script>