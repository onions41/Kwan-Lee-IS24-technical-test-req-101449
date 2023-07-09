// External imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// MUI (UI components)
import Typography from "@mui/material/Typography";

// Internal imports
import {
  selectFetchState,
  selectProducts,
  fetchStateAction,
  productsAction
} from "store/productSlice";

export default function Products() {
  const [prodData, setProdData] = useState({ loading: true, error: false, data: null });

  // Redux hooks
  const dispatch = useDispatch();
  const fetchState = useSelector(selectFetchState);
  const products = useSelector(selectProducts);

  const { productId } = useParams();

  // Makes the request to fetch the list of all products
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER_URL}/products/${productId}`, {
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
        setProdData({ loading: false, error: false, data: resData });
      })
      .catch((error) => {
        // Catches both network errors (no response) and unhealthy response errors
        setProdData({ loading: false, error: error.message, data: null });
      });
  }, [setProdData, productId]);

  // Displays while loading
  if (prodData.loading) {
    return <Typography variant="h5">Loading</Typography>;
  }

  // Displays if there was an error
  if (prodData.error) {
    return (
      <>
        <Typography variant="h5">There was an error when fetching the product data.</Typography>
        <Typography variant="h5">{prodData.error}</Typography>
      </>
    );
  }

  return (
    <ul>
      <li>{`pk: ${prodData.data.pk}`}</li>
      <li>{`id: ${prodData.data.id}`}</li>
      <li>{`name: ${prodData.data.name}`}</li>
      <li>{`description: ${prodData.data.description}`}</li>
      <li>{`colour: ${prodData.data.colour}`}</li>
      <li>{`size: ${prodData.data.size}`}</li>
    </ul>
  );
}
