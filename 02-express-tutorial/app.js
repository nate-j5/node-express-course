// app.js
const express = require("express");
const peopleRouter = require("./routes/people");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./methods-public"));
app.use(express.json());

app.use("/api/v1/people", peopleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
