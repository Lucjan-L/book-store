import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout({ cart }) {
  return (
    <div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
      </nav>

      <Outlet />
    </div>
  );
}
