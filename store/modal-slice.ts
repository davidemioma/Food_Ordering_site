import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoofState } from "./store";

const ModalSlice = createSlice({
  name: "modal",
  initialState: {
    useCash: false,
    addproduct: false,
  },
  reducers: {
    setUseCash(state, action: PayloadAction<boolean>) {
      state.useCash = action.payload;
    },

    setAddProduct(state, action: PayloadAction<boolean>) {
      state.addproduct = action.payload;
    },
  },
});

export const useCashSelector = (state: RoofState) => state.modal.useCash;

export const addproductSelector = (state: RoofState) => state.modal.addproduct;

export default ModalSlice;
