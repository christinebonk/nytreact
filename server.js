const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./client/public'));

mongoose.connect("mongodb://localhost/nytreact");

app.listen(PORT, function() {
  console.log(`Listening on PORT ${PORT}!`);
});
