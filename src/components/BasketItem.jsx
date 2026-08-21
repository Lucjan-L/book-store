import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import BookInfo from "./BookInfo";
import placeholderBookImage from "../assets/placeholder-book.png";
import "./BasketItem.css";

export default function BasketItem({
  book,
  addBasketIncreaseQuantity,
  decreaseQuantity,
  removeFromBasket,
}) {
  return (
    <div>
      <BookInfo book={book} />
      <div>
        <button
          className="decrease-quantity"
          onClick={() => decreaseQuantity(book)}
        >
          {book.quantity === 1 ? (
            <FontAwesomeIcon className="bin-icon" icon={faTrash} />
          ) : (
            <h3>−</h3>
          )}
        </button>

        <span className="book-quantity">{book.quantity}</span>

        <button
          className="increase-quantity"
          onClick={() => addBasketIncreaseQuantity(book)}
        >
          <h3>+</h3>
        </button>
      </div>
    </div>
  );
}
