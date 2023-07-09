// External imports
import { configureStore } from "@reduxjs/toolkit";

// Internal imports
import productSlice from "./productSlice";

// Exports store
// store.dispatch(loginAction(payload)) and more can be done anywhere in the code
// store is used in provider
export default configureStore({
  reducer: {
    product: productSlice.reducer
  }
});
