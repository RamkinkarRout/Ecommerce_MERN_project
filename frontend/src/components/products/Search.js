import React, { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";
import "./search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const searchSubmithandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
    console.log(keyword);
  };
  return (
    <Fragment>
      <MetaData title={"AMAZON -- SEARCH"} />
      <form
        className='searchBox'
        onSubmit={searchSubmithandler}
      >
        <input
          type={"text"}
          placeholder='Seacrh for a Product ...'
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input type={"submit"} value={"Search"} />
      </form>
    </Fragment>
  );
};

export default Search;
