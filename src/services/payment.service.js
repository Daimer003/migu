import { supabase } from "@/lib/supabaseClient"

// Función para procesar una compra utilizando una función almacenada en Supabase
export const processPurchase = async (_, { userId, total, items }) => {
  try {
    const { data, error } = await supabase.rpc("process_purchase_transaction", {
      p_user_id: userId,
      p_total_amount: total,
      p_items: items, // JSON con los productos comprados
    })

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error("Error en processPurchase:", error.message)
    return { success: false, error }
  }
}

/**
 * Registra una transacción de compra
 * @param {Object} paymentData
 * @param {Array} paymentData.items - Productos del carrito [{ product_id, size, quantity, price }]
 * @param {String} paymentData.method - Método de pago (ej. 'wompi', 'payu', 'efectivo')
 * @param {Number} paymentData.total - Total de la compra
 */
export const createPayment = async (paymentData) => {
  const { items, method, total } = paymentData

  try {
    // Iniciamos una transacción simulada (Supabase no soporta BEGIN/COMMIT desde el cliente)
    // Así que usamos lógica secuencial con rollback manual en caso de error

    // 1️⃣ Crear registro principal en "payments"
    const { data: payment, error: paymentError } = await supabase
      .from("pagos")
      .insert([
        {
          total,
          method,
          status: "pending",
          created_at: new Date(),
        },
      ])
      .select()
      .single()

    if (paymentError) throw new Error(paymentError.message)

    // 2️⃣ Crear items del pago
    const paymentItems = items.map((item) => ({
      payment_id: payment.id,
      product_id: item.product_id,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
    }))

    const { error: itemsError } = await supabase
      .from("payment_items")
      .insert(paymentItems)

    if (itemsError) {
      // rollback manual — eliminamos el registro principal
      await supabase.from("payments").delete().eq("id", payment.id)
      throw new Error(itemsError.message)
    }

    // (El trigger descontará automáticamente el stock)
    return { success: true, paymentId: payment.id }

  } catch (error) {
    console.error("❌ Error en createPayment:", error.message)
    return { success: false, error: error.message }
  }
}

