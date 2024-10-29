const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productModel = require("./schema/schema");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb+srv://ashaysah:ashay2059@cluster0.bg3hi.mongodb.net/sample_geospatial?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/get", (req, res) => {
  productModel
    .find()
    .limit(50)
    .then((result) => {
      console.log("Fetched Products:", result); // Log all fetched products for debugging
      // Send the result as a response
      res.json(result);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      res.status(500).json({ error: err.message }); // Send a 500 error response with a message
    });
});

app.listen(3001, () => {
  console.log("Your server is live on port 3001!");
});
