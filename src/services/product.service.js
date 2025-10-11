// src/services/product.service.js
import { supabase } from "@/lib/supabaseClient"

// Crear producto
export const addProduct = async (_, productData) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: productData.name,
          ref: productData.ref,
          oldPrice: productData.oldPrice,
          price: productData.price,
          savings: productData.savings,
          discount: productData.discount,
          description: productData.description,
          longDescription: productData.longDescription,
          care: productData.care,
          image: productData.image,
          gallery: productData.gallery,
          sizes: productData.sizes,
          colors: productData.colors,
          created_at: new Date()
        }
      ])

    return { data, error }
  } catch (error) {
    console.error("Error en addProduct:", error.message)
    return { error }
  }
}

// Obtener productos
export const getProducts = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    return { data, error }
  } catch (error) {
    console.error("Error en getProducts:", error.message)
    return { error }
  }
}

// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single() // Esto hace que retorne solo un objeto, no un array

    if (error) throw error
    return { data }
  } catch (error) {
    console.error("Error al obtener el producto:", error.message)
    return { error }
  }
}

//  Actualizar producto
export const updateProduct = async (_, id, updates) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)

    return { data, error }
  } catch (error) {
    console.error("Error en updateProduct:", error.message)
    return { error }
  }
}

//  Eliminar producto
export const deleteProduct = async (_, id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)

    return { data, error }
  } catch (error) {
    console.error("Error en deleteProduct:", error.message)
    return { error }
  }
}



// Actualizar stock de producto
export const updateProductStock = async (productId, newStock) => {
  try {
    const { data, error } = await supabase
      .from("product_stock")
      .update({ stock: newStock })
      .eq("id", productId)

    if (error) throw error
    return { data }
  } catch (error) {
    console.error("Error al actualizar el stock del producto:", error.message)
    return { error }
  }
}

// Obtener stock de producto
export const getProductStock = async (productId) => {
  try {
    const { data, error } = await supabase
      .from("product_stock")
      .select("stock")
      .eq("id", productId)
      .single()

    if (error) throw error
    return { data }
  } catch (error) {
    console.error("Error al obtener el stock del producto:", error.message)
    return { error }
  }
}


export const getProductSizes = async (productId) => {
  const { data, error } = await supabase
    .from("product_stock")
    .select("size, quantity")
    .eq("product_id", productId)

  if (error) throw error
  return data
}