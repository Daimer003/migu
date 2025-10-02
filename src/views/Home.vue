<script setup>
import BannerMigu from '@/components/BannerMigu.vue';
import FeeInstagram from '@/components/FeeInstagram.vue';
import HeroHeader from '@/components/heroHeader/HeroHeader.vue';
import Layout from '@/components/layout/Layout.vue';
import ProductGrid from '@/components/productGrid/ProductGrid.vue';
import WhatsappButton from '@/components/whatsappButton/WhatsappButton.vue';

// No se importan más HelloWorld ni TheWelcome
</script>

<template>
    <HeroHeader />
    <ProductGrid />
    <WhatsappButton />
    <BannerMigu />
    <FeeInstagram />
</template>
