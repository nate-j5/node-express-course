const fs = require("node:fs");

console.log("start");

fs.writeFile(
  "./temporary/fileB.txt",
  "the first line here (1)",
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile(
        "./temporary/fileB.txt",
        " the second line here (2)",
        { flag: "a" },
        (err, data) => {
          if (err) {
            console.log("error in step 2");
          } else {
            fs.writeFile(
              "./temporary/fileB.txt",
              " the third line here (3)",
              { flag: "a" },
              (err, data) => {
                if (err) {
                  console.log("error in step 3");
                } else {
                  console.log("all files written");
                  fs.readFileSync("./temporary/fileB.txt", "utf-8");
                }
              }
            );
          }
        }
      );
    }
  }
);

console.log("end");
