import axios from "axios";

export default {
  // Gets all Saved Articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the Saved Article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the Article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a Article to the database
  saveArticle: function(ArticleData) {
    return axios.post("/api/articles", ArticleData)
    .catch(function(err) {
      console.log(err);
    });
  },
  searchArticles: function(query) {
    let apiURL = `${query.URL}${query.q}${query.start}${query.end}${query.api}`
    return axios.get(apiURL)
  }
};