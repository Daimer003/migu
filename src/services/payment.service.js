import { supabase } from "@/lib/supabaseClient";

// Función para procesar una compra utilizando una función almacenada en Supabase
export const processPurchase = async (_, { userId, total, items }) => {
  try {
    const { data, error } = await supabase.rpc("process_purchase_transaction", {
      p_user_id: userId,
      p_total_amount: total,
      p_items: items, // JSON con los productos comprados
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error en processPurchase:", error.message);
    return { success: false, error };
  }
};

/**
 * Registra una transacción de compra
 * @param {Object} paymentData
 * @param {Array} paymentData.items - Productos del carrito [{ product_id, size, quantity, price }]
 * @param {String} paymentData.method - Método de pago (ej. 'wompi', 'payu', 'efectivo')
 * @param {Number} paymentData.amount - Total de la compra
 * @param {String} paymentData.reference - Referencia
 * @param {String} paymentData.idTransaccion - id_transaccion
 */
export const createPayment = async (paymentData, form, cart) => {
  const { amount, reference, idTransaccion } = paymentData;
  try {
    // Iniciamos una transacción
    console.log("Iniciando creación de pago...");

        // Verificar si el cliente ya existe
    const { data: existingClient } = await supabase
      .from("clientes")
      .select("id")
      .eq("email", form.email)
      .maybeSingle();

    let clienteId = existingClient?.id;

    // Crear registro principal en "payments"
    const { data: payment, error: paymentError } = await supabase
      .from("pagos")
      .insert([
        {
          id_transaccion: idTransaccion,
          reference: reference,
          amount,
          status: payment.status,
          cliente_id: clienteId,
          created_at: new Date(),
        },
      ])
      .select()
      .single();

    if (paymentError) throw new Error(paymentError.message);



    // (El trigger descontará automáticamente el stock)
    return { success: true, paymentId: payment.id, document: payment.billing_data };
  } catch (error) {
    console.error("Error en createPayment:", error.message);
    return { success: false, error: error.message };
  }
};

// Crear el cleinte para la compra
export const createClientPay = async (form, cart) => {
  try {
  
    // Verificar si el cliente ya existe
    const { data: existingClient } = await supabase
      .from("clientes")
      .select("id")
      .eq("email", form.email)
      .maybeSingle();

    let clienteId = existingClient?.id;

    // Si no existe, crear el cliente
    if (!clienteId) {
      const { data: newClient, error: clientError } = await supabase
        .from("clientes")
        .insert([
          {
            nombre: form.name,
            email: form.email,
            telefono: form.phone,
            direccion: form.address,
            ciudad: form.city,
            postal_code: form.postalCode,
          },
        ])
        .select()
        .single();

      if (clientError) throw clientError;
      clienteId = newClient.id;
    }

        // 2️ Crear los items del pago
    const itemsWithPaymentId = cart.map((item) => ({
      payment_id: payment.id,
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
      size: item.size,
      numero_documento: form.document
    }));

    const { error: itemsError } = await supabase
      .from("payment_items")
      .insert(itemsWithPaymentId);

    if (itemsError) throw itemsError;

    return clienteId
} catch (error) {
  console.log(error)
}
}