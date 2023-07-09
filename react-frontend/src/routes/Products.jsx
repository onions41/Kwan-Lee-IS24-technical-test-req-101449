
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI (UI components)
import Typography from "@mui/material/Typography";
import { TableVirtuoso } from "react-virtuoso";

// Internal imports
import {
  selectFetchState,
  selectProducts,
  fetchStateAction,
  productsAction
} from "store/productSlice";
import { VirtuosoTableComponents, fixedHeaderContent, itemContent } from "../components/products/tableComponents";

export default function Products() {
  // Redux hooks
  const dispatch = useDispatch();
  const fetchState = useSelector(selectFetchState);
  const products = useSelector(selectProducts);

  // Makes the request to fetch the list of all products
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER_URL}/products`, {
      method: "GET"
    })
      .then(async (response) => {
        // Response health check
        if (!response.ok) {
          throw new Error(await response.text());
        }
        // Response is healthy
        const resData = await response.json();
        // Loads fetched data into UI state
        dispatch(productsAction({ type: "fetchedAllProd", data: resData }));
        dispatch(fetchStateAction({ loading: false, error: false }));
      })
      .catch((error) => {
        // Catches both network errors (no response) and unhealthy response errors
        dispatch(fetchStateAction({ loading: false, error: error.message }));
      });
  }, [dispatch]);


  // Displays while loading
  if (fetchState.loading) {
    return <Typography variant="h5">Loading</Typography>;
  }

  // Displays if there was an error
  if (fetchState.error) {
    return (
      <>
        <Typography variant="h5">
          There was an error when fetching the list of all products.
        </Typography>
        <Typography variant="h5">{fetchState.error}</Typography>
      </>
    );
  }

  return (
    <TableVirtuoso
      data={products}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={itemContent}
    />
  );
}
