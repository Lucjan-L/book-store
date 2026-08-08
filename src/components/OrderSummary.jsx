import { calculateTotal } from "../utils/cartUtils";

export default function OrderSummary({ cart }) {
  const total = calculateTotal(cart);
  return (
    <div>
      <h3>Order Summary</h3>
      <div className="order-sum">
        {cart.map((book) => (
          <div key={book.key} className="cart-row">
            <span> {book.title} </span>
            <span>
              ({book.quantity}) x £{book.price.toFixed(2)}
            </span>
          </div>
        ))}
        <h3 className="cart-row">
          <span>Total</span> £{total.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}
