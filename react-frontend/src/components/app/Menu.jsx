// External imports
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";

// MUI (UI components)
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Internal imports
import { selectFetchState, selectProducts } from "store/productSlice";

// The top-bar menu
export default function Menu() {
  let { pathname: url } = useLocation();
  const fetchState = useSelector(selectFetchState);
  const products = useSelector(selectProducts);
  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        backgroundColor: "#003366",
        boxShadow: "0px 1px 4px 0px #727272",
        WebkitBoxShadow: "0px 1px 4px 0px #727272",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Container
        maxWidth="xl"
        // root edited to remove default horizontal padding
        sx={{
          "&.MuiContainer-root": { padding: "0px" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {/* Logo and title */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <Link
            href="https://github.com/onions41/Kwan-Lee-IS24-technical-test-req-101449"
            underline="none"
            target="_blank"
            rel="noopener"
          >
            <img
              src="/round_bird_192x192.png"
              alt="A Logo"
              width="36"
              style={{ borderRadius: "50%" }}
            />
          </Link>
          <Link
            href="/"
            underline="hover"
          >
            <Typography
              pt="1px"
              variant="body1"
              component="h1"
              color="grey.200"
            >
              Kwan Lee IS24 Technical Test REQ-101408
            </Typography>
          </Link>
        </Stack>

        {/* Displays total number of products */}
        {url === "/products" && !fetchState.loading && !fetchState.error ? (
          <Typography
            variant="body1"
            component="h1"
            color="success.contrastText"
            sx={{
              padding: "2px 6px 0",
              borderRadius: "4px",
              backgroundColor: "success.main"
            }}
          >
            {`Total number of products: ${products.length}`}
          </Typography>
        ) : null}

        {/* Add new product/back to all products */}
        {url === "/products" ? (
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Button
              component={RouterLink}
              to="/products/add"
              variant="contained"
              startIcon={<AddIcon />}
              color="success"
            >
              Add New Product
            </Button>
          </Stack>
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              startIcon={<ArrowBackIcon />}
              color="success"
            >
              Back to Products
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
