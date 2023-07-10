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
import UpdateFailDialog from "./UpdateFailDialog";
import productValidation from "components/common/productValidation";
import { productsAction } from "store/productSlice";
import objValuesToStrings from "utils/objValuesToStrings";

// Styles the modal
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

// Styles the form and determines its layout
const FormContainer = styled(Box)({
  width: "min(700, 100%)",
  paddingLeft: 10,
  paddingRight: 10,
  display: "grid",
  columnGap: "24px",
  gridTemplateColumns: "repeat(2, 1fr)"
});


// Modal containing the form to edit an existing product
export default function UpdateProductModal({ isOpen, setIsOpen, initialValues, setProdData }) {
  // Redux hooks
  const dispatch = useDispatch();
  const { productId } = useParams();
  // Used to open or close confirmation dialog
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  // Used to open the error dialog when submit fails
  const [isFailDialogOpen, setIsFailDialogOpen] = useState(false);
  const errorRef = useRef("");

  // Callback that runs when the form is submitted
  const onSubmit = useCallback(
    async (values) => {
      // Makes POST request to the API to add a new product
      fetch(`${process.env.REACT_APP_API_SERVER_URL}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
        .then(async (response) => {
          // Response health check
          if (!response.ok) {
            throw new Error(await response.text());
          }
          // Response is healthy
          const resObj = await response.json();
          // Update the all products table
          dispatch(productsAction({ type: "updatedProd", data: resObj }));
          // Update the product data for the UI
          setProdData({ loading: false, error: false, data: objValuesToStrings(resObj) });
          // Close the modal
          setIsOpen(false);
        })
        .catch((error) => {
          // Catches both network errors (no response) and unhealthy response errors
          errorRef.current = error.message;
          setIsFailDialogOpen(true);
        });
    },
    [errorRef, dispatch, productId, setIsOpen, setProdData]
  );

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <ModalContainer>
        {/* Title of the form: "Update product" */}
        <Typography
          variant="h5"
          component="h1"
          align="center"
          py={2.5}
        >
          Update product
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

                {/* Buttons */}

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
