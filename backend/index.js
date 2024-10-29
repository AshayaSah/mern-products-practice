const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productSchema = require("./schema/schema");

const app = express();
app.use(cors());
app.use(express.json());

const url =
  "mongodb+srv://ashaysah:ashay2059@cluster0.bg3hi.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/get", (req, res) => {
  productSchema
    .find()
    .then((result) => {
      // Log the first product if it exists
      if (result.length > 0) {
        console.log("First Product:", result[0]);
      } else {
        console.log("No products found.");
      }

      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(3001, (req, res) => {
  console.log("Your server is live!");
});
