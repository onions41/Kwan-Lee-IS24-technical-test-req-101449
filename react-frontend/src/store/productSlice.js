import { createSlice } from "@reduxjs/toolkit";

// Create a slice. A Redux store is made up of one or more slices,
// that is, if you want to slice up your logic.
const productSlice = createSlice({
  name: "product",
  initialState: {
    meQueryDone: false,
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
          console.log("****", payload)
          state.products = payload.data;
          break;
        // case "addedNewProd":
        //   return [action.data].concat(products);
        // case "editedProd":
        //   const index = products.findIndex((row) => row.productId === action.data.productId);
        //   if (index !== -1) {
        //     products[index] = { ...products[index], ...action.data };
        //   }
        //   return products;
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
