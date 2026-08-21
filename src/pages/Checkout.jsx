import { useState } from "react";
import { Navigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import CheckoutForm from "../components/CheckoutForm";
import "./Checkout.css";

export default function Checkout({ basket }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState("");

  if (basket.length === 0) {
    return <Navigate to="/basket" />;
  }

  return (
    <div>
      <h1 className="checkout-title">Checkout</h1>
      <OrderSummary basket={basket} />

      <CheckoutForm
        error={error}
        setError={setError}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
