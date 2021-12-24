import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import paginationSlice from "./paginationSlice";
import productSlice from "./productSlice";
import reviewSlice from "./reviewSlice";

const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        pagination: paginationSlice.reducer,
        auth: authSlice.reducer,
        cart: cartSlice.reducer,
        review: reviewSlice.reducer
    }
})

export default store