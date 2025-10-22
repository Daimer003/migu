<template>
  <div
    class="backdrop-blur-md bg-white/10 text-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl max-w-[700px] w-full mx-auto shadow-2xl"
  >
    <h2
      class="text-2xl sm:text-3xl md:text-4xl text-black font-extrabold mb-3 text-center leading-tight"
    >
      Arma la palabra <span class="text-[#2b84ff]">MIGÚ</span>
    </h2>

    <p class="text-sm sm:text-base md:text-lg text-black text-center mb-8 opacity-80">
      Arrastra las piezas hacia los recuadros para formar
      <strong>MIGÚ</strong> y
      <span class="font-bold text-[#2b84ff]">descubre si ganas un descuento</span>.
    </p>

    <!-- Letras desordenadas -->
    <div
      class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 justify-items-center mb-10"
    >
      <div
        v-for="(piece, index) in shuffledPieces"
        :key="index"
        class="text-3xl sm:text-4xl md:text-5xl font-extrabold flex justify-center items-center rounded-xl cursor-grab select-none transition-transform duration-200 hover:scale-110 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
        draggable="true"
        :style="{ backgroundColor: piece.color }"
        @dragstart="onDragStart(piece)"
      >
        {{ piece.letter }}
      </div>
    </div>

    <!-- Zona para ordenar -->
    <div
      class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 justify-items-center mb-6"
    >
      <div
        v-for="(slot, index) in slots"
        :key="'slot-' + index"
        class="border-2 border-dashed border-gray-400 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center rounded-xl text-base sm:text-lg font-bold transition-all duration-200 hover:border-[#2b84ff]"
        @dragover.prevent
        @drop="onDrop(index)"
      >
        <span
          v-if="slot"
          class="text-3xl sm:text-4xl font-extrabold"
          :style="{ color: slot.color }"
        >
          {{ slot.letter }}
        </span>
        <span v-else class="text-gray-400 text-xs sm:text-sm text-center px-1">
          Coloca aquí
        </span>
      </div>
    </div>

    <!-- Botón de reinicio -->
    <div class="text-center">
      <button
        @click="resetGame"
        class="bg-[#2b84ff] hover:bg-[#1a63cc] px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white text-sm sm:text-base font-semibold transition-all duration-200"
      >
        Reiniciar
      </button>
    </div>

    <!-- Mensaje -->
    <p
      v-if="message"
      class="mt-6 text-center text-sm sm:text-base md:text-lg text-black font-semibold px-4"
      :class="{
        'text-green-600': message.includes('¡Felicidades!'),
        'text-red-600': message.includes('inténtalo de nuevo'),
      }"
    >
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const pieces = [
  { letter: "M", color: "#2b84ff" },
  { letter: "I", color: "#d7f04f" },
  { letter: "G", color: "#ff3b2e" },
  { letter: "Ú", color: "#2b84ff" },
];

const shuffledPieces = ref([...pieces].sort(() => Math.random() - 0.5));
const slots = ref([null, null, null, null]);
const draggedPiece = ref(null);
const message = ref("");

function onDragStart(piece) {
  draggedPiece.value = piece;
}

function onDrop(index) {
  if (!draggedPiece.value) return;
  if (slots.value[index]) return;

  slots.value[index] = draggedPiece.value;
  shuffledPieces.value = shuffledPieces.value.filter(
    (p) => p.letter !== draggedPiece.value.letter
  );
  draggedPiece.value = null;
  checkWord();
}

function checkWord() {
  const word = slots.value.map((s) => (s ? s.letter : "")).join("");
  if (word.length < 4) {
    message.value = "Faltan piezas o están en el orden incorrecto.";
    return;
  }

  if (word === "MIGÚ") {
    const gana = Math.random() < 0.3;
    if (gana) {
      const descuento = [5, 10, 15, 20][Math.floor(Math.random() * 4)];
      message.value = `🎉 ¡Felicidades! Ganaste un descuento del ${descuento}% en tu próxima compra.`;
    } else {
      message.value =
        "🎯 ¡Correcto! Has armado MIGÚ, pero esta vez no ganaste. ¡Inténtalo de nuevo!";
    }
  } else {
    message.value = "❌ Orden incorrecto, inténtalo de nuevo.";
  }
}

function resetGame() {
  shuffledPieces.value = [...pieces].sort(() => Math.random() - 0.5);
  slots.value = [null, null, null, null];
  message.value = "";
}
</script>