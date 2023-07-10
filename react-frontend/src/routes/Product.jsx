// External imports
import { useCallback, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// MUI (UI components)
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// Internal imports
import UpdateProductModal from "components/product/updateProductModal/UpdateProductModal";
import ConfirmDeleteDialog from "components/product/ConfirmDeleteDialog";
import DeleteSuccessDialog from "components/product/DeleteSuccessDialog";
import DeleteFailDialog from "components/product/DeleteFailDialog";
import { productsAction } from "store/productSlice";
import objValuesToStrings from "utils/objValuesToStrings";

// Postions the content of the the page
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: 700,
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  padding: "16px 16px 38px",
  overflow: "scroll",
  display: "grid",
  columnGap: "24px",
  gridTemplateColumns: "repeat(2, 1fr)"
}));

const DataContainer = styled(Stack)(({ theme }) => ({
  border: `3px ${theme.palette.grey[400]} solid`,
  borderRadius: "10px",
  padding: "6px 4px 4px",
  margin: "8px 0 8px"
}));

function DataLabel({ children }) {
  return <Typography variant="caption">{children}</Typography>;
}

const Data = styled(Typography)(() => ({
  textAlign: "center"
}));

export default function Products() {
  // Redux hooks
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [prodData, setProdData] = useState({ loading: true, error: false, data: null });
  const [isUpdateModelOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteSuccessDialogOpen, setIsDeleteSuccessDialogOpen] = useState(false);
  const [isDeleteFailDialogOpen, setIsDeleteFailDialogOpen] = useState(false);
  const deleteErrorRef = useRef("");

  // Makes the request to fetch the product data
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
        setProdData({ loading: false, error: false, data: objValuesToStrings(resData) });
      })
      .catch((error) => {
        // Catches both network errors (no response) and unhealthy response errors
        setProdData({ loading: false, error: error.message, data: null });
      });
  }, [setProdData, productId]);

  const handleDelete = useCallback(async () => {
    fetch(`${process.env.REACT_APP_API_SERVER_URL}/products/${productId}`, {
      method: "DELETE"
    })
      .then(async (response) => {
        // Response health check
        if (!response.ok) {
          throw new Error(await response.text());
        }
        // Response is healthy
        dispatch(productsAction({ type: "deletedProd", data: prodData }));
        // Show DeleteSuccessDialog
        setIsDeleteSuccessDialogOpen(true);
      })
      .catch((error) => {
        // Catches both network errors (no response) and unhealthy response errors
        // Show DeleteFailDialog
        deleteErrorRef.current = error.message;
        setIsDeleteFailDialogOpen(true);
      });
  }, [
    productId,
    dispatch,
    setIsDeleteSuccessDialogOpen,
    setIsDeleteFailDialogOpen,
    deleteErrorRef,
    prodData
  ]);

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
    <PageContainer>
      {/* Displays product data */}
      <DataContainer>
        <DataLabel>Product ID</DataLabel>
        <Data>{prodData.data.id}</Data>
      </DataContainer>
      <DataContainer>
        <DataLabel>Product Name</DataLabel>
        <Data>{prodData.data.name}</Data>
      </DataContainer>
      <DataContainer sx={{ gridColumn: "span 2" }}>
        <DataLabel>Description</DataLabel>
        <Data>{prodData.data.description}</Data>
      </DataContainer>
      <DataContainer>
        <DataLabel>Colour</DataLabel>
        <Data>{prodData.data.colour}</Data>
      </DataContainer>
      <DataContainer>
        <DataLabel>Size</DataLabel>
        <Data>{prodData.data.size}</Data>
      </DataContainer>

      {/* Buttons */}

      {/* Add Product Button. Can only be pressed when required fields are populated */}
      <Button
        onClick={() => setIsUpdateModalOpen(true)}
        variant="contained"
        color="success"
        endIcon={<EditIcon />}
        sx={{ margin: "24px 0 8px" }}
      >
        Update Product
      </Button>
      {/* Delete Product Button */}
      <Button
        onClick={() => setIsDeleteDialogOpen(true)}
        variant="outlined"
        color="error"
        endIcon={<DeleteForeverIcon />}
        sx={{ margin: "24px 0 8px" }}
      >
        Delete Product
      </Button>

      {/* Update product modal */}
      <UpdateProductModal
        isOpen={isUpdateModelOpen}
        setIsOpen={setIsUpdateModalOpen}
        initialValues={prodData.data}
        setProdData={setProdData}
      />

      {/* Delete operation dialogs */}
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        handleConfirm={handleDelete}
      />
      <DeleteSuccessDialog
        isOpen={isDeleteSuccessDialogOpen}
        setIsOpen={setIsDeleteSuccessDialogOpen}
      />
      <DeleteFailDialog
        isOpen={isDeleteFailDialogOpen}
        setIsOpen={setIsDeleteFailDialogOpen}
        errorRef={deleteErrorRef}
      />
    </PageContainer>
  );
}
