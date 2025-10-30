<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Productos</h2>

    <!-- Botón crear producto -->
    <button
      @click="openModal()"
      class="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
    >
      Nuevo Producto
    </button>

    <!-- Tabla productos -->
    <table class="w-full text-left border border-gray-200 bg-white rounded-lg overflow-hidden">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3">ID</th>
          <th class="px-4 py-3">Nombre</th>
          <th class="px-4 py-3">Precio</th>
          <th class="px-4 py-3">Categoría</th>
          <th class="px-4 py-3">Imagen</th>
          <th class="px-4 py-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
          class="border-t hover:bg-gray-50 transition"
        >
          <td class="px-4 py-3">{{ product.id }}</td>
          <td class="px-4 py-3">{{ product.name }}</td>
          <td class="px-4 py-3">$ {{ product.price?.toLocaleString() }}</td>
          <td class="px-4 py-3">{{ product.category }}</td>
          <td class="px-4 py-3">
            <img
              v-if="product.image"
              :src="product.image"
              alt="imagen"
              class="w-12 h-12 rounded object-cover"
            />
          </td>
          <td class="px-4 py-3 text-center space-x-2">
            <button
              @click="openModal(product)"
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

    <!-- Modal Crear / Editar -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 class="text-xl font-semibold mb-4">
          {{ selectedProduct ? "Editar Producto" : "Nuevo Producto" }}
        </h3>

        <form @submit.prevent="saveProduct" class="space-y-4">
          <!-- Datos principales -->
          <input v-model="form.ref" type="text" placeholder="Referencia" class="border w-full p-2 rounded" />
          <input v-model="form.name" type="text" placeholder="Nombre" class="border w-full p-2 rounded" required />
          
          <div class="grid grid-cols-2 gap-2">
            <input v-model.number="form.price" type="number" placeholder="Precio actual" class="border p-2 rounded" required />
            <input v-model.number="form.oldPrice" type="number" placeholder="Precio anterior" class="border p-2 rounded" />
          </div>

          <div class="grid grid-cols-3 gap-2">
            <input v-model.number="form.savings" type="number" placeholder="Ahorro" class="border p-2 rounded" />
            <input v-model.number="form.discount" type="number" placeholder="Descuento (%)" class="border p-2 rounded" />
            <input v-model="form.category" type="text" placeholder="Categoría" class="border p-2 rounded" />
          </div>

          <textarea v-model="form.description" placeholder="Descripción corta" class="border w-full p-2 rounded"></textarea>
          <textarea v-model="form.longDescription" placeholder="Descripción larga" class="border w-full p-2 rounded"></textarea>
          <textarea v-model="form.care" placeholder="Cuidados del producto" class="border w-full p-2 rounded"></textarea>

          <!-- Colores -->
          <div>
            <label class="font-semibold">Colores</label>
            <div class="flex flex-wrap gap-2 mt-1">
              <input
                v-for="(color, index) in form.colors"
                :key="index"
                v-model="form.colors[index]"
                placeholder="Ej: Rojo"
                class="border p-1 rounded"
              />
              <button
                type="button"
                @click="form.colors.push('')"
                class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                + Agregar
              </button>
            </div>
          </div>

          <!-- Imagen principal -->
          <div>
            <label class="font-semibold">Imagen principal</label>
            <input type="file" @change="handleMainImageUpload" accept="image/*" class="border w-full p-2 rounded" />
            <img v-if="previewMainImage" :src="previewMainImage" class="w-32 h-32 object-cover rounded mt-2" />
          </div>

          <!-- Imágenes adicionales -->
          <div>
            <label class="font-semibold">Imágenes adicionales (máx. 3)</label>
            <input
              type="file"
              multiple
              @change="handleExtraImagesUpload"
              accept="image/*"
              class="border w-full p-2 rounded"
            />
            <div class="flex gap-3 mt-2">
              <img
                v-for="(img, index) in previewExtraImages"
                :key="index"
                :src="img"
                class="w-20 h-20 object-cover rounded"
              />
            </div>
          </div>

          <!-- Tabla de stock -->
          <div>
            <label class="font-semibold">Stock por talla</label>
            <table class="w-full border mt-2">
              <thead class="bg-gray-100">
                <tr>
                  <th class="p-2 text-left">Talla</th>
                  <th class="p-2 text-left">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in stock" :key="index">
                  <td class="p-2">
                    <input type="text" v-model="item.size" placeholder="Ej: 2-4" class="border p-1 rounded w-24" />
                  </td>
                  <td class="p-2">
                    <input type="number" v-model.number="item.quantity" class="border p-1 rounded w-24" />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              @click="addStockRow"
              class="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              + Agregar talla
            </button>
          </div>

          <!-- Botones -->
          <div class="flex justify-end space-x-2 pt-2">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
            >
              {{ loading ? "Guardando..." : "Guardar" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient";

const products = ref([]);
const showModal = ref(false);
const selectedProduct = ref(null);
const loading = ref(false);

const form = ref({
  ref: "",
  name: "",
  price: "",
  oldPrice: "",
  savings: "",
  discount: "",
  category: "",
  description: "",
  longDescription: "",
  care: "",
  image: "",
  colors: [],
  gallery: [],
});

const stock = ref([]);
const previewMainImage = ref(null);
const previewExtraImages = ref([]);

let mainImageFile = null;
let extraImageFiles = [];

async function fetchProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (!error) products.value = data;
}

function openModal(product = null) {
  selectedProduct.value = product;
  form.value = product
    ? { ...product, colors: product.colors || [] }
    : { ref: "", name: "", price: "", oldPrice: "", savings: "", discount: "", category: "", description: "", longDescription: "", care: "", image: "", colors: [], gallery: [] };

  previewMainImage.value = product?.image || null;
  previewExtraImages.value = Array.isArray(product?.gallery) ? product.gallery : [];

  stock.value = [{ size: "", quantity: 0 }];
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedProduct.value = null;
}

function addStockRow() {
  stock.value.push({ size: "", quantity: 0 });
}

function handleMainImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  mainImageFile = file;
  previewMainImage.value = URL.createObjectURL(file);
}

function handleExtraImagesUpload(e) {
  const files = Array.from(e.target.files).slice(0, 3);
  extraImageFiles = files;
  previewExtraImages.value = files.map((f) => URL.createObjectURL(f));
}

async function saveProduct() {
  loading.value = true;
  let imageUrl = form.value.image;
  const extraUrls = [];

  // Subir imagen principal
  if (mainImageFile) {
    const fileName = `main/${Date.now()}-${mainImageFile.name}`;
    await supabase.storage.from("products").upload(fileName, mainImageFile, { upsert: true });
    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    imageUrl = data.publicUrl;
  }

  // Subir galería
  for (const file of extraImageFiles) {
    const fileName = `gallery/${Date.now()}-${file.name}`;
    await supabase.storage.from("products").upload(fileName, file, { upsert: true });
    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    extraUrls.push(data.publicUrl);
  }

  const productData = { ...form.value, image: imageUrl, gallery: extraUrls };

  if (selectedProduct.value) {
    await supabase.from("products").update(productData).eq("id", selectedProduct.value.id);
  } else {
    await supabase.from("products").insert([productData]);
  }

  loading.value = false;
  closeModal();
  fetchProducts();
}

async function deleteProduct(id) {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
  await supabase.from("products").delete().eq("id", id);
  fetchProducts();
}

onMounted(fetchProducts);
</script>