<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Órdenes del día</h2>

    <!-- 🔍 Filtros -->
    <div class="flex items-center gap-4 mb-4">
      <input
        type="date"
        v-model="selectedDate"
        class="border px-3 py-2 rounded-md"
      />
      <input
        type="text"
        v-model="searchClient"
        placeholder="Buscar por cliente (opcional)"
        class="border px-3 py-2 rounded-md"
      />
      <button
        @click="fetchOrders"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Buscar
      </button>
    </div>

    <!-- 📋 Tabla -->
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
        <tr
          v-for="(order, i) in filteredOrders"
          :key="i"
          class="border-t hover:bg-gray-50 transition"
        >
          <td class="px-4 py-3">{{ order.id }}</td>
          <td class="px-4 py-3">{{ order.customer_name }}</td>
          <td class="px-4 py-3">
            {{ new Date(order.created_at).toLocaleString() }}
          </td>
          <td class="px-4 py-3">
            <span
              :class="{
                'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md':
                  order.status === 'pending',
                'text-green-700 bg-green-100 px-2 py-1 rounded-md':
                  order.status === 'approve',
                'text-gray-700 bg-gray-100 px-2 py-1 rounded-md':
                  !['pending', 'approve'].includes(order.status)
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

        <tr v-if="filteredOrders.length === 0">
          <td colspan="5" class="text-center py-4 text-gray-500">
            No hay órdenes para esta fecha o cliente.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient";

const orders = ref([]);
const selectedDate = ref(new Date().toISOString().slice(0, 10));
const searchClient = ref("");

// Cargar órdenes del día
async function fetchOrders() {
  const startOfDay = new Date(selectedDate.value);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDate.value);
  endOfDay.setHours(23, 59, 59, 999);

  let query = supabase
    .from("pagos")
    .select(`
      id,
      status,
      created_at,
      cliente_id,
      clientes ( nombre ),
      payment_items!fk_payment (
        id,
        quantity,
        size,
        products!fk_product (
          name
        )
      )
    `)
    .gte("created_at", startOfDay.toISOString())
    .lte("created_at", endOfDay.toISOString())
    .order("created_at", { ascending: false });

    
    
    const { data, error } = await query;
  if (error) {
    console.error("Error cargando órdenes:", error);
    return;
  }

  // Mapear resultado con nombre del cliente y productos
  orders.value = data.map((order) => ({
    id: order.id,
    status: order.status,
    created_at: order.created_at,
    customer_name: order.clientes?.nombre || "Cliente desconocido",
    items:
      order.payment_items?.map((item) => ({
        product_name: item.products?.name || "Sin nombre",
        quantity: item.quantity,
      })) || [],
  }));
}

// Filtro por cliente (opcional)
const filteredOrders = computed(() => {
  if (!searchClient.value.trim()) return orders.value;
  return orders.value.filter((o) =>
    o.customer_name
      .toLowerCase()
      .includes(searchClient.value.trim().toLowerCase())
  );
});

onMounted(fetchOrders);
</script>