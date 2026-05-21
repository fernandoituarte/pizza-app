import { configureStore } from "@reduxjs/toolkit";
import cart from "@/features/cart/store/cart.slice";
import auth from "@/features/auth/store/auth.slice";

const store = configureStore({
  reducer: {
    cart,
    auth
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
