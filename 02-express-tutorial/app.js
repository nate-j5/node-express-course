const express = require("express");
const { products } = require("./data");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./public"));

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (product) {
    res.json(product);
  } else {
    res.json({ message: "That product was not found." });
  }
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, increase,} = req.query;
  let filteredProducts = products;

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  if (increase === 'yes') {
    filteredProducts.forEach((product) => {
      product.price *= 10;
    });
  } 
  
  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit));
  }

 
  res.json(filteredProducts);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
