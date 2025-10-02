<template>
    <div class="min-h-screen flex flex-col bg-[#fff9f6]">
        <!-- Navbar -->
        <Navbar />

        <!-- Main slot -->
        <main class="flex-1 bg-[#fff9f6]">
            <slot />
        </main>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<script setup>
import Footer from '../shared/Footer.vue';
import Navbar from '../shared/Navbar.vue';

// Nada por ahora
</script>