import { useEffect, useState } from "react";

export function useBooks(query, currentPage) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchBooks(query, page) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=20`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      setBooks(
        data.docs.map((book) => ({
          ...book,
          price: Number((Math.random() * 20 + 5).toFixed(2)),
        })),
      );
    } catch (err) {
      setError(err?.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchBooks(query, currentPage);
  }, [query, currentPage]);

  return {
    books,
    loading,
    error,
    fetchBooks,
  };
}
