<template>
  <section class="bg-[#fff9f6] min-h-screen py-12 mt-30">
    <div
      class="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12"
      v-if="product"
    >
      <!-- Imagen principal -->
      <div class="space-y-4">
        <img
          :src="mainImage"
          :alt="product.name"
          class="w-full max-w-[600px] h-[600px] object-cover shadow-lg"
        />

        <!-- Galería -->
        <div class="flex gap-4">
          <img
            v-for="(img, idx) in product.gallery || []"
            :key="idx"
            :src="img"
            class="w-24 h-24 object-cover cursor-pointer border hover:scale-105 transition"
            @click="mainImage = img"
          />
        </div>
      </div>

      <!-- Info del producto -->
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold text-[#2b2b2b] mb-2">{{ product.name }}</h1>
        <p class="text-sm text-gray-500 mb-4">Ref. {{ product.ref }}</p>

        <!-- Precios -->
        <div class="mb-4">
          <span class="line-through text-gray-400 mr-2">${{ product.oldPrice }}</span>
          <span class="text-2xl font-bold text-[#ff4d6d]">${{ product.price }}</span>
          <span class="ml-2 text-sm text-red-500"
            >Ahorra: ${{ product.savings }} ({{ product.discount }}%)</span
          >
        </div>

        <!-- Tallas -->
        <div class="mb-6">
          <h3 class="font-semibold text-lg mb-2">Talla</h3>
          <div class="flex gap-2">
            <button
              v-for="size in product.sizes || []"
              :key="size"
              @click="selectedSize = size"
              :class="[
                'px-4 py-2 border rounded-lg text-sm transition',
                selectedSize === size
                  ? 'bg-[#2b84ff] text-white'
                  : 'hover:bg-gray-100',
              ]"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Colores -->
        <div class="mb-6">
          <h3 class="font-semibold text-lg mb-2">Color</h3>
          <div class="flex gap-2">
            <span
              v-for="color in product.colors || []"
              :key="color"
              @click="selectedColor = color"
              :style="{ backgroundColor: color }"
              :class="[
                'w-8 h-8 rounded-full border cursor-pointer transition',
                selectedColor === color
                  ? 'ring-2 ring-[#2b84ff]'
                  : 'hover:scale-110',
              ]"
            ></span>
          </div>
        </div>

        <!-- Cantidad -->
        <div class="mb-6 flex items-center gap-4">
          <button
            @click="quantity > 1 ? quantity-- : null"
            class="px-3 py-1 border rounded"
          >
            -
          </button>
          <span class="text-lg font-semibold">{{ quantity }}</span>
          <button @click="quantity++" class="px-3 py-1 border rounded">+</button>
        </div>

        <!-- Botones -->
        <div class="flex gap-4 mt-6">
          <button
            @click="handleAddToCart"
            class="px-6 py-3 bg-[#2b84ff] text-white rounded-xl shadow hover:bg-[#1a6fe0] transition"
          >
            Agregar al carrito
          </button>
          <button
            class="px-6 py-3 border rounded-xl hover:bg-gray-100 transition"
            @click="handleBuyNow"
          >
            Comprar ahora
          </button>
        </div>

        <!-- Tabs -->
        <div class="mt-8">
          <div class="flex gap-6 border-b pb-2">
            <button
              @click="activeTab = 'desc'"
              :class="[
                'font-semibold',
                activeTab === 'desc' ? 'text-[#2b84ff]' : 'text-gray-500',
              ]"
            >
              Descripción
            </button>
            <button
              @click="activeTab = 'care'"
              :class="[
                'font-semibold',
                activeTab === 'care' ? 'text-[#2b84ff]' : 'text-gray-500',
              ]"
            >
              Cuidados
            </button>
          </div>
          <div class="mt-4 text-gray-600">
            <p v-if="activeTab === 'desc'">{{ product.longDescription }}</p>
            <p v-else>{{ product.care }}</p>
          </div>
        </div>

        <!-- Carrito actual -->
        <div class="mt-12 border-t pt-6">
          <h3 class="font-bold text-lg mb-4">Carrito actual</h3>
          <div v-if="cart.length" class="space-y-2">
            <div
              v-for="(item, i) in cart"
              :key="i"
              class="flex justify-between items-center border p-2 rounded"
            >
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <button
                @click="removeFromCart(i)"
                class="text-red-500 text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
          <p v-else class="text-gray-500">Tu carrito está vacío.</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-600 py-20">
      Producto no encontrado 😢
    </div>

    <div>
      <ProductGrid />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCart } from "@/composables/useCart"
import { getProductById } from "@/services/product.service"
import ProductGrid from "../productGrid/ProductGrid.vue"

const route = useRoute()
const router = useRouter()
const { cart, addToCart, removeFromCart } = useCart()

const product = ref(null)
const mainImage = ref("")
const selectedSize = ref(null)
const selectedColor = ref(null)
const quantity = ref(1)
const activeTab = ref("desc")

onMounted(async () => {
  const id = Number(route.params.id)
  const { data, error } = await getProductById(id)
  if (error) {
    console.error("❌ Error al obtener producto:", error.message)
    return
  }
  product.value = data
  mainImage.value = data.image || ""
})

// 👉 Lógica de botones
function handleAddToCart() {
  if (!product.value) return
  addToCart({
    ...product.value,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
  })
}

function handleBuyNow() {
  handleAddToCart()
  router.push("/verificar")
}
</script>