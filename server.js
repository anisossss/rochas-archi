const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "transition.html"));
});
console.log(__dirname);
app.get("/scroll", (req, res) => {
  res.sendFile(path.join(__dirname, "scroll.html"));
});
app.get("/fluid", (req, res) => {
  res.sendFile(path.join(__dirname, "fluid.html"));
});
const port = 3000; // You can specify any port you like

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
