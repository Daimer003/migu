<template>
    <div class="min-h-screen bg-white p-8">
      <h1 class="text-3xl font-bold text-center mb-6">Nuestra Colección</h1>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="bg-white rounded-xl border shadow p-4 hover:scale-105 transition-transform">
          <div class="h-40 bg-gray-100 rounded-lg mb-2"></div>
          <h2 class="text-lg font-medium text-center">Producto {{ i }}</h2>
        </div>
      </div>
    </div>
  </template>