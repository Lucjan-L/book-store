import { useState, useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { initialiseAnonymousAuth } from "./auth";
import { loadBasket, saveBasket } from "./firebase.js";
import { useBasket } from "./hooks/useBasket";
import { useBooks } from "./hooks/useBooks";
import { Analytics } from "@vercel/analytics/react";
import BooksList from "./pages/BooksList";
import BookDetails from "./pages/BookDetails";
import Basket from "./pages/Basket";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Layout from "./components/Layout.jsx";
import NotFound from "./pages/NotFound";

function App() {
  const [user, setUser] = useState(null);

  // Prevent saving an empty initial basket before Firebase data has loaded
  const [basketLoaded, setBasketLoaded] = useState(false);

  const {
    basket,
    setBasket,
    addBasketIncreaseQuantity,
    decreaseQuantity,
    removeFromBasket,
  } = useBasket();

  useEffect(() => {
    initialiseAnonymousAuth(setUser);
  }, []);

  useEffect(() => {
    async function getBasket() {
      if (!user) return;

      try {
        const firebaseBasket = await loadBasket(user.uid);
        setBasket(firebaseBasket);
        setBasketLoaded(true);
      } catch (error) {
        console.error("Failed to load basket:", error);
      }
    }

    getBasket();
  }, [user]);

  useEffect(() => {
    if (!user || !basketLoaded) return;

    saveBasket(user.uid, basket);
  }, [user, basket, basketLoaded]);

  const [searchParams, setSearchParams] = useSearchParams();

  // Keep the user's last search when navigating away and back
  const query =
    searchParams.get("q") || localStorage.getItem("lastQuery") || "javascript";

  const currentPage =
    Number(searchParams.get("page")) ||
    Number(localStorage.getItem("page")) ||
    1;

  useEffect(() => {
    localStorage.setItem("lastQuery", query);
    localStorage.setItem("page", currentPage);
  }, [query, currentPage]);

  const { books, loading, error, fetchBooks } = useBooks(query, currentPage);

  return (
    <>
      <Analytics />

      <Routes>
        <Route
          path="/"
          element={
            <Layout
              basket={basket}
              fetchBooks={fetchBooks}
              setSearchParams={setSearchParams}
            />
          }
        >
          <Route
            index
            element={
              <BooksList
                loading={loading}
                error={error}
                basket={basket}
                books={books}
                query={query}
                setSearchParams={setSearchParams}
                currentPage={currentPage}
                addBasketIncreaseQuantity={addBasketIncreaseQuantity}
                fetchBooks={fetchBooks}
              />
            }
          />
          <Route
            path="basket"
            element={
              <Basket
                basket={basket}
                removeFromBasket={removeFromBasket}
                addBasketIncreaseQuantity={addBasketIncreaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            }
          />
        </Route>
        <Route path="checkout" element={<Checkout basket={basket} />}></Route>
        <Route path="success" element={<Success setBasket={setBasket} />} />
        <Route path="book/:id" element={<BookDetails />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
