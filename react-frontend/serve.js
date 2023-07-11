/**
 * Very simple Express server for serving the built front-end application
 */

const express = require("express");
const path = require("path");

const app = express();

// Serves the assets in the build folder
app.use(express.static(path.join(__dirname, "build")));

// Serves the bundled React app itself
// Wildcard used to capture all routes, which is required
// because the React app uses client-side routing
app.get("/*", function (_req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Starts the Express server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
