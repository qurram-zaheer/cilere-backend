/* -------------------------- DO NOT RUN THIS FILE, ------------------------- */

/* -------------------------------------------------------------------------- */
/*           IT WAS ONLY USED FOR INITIALIZING THE APPLICATION  DATA          */
/* -------------------------------------------------------------------------- */

const fs = require("fs");

let data = [
  {
    product_id: 1,
    product_name: "iPhone 11",
  },
  {
    product_id: 2,
    product_name: "Samsung S20",
  },
  {
    product_id: 3,
    product_name: "Huawei P20",
  },
  {
    product_id: 4,
    product_name: "OnePlus 8",
  },
  {
    product_id: 5,
    product_name: "HTC One",
  },
  {
    product_id: 6,
    product_name: "Samsung Note",
  },
  {
    product_id: 7,
    product_name: "iPad Pro",
  },
];

fs.writeFile("data.txt", JSON.stringify(data), (err) =>
  err ? console.log(err) : console.log("Working")
);

let data = fs.readFileSync("data.txt", "utf-8");
data = JSON.parse(data);
console.log(data);

const data2 = {};

data.forEach((item) => {
  data2[item.product_id] = item["inv_data"];
  delete item["inv_data"];
  console.log(item);
});

fs.writeFileSync("product_data.txt", JSON.stringify(data));
fs.writeFileSync("inv_data.txt", JSON.stringify(data2));
