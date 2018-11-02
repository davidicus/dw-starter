/*
* Routes for dynamic post
*
*/

// Dependencies
const express = require("express");
const fs = require("fs");
const { promisify } = require("util");

// Promisify readdir
const readdirPromise = promisify(fs.readdir);

// Call the express router middleware
const router = express.Router();

// Change directory context
const ROOT_DIR = __dirname.replace("/server/routes", "/docs");

readdirPromise(`./src/views/pages/`)
  .then(pages => {
    // You can create any number of pages inside the views/pages directory
    // and they will be added as menu links and served up by this route.
    // Create links for pages navigation
    pages.map(page => {
      const pageLink = page.replace(/\.[^/.]+$/, "");
      router.get(`/${pageLink}.html`, (req, res) => {
        console.log("PAGELINK: ", req, pageLink);
        res.sendFile(ROOT_DIR + `/${pageLink}.html`);
      });
    });

    // Render single post
    router.get(`/post/:post`, (req, res) => {
      console.log("POST: ", req, req.params.post);
      res.sendFile(ROOT_DIR + `/post/${req.params.post}`);
    });

    // Regex is for pagination. Depending on the number set in your config
    // total number of post will be divided amongst pages. (ie. index.html, index-2.html, etc.)
    // Render list from tags
    router.get("/:tag/:index.html", (req, res) => {
      console.log("TAG: ", req.params.tag);
      console.log("RES: ");
      res.sendFile(ROOT_DIR + req.originalUrl);
    });

    // Same comment regarding pagination as above
    // Home page. Render list from post directory
    router.get("/:index.html", (req, res) => {
      console.log("index: ", req, req.originalUrl);
      res.sendFile(ROOT_DIR + req.originalUrl);
    });
  })
  .catch(err =>
    console.log("\x1b[31m%s\x1b[0m", `Problem reading pages, ${err}`)
  );

module.exports = router;
