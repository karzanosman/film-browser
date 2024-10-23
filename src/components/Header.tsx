import "@/styles/Header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>
          <Link to="/" className="header-link">
            Film Browser
          </Link>
        </h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/wishlist">Wishlist</Link>
        </nav>
      </div>
    </header>
  );
}
