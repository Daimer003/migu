<template>
  <header class="bg-white shadow-md fixed top-0 left-0 w-full z-50">
    <div class="flex w-full max-w-[1900px] mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-2 text-2xl font-bold">
        <img src="/assets/logo-migu.webp" alt="Logo migu" class="w-[80px]" />
      </router-link>

      <!-- Navigation Links -->
      <nav class="hidden md:flex space-x-6 text-gray-700 text-sm font-medium">
        <router-link v-for="link in links" :key="link.to" :to="link.to"
          class="hover:text-teal-700 underline underline-offset-4 decoration-2 decoration-transparent hover:decoration-teal-600 transition"
          :class="{ 'text-teal-700 decoration-teal-600': isActive(link.to) }">
          {{ link.name }}
        </router-link>
      </nav>

      <!-- Icons -->
      <div class="flex items-center space-x-4 text-teal-800">
        <div class="relative" @click="push('/buscar')">
          <MagnifyingGlassIcon class="w-5 h-5 cursor-pointer" />
        </div>
        <div class="relative">
          <ShoppingCartIcon class="w-5 h-5 cursor-pointer" @click="cartSidebar?.openCart()" />
          <span v-if="cart.length > 0"
            class="absolute justify-center items-center w-[18px] h-[18px] -top-3 -right-3 bg-red-500 text-white text-center text-xs px-2 py-1 rounded-full">
            {{ cart.length }}
          </span>
        </div>
        <div class="relative" @click="push('/perfil')">
          <UserCircleIcon class="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </div>

    <CartSidebar ref="cartSidebar" />
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { useCart } from "@/composables/useCart"
import CartSidebar from '@/CartSidebar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const route = useRoute()
const { push } = useRouter()

const isActive = (path) => route.path === path

const { cart } = useCart()
const cartSidebar = ref(null)

const links = [
  { name: 'Home', to: '/' },
  { name: 'Videos', to: '/videos' },
  { name: 'Colección', to: '/coleccion' },
  { name: 'Sobre nosotros', to: '/sobre-nosotros' },
  { name: 'Contáctanos', to: '/contactanos' }
]
</script>