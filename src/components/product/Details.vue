<template>
  <section class="bg-[#fff9f6] min-h-screen py-12 mt-30">
    <div class="max-w-[1900px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- Imagen principal -->
      <div class="space-y-4">
        <img :src="product.image" :alt="product.name" class="w-full h-[900px] object-cover  shadow-lg" />

        <!-- Galería -->
        <div class="flex gap-4">
          <img v-for="(img, idx) in product.gallery" :key="idx" :src="img"
            class="w-24 h-24 object-cover cursor-pointer border hover:scale-105 transition"
            @click="product.image = img" />
        </div>
      </div>

      <!-- Info del producto -->
      <div class="flex flex-col justify-center">
        <h1 class="text-6xl font-bold text-[#2b2b2b] mb-4">{{ product.name }}</h1>
        <p class="text-gray-600 text-xl mb-6">{{ product.description }}</p>

        <span class="text-3xl font-bold text-[#ff4d6d] mb-6">${{ product.price }}</span>

        <!-- Tallas -->
        <div class="mb-6">
          <h3 class="font-semibold text-lg mb-2">Tallas disponibles</h3>
          <div class="flex gap-2">
            <button v-for="size in product.sizes" :key="size"
              class="px-4 py-2 border rounded-lg text-sm hover:bg-[#ff4d6d] hover:text-white transition">
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Colores -->
        <div class="mb-6">
          <h3 class="font-semibold text-lg mb-2">Colores</h3>
          <div class="flex gap-2">
            <span v-for="color in product.colors" :key="color" :style="{ backgroundColor: color }"
              class="w-8 h-8 rounded-full border cursor-pointer hover:scale-110 transition"></span>
          </div>
        </div>

        <!-- Botones -->
        <div class="flex gap-4 mt-6">
          <button @click="handleAddToCart"
            class="px-6 py-3 bg-[#2b84ff] text-white rounded-xl shadow hover:bg-[#1a6fe0] transition">
            Agregar al carrito
          </button>
          <button class="px-6 py-3 border rounded-xl hover:bg-gray-100 transition" @click="handleBuyNow">
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue"
import { useCart } from "@/composables/useCart"

const { addToCart } = useCart()

const selectedSize = ref(null)
const selectedColor = ref(null)

const product = {
  name: "Vestido Rosa",
  description: "Vestido de algodón suave y cómodo para niñas. Perfecto para ocasiones especiales o uso diario.",
  price: "39.99",
  image: "/assets/shop/migu-img-1.jpg",
  gallery: [
    "/assets/shop/migu-img-1.jpg",
    "/assets/shop/migu-img-1.jpg",
    "/assets/shop/migu-img-1.jpg",
  ],
  sizes: ["0-3m", "3-6m", "6-12m", "1-2y", "3-4y"],
  colors: ["#ff4d6d", "#2b84ff", "#10b981"],
};

// 👉 Lógica de botones
function handleAddToCart() {
  addToCart({
    ...product,
    size: selectedSize.value,
    color: selectedColor.value,
  })
}

function handleBuyNow() {
  handleAddToCart()
  // aquí puedes redirigir a checkout directo
  alert("Redirigiendo a la compra 🔥")
}
</script>