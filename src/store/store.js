import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import wishlistSlice from "./wishlistSlice";
import cartSlice from "./cartSlice";
import saveForLaterSlice from "./saveForLaterSlice";
import orderSlice from "./orderSlice";
// import currencySlice from "./currencySlice";

const store = configureStore({
  reducer: {
    user: userSlice, //user data
    products: productSlice, // all product and single product data
    wishlist: wishlistSlice, // wishlist data
    cart: cartSlice, //cart data
    saveForLater: saveForLaterSlice, // save for later data
    myOrders: orderSlice, // my orders data
    newOrder: wishlistSlice, //remove this in production
    // currency: currencySlice
  },
});

export default store;
