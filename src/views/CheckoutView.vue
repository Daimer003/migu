<template>
  <section class="min-h-screen mt-30">
    <div class="max-w-4xl mx-auto px-6 py-10">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Detalles de tu compra</h2>

      <!-- Lista de productos en el carrito -->
      <div
        v-for="(item, index) in cart"
        :key="index"
        class="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4"
      >
        <div class="flex items-center space-x-4">
          <img
            :src="item.image"
            :alt="item.name"
            class="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h3 class="font-semibold text-gray-800">{{ item.name }}</h3>
            <p class="text-sm text-gray-500">Cantidad: {{ item.quantity }}</p>
            <p class="text-sm text-gray-500">Precio unitario: ${{ item.price }}</p>
          </div>
        </div>
        <span class="text-lg font-bold text-[#ff4d6d]">
          ${{ (item.price * item.quantity).toFixed(2) }}
        </span>
      </div>

      <!-- Si el carrito está vacío -->
      <div v-if="cart.length === 0" class="text-center text-gray-500">
        Tu carrito está vacío 🛒
      </div>

      <!-- Total -->
      <div v-if="cart.length > 0" class="flex justify-between items-center mt-8 border-t pt-4">
        <h3 class="text-xl font-bold text-gray-800">Total:</h3>
        <span class="text-2xl font-bold text-[#ff4d6d]">${{ total }}</span>
      </div>

      <!-- Botón de pagar -->
      <div v-if="cart.length > 0" class="mt-8">
        <button
          @click="pay"
          class="w-full py-3 bg-[#2b84ff] text-white text-lg font-semibold rounded-lg hover:bg-[#1a6fe0] transition"
        >
          Pagar con PayU
        </button>
        <p class="mt-2 text-sm text-gray-500 text-center">
          Serás redirigido a <span class="font-semibold">PayU</span> para finalizar tu compra de forma segura 🔒
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue"
import { useCart } from "@/composables/useCart" // Aquí está tu carrito real

const { cart } = useCart()

// Calcular el total
const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
)

const pay = () => {
  alert("Redirigiendo a PayU...")
}
</script>