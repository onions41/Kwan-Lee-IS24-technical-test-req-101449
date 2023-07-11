// External imports
import { useCallback, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

// MUI (UI components)
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// Internal imports
import ConfirmAddProdDialog from "components/addProduct/ConfirmAddProdDialog";
import ConfirmClearDialog from "components/addProduct/ConfirmClearDialog";
import AddProdSuccessDialog from "components/addProduct/AddProdSuccessDialog";
import AddProdFailDialog from "components/addProduct/AddProdFailDialog";
import productValidation from "utils/productValidation";
import { productsAction } from "store/productSlice";

// Postions the form within the page
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
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

// Modal containing the form to add a new product
export default function AddProduct() {
  // Used to dispatch added product to the list of products held in memory
  const dispatch = useDispatch();
  // Opens/closes dialogs
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isFailDialogOpen, setIsFailDialogOpen] = useState(false);
  // Holds error message in case adding the product fails
  const errorRef = useRef("");

  // Callback that runs when the form is submitted
  const onSubmit = useCallback(
    async (values) => {
      // Makes POST request to the API to add a new product
      fetch(`${process.env.REACT_APP_API_SERVER_URL}/products`, {
        method: "POST",
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
          // Updates the list of all products held in memory with the added product,
          // which avoids having to send another request to the API
          dispatch(productsAction({ type: "addedNewProd", data: resObj }));
          // Opens the success dialog
          setIsSuccessDialogOpen(true)
        })
        .catch((error) => {
          // Catches both network errors (no response) and unhealthy response errors
          // Captures the error message and opens a dialog to display the message
          errorRef.current = error.message;
          setIsFailDialogOpen(true);
        });
    },
    [errorRef, dispatch]
  );

  return (
    <PageContainer>
      {/* Title of the form: "Add a New Product" */}
      <Typography
        variant="h5"
        component="h1"
        align="center"
        py={2.5}
      >
        Add a New Product
      </Typography>
      {/* Form logic starts here */}
      <Formik
        initialValues={{
          id: "",
          name: "",
          description: "",
          colour: "",
          size: ""
        }}
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

              {/* Add Product Button. Can only be pressed when required fields are populated */}
              <Button
                onClick={() => setIsConfirmDialogOpen(true)}
                disabled={
                  isSubmitting || !!errors.id || !values.id || !values.name
                }
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
                sx={{ margin: "24px 0 8px" }}
              >
                Add Product
              </Button>
              {/* Clear Fields Button */}
              <Button
                onClick={() => setIsClearDialogOpen(true)}
                disabled={
                  isSubmitting ||
                  !Object.values(values)
                    .filter((value) => typeof value === "string")
                    .join("")
                }
                variant="outlined"
                color="error"
                endIcon={<DeleteIcon />}
                sx={{ margin: "24px 0 8px" }}
              >
                Clear
              </Button>
              
              {/* Dialogs */}
              <ConfirmAddProdDialog
                isOpen={isConfirmDialogOpen}
                setIsOpen={setIsConfirmDialogOpen}
                handleSubmit={handleSubmit}
              />
              <ConfirmClearDialog
                isOpen={isClearDialogOpen}
                setIsOpen={setIsClearDialogOpen}
                resetForm={resetForm}
              />
              <AddProdSuccessDialog
                isOpen={isSuccessDialogOpen}
                setIsOpen={setIsSuccessDialogOpen}
              />
              <AddProdFailDialog
                isOpen={isFailDialogOpen}
                setIsOpen={setIsFailDialogOpen}
                errorRef={errorRef}
              />
            </FormContainer>
          );
        }}
        {/* End Formik child component (end form) */}
      </Formik>
    </PageContainer>
  );
}
