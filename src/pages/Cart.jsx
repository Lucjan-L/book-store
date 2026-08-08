import { Link } from "react-router-dom";
import { calculateTotal } from "../utils/cartUtils";
import CartItem from "../components/CartItem";
import "./BooksList.css";

export default function Cart({ cart, addCartIncreaseQuantity, decreaseQuantity, removeFromCart }) {
  const total = calculateTotal(cart);
  return (
    <>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <div className="book-list">
          {cart.map((book) => (
            <CartItem
              book={book}
              key={book.key}
              addCartIncreaseQuantity={addCartIncreaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          ))}

          <p>Total: £{total.toFixed(2)}</p>
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </div>
      )}
    </>
  );
}

