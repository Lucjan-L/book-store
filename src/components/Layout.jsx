import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import "./Layout.css";

export default function Layout({ basket, fetchBooks, setSearchParams }) {
  const location = useLocation();
  const isBasketPage = location.pathname === "/basket";

  const basketCount = basket.reduce((total, item) => total + item.quantity, 0);

  function handleHomeClick() {
    setSearchParams({
      q: "javascript",
      page: "1",
    });

    fetchBooks("javascript", 1);
  }

  const lastQuery = localStorage.getItem("lastQuery") || "javascript";
  const lastPage = localStorage.getItem("page") || "1";

  const homeUrl = `/?q=${encodeURIComponent(lastQuery)}&page=${lastPage}`;

  return (
    <div className="layout">
      <nav className="nav">
        {isBasketPage ? (
          <Link to={homeUrl} className="home-link">
            Home
          </Link>
        ) : (
          <button onClick={handleHomeClick} className="logo">
            <FontAwesomeIcon className="icon" icon={faBook} />
            My Bookshop
          </button>
        )}

        <Link className="basket-link" to="/basket">
          <span className="basket-text">Basket</span>{" "}
          <span className="basket-quantity">{basketCount}</span>
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}
