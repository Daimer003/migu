<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Órdenes del día</h2>

    <!-- Filtros -->
    <div class="flex items-center gap-4 mb-4">
      <input type="date" v-model="selectedDate" class="border px-3 py-2 rounded-md" />
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

    <!-- Tabla -->
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
          class="border-t hover:bg-gray-50 transition cursor-pointer"
          @click="openOrderModal(order)"
        >
          <td class="px-4 py-3">{{ order.id }}</td>
          <td class="px-4 py-3">{{ order.customer_name }}</td>
          <td class="px-4 py-3">{{ new Date(order.created_at).toLocaleString() }}</td>
          <td class="px-4 py-3">
            <span
              :class="{
                'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md': order.status === 'pending',
                'text-green-700 bg-green-100 px-2 py-1 rounded-md': order.status === 'approve',
                'text-gray-700 bg-gray-100 px-2 py-1 rounded-md':
                  !['pending', 'approve'].includes(order.status)
              }"
            >
              {{ order.status }}
            </span>
          </td>
          <td class="px-4 py-3 text-blue-500 underline">Ver productos</td>
        </tr>

        <tr v-if="filteredOrders.length === 0">
          <td colspan="5" class="text-center py-4 text-gray-500">
            No hay órdenes para esta fecha o cliente.
          </td>
        </tr>
      </tbody>
    </table>

    <!--  Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-white/80 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h3 class="text-xl font-semibold mb-4">
          Detalle de la orden #{{ selectedOrder?.id }}
        </h3>

        <!--  Datos del cliente -->
        <div v-if="selectedOrder?.cliente" class="mb-6 border rounded-md p-4 bg-gray-50">
          <h4 class="text-lg font-semibold mb-3">Datos del cliente</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            <p><strong>Nombre:</strong> {{ selectedOrder.cliente.nombre }}</p>
            <p><strong>Documento:</strong> {{ selectedOrder.cliente.numero_documento || 'N/A' }}</p>
            <p><strong>Email:</strong> {{ selectedOrder.cliente.email || 'N/A' }}</p>
            <p><strong>Teléfono:</strong> {{ selectedOrder.cliente.telefono || 'N/A' }}</p>
            <p><strong>Dirección:</strong> {{ selectedOrder.cliente.direccion || 'N/A' }}</p>
            <p><strong>Ciudad:</strong> {{ selectedOrder.cliente.ciudad || 'N/A' }}</p>
            <p><strong>País:</strong> {{ selectedOrder.cliente.pais || 'N/A' }}</p>
            <p><strong>Código Postal:</strong> {{ selectedOrder.cliente.postal_code || 'N/A' }}</p>
          </div>
        </div>

        <!--  Información de pago -->
        <div class="mb-6 border rounded-md p-4 bg-gray-50">
          <h4 class="text-lg font-semibold mb-3">Información de pago</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            <p><strong>Estado:</strong> {{ selectedOrder.status }}</p>
            <p><strong>Fecha:</strong> {{ new Date(selectedOrder.created_at).toLocaleString() }}</p>
            <p><strong>Total:</strong> ${{ selectedOrder.total?.toLocaleString() || 0 }}</p>
            <p><strong>Método de pago:</strong> {{ selectedOrder.metodo_pago || 'No especificado' }}</p>
          </div>
        </div>

        <!--  Productos -->
        <h4 class="text-lg font-semibold mb-3">Productos</h4>
        <template v-if="loadingItems">
          <div class="text-center text-gray-500 py-6">Cargando productos...</div>
        </template>

        <template v-else-if="orderItems.length > 0">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto">
            <div
              v-for="item in orderItems"
              :key="item.id"
              class="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-gray-50"
            >
              <img
                :src="item.image"
                alt="Imagen del producto"
                class="w-full max-w-[120px] h-auto object-cover rounded-md mb-3"
              />
              <div class="flex justify-between items-center mb-1">
                <h4 class="font-semibold text-lg">{{ item.product_name }}</h4>
                <span class="text-sm text-gray-600">x{{ item.quantity }}</span>
              </div>
              <p class="text-sm text-gray-500">Talla: {{ item.size || 'N/A' }}</p>
              <p class="text-sm text-gray-500">Precio: ${{ item.unit_price }}</p>
              <p class="text-sm font-semibold mt-2">
                Subtotal: ${{ (item.subtotal).toLocaleString() }}
              </p>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="text-center text-gray-500 py-6">
            No hay productos en esta orden.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient";

const orders = ref([]);
const selectedDate = ref(new Date().toISOString().slice(0, 10));
const searchClient = ref("");

const showModal = ref(false);
const selectedOrder = ref(null);
const orderItems = ref([]);
const loadingItems = ref(false);

// Cargar órdenes del día
async function fetchOrders() {
  const startOfDay = new Date(selectedDate.value);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDate.value);
  endOfDay.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from("pagos")
    .select(`
      id,
      status,
      created_at,
      clientes (
        id,
        nombre,
        email,
        telefono,
        direccion,
        ciudad,
        postal_code,
        pais,
        numero_documento
      )
    `)
    .gte("created_at", startOfDay.toISOString())
    .lte("created_at", endOfDay.toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando órdenes:", error);
    return;
  }

  orders.value = data.map((order) => ({
    id: order.id,
    status: order.status,
    created_at: order.created_at,
    total: order.total,
    metodo_pago: order.metodo_pago,
    cliente: order.clientes,
    customer_name: order.clientes?.nombre || "Cliente desconocido",
  }));
}

//  Filtro por cliente
const filteredOrders = computed(() => {
  if (!searchClient.value.trim()) return orders.value;
  return orders.value.filter((o) =>
    o.customer_name.toLowerCase().includes(searchClient.value.trim().toLowerCase())
  );
});

//  Abrir modal con productos
async function openOrderModal(order) {
  selectedOrder.value = order;
  showModal.value = true;
  loadingItems.value = true;

  const { data, error } = await supabase
    .from("payment_items")
    .select(`
      id,
      quantity,
      unit_price,
      subtotal,
      size,
      products ( name, image )
    `)
    .eq("payment_id", order.id);

  if (error) {
    console.error("Error cargando items:", error);
    orderItems.value = [];
  } else {
    orderItems.value = data.map((item) => ({
      id: item.id,
      product_name: item.products?.name || "Sin nombre",
      image: item.products?.image || "/placeholder.png",
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.subtotal,
      size: item.size,
    }));
  }

  loadingItems.value = false;
}

//  Cerrar modal
function closeModal() {
  showModal.value = false;
  selectedOrder.value = null;
  orderItems.value = [];
}

onMounted(fetchOrders);
</script>

<style scoped>
.bg-white\/50 {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>