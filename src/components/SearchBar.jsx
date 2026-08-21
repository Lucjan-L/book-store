import { useEffect, useState } from "react";
import "./SearchBar.css";

export default function SearchBar({
  handleSubmit,
  inputValue,
  setInputValue,
  query,
}) {
  useEffect(() => {
    setInputValue(query);
  }, [query]);
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          placeholder="Search books..."
          spellCheck="false"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="search-button fa fa-search" type="submit"></button>
      </form>
    </>
  );
}
