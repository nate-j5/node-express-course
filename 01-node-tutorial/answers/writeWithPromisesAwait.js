const { writeFile, readFile } = require("node:fs").promises;

async function writer() {
  try {
    await writeFile("temp.txt", "My favorite thing to do is drum and vibe :)");
  } catch (err) {
    console.log("there was an error", err);
  }
}

async function reader() {
  try {
    const data = await readFile("temp.txt", "utf-8");
    console.log("file written:", data);
  } catch (err) {
    console.log("there was an error", err);
  }
}

async function readWrite() {
  await writer();
  await reader();
}

readWrite();
