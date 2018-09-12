import axios from "axios";

export default {
  searchArticles: function(query) {
    return axios.get(query);
  },

  saveArticle: function(articles) {
    return axios.post("/api/articles", articles);
  },

  getArticles: function(articles) {
    return axios.get("/api/articles");
  },

  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  }
};


