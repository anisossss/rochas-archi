const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/works", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "works.html"));
});
app.get("/fluid", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "fluid.html"));
});

app.get("/scroll", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "scroll.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
