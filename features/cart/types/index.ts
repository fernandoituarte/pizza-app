export interface CartItem {
  id: string              // id único del item en el carrito
  productId: string
  configKey: string          // clave única basada en la configuración del item (extras, ingredientes removidos)
  name: string
  unitPrice: number
  extras: {
    extraId: string
    name: string
    price: number
    quantity: number
  }[]
  removedIngredients: {
    ingredientId: string
    ingredientName: string
  }[]
  quantity: number
}