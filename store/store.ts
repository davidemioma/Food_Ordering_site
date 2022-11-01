import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./cart-slice";
import ModalSlice from "./modal-slice";

const store = configureStore({
  reducer: { cart: CartSlice.reducer, modal: ModalSlice.reducer },
});

export const { addToCart, resetCart } = CartSlice.actions;

export const { setUseCash, setAddProduct } = ModalSlice.actions;

export type RoofState = ReturnType<typeof store.getState>;

export default store;
