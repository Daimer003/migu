<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Productos</h2>

    <table class="w-full text-left border border-gray-200 bg-white rounded-lg overflow-hidden">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3">ID</th>
          <th class="px-4 py-3">Nombre</th>
          <th class="px-4 py-3">Precio</th>
          <th class="px-4 py-3">Stock</th>
          <th class="px-4 py-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index" class="border-t">
          <td class="px-4 py-3">{{ product.id }}</td>
          <td class="px-4 py-3">{{ product.name }}</td>
          <td class="px-4 py-3">$ {{ product.price.toLocaleString() }}</td>
          <td class="px-4 py-3">{{ product.stock }}</td>
          <td class="px-4 py-3 text-center space-x-2">
            <button
              @click="editProduct(product)"
              class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Editar
            </button>
            <button
              @click="deleteProduct(product.id)"
              class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "@/lib/supabaseClient"

const products = ref([])

async function fetchProducts() {
  const { data, error } = await supabase.from("products").select("*")
  if (!error) products.value = data
}

async function deleteProduct(id) {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return
  await supabase.from("products").delete().eq("id", id)
  fetchProducts()
}

function editProduct(product) {
  alert(`Editar producto: ${product.name}`)
}

onMounted(fetchProducts)
</script>