// Adds JSON files to database
require("dotenv").config();

const connectDB = require("./db/connect");

const Product = require("./models/product");

const jsonProducts = require("./products.json");
const { connect } = require("./routes/products");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log("success");
    process.exit(0) // exit -> no errors
  } catch (err) {
    console.error(err);
    process.exit(1) // exit -> error code
  }
};

start();
