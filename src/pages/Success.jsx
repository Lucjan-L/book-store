import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./Success.css";

export default function Success({ setBasket }) {
  const location = useLocation();

  // Only allow access if the user arrived here after completing checkout
  if (!location.state?.fromCheckout) {
    return <Navigate to="/basket" />;
  }

  useEffect(() => {
    setBasket([]);
  }, [setBasket]);

  return (
    <div>
      <h1 className="successful-msg">Order placed successfully 🎉</h1>
      <Link className="back-home" to="/">
        Go back to Home
      </Link>
    </div>
  );
}
