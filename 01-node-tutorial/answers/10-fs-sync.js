const fs = require("node:fs");

const linesToWrite = ["I am happy ", "to be alive, ", "life is great! :D"];

for (let i = 0; i < linesToWrite.length; i++) {
  if (i === 0) {
    fs.writeFileSync("./temporary/fileA.txt", linesToWrite[i]);
  } else {
    fs.writeFileSync("./temporary/fileA.txt", linesToWrite[i], {
      flag: "a",
    });
  }
}

const fileContents = fs.readFileSync("./temporary/fileA.txt", "utf-8");

console.log("content=", fileContents);
