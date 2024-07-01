const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

console.log("dir =", __dirname);

console.log("env =", process.env.MY_VAR);
