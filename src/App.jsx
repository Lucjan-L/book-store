import { useState, useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { initialiseAnonymousAuth } from "./auth";
import { loadCart, saveCart } from "./firebase.js";
import { useCart } from "./hooks/useCart";
import { useBooks } from "./hooks/useBooks";
import BooksList from "./pages/BooksList";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Layout from "./components/Layout.jsx";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Prevent saving an empty initial cart before Firebase data has loaded
  const [cartLoaded, setCartLoaded] = useState(false);

  const {
    cart,
    setCart,
    addCartIncreaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    initialiseAnonymousAuth(setUser);
  }, []);

  useEffect(() => {
    async function getCart() {
      if (!user) return;

      try {
        const firebaseCart = await loadCart(user.uid);
        setCart(firebaseCart);
        setCartLoaded(true);
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }

    getCart();
  }, [user]);

  useEffect(() => {
    if (!user || !cartLoaded) return;

    saveCart(user.uid, cart);
  }, [user, cart, cartLoaded]);

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
      <Routes>
        <Route path="/" element={<Layout cart={cart} />}>
          <Route
            index
            element={
              <BooksList
                loading={loading}
                error={error}
                cart={cart}
                books={books}
                query={query}
                setSearchParams={setSearchParams}
                currentPage={currentPage}
                addCartIncreaseQuantity={addCartIncreaseQuantity}
                fetchBooks={fetchBooks}
              />
            }
          />
          <Route
            path="cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                addCartIncreaseQuantity={addCartIncreaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            }
          />
        </Route>
        <Route path="checkout" element={<Checkout cart={cart} />}></Route>
        <Route path="success" element={<Success setCart={setCart} />} />
        <Route path="book/:id" element={<BookDetails />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
