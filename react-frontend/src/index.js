import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import store from "./store/store"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ReduxProvider store={store}>
      <CssBaseline />
      <App />
    </ReduxProvider>
  </>
);
