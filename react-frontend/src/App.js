// External imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// MUI (UI components)
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// Internal imports
import Menu from "components/app/Menu";
import Products from "routes/Products";
import AddProduct from "routes/AddProduct";
import Product from "routes/Product";

export default function App() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <BrowserRouter>
        {/* Top bar menu */}
        <Menu />
        <Container
          maxWidth="xl"
          // Reminder: &.MuiContainer-root edited to remove default horizontal padding
          sx={{ flexGrow: 1, "&.MuiContainer-root": { padding: "0px" } }}
        >
          <Box sx={{ width: "100%", height: "100%", padding: "20px 0 0" }}>
            {/* Routes. Content changes based on URL */}
            <Routes>
              {/* Root "/" route. Redirects to "/products" */}
              <Route
                path="/"
                element={
                  <Navigate
                    to="/products"
                    replace
                  />
                }
              />
              {/* View all products */}
              <Route
                path="/products"
                element={<Products />}
              />
              {/* Add a new product */}
              <Route
                path="/products/add"
                element={<AddProduct />}
              />
              {/* View a product */}
              <Route
                path="/products/:productId"
                element={<Product />}
              />
            </Routes>
          </Box>
        </Container>
      </BrowserRouter>
    </Box>
  );
}
