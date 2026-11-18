import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      {/* <Link> changes the url without reloading the page (an <a href> would reload) */}
      <Link to="/" className="logo">
        VinylVault
      </Link>
    </header>
  );
}

export default Navbar;
