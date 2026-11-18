import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import { ALBUMS } from "./data/albums";

function App() {
  // cart + isCartOpen state and the real handlers go here
  // for now placeholder lets the add to cart button render without errors
  const handleAddToCart = () => {};

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        {/* only the <route> whos path matches the url renders. navbar stays on every page */}
        <Routes>
          <Route
            path="/"
            element={<CatalogPage albums={ALBUMS} onAddToCart={handleAddToCart} />}
          />
          {/* ":albumId" is a url parameter: /album/alb-03 = albumId = "alb-03" */}
          <Route
            path="/album/:albumId"
            element={<AlbumDetailPage albums={ALBUMS} onAddToCart={handleAddToCart} />}
          />
          {/* tomorrow note to self add the /checkout route here */}

          {/* any url that doesnt match anything above */}
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
    </div>
  );
}

export default App;
