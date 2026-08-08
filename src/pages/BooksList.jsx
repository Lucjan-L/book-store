import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import "./BooksList.css";

export default function BookList({
  cart,
  addCartIncreaseQuantity,
  books,
  query,
  error,
  loading,
  setSearchParams,
  currentPage,
  fetchBooks,
}) {
  const [inputValue, setInputValue] = useState(query);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({
      q: inputValue,
      page: 1,
    });
    localStorage.setItem("page", 1);
    fetchBooks(inputValue, 1);
  }

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <SearchBar
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <div className="book-list">
        {books.map((book) => {
          // Check whether this book is already in the cart so BookCard can display its quantity
          const item = cart.find((b) => b.key === book.key);

          return (
            <BookCard
              key={book.key}
              book={book}
              item={item}
              addCartIncreaseQuantity={addCartIncreaseQuantity}
            />
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        query={query}
        setSearchParams={setSearchParams}
      />
    </>
  );
}
