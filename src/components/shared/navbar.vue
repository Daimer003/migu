<template>
    <header class="bg-white shadow-md">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center space-x-2 text-2xl font-bold">
                <span class="text-red-500">MI</span>
                <span class="text-yellow-500">G</span>
                <span class="text-teal-600">Ú</span>
            </div>

            <!-- Navigation Links -->
            <nav class="hidden md:flex space-x-6 text-gray-700 text-sm font-medium">
                <a href="#"
                    class="hover:text-teal-700 underline underline-offset-4 decoration-2 decoration-transparent hover:decoration-teal-600">Home</a>
                <a href="#" class="hover:text-teal-700">Videos</a>
                <a href="#" class="hover:text-teal-700">Colección</a>
                <a href="#" class="hover:text-teal-700">Sobre nosotros</a>
                <a href="#" class="hover:text-teal-700">Contáctanos</a>
            </nav>

            <!-- Icons -->
            <div class="flex items-center space-x-4 text-teal-800 ">
                <MagnifyingGlassIcon class="w-5 h-5 cursor-pointer" />
                <ShoppingCartIcon class="w-5 h-5 cursor-pointer" />
                <UserCircleIcon class="w-6 h-6 cursor-pointer" />
            </div>
        </div>
    </header>
</template>

<script setup>
import { MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
</script>