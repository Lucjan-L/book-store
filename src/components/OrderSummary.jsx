import { calculateTotal } from "../utils/basketUtils";
import "./OrderSummary.css";

export default function OrderSummary({ basket }) {
  const total = calculateTotal(basket);
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="order-sum">
        {basket.map((book) => (
          <div key={book.key} className="basket-row">
            <span> {book.title} </span>
            <span>
              ({book.quantity}) x £{book.price.toFixed(2)}
            </span>
          </div>
        ))}
        <h3 className="basket-row">
          <span>Total</span> £{total.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}
