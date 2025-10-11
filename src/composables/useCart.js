import { ref, computed, watch } from "vue"

const cart = ref(JSON.parse(localStorage.getItem("cart")) || [])

export function useCart() {
  // Computed total
 const total = computed(() =>
  Math.round(cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0))
)

  // Guardar en localStorage cada vez que cambia el carrito
  watch(
    cart,
    (newCart) => {
      localStorage.setItem("cart", JSON.stringify(newCart))
    },
    { deep: true }
  )

  // Agregar producto
  function addToCart(product) {
    const existing = cart.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  // Eliminar un producto
  function removeFromCart(productId) {
    cart.value = cart.value.filter((item) => item.id !== productId)
  }

  // Vaciar carrito (cuando se concrete la compra)
  function clearCart() {
    cart.value = []
    localStorage.removeItem("cart")
  }

  return {
    cart,
    total,
    addToCart,
    removeFromCart,
    clearCart,
  }
}