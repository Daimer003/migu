<template>
  <section class="min-h-screen flex items-center justify-center px-6 md:px-16 bg-[#fff9f6] py-20">
    <div class="max-w-6xl w-full text-center">

      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="/assets/logo-migu.webp" alt="Logo migu" class="w-[130px]" />
      </div>

      <!-- Título -->
      <h1 class="text-4xl md:text-5xl font-extrabold text-[#ff4d6d] mb-12">
        Sobre Nosotros
      </h1>

      <!-- Contenido en columnas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

        <!-- VISIÓN -->
        <div class="bg-white shadow-md p-8 rounded-lg flex flex-col items-center">
          <div class="text-blue-500 text-6xl mb-4">👁️</div>
          <h2 class="text-2xl font-bold text-[#ff4d6d] mb-4">Visión</h2>
          <p class="text-gray-700 text-md leading-relaxed text-justify">
            Somos una marca que piensa en mejorar la calidad de vida de nuestros niños. 
            Los procesos de confección, la calidad de las telas y los diseños están destinados 
            al cuidado y protección de ellos. Más allá de vender una prenda, nos enfocamos 
            en protegerlos; el 80% de nuestros productos cuentan con características como 
            protección UV, protección antibacterial y fácil lavado.  
            Nuestras telas son resistentes al deterioro por el uso habitual y de excelente calidad.  
            <br /><br />
            A mediano plazo, también pensamos en las familias, seguros de que la solidaridad 
            fortalece y la cooperación es una de las mejores herramientas para convivir en sociedad.  
            Queremos apoyar proyectos productivos y emprendimientos de quienes con esfuerzo 
            sacan a sus hijos adelante. ¡Porque así nació MIGU!
          </p>
        </div>

        <!-- MISIÓN -->
        <div class="bg-white shadow-md p-8 rounded-lg flex flex-col items-center">
          <div class="text-pink-500 text-6xl mb-4">💫</div>
          <h2 class="text-2xl font-bold text-[#ff4d6d] mb-4">Misión</h2>
          <p class="text-gray-700 text-md leading-relaxed text-justify">
            ¡Crecer! Como marca, como emprendimiento y como sueño.  
            Cada día anhelamos vestir mejor a nuestros niños, ofrecerles protección, 
            resaltar su alegría y acompañar su crecimiento.  
            Queremos que el juego y el aprendizaje vayan de la mano con la calidad 
            y el diseño de nuestras prendas, brindando siempre comodidad, seguridad 
            y confianza a quienes más amamos.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// Este componente no necesita lógica reactiva, pero puede recibir props en el futuro.
</script>