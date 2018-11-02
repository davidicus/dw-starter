/*
* Dev server for blog
*
*/

// Dependencies
const express = require("express");
const morgan = require("morgan");
const postRoutes = require("./routes/post-routes");

// Create the express server instance
const app = express();

// Change directory context when in dev
const ROOT_DIR = __dirname.replace("/server", "/docs");

// Set port
const port = process.env.PORT || 5000;

// ---------------------
// -- some middleware --
// ---------------------
app.use(morgan("dev"));
// Serve static files
app.use(express.static(ROOT_DIR));

// ---------------------
// --     routes      --
// ---------------------

// Handle request with routes
app.use(`/`, postRoutes);

// Any other request redirect to home
app.use((req, res) => {
  res.redirect(`/`);
});

// Have express listen for request
app.listen(port, () => {
  console.log(
    "\x1b[34m%s\x1b[0m",
    ` Your awesome blog is listening at 'http://localhost:${port}' `
  );
});
