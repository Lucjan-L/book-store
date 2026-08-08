import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Success({ setCart }) {
  const location = useLocation();

  // Only allow access if the user arrived here after completing checkout
  if (!location.state?.fromCheckout) {
    return <Navigate to="/cart" />;
  }

  useEffect(() => {
    setCart([]);
  }, [setCart]);

  return (
    <div>
      <h1>Order placed successfully 🎉</h1>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}


