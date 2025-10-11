<template>
  <section class="min-h-screen mt-30">
    <div class="max-w-4xl mx-auto px-6 py-10">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Detalles de tu compra</h2>

      <!-- Lista de productos -->
      <div
        v-for="(item, index) in cart"
        :key="`${item.id}-${item.size}-${item.color}`"
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

            <div class="text-sm text-gray-500">
              <p>Precio unitario: ${{ item.price }}</p>
              <p v-if="item.size">Talla: <span class="font-medium">{{ item.size }}</span></p>
              <p v-if="item.color">Color: <span class="font-medium">{{ item.color }}</span></p>
            </div>

            <div class="flex items-center space-x-2 mt-2">
              <button
                @click="decreaseQuantity(item)"
                class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                ➖
              </button>
              <span class="px-2">{{ item.quantity }}</span>
              <button
                @click="increaseQuantity(item)"
                class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                ➕
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-end">
          <span class="text-lg font-bold text-[#ff4d6d]">
            ${{ item.price * item.quantity }}
          </span>
          <button
            @click="removeFromCart(item)"
            class="mt-2 text-sm text-red-500 hover:underline"
          >
            🗑 Eliminar
          </button>
        </div>
      </div>

      <!-- Carrito vacío -->
      <div v-if="cart.length === 0" class="text-center text-gray-500">
        Tu carrito está vacío 🛒
      </div>

      <!-- Total -->
      <div
        v-if="cart.length > 0"
        class="flex justify-between items-center mt-8 border-t pt-4"
      >
        <h3 class="text-xl font-bold text-gray-800">Total:</h3>
        <span class="text-2xl font-bold text-[#ff4d6d]">${{ total }}</span>
      </div>

      <!-- Datos del comprador -->
      <div v-if="cart.length > 0" class="mt-10">
        <h2 class="text-xl font-bold text-gray-800 mb-4">
          Datos de envío y usuario
        </h2>
        <form @submit.prevent="pay" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-500"
                >Nombre completo</label
              >
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full p-2 border border-gray-500 rounded-lg text-xl text-gray-500"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500"
                >Correo electrónico</label
              >
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full p-2 border rounded-lg border-gray-500 text-xl text-gray-500"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500">Teléfono</label>
              <input
                v-model="form.phone"
                type="tel"
                required
                class="w-full p-2 border rounded-lg border-gray-500 text-xl text-gray-500"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500"
                >Dirección</label
              >
              <input
                v-model="form.address"
                type="text"
                required
                class="w-full p-2 border rounded-lg border-gray-500 text-xl text-gray-500"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500">Ciudad</label>
              <input
                v-model="form.city"
                type="text"
                required
                class="w-full p-2 border rounded-lg border-gray-500 text-xl text-gray-500"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500"
                >Código Postal</label
              >
              <input
                v-model="form.zip"
                type="text"
                required
                class="w-full p-2 border rounded-lg border-gray-500 text-xl text-gray-500"
              />
            </div>
          </div>

          <!-- Botón de pago -->
          <div class="mt-8 text-center">
            <WompiButton
              :cart="cart"
              :form="form"
              :total="total"
              :redirectUrl="redirectUrl"
            />
            <p class="mt-2 text-sm text-gray-500 text-center">
              Serás redirigido a
              <span class="font-semibold">Wompi</span> para finalizar tu compra de
              forma segura 🔒
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue"
import { useCart } from "@/composables/useCart"
import WompiButton from "@/components/wompiButton/WompiButton.vue"

// Composable del carrito
const { cart, total, increment, decrement, removeFromCart } = useCart()

// Redirección dinámica
const redirectUrl = `${window.location.origin}/confirmacion`

// Formulario comprador
const form = reactive({
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
})

// ✅ Controladores de cantidad
const increaseQuantity = (item) => increment(item)
const decreaseQuantity = (item) => decrement(item)

// Pagar (debug)
const pay = () => {
  console.log("🧾 Datos del usuario:", form)
  console.log("🛒 Carrito final:", cart.value)
}
</script>