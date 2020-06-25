const express = require("express");
const fs = require("fs");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/product-list", (req, res) => {
  const fileContents = fs.readFileSync("data.txt", "utf-8");
  res.json(JSON.parse(fileContents));
});

app.post("/edit-product/:id", (req, res) => {
  let fileContents = fs.readFileSync("data.txt", "utf-8");
  fileContents = JSON.parse(fileContents);

  console.log(req.body, req.params.id);
  console.log(fileContents);
  const foundItem = fileContents.find(
    (item) => item.product_id === parseInt(req.params.id)
  );

  foundItem["inv_data"][
    foundItem["inv_data"].length - 1
  ].inventoryVal = parseInt(req.body.newVal);
  console.log(foundItem["inv_data"]);
  // fileContents[foundIndex] = req.body;
  fs.writeFileSync("data.txt", JSON.stringify(fileContents));
  return res.json(fileContents);
});

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(process.env.PORT || 5000, () => console.log("Server listening..."));
