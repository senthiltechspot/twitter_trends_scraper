const express = require("express");
const mongoose = require("mongoose");
const { runScript } = require("./controllers/scraperController");
const { MONGODB_URI, DB_NAME } = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Serve static files from the public directory
app.use(express.static("public"));

// Route to run the script
app.get("/fetch-trends", runScript);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_NAME
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });
