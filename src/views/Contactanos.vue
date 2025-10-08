<script setup>
import { ref } from "vue"
import { sendContactMessage } from "@/services/user.service"

const contact = ref({
  name: "",
  email: "",
  message: ""
})

const sendMessage = async () => {
  try {
    const { error } = await sendContactMessage(null, contact.value)
    if (error) throw error

    alert("✅ Mensaje enviado con éxito.")
    contact.value = { name: "", email: "", message: "" }
  } catch (error) {
    console.error("Error al enviar mensaje:", error.message)
    alert("❌ Hubo un problema al enviar el mensaje.")
  }
}
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-[#fff9f6] px-6 md:px-16 py-20">
    <div class="w-full max-w-3xl">
      <h1 class="text-4xl md:text-5xl font-extrabold text-[#ff4d6d] text-center mb-10">
        Contáctanos
      </h1>

      <form 
        class="bg-white shadow-xl p-8 md:p-12 space-y-6"
        @submit.prevent="sendMessage"
      >
        <input 
          v-model="contact.name"
          type="text" 
          placeholder="Nombre" 
          class="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b84ff] transition"
        />
        <input 
          v-model="contact.email"
          type="email" 
          placeholder="Correo electrónico" 
          class="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b84ff] transition"
        />
        <textarea 
          v-model="contact.message"
          placeholder="Mensaje" 
          rows="5" 
          class="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d6d] transition"
        ></textarea>
        
        <button 
          type="submit" 
          class="w-full bg-[#2b84ff] text-white p-4 rounded-xl font-semibold text-lg shadow hover:bg-[#1a6fe0] transition transform hover:scale-105"
        >
          Enviar mensaje
        </button>
      </form>

      <p class="text-center text-gray-600 mt-8">
        También puedes escribirnos a 
        <a href="mailto:hola@migu.com" class="text-[#ff4d6d] font-semibold hover:underline">hola@migu.com</a>
      </p>
    </div>
  </section>
</template>