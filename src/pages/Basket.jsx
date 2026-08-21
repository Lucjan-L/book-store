import { Link } from "react-router-dom";
import { calculateTotal } from "../utils/basketUtils";
import BasketItem from "../components/BasketItem";
import "./BooksList.css";
import "./Basket.css";

export default function Basket({
  basket,
  addBasketIncreaseQuantity,
  decreaseQuantity,
  removeFromBasket,
}) {
  const total = calculateTotal(basket);
  return (
    <>
      <h1 className="basket-title">Your Basket</h1>

      {basket.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <div className="book-list">
          {basket.map((book) => (
            <BasketItem
              book={book}
              key={book.key}
              addBasketIncreaseQuantity={addBasketIncreaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromBasket={removeFromBasket}
            />
          ))}
          <div className="basket-summary">
            <p className="total">Total: £{total.toFixed(2)}</p>
            <Link to="/checkout">
              <button className="checkout-btn">Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
