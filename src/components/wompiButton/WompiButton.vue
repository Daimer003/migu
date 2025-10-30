<template>
  <div>
    <button v-if="widgetReady" class="bg-green-600 px-6 py-3 rounded-xl font-semibold text-white"
      @click="openWompiCheckout">
      Pagar con Wompi
    </button>

    <p v-else>Cargando pasarela de pago...</p>
  </div>
</template>

<script>
//import { createClientPay, createPayment } from '@/services/payment.service';
import { generateSignature } from '@/services/signature.service';
import { supabase } from "@/lib/supabaseClient";

export default {
  data() {
    return {
      widgetReady: false,
    };
  },

  props: {
    cart: {
      type: Array,
      required: true,
    },
    form: {
      type: Object,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
  },

  mounted() {
    // Cargar el script de Wompi dinámicamente
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    script.onload = () => {
      this.widgetReady = true;
    };
    script.onerror = () => {
      console.error('Error al cargar el script de Wompi');
    };
    document.body.appendChild(script);
  },
  methods: {
    async openWompiCheckout() {
      const reference = `ORDER-${Date.now()}`;
      const amountInCents = this.total * 100;
      const currency = "COP";

      // 1️ Generar la firma para Wompi
      const result = await generateSignature({ reference, amountInCents, currency });
      if (!result.signature || !result.publicKey) {
        throw new Error("No se pudo obtener la firma o la clave pública.");
      }

      // 2️ Crear o buscar el cliente
      const clienteId = await this.createOrGetClient(this.form);

      // 3️ Crear el pago provisional (status: pending)
      const { data: pago, error: pagoError } = await supabase
        .from("pagos")
        .insert([
          {
            id_transaccion: null,
            reference,
            amount: this.total,
            status: "pending",
            cliente_id: clienteId,
            created_at: new Date(),
          },
        ])
        .select()
        .single();

      if (pagoError) throw pagoError;

      // 4️ Insertar los productos del carrito asociados al reference
      const itemsToInsert = this.cart.map((item) => ({
        payment_id: pago.id,
        product_id: item.id,
        quantity: item.quantity,
        size: item.size,
        unit_price: item.price,
      }));

      const { error: itemsError } = await supabase.from("payment_items").insert(itemsToInsert);
      if (itemsError) throw itemsError;

      // 5️ Abrir el checkout de Wompi
      if (!window.WidgetCheckout) {
        console.error("El widget de Wompi aún no está listo.");
        return;
      }

      const checkout = new window.WidgetCheckout({
        currency,
        amountInCents,
        reference,
        publicKey: result.publicKey,
        signature: { integrity: result.signature },
        redirectUrl: "https://migu.com.co/",
        customerData: {
          fullName: this.form.name,
          email: this.form.email,
          phoneNumberPrefix: "+57",
          phoneNumber: this.form.phone,
          legalId: this.form.document,
          legalIdType: "CC",
        },
      });

      checkout.open((paymentResult) => {
        console.log("Transacción Wompi:", paymentResult);
        // No hacemos nada aquí — el webhook se encarga del resto.
      });
    },

    async createOrGetClient(form) {
      // Reutilizamos tu lógica, pero limpia y directa
      const { data: existingClient } = await supabase
        .from("clientes")
        .select("id")
        .eq("email", form.email)
        .maybeSingle();

      if (existingClient) return existingClient.id;

      const { data: newClient, error } = await supabase
        .from("clientes")
        .insert([
          {
            nombre: form.name,
            email: form.email,
            telefono: form.phone,
            direccion: form.address,
            ciudad: form.city,
            postal_code: form.postalCode,
            created_at: new Date(),
            numero_documento: form.document,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return newClient.id;
    },
  }
};
</script>