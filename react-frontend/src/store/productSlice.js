import { createSlice } from "@reduxjs/toolkit";

// Create a slice. A Redux store is made up of one or more slices,
// that is, if you want to slice up your logic.
const productSlice = createSlice({
  name: "product",
  initialState: {
    fetchState: { loading: true, error: false },
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

// The sliced is used to create a store.
// A store is not needed to use redux states inside function componenets
// because useDispatch and useSelector hooks can be used inside the components.
// A store is needed to change/access the state outside of a function component.
export default productSlice;

// Actions
// These actions can be imported and used inside React functional components
// with the useDespatch hook.
export const { fetchState: fetchStateAction, products: productsAction } = productSlice.actions;

// Selectors
// These selectors can be imported and used as state inside
// React functional components with the useSelector hook.
export const selectFetchState = (state) => state.product.fetchState;
export const selectProducts = (state) => state.product.products;
