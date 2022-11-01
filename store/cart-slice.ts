import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";
import { RoofState } from "./store";

interface Props {
  cart: CartItem[];
}

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state: Props, action: PayloadAction<CartItem>) {
      state.cart.unshift(action.payload);
    },

    resetCart(state) {
      state.cart = [];
    },
  },
});

export const cartSelector = (state: RoofState) => state.cart.cart;

export const totalAmount = (state: RoofState) =>
  state.cart.cart.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

export default CartSlice;
