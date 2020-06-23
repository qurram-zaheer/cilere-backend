const fs = require("fs");

// let data = [
//   {
//     product_id: 1,
//     product_name: "iPhone 11",
//   },
//   {
//     product_id: 2,
//     product_name: "Samsung S20",
//   },
//   {
//     product_id: 3,
//     product_name: "Huawei P20",
//   },
//   {
//     product_id: 4,
//     product_name: "OnePlus 8",
//   },
//   {
//     product_id: 5,
//     product_name: "HTC One",
//   },
//   {
//     product_id: 6,
//     product_name: "Samsung Note",
//   },
//   {
//     product_id: 7,
//     product_name: "iPad Pro",
//   },
// ];

// fs.writeFile("data.txt", JSON.stringify(data), (err) =>
//   err ? console.log(err) : console.log("Working")
// );

let data = fs.readFileSync("data.txt", "utf-8");
data = JSON.parse(data);
console.log(data);

data.forEach((item) => {
  let arr = new Array(20);
  let initDate = "March 4, 2020";
  for (let i = 0; i < arr.length; i++) {
    let tempDate = Date.parse(initDate) + i * 24 * 60 * 60 * 1000;
    arr[i] = {};
    arr[i]["date"] = tempDate;
    arr[i]["inventoryVal"] = Math.floor(Math.random() * 1000) + 1;
  }
  item["inv_data"] = arr;
  console.log(arr);
});

fs.writeFile("data.txt", JSON.stringify(data), (err) =>
  err ? console.log(err) : console.log
);
