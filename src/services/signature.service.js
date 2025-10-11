import { supabase } from "@/lib/supabaseClient";

export async function generateSignature({ reference, amountInCents, currency = "COP" }) {
  try {
    const { data, error } = await supabase.functions.invoke("generate-signature", {
      body: {
        reference, 
        amountInCents, 
        currency
      }
    });

    if (error) {
      console.error("Error generating signature:", error);
      throw error;
    }

    console.log("✅ Firma generada correctamente:", data);
    return data;
  } catch (err) {
    console.error("Error generating signature:", err);
    throw err;
  }
}