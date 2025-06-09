<template>
    <div class="min-h-screen flex flex-col">
        <!-- Navbar -->
        <Navbar />

        <!-- Main slot -->
        <main class="flex-1">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-gray-100 py-6">
            <div class="container mx-auto px-4 text-center text-sm text-gray-500">
                © 2025 MiLanding. Todos los derechos reservados.
            </div>
        </footer>
    </div>
</template>

<script setup>
import Navbar from '../shared/navbar.vue';

// Nada por ahora
</script>