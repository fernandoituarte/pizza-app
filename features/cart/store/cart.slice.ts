import { CartItem } from "@/features/cart/types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: {
      reducer(state, action: PayloadAction<CartItem>) {
        const newItem = action.payload;

        const existingItem = state.items.find(
          (item) => item.configKey === newItem.configKey,
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
      },

      prepare(item: Omit<CartItem, "id" | "configKey">) {
        const configKey = generateItemKey(item);

        return {
          payload: {
            ...item,
            id: nanoid(),
            configKey,
          },
        };
      },
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

function generateItemKey(item: Omit<CartItem, "id" | "configKey">) {
  const extrasIds = item.extras
    .map((e) => e.extraId)
    .sort()
    .join("-");

  const removedIds = item.removedIngredients
    .map((i) => i.ingredientId)
    .sort()
    .join("-");

  return `${item.productId}__${extrasIds}__${removedIds}`;
}

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
