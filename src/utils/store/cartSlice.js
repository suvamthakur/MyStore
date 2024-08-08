import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    subtotals: [],
    discounts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    addSubTotalsWithoutDiscount: (state, action) => {
      const { index, price } = action.payload;
      state.subtotals[index] = price;
    },
    addDiscounts: (state, action) => {
      const { index, discount } = action.payload;
      state.discounts[index] = discount;
    },

    removeCartItem: (state, action) => {
      // const i = state.cartItems.findIndex((item) => item.id === action.payload);
      // state.cartItems.splice(i, 1);

      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === action.payload)
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  clearCart,
  addSubTotalsWithoutDiscount,
  addDiscounts,
} = cartSlice.actions;
export default cartSlice.reducer;
