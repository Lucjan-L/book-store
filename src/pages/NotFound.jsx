import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div>
      <h1 className="title">404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>

      <Link className="back-home" to="/">
        Return to Home
      </Link>
    </div>
  );
}
