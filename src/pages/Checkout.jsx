import { useState } from "react";
import { Navigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import CheckoutForm from "../components/CheckoutForm";
import "./Checkout.css";

export default function Checkout({ cart }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState("");

  if (cart.length === 0) {
    return <Navigate to="/cart" />;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <OrderSummary cart={cart} />

      <CheckoutForm
        error={error}
        setError={setError}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}

