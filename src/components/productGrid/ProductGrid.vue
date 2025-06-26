<template>
    <section class="p-6 bg-gray-100 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-6 text-center">Nuestros Productos</h2>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="(product, index) in products"
            :key="index"
            class="bg-white shadow-md rounded-2xl overflow-hidden transition hover:shadow-xl hover:scale-[1.02] duration-300"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-58 object-cover"
            />
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-[#debcc2]">${{ product.price }}</span>
                <button class="bg-[#debcc2] text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700 transition">
                  Ver más
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const products = [
    {
      name: 'Producto 1',
      description: 'Descripción breve del producto.',
      price: '29.99',
      image: '/assets/producto-1.webp',
    },
    {
      name: 'Producto 2',
      description: 'Otra descripción breve.',
      price: '49.99',
      image: '/assets/producto-1.webp',
    },
    {
      name: 'Producto 3',
      description: 'Descripción interesante.',
      price: '19.99',
      image: '/assets/producto-1.webp',
    },
    {
      name: 'Producto 4',
      description: 'Detalles atractivos del producto.',
      price: '39.99',
      image: '/assets/producto-1.webp',
    },
    // Puedes agregar más productos aquí
  ]
  </script>
  
  <style scoped>
  /* Opcional: puedes añadir animaciones o estilos más personalizados aquí */
  </style>