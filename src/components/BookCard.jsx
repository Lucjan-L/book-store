import { Link } from "react-router-dom";
import placeholderBookImage from "../assets/placeholder-book.png";
import BookInfo from "./BookInfo"

export default function BookCard({
  book,
  item,
  addCartIncreaseQuantity,
}) {
  return (
    <div className="book-cart">

      <BookInfo book={book}/>

      <button
        className="cart-btn"
        onClick={() => addCartIncreaseQuantity(book)}
      >
        {item ? (
          <>
            <span>Added to</span>
            <span>cart 🛒 ({item.quantity})</span>
          </>
        ) : (
          "Add to cart"
        )}
      </button>
    </div>
  );
}

