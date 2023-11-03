const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/index.html"));
});
app.get("/works", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "works", "/index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about", "/index.html"));
});
app.get("/recrutement", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "recrutement", "/index.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact", "/index.html"));
});

app.get("/fluid", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/fluid.html"));
});

app.get("/scroll", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/scroll.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
