import { Link } from "react-router-dom";
import placeholderBookImage from "../assets/placeholder-book.png";
import BookInfo from "./BookInfo";

export default function CartItem({
  book,
  addCartIncreaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  return (
    <div>
      <BookInfo book={book} />
      <div>
        <button onClick={() => decreaseQuantity(book)}>−</button>

        <span>{book.quantity}</span>

        <button onClick={() => addCartIncreaseQuantity(book)}>+</button>
      </div>
      <button
        className="cart-btn"
        onClick={() => {
          removeFromCart(book);
        }}
      >
        Remove from cart
      </button>
    </div>
  );
}
