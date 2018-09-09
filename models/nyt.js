const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nytSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date }
});

const Nyt = mongoose.model("Nyt", NytSchema);

module.exports = Nyt;
