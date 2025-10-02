<template>
  <section class="py-16 px-6 mt-30">
    <div class="max-w-[1900px] mx-auto">
      <h1 class="text-3xl font-bold text-center mb-12">Videos MiGÚ</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="i in 6" 
          :key="i" 
          class="bg-white  shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
        >
          <div class="aspect-video bg-gray-300"></div>
          <div class="p-4">
            <h2 class="text-lg font-semibold text-gray-800">Video {{ i }}</h2>
            <p class="text-sm text-gray-600 mt-1">
              Descripción del video.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>