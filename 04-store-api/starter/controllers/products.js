const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { feature, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (feature) {
    queryObject.feature = feature === true ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<-": "$lte",
    };

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(",").join("");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt"); // Set the default sort if not passed in as query parameter
  }

  // check to only return certain fields in the API response
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  // Setup limit and pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  // Send a success response with the retrieved products
  res.status(200).json({ products, nhHits: products.length });
};

const getAllProductsStatic = async (req, res) => {
  const search = "ab";
  const products = await Product.find({
    name: { $regex: search, $options: "i" },
  })
    .sort("name")
    .select("name price");
  // throw new Error("testing async errors");
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
