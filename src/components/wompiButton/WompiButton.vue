<template>
  <div>
    <button v-if="widgetReady" class="bg-green-600 text-white px-4 py-2 rounded" @click="openWompiCheckout">
      Pagar con Wompi
    </button>

    <p v-else>Cargando pasarela de pago...</p>
  </div>
</template>

<script>
import { generateSignature } from '@/services/signature.service';

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
      console.log('✅ Wompi Widget cargado correctamente');
    };
    script.onerror = () => {
      console.error('❌ Error al cargar el script de Wompi');
    };
    document.body.appendChild(script);
  },
  methods: {
    async openWompiCheckout() {

      console.log(this.total)

      const reference = `ORDER-${Date.now()}`;
      const amountInCents = this.total * 100;// Convertir a centavos
      const currency = "COP";

      // 🔹 Llamar a la función Edge de Supabase
      const result = await generateSignature({
        reference,
        amountInCents,
        currency,
      });

      if (!window.WidgetCheckout) {
        alert('El widget de Wompi aún no está listo.');
        return;
      }

      try {
        console.log("✅ Firma generada:", result.signature);
        console.log("PUBLIC KEY front:", import.meta.env.VITE_WOMPI_PUBLIC_KEY);

        if (!result.signature || !result.publicKey) {
          throw new Error('No se pudo obtener la firma o la clave pública.');
        }
        // 🔹 Crear el widget con la firma recibida

        console.log(amountInCents)
        const checkout = new window.WidgetCheckout({
          currency,
          amountInCents,
          reference,
          publicKey: result.publicKey,
          signature: { integrity: result.signature },
          redirectUrl: 'http://migu.com.co/',

          customerData: {
            fullName: this.form.name,
            email: this.form.email,
            phoneNumberPrefix: '+57',
            phoneNumber: this.form.phone,
          },
        });

        checkout.open((paymentResult) => {
          console.log('Resultado del pago:', paymentResult);
        });
      } catch (err) {
        console.error("❌ Error generando la firma:", err);
      }
    },
  },
};
</script>