import { Link } from "react-router-dom";
import CartBadge from "./CartBadge";

function Navbar({ cartCount, onOpenCart }) {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        VinylVault
      </Link>

      {/* navbar doesnt use these itself. it just passes them down to CartBadge */}
      <CartBadge count={cartCount} onClick={onOpenCart} />
    </header>
  );
}

export default Navbar;
