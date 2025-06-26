<template>
    <div class="min-h-screen bg-white p-8">
      <h1 class="text-3xl font-bold text-center mb-6">Videos</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="bg-gray-100 p-4 rounded-xl shadow hover:shadow-lg transition">
          <div class="aspect-video bg-gray-300 rounded-lg mb-2"></div>
          <h2 class="text-lg font-semibold">Video {{ i }}</h2>
          <p class="text-sm text-gray-600">Descripción del video.</p>
        </div>
      </div>
    </div>
  </template>