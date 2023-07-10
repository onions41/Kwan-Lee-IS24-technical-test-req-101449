// Imports
const express = require("express");
const path = require("path");

const app = express();

// This is to serve the static files in the build folder
app.use(express.static(path.join(__dirname, "build")));

// This is to serve the bundled react appp itself
app.get("/*", function (_req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});