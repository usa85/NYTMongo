const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  web_url: {type: String},
  id: { type: String, unique: true},
  headline: { type: String},
  snippet: {type: String},
  section_name: {type: String},
  pub_date: {type: String},
  byline: { type: String},
  note: {type: String},
  date: { type: Date, default: Date.now }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;