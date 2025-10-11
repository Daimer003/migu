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

