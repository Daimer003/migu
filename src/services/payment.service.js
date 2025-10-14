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
 * @param {Number} paymentData.amount - Total de la compra
 * @param {String} paymentData.reference - Referencia
 * @param {String} paymentData.idTransaccion - id_transaccion
 */
export const createPayment = async (paymentData) => {
  const {  amount, reference, idTransaccion } = paymentData
  try {
    // Iniciamos una transacción simulada (Supabase no soporta BEGIN/COMMIT desde el cliente)
    // Así que usamos lógica secuencial con rollback manual en caso de error
    console.log("Iniciando creación de pago...")
    // Crear registro principal en "payments"
    const { data: payment, error: paymentError } = await supabase
      .from("pagos")
      .insert([
        {
          id_transaccion: idTransaccion,
          reference: reference,
          amount,
          status: "pending",
          created_at: new Date(),
        },
      ])
      .select()
      .single()

    if (paymentError) throw new Error(paymentError.message)


    // (El trigger descontará automáticamente el stock)
    return { success: true, paymentId: payment.id }

  } catch (error) {
    console.error("Error en createPayment:", error.message)
    return { success: false, error: error.message }
  }
}

