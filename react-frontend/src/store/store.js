// External imports
import { configureStore } from "@reduxjs/toolkit";

// Internal imports
import productSlice from "./productSlice";

// Exports store
// store is injected into the app at the entrypoint in index.js
// Reminder: store.dispatch(loginAction(payload)) and more can be done anywhere in the code, not just in React components.
export default configureStore({
  reducer: {
    product: productSlice.reducer
  }
});
