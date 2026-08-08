import { Link } from "react-router-dom";
import placeholderBookImage from "../assets/placeholder-book.png";

export default function BookInfo({ book }) {
  return (
    // OpenLibrary prefixes work IDs with "/works/", but our route only needs the ID
    <Link to={`/book/${book.key.replace("/works/", "")}`}>
      <div className="book-card">
        {/* Display a local placeholder when the API doesn't provide a cover image */}
        <img
          src={
            book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : placeholderBookImage
          }
          alt={book.title || "Book cover"}
        />
        <h3>{book.title}</h3>
        <p>{book.author_name?.join(", ") || "Unknown author"}</p>
        {book.first_publish_year && (
          <p>First published: {book.first_publish_year}</p>
        )}
        <br />£{book.price.toFixed(2)}
      </div>
    </Link>
  );
}
