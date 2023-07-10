// External imports
import { useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import AddProdErrorDialog from "components/addProduct/AddProdErrorDialog";
import productValidation from "components/common/productValidation";
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
  // Redux hooks
  const dispatch = useDispatch();
  // Used to open or close submit and clear confirmation dialogs
  const [isAddProdDialOpen, setIsAddProdDialOpen] = useState(false);
  const [isClearDialOpen, setIsClearDialOpen] = useState(false);
  // Used to open the error dialog when submit fails
  const [isErrorDialOpen, setIsErrorDialOpen] = useState(false);

  const errorRef = useRef("");
  const navigate = useNavigate();

  // Callback that runs when the form is submitted
  const onSubmit = useCallback(
    async (values, { resetForm }) => {
      // Makes POST request to the API to add a new product
      fetch(`${process.env.REACT_APP_API_SERVER_URL}/products`, {
        method: "POST",
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
          // Update the interface
          dispatch(productsAction({ type: "addedNewProd", data: resObj }));
          // Reset the form
          resetForm();
          // Close the modal
          navigate("/products");
        })
        .catch((error) => {
          // Catches both network errors (no response) and unhealthy response errors
          errorRef.current = error.message;
          setIsErrorDialOpen(true);
        });
    },
    [errorRef, dispatch, navigate]
  );

  return (
    <PageContainer>
      {/* Title of the form: "Add a new product" */}
      <Typography
        variant="h5"
        component="h1"
        align="center"
        py={2.5}
      >
        Add a new product
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
                onClick={() => setIsAddProdDialOpen(true)}
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
                onClick={() => setIsClearDialOpen(true)}
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
                isOpen={isAddProdDialOpen}
                setIsOpen={setIsAddProdDialOpen}
                handleSubmit={handleSubmit}
              />
              <ConfirmClearDialog
                isOpen={isClearDialOpen}
                setIsOpen={setIsClearDialOpen}
                resetForm={resetForm}
              />
              <AddProdErrorDialog
                isOpen={isErrorDialOpen}
                setIsOpen={setIsErrorDialOpen}
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
