const fs = require("node:fs");

let counter = 0;

const readableStream = fs.createReadStream("../content/big.txt", {
  encoding: "utf-8",
  highWaterMark: 200,
});

readableStream.on("data", (chunk) => {
  counter += 1;
  console.log(chunk);
});

readableStream.on("end", () => {
  console.log(`chunk count = `, counter);
});

readableStream.on("error", (err) => {
    console.log(err);
});
