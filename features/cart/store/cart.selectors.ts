import { CartItem } from "@/features/cart/types"
import { RootState } from "@/shared/store"

export function calculateItemUnitTotal(item: CartItem) {
  const extrasTotal = item.extras.reduce((acc, extra) => {
    return acc + extra.price * extra.quantity
  }, 0)

  return item.unitPrice + extrasTotal
}

export function calculateItemTotal(item: CartItem) {
  return calculateItemUnitTotal(item) * item.quantity
}

export function selectCartItemsCount(state: RootState) {
  return state.cart.items.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)
}

export function selectCartTotal(state: RootState) {
  return state.cart.items.reduce((acc, item) => {
    return acc + calculateItemTotal(item)
  }, 0)
}