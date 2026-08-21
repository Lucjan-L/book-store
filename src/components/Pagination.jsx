import "./Pagination.css";

export default function Pagination({ currentPage, query, setSearchParams }) {
  return (
    <div className="nav-btn">
      <button
        disabled={currentPage === 1}
        onClick={() => setSearchParams({ q: query, page: currentPage - 1 })}
      >
        Previous
      </button>

      <span>Page {currentPage}</span>

      <button
        onClick={() => setSearchParams({ q: query, page: currentPage + 1 })}
      >
        Next
      </button>
    </div>
  );
}
