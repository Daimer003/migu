<template>
  <!-- Overlay -->
  <div v-if="isOpen && cart.length > 0" class="fixed inset-0 bg-black/40 z-40" @click="closeCart"></div>

  <!-- Sidebar -->
  <div :class="[
    'fixed top-0 right-0 h-full w-120 bg-white shadow-lg z-50 transform transition-transform duration-300',
    isOpen ? 'translate-x-0' : 'translate-x-full'
  ]">
    <div class="flex justify-between items-center p-4 border-b">
      <h2 class="text-xl font-bold">Tu Carrito</h2>
      <button @click="closeCart" class="text-gray-500 hover:text-gray-700">
        ✕
      </button>
    </div>

    <div class="p-4 flex-1 overflow-y-auto">
      <ul class="space-y-4">
        <li v-for="item in cart" :key="item.id" class="flex justify-between items-center border-b pb-2">
          <div>
            <p class="font-semibold">{{ item.name }}</p>
            <p class="text-sm text-gray-500">Cant: {{ item.quantity }}</p>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-gray-700">${{ item.price * item.quantity }}</p>
            <button @click="removeFromCart(item.id)" class="text-red-500 hover:text-red-700">
              ✕
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div class="p-4 border-t">
      <p class="text-lg font-bold">Total: ${{ total }}</p>
      <button @click="checkout"
        class="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
        Comprar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useCart } from "./composables/useCart"
import { useRouter } from "vue-router"
const { push } = useRouter()


const { cart, total, removeFromCart, clearCart } = useCart()
const isOpen = ref(false)

function openCart() {
  isOpen.value = true
}
function closeCart() {
  isOpen.value = false
}
function checkout() {
  push('/verificar')
  closeCart()
}

// Exponemos funciones para abrir/cerrar desde afuera
defineExpose({ openCart, closeCart })
</script>