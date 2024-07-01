const { writeFile, readFile } = require("node:fs").promises;

const filePath = "temp.txt";

writeFile(filePath, "I love Austin, TX.\n")
  .then(() => {
    return writeFile(filePath, "I also Like Sedona.\n", { flag: "a" }); // 'a' flag appends to the file
  })
  .then(() => {
    return writeFile(filePath, "and Costa Rica.\n", { flag: "a" });
  })
  .then(() => {
    return writeFile(filePath, "and Australia.\n", { flag: "a" });
  })
  .then(() => {
    return writeFile(filePath, "and I want to explore South America.", {
      flag: "a",
    });
  })
  .then(() => {
    return readFile(filePath, "utf-8");
  })
  .then((data) => {
    console.log("File content:", data);
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });
