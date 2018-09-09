import React from "react";

const SearchForm = () => (
  <form>
  	<label for="topic">Topic</label>
    <input type="text" id="topic">

    <label for="start-year">Start Year</label>
    <input type="text" id="start-year">

    <label for="end-year">End Year</label>
    <input type="text" id="end-year">

  </form>
);

export default SearchForm;
