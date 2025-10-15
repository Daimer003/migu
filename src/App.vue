<script setup>
import Layout from './components/layout/Layout.vue';
import Toast from './components/ui/Toast.vue';
import { ref, provide } from 'vue';

const toastRef = ref(null)
provide('toast', toastRef)
</script>

<template>
  <Layout>
      <Toast ref="toastRef" />
    <router-view />
  </Layout>
</template>
