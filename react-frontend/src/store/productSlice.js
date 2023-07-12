import { createSlice } from "@reduxjs/toolkit";

// Create a slice. A Redux store is made up of one or more "slices"
// This slice deals with the states that has to do with products
const productSlice = createSlice({
  name: "product",
  initialState: {
    // Keeps track of request status for fetching a list of all products
    fetchState: { loading: true, error: false },
    // Keeps the list of products in memory as a state
    products: []
  },
  reducers: {
    fetchState: (state, { payload }) => {
      state.fetchState = payload;
    },
    products: (state, { payload }) => {
      switch (payload.type) {
        case "fetchedAllProd":
          state.products = payload.data;
          break;
        case "addedNewProd":
          state.products = state.products.concat(payload.data);
          break;
        case "updatedProd":
          const index = state.products.findIndex((row) => row.pk === payload.data.pk);
          if (index !== -1) {
            state.products = [
              ...state.products.slice(0, index),
              { ...state.products[index], ...payload.data },
              ...state.products.slice(index + 1)
            ];
          }
          break;
        case "deletedProd":
          state.products = state.products.filter(product => product.pk !== payload.data.pk);
          break;
        default:
          throw new Error("Invalid action type in products reducer");
      }
    }
  }
});

// Slices are combined to create the Redux store
export default productSlice;

// Actions (reducers) are dispatched with a payload to change the state
export const { fetchState: fetchStateAction, products: productsAction } = productSlice.actions;

// Selectors are used to access states in application code
export const selectFetchState = (state) => state.product.fetchState;
export const selectProducts = (state) => state.product.products;
