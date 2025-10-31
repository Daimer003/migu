<template>
  <section class="p-5 md:p-10 bg-white mt-30">
    <div class="max-w-[1900px] mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-10 text-center text-[#2b2b2b]">
        Nuestro Instagram
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="relative group overflow-hidden shadow hover:shadow-lg transition "
        >
          <!-- Imagen -->
          <img
            :src="image.url"
            :alt="'Instagram image ' + (index + 1)"
            class="w-full max-h-[350px]  object-cover transform group-hover:scale-110 transition duration-500"
          />

          <!-- Overlay Instagram style -->
          <div
            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              class="w-8 h-8"
            >
              <path
                d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.75-.88a1.13 1.13 0 1 1-2.26 0 1.13 1.13 0 0 1 2.26 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const images = [
  { url: "/assets/shop/migu-img-3.jpg" },
  { url: "/assets/shop/migu-img-4.jpg" },
  { url: "/assets/shop/migu-img-7.jpg" },
  { url: "/assets/shop/migu-img-10.jpg" },
   { url: "/assets/shop/migu-img-1.jpg" },
  { url: "/assets/shop/migu-img-6.jpg" },
  { url: "/assets/shop/migu-img-8.jpg" },
  { url: "/assets/shop/migu-img-13.jpg" },
  { url: "/assets/shop/migu-img-11.jpg" },
  { url: "/assets/shop/migu-img-12.jpg" },
    { url: "/assets/shop/migu-img-9.jpg" },
  { url: "/assets/shop/migu-img-5.jpg" },
]
</script>