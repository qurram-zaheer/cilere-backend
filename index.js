const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const PORT = 5000;

app.get("/product-list", (req, res) => {
  const fileContents = fs.readFileSync("data.txt", "utf-8");
  res.json(JSON.parse(fileContents));
});

app.put("/edit-product/:id", (req, res) => {
  let fileContents = fs.readFileSync("data.txt", "utf-8");
  fileContents = JSON.parse(fileContents);

  const foundIndex = fileContents.findIndex(
    (item) => item.product_id === req.params.id
  );
  fileContents[foundIndex] = req.body;
  fs.writeFileSync("data.txt", JSON.stringify(fileContents));
  return res.json(fileContents);
});

app.listen(PORT, () => console.log("Server listening on PORT " + PORT));
