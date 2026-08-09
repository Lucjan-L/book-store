import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholderBook from "../assets/placeholder-book.png";
import "./BookDetails.css";

export default function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [authorName, setAuthorName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBookAndAuthor() {
      try {
        setLoading(true);
        setError(null);

        // Fetch the book details using the OpenLibrary work ID from the URL
        const workRes = await fetch(`https://openlibrary.org/works/${id}.json`);

        if (!workRes.ok) {
          throw new Error(`HTTP error ${workRes.status}`);
        }

        const workData = await workRes.json();

        setBook(workData);

        // Fetch the author's details separately because OpenLibrary only returns the author reference here
        const authorKey = workData.authors?.[0]?.author?.key;

        if (authorKey) {
          const authorRes = await fetch(
            `https://openlibrary.org${authorKey}.json`,
          );

          const authorData = await authorRes.json();

          setAuthorName(authorData.name);
        }
      } catch (err) {
        setError(err.message || "Failed to load book");
      } finally {
        setLoading(false);
      }
    }

    fetchBookAndAuthor();
  }, [id]);

  if (loading) return <p>Loading book...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>No book found</p>;

  // OpenLibrary descriptions can be strings or objects and may contain HTML tags,
  // so normalise and clean them before displaying
  const rawDescription =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "";

  const cleanedDescription = rawDescription.replace(/<[^>]*>/g, "").trim();

  const coverId = book.covers?.[0];

  return (
    <>
      <div className="book-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to all books
        </button>

        <h1>{book.title}</h1>
      </div>
      <div>
        <h2>{book.subtitle}</h2>
        <img
          src={
            coverId
              ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
              : placeholderBook
          }
          alt={book.title || "Book cover"}
        />
        <h3>Author: {authorName || "Unknown author"}</h3>
        <p>
          First Published:{" "}
          {book.first_publish_date
            ? book.first_publish_date
            : "Unknown (Info may be available on home page)"}
        </p>
        <br />

        {cleanedDescription && <p>Description: {cleanedDescription}</p>}

        <br />
        {book.subjects && (
          <p>Subjects: {book.subjects.slice(0, 10).join(", ")}</p>
        )}
        <br />
        <h4>Date last modified: {book.last_modified.value}</h4>
      </div>
    </>
  );
}
