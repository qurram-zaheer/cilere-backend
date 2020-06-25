const express = require("express");
const fs = require("fs");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

/* --------- Helper function for parsing and merging both data files -------- */
/* ---- Save computation on frontend by seperating chart and product data --- */
const mergeProdAndInvData = (productData, invData) => {
  productData = JSON.parse(productData);
  invData = JSON.parse(invData);
  productData.forEach(
    (product) => (product["inv_data"] = invData[product.product_id])
  );
  return productData;
};

/* ------- This endpoint provides combined data of products and charts ------ */

app.get("/product-list", (req, res) => {
  let productData = fs.readFileSync("product_data.txt", "utf-8");

  let invData = fs.readFileSync("inv_data.txt", "utf-8");

  res.json(mergeProdAndInvData(productData, invData));
});

/* ------------------ Endpoint for editing inventory value ------------------ */

app.post("/edit-product/:id", (req, res) => {
  let invData = fs.readFileSync("inv_data.txt", "utf-8");
  invData = JSON.parse(invData);
  let productData = fs.readFileSync("product_data.txt", "utf-8");

  // Set last element of invData array(which is the inventory value at the most recent date)
  //to the updated value provided by client.
  invData[req.params.id][
    invData[req.params.id].length - 1
  ].inventoryVal = parseInt(req.body.newVal);

  fs.writeFileSync("inv_data.txt", JSON.stringify(invData));
  return res.json(mergeProdAndInvData(productData, JSON.stringify(invData)));
});

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(process.env.PORT || 5000, () => console.log("Server listening..."));
