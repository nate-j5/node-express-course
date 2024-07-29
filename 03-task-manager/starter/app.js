require("dotenv").config({ path: "../../.env" }); // Load environment variables
const express = require("express");
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require('./middleware/not-found')


const app = express();

const PORT = process.env.PORT || 3000;

// Convert all inbound requests to JSON
app.use(express.json()); 

// Server static files
app.use(express.static("./public"));

app.use("/api/v1/tasks", tasks);

//404 Route to handle bad routes
app.use(notFound)

// Connect to the database and start the server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Connected to Database and Server started on Port ${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();
