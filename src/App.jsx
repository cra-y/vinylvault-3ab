import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import { ALBUMS } from "./data/albums";

function App() {
  /* lifted state: App is the closest common parent of Navbar, the pages, and CartDrawer so it owns the cart and everyone reads the same copy */
  const [cart, setCart] = useState([]); // array of { ...album, quantity }
  const [isCartOpen, setIsCartOpen] = useState(false);

  /* add an album, or change its quantity if its already in the cart. we always build a new array so react sees the change */
  const handleAddToCart = (album) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === album.id);

      if (existing) {
        // don't let quantity go past whats in stock
        if (existing.quantity >= album.stock) return prevCart;
        return prevCart.map((item) =>
          item.id === album.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...prevCart, { ...album, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // delta is +1 or -1. quantity cant exceed stock. hitting 0 removes the line
  const handleUpdateQuantity = (albumId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id !== albumId) return item;
          const newQty = Math.min(item.quantity + delta, item.stock);
          return { ...item, quantity: newQty };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveFromCart = (albumId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== albumId));
  };

  // called by CheckoutPage after a valid order. a new empty array, not cart.length = 0
  const handleClearCart = () => setCart([]);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  /* derived, not state. total number of records (3 copies of one album = 3). passed to both the badge and the drawer so they can never conflict */
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Navbar cartCount={totalCartCount} onOpenCart={handleOpenCart} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<CatalogPage albums={ALBUMS} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/album/:albumId"
            element={<AlbumDetailPage albums={ALBUMS} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} onClearCart={handleClearCart} />}
          />

          <Route
            path="*"
            element={
              <div className="not-found">
                <h2>Page not found</h2>
                <Link to="/" className="btn">Back to catalog</Link>
              </div>
            }
          />
        </Routes>
      </main>

      {/* outside <Routes> so the drawer is available on every page */}
      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        cartCount={totalCartCount}
        onClose={handleCloseCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
}

export default App;
