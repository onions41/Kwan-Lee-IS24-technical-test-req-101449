// External imports
import { useCallback, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

// MUI (UI components)
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import ReplayIcon from "@mui/icons-material/Replay";

// Internal imports
import ConfirmUpdateDialog from "./ConfirmUpdateDialog";
import UpdateSuccessDialog from "./UpdateSuccessDialog";
import UpdateFailDialog from "./UpdateFailDialog";
import productValidation from "utils/productValidation";
import objValuesToStrings from "utils/objValuesToStrings";
import { productsAction } from "store/productSlice";

// Styles and positions the modal
const ModalContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `3px ${theme.palette.primary.main} solid`,
  borderRadius: 10,
  width: 700,
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  padding: "16px 16px 38px",
  overflow: "scroll"
}));

// Determins the form layout
const FormContainer = styled(Box)({
  width: "min(700, 100%)",
  paddingLeft: 10,
  paddingRight: 10,
  display: "grid",
  columnGap: "24px",
  gridTemplateColumns: "repeat(2, 1fr)"
});

// Modal containing the form to update an existing product
export default function UpdateProductModal({ isOpen, setIsOpen, initialValues, setProdData }) {
  // Used to dispatch update to list of products held in memory
  const dispatch = useDispatch();
  // Grabs the Product ID from the URL
  const { productId } = useParams();
  // Opens/closes dialogs
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isFailDialogOpen, setIsFailDialogOpen] = useState(false);
  // Holds error message in case update fails
  const errorRef = useRef("");

  // Callback that runs when the form is submitted
  const onSubmit = useCallback(
    async (values) => {
      // Makes PUT request to the API to update an existing product
      fetch(`${process.env.REACT_APP_API_SERVER_URL}/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values) // Form data is sent as JSON
      })
        .then(async (response) => {
          // Response health check
          if (!response.ok) {
            throw new Error(await response.text());
          }
          // Response is healthy
          const resObj = await response.json();
          // Updates the list of all products held in memory with the updated product,
          // which avoids having to send another request to the API when the user
          // navigates back to view all products
          dispatch(productsAction({ type: "updatedProd", data: resObj }));
          // Updates the product data for the current page (view a single product) UI
          // resObj's values are converted to strings because it is used to fill the
          // update product form, which expects only strings
          setProdData({ loading: false, error: false, data: objValuesToStrings(resObj) });
          // Opens the success dialog
          setIsSuccessDialogOpen(true);
        })
        .catch((error) => {
          // Catches both network errors (no response) and unhealthy response errors
          // Captures the error message and opens a dialog to display the message
          errorRef.current = error.message;
          setIsFailDialogOpen(true);
        });
    },
    [errorRef, dispatch, productId, setProdData]
  );

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <ModalContainer>
        {/* Title of the form: "Update Product" */}
        <Typography
          variant="h5"
          component="h1"
          align="center"
          py={2.5}
        >
          Update Product
        </Typography>
        {/* Form logic starts here */}
        <Formik
          initialValues={initialValues}
          validationSchema={productValidation}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={onSubmit}
        >
          {/* Formik child component (fields, buttons, confirmation dialogs) */}
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
            resetForm,
            errors,
            touched
          }) => {
            return (
              <FormContainer>
                {/* Product ID field */}
                <TextField
                  id="id"
                  name="id"
                  label="Product ID (enter a number)"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.id && errors.id}
                  variant="filled"
                  size="small"
                  sx={{ margin: "8px 0 8px" }}
                  autoFocus
                />
                {/* Product Name field */}
                <TextField
                  id="name"
                  name="name"
                  label="Product Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.name && errors.name}
                  variant="filled"
                  size="small"
                  sx={{ margin: "8px 0 8px" }}
                />
                {/* Product Description text box */}
                <TextField
                  id="description"
                  name="description"
                  label="Product Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={6}
                  variant="filled"
                  sx={{ margin: "8px 0 8px", gridColumn: "span 2" }}
                />

                {/* Product Colour field */}
                <TextField
                  id="colour"
                  name="colour"
                  label="Product Colour"
                  value={values.colour}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="filled"
                  size="small"
                  sx={{ margin: "8px 0 8px" }}
                />
                {/* Product Size selection field */}
                <FormControl
                  variant="filled"
                  size="small"
                  sx={{ margin: "8px 0 8px" }}
                >
                  <InputLabel id="size-label">Product Size</InputLabel>
                  <Select
                    labelId="size-label"
                    id="size"
                    name="size"
                    label="Product Size"
                    value={values.size}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="small">small</MenuItem>
                    <MenuItem value="medium">medium</MenuItem>
                    <MenuItem value="large">large</MenuItem>
                  </Select>
                </FormControl>

                {/* Update product button */}
                <Button
                  onClick={() => setIsConfirmDialogOpen(true)}
                  disabled={isSubmitting || !!errors.id || !values.id || !values.name}
                  variant="contained"
                  color="success"
                  endIcon={<SendIcon />}
                  sx={{ margin: "24px 0 8px" }}
                >
                  Update Product
                </Button>
                {/* Reset fields button */}
                <Button
                  onClick={() => resetForm()}
                  disabled={isSubmitting}
                  variant="outlined"
                  color="error"
                  endIcon={<ReplayIcon />}
                  sx={{ margin: "24px 0 8px" }}
                >
                  Reset Fields
                </Button>

                {/* Dialogs */}
                <ConfirmUpdateDialog
                  isOpen={isConfirmDialogOpen}
                  setIsOpen={setIsConfirmDialogOpen}
                  handleConfirm={handleSubmit}
                />
                <UpdateSuccessDialog
                  isOpen={isSuccessDialogOpen}
                  setIsOpen={setIsSuccessDialogOpen}
                  setIsModalOpen={setIsOpen}
                />
                <UpdateFailDialog
                  isOpen={isFailDialogOpen}
                  setIsOpen={setIsFailDialogOpen}
                  errorRef={errorRef}
                />
              </FormContainer>
            );
          }}
          {/* End Formik child component (end form) */}
        </Formik>
      </ModalContainer>
    </Modal>
  );
}
