import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import appSlice from "./appSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";

const appStore = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
  },
});

export default appStore;
