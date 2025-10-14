<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Órdenes en proceso</h2>

    <table class="w-full text-left border border-gray-200 bg-white rounded-lg overflow-hidden">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3"># Orden</th>
          <th class="px-4 py-3">Cliente</th>
          <th class="px-4 py-3">Fecha</th>
          <th class="px-4 py-3">Estado</th>
          <th class="px-4 py-3">Productos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, i) in orders" :key="i" class="border-t">
          <td class="px-4 py-3">{{ order.id }}</td>
          <td class="px-4 py-3">{{ order.customer_name }}</td>
          <td class="px-4 py-3">{{ new Date(order.created_at).toLocaleString() }}</td>
          <td class="px-4 py-3">
            <span
              :class="{
                'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md': order.status === 'pending',
                'text-green-700 bg-green-100 px-2 py-1 rounded-md': order.status === 'shipped'
              }"
            >
              {{ order.status }}
            </span>
          </td>
          <td class="px-4 py-3">
            <ul class="list-disc ml-4">
              <li v-for="(item, idx) in order.items" :key="idx">
                {{ item.product_name }} (x{{ item.quantity }})
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "@/lib/supabaseClient"

const orders = ref([])

async function fetchOrders() {
  const { data, error } = await supabase.from("pagos").select(`
    id,
    status,
    created_at,
    payment_items (
      product_id,
      quantity,
      size,
      products(name)
    )
  `)
  if (!error) {
    orders.value = data.map(o => ({
      id: o.id,
      status: o.status,
      created_at: o.created_at,
      customer_name: "Cliente ejemplo", // luego se conecta con tabla users
      items: o.payment_items.map(pi => ({
        product_name: pi.products?.name || "",
        quantity: pi.quantity
      }))
    }))
  }
}

onMounted(fetchOrders)
</script>