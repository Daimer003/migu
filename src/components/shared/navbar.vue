<template>
    <header class="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 text-2xl font-bold">
          <img src="/assets/logo-migu.webp" alt="Logo migu" class="w-[80px]" />
        </router-link>
  
        <!-- Navigation Links -->
        <nav class="hidden md:flex space-x-6 text-gray-700 text-sm font-medium">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="hover:text-teal-700 underline underline-offset-4 decoration-2 decoration-transparent hover:decoration-teal-600 transition"
            :class="{ 'text-teal-700 decoration-teal-600': isActive(link.to) }"
          >
            {{ link.name }}
          </router-link>
        </nav>
  
        <!-- Icons -->
        <div class="flex items-center space-x-4 text-teal-800">
          <MagnifyingGlassIcon class="w-5 h-5 cursor-pointer" />
          <ShoppingCartIcon class="w-5 h-5 cursor-pointer" />
          <UserCircleIcon class="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
  
  const route = useRoute()
  const isActive = (path) => route.path === path
  
  const links = [
    { name: 'Home', to: '/' },
    { name: 'Videos', to: '/videos' },
    { name: 'Colección', to: '/coleccion' },
    { name: 'Sobre nosotros', to: '/sobre-nosotros' },
    { name: 'Contáctanos', to: '/contactanos' }
  ]
  </script>