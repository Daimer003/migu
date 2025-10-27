import { ref, computed, watch } from "vue"

const cart = ref(JSON.parse(localStorage.getItem("cart")) || [])

export function useCart() {
  // Calcular total redondeado sin decimales
const total = computed(() =>
  Math.round(
    cart.value.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0)
  )
)

  // Guardar en localStorage cada vez que cambia el carrito
  watch(
    cart,
    (newCart) => {
      localStorage.setItem("cart", JSON.stringify(newCart))
    },
    { deep: true }
  )

  // Agregar producto (distinguiendo talla y color)
  function addToCart(product) {
    const existing = cart.value.find(
      (item) =>
        item.id === product.id &&
        item.size === product.size &&
        item.color === product.color
    )

    if (existing) {
      existing.quantity += product.quantity || 1 // suma si ya existe
    } else {
      cart.value.push({ ...product, quantity: product.quantity || 1 })
    }
  }

  // Incrementar cantidad (+)
  function increment(product) {
    const existing = cart.value.find(
      (item) =>
        item.id === product.id &&
        item.size === product.size &&
        item.color === product.color
    )
    if (existing) existing.quantity++
  }

  // Decrementar cantidad (-)
  function decrement(product) {
    const existing = cart.value.find(
      (item) =>
        item.id === product.id &&
        item.size === product.size &&
        item.color === product.color
    )
    if (existing) {
      if (existing.quantity > 1) existing.quantity--
      else removeFromCart(product)
    }
  }

  // Actualizar cantidad manualmente (input)
  function updateQuantity(product, newQuantity) {
    const existing = cart.value.find(
      (item) =>
        item.id === product.id &&
        item.size === product.size &&
        item.color === product.color
    )
    if (existing) {
      existing.quantity = Math.max(1, newQuantity)
    }
  }

  // Eliminar producto (según talla y color)
  function removeFromCart(product) {
    cart.value = cart.value.filter(
      (item) =>
        !(
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
        )
    )
  }

  // Vaciar carrito completamente
  function clearCart() {
    cart.value = []
    localStorage.removeItem("cart")
  }

  return {
    cart,
    total,
    addToCart,
    increment,
    decrement,
    updateQuantity,
    removeFromCart,
    clearCart,
  }
}