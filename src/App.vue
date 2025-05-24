<script setup>
// No se importan más HelloWorld ni TheWelcome
</script>

<template>
  <div class="container">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <h1 class="title">Migu</h1>
    <p class="subtitle">¡Muy pronto tu tienda favorita online!</p>
    <p class="description">Explora, elige y compra... Todo en un solo lugar. 🚀</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f9f9f9;
}

.logo {
  margin-bottom: 2rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #000000;
}

.description {
  font-size: 1rem;
  color: #666;
}
</style>