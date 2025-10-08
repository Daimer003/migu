// src/services/user.service.js
import { supabase } from "@/lib/supabaseClient"

// Función para registrar un nuevo usuario
export const registerUser = async (_, userData) => {
  try {
    const { data, error } = await supabase
      .from("users_info")
      .insert([{
        username: userData.username,
        birthday: userData.birthday,
        phone: userData.phone,
        newsletter: userData.newsletter,
        created_at: new Date()
      }])

    return { data, error }
  } catch (error) {
    console.error("Error en registerUser:", error.message)
    return { error }
  }
}

// Función para enviar mensajes de contacto
export const sendContactMessage = async (_, contactData) => {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name: contactData.name,
          email: contactData.email,
          message: contactData.message,
          created_at: new Date()
        }
      ])

    return { data, error }
  } catch (error) {
    console.error("Error en sendContactMessage:", error.message)
    return { error }
  }
}