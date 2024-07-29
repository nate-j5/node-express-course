require("dotenv").config();
require('express-async-errors'); 
// async errors
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">product route</a>');
});

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    //Connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on Port: ${PORT}`);
    });
  } catch (error) {}  
};

startServer();
