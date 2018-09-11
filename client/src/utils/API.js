import axios from "axios";

export default {
  searchArticles: function(query) {
    return axios.get(query);
  },

  saveArticles: function(articles) {
    return axios.post("/api/articles", articles);
  }
};


