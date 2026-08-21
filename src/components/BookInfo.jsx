import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import placeholderBookImage from "../assets/placeholder-book.png";
import "./BookInfo.css";

export default function BookInfo({ book }) {
  const imageUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);

    if (!imageUrl) return;

    const img = new Image();

    img.src = imageUrl;

    img.onload = () => {
      setImageLoaded(true);
    };
  }, [imageUrl]);
  return (
    // OpenLibrary prefixes work IDs with "/works/", but our route only needs the ID
    <div className="book-card">
      <Link to={`/book/${book.key.replace("/works/", "")}`}>
        {/* Display a local placeholder when the API doesn't provide a cover image */}
        <img
          className="book-cover"
          src={imageLoaded && imageUrl ? imageUrl : placeholderBookImage}
          alt={book.title || "Book cover"}
        />
        <div className="book-card-text">
          <h3 className="books-title">{book.title}</h3>
          <p className="book-authors">
            {book.author_name?.join(", ") || "Unknown author"}
          </p>
          {book.first_publish_year && (
            <p>First published: {book.first_publish_year}</p>
          )}
          <br />£{book.price.toFixed(2)}
        </div>
      </Link>
    </div>
  );
}
