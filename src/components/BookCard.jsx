import { Link } from "react-router-dom";
import placeholderBookImage from "../assets/placeholder-book.png";
import BookInfo from "./BookInfo";
import "./BookCard.css";

export default function BookCard({ book, item, addBasketIncreaseQuantity }) {
  return (
    <div className="book-basket">
      <BookInfo book={book} />

      <button
        className={item ? "button-clicked" : "add-basket-btn"}
        onClick={() => addBasketIncreaseQuantity(book)}
      >
        {item ? (
          <>
            <span>Added to</span>
            <span>basket 🛒 ({item.quantity})</span>
          </>
        ) : (
          "Add to basket"
        )}
      </button>
    </div>
  );
}
