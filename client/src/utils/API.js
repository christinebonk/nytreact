import axios from "axios";

export default {
  searchArticles: function(query) {
    return axios.get(query);
  }
};


