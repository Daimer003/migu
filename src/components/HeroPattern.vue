<template>
  <div class="flex relative justify-center items-center w-full rounded-2xl min-h-[400px]">
    <div class="absolute   grid grid-cols-3 gap-5">

      <!-- Azul con curva rosa -->
      <svg viewBox="0 0 100 100" class="w-64 h-64">
        <rect width="100" height="100" fill="#2b84ff" />
        <path d="M10 60 C30 10, 70 10, 90 60" stroke="#ff6ec7" stroke-width="10" fill="none" stroke-linecap="round"/>
      </svg>

      <!-- Verde con flor azul -->
      <svg viewBox="0 0 100 100" class="w-64 h-64">
        <rect width="100" height="100" fill="#d7f04f"/>
        <g class="spin-slow" transform="translate(50,50)">
          <g v-for="i in 6" :key="i" :transform="`rotate(${(i-1)*60})`">
            <ellipse cx="25" cy="0" rx="10" ry="18" fill="#2b84ff"/>
          </g>
          <circle r="12" fill="#ff93c9"/>
        </g>
      </svg>

      <!-- Rojo con semicírculo -->
      <svg viewBox="0 0 100 100" class="w-64 h-64">
        <rect width="100" height="100" fill="#ff3b2e"/>
        <circle cx="65" cy="50" r="25" fill="#ff93c9"/>
      </svg>

      <!-- Azul Z -->
      <svg viewBox="0 0 100 100" class="w-64 h-64">
        <rect width="100" height="100" fill="#2b84ff"/>
        <path d="M20 25 L80 25 L20 75 L80 75" fill="#fff7ef"/>
      </svg>

      <!-- Verde con flor roja -->
      <svg viewBox="0 0 100 100" class="w-64 h-64">
        <rect width="100" height="100" fill="#d7f04f"/>
        <g class="spin-reverse" transform="translate(50,50)">
          <g v-for="i in 6" :key="i" :transform="`rotate(${(i-1)*60})`">
            <ellipse cx="22" cy="0" rx="8" ry="16" fill="#ff3b2e"/>
          </g>
          <circle r="10" fill="#ff93c9"/>
        </g>
      </svg>

      <!-- Amarillo sólido -->
      <svg viewBox="0 0 100 100" class="w-64 h-64">
        <rect width="100" height="100" fill="#d7f04f"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin-slow { from { transform: rotate(0deg);} to {transform: rotate(360deg);} }
@keyframes spin-reverse { from { transform: rotate(360deg);} to {transform: rotate(0deg);} }

.spin-slow { animation: spin-slow 10s linear infinite; transform-origin: center; }
.spin-reverse { animation: spin-reverse 12s linear infinite; transform-origin: center; }
</style>