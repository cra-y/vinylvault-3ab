# VinylVault – Indie Record Online Store

A single-page React application for browsing, filtering, and purchasing vinyl records. Built with React + Vite and `react-router-dom` for client-side routing.

---

## 1. Project Setup & Execution Instructions

### Prerequisites
- **Node.js v22 LTS or newer** (meets the course's v21+ requirement; current Vite needs v20.19+ or v22.12+). Check with `node -v`.
- **npm v10+** Check with `npm -v`.
- **Git**, to clone the repository.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/cra-y/vinylvault-3ab.git
   ```
2. Go into the project root:
   ```bash
   cd vinylvault-3ab
   ```
3. Install dependencies (React, Vite, and `react-router-dom`):
   ```bash
   npm install
   ```

### Running the Development Server
1. Start the Vite dev server:
   ```bash
   npm run dev
   ```
2. The terminal prints a local URL (usually `http://localhost:5173`). Open it in a browser.
3. **Verify it works:** the catalog page loads with the album grid and genre filter buttons. Clicking an album opens `/album/<id>`, the cart icon in the header opens the cart drawer, and "Proceed to Checkout" opens `/checkout`.
4. Press `Ctrl + C` in the terminal to stop the server.

### Directory Structure Overview
All application code lives in `src/`, where `main.jsx` mounts the app inside the router and `App.jsx` owns the shared cart state and route definitions. `src/components/` holds reusable UI pieces like the navbar, album cards, and cart drawer, while `src/pages/` holds the three routed views (catalog, album detail, and checkout). `src/data/albums.js` contains the album data (artist, genre, price, specs, and tracklist), and `src/assets/` stores any local media. Config files such as `index.html`, `vite.config.js`, and `package.json` sit at the project root.

---

## 2. React Component Hierarchy & State Flow Architecture

### Data Model (`src/data/albums.js`)
Each album object in the `ALBUMS` array:
```
{
  id: String,            // e.g. "alb-01"
  title: String,
  artist: String,
  genre: String,         // "Jazz" | "Electronic" | "Rock" | "Classical"
  price: Number,
  stock: Number,
  image: String,         // URL
  description: String,
  specs: { catalogNumber: String, weight: String, speed: String, label: String },
  tracklist: Array<String>
}
```
A **cart item** is an album object plus a quantity: `{ ...album, quantity: Number }`.

### Legend
- **File:** where the component lives
- **State:** `useState` owned by this component (name [type]: purpose)
- **Props:** received from the parent (name [type])
- **Callbacks:** functions passed across component boundaries
- **ROUTED:** rendered by React Router when the URL matches

### Component Tree

- **`<main.jsx>`** → `src/main.jsx`
  - Wraps `<App />` in `<BrowserRouter>` to enable client-side routing.

- **`<App />`** → `src/App.jsx`
  - **State:**
    - `cart` [Array<CartItem>]: line items in the cart (lifted so all routes share it)
    - `isCartOpen` [Boolean]: controls the drawer's visibility
  - **Derived values:** `totalCartCount` [Number] = sum of every item's `quantity` (shared by the badge and the drawer)
  - **Handlers defined here (all immutable updates):**
    - `handleAddToCart(album)`: adds a new item or increments an existing one (`.map` / spread), never past `album.stock`; also opens the drawer
    - `handleUpdateQuantity(albumId, delta)`: changes quantity by ±1 (capped at `stock`) and removes the item at 0 (`.map` + `.filter`)
    - `handleRemoveFromCart(albumId)`: deletes the line item (`.filter`)
    - `handleClearCart()`: resets `cart` to `[]` after checkout
    - `handleOpenCart()` / `handleCloseCart()`: toggle `isCartOpen`

  - **`<Navbar>`** → `src/components/Navbar.jsx` (sticky header)
    - **Props:** `cartCount` [Number]
    - **Callbacks:** `onOpenCart()`
    - Logo is a `<Link to="/">`.
    - **`<CartBadge>`** → `src/components/CartBadge.jsx` (cart button with item count)
      - **Props:** `count` [Number] (receives `cartCount` from Navbar)
      - **Callbacks:** `onClick()` (receives `onOpenCart` from Navbar, sets `isCartOpen` to `true` in App)
      - **State:** none (display only; the count comes from App, so it stays in sync on every route)

  - **`<Routes>`**
    - **`<Route path="/">` → `<CatalogPage>`** (ROUTED) → `src/pages/CatalogPage.jsx`
      - **Props:** `albums` [Array<Album>], `onAddToCart` [Function(album)]
      - **State:** `selectedGenre` [String]: active filter, default `"All"`
      - **Derived:** `filteredAlbums` [Array<Album>] = `albums.filter(...)` by `selectedGenre`
      - **`<CatalogHero>`** → `src/components/CatalogHero.jsx`: static banner, no props
      - **`<GenreFilterBar>`** → `src/components/GenreFilterBar.jsx`
        - **Props:** `genres` [Array<String>], `selectedGenre` [String]
        - **Callbacks:** `onSelectGenre(genre)` → calls `setSelectedGenre` in CatalogPage
      - **`<AlbumGrid>`** → `src/components/AlbumGrid.jsx` (responsive CSS Grid)
        - **Props:** `albums` [Array<Album>], `onAddToCart` [Function]
        - **`<AlbumCard>`** (one per album via `.map()`, `key={album.id}`) → `src/components/AlbumCard.jsx`
          - **Props:** `album` [Object<Album>]
          - **Callbacks:** `onAddToCart(album)`
          - Image/title wrapped in `<Link to={`/album/${album.id}`}>`

    - **`<Route path="/album/:albumId">` → `<AlbumDetailPage>`** (ROUTED) → `src/pages/AlbumDetailPage.jsx`
      - **Props:** `albums` [Array<Album>]
      - **Callbacks:** `onAddToCart(album)` (adds the displayed album to the cart in App)
      - **State:** none (the URL decides which album is shown, so refreshing or sharing the link still works)
      - **Hooks:** `useParams()` → `albumId` [String]; finds the album with `albums.find(a => a.id === albumId)`
      - **Edge case:** an invalid `albumId` renders an "Album not found" message with a `<Link>` back to `/`
      - Includes a `<Link to="/">` "Back to catalog" for client-side back navigation
      - **`<AlbumSpecs>`** → `src/components/AlbumSpecs.jsx`
        - **Props:** `specs` [Object: { catalogNumber, weight, speed, label }], `stock` [Number]
        - **State:** none (display only)
        - Derives stock status text from `stock` (e.g. "Only 3 left" when ≤ 5)
      - **`<Tracklist>`** → `src/components/Tracklist.jsx`
        - **Props:** `tracks` [Array<String>] (receives `album.tracklist`)
        - **State:** none; renders an ordered list using `.map()` with `key={track}`

    - **`<Route path="/checkout">` → `<CheckoutPage>`** (ROUTED) → `src/pages/CheckoutPage.jsx`
      - Reached from the CartDrawer via `useNavigate()`
      - **Props:** `cart` [Array<CartItem>]
      - **Callbacks:** `onClearCart()`
      - **State:**
        - `formData` [Object]: `{ fullName, address, city, postalCode, cardNumber, expiry, cvv }` [all Strings] (all controlled inputs)
        - `errors` [Object]: validation messages keyed by field name (empty object = valid)
        - `isSubmitted` [Boolean]: switches to the confirmation view
      - **Derived:** `subtotal`, `tax` (6%), `total` [Number] from `cart`
      - **Handlers (local):** `handleChange(e)` (one handler for all fields via the input's `name`), `handleSubmit(e)` (`preventDefault` → `validate(formData)` → stop if errors → `onClearCart()` → `setIsSubmitted(true)`)
      - **Validation rules:** name ≥ 2 chars; address and city required; 5-digit postal code; 16-digit card number; MM/YY expiry not in the past; 3–4 digit CVV
      - **Edge case:** an empty cart (and no completed order) shows a "Your cart is empty" message with a `<Link>` to `/`
      - **`<CheckoutForm>`** → `src/components/CheckoutForm.jsx` (rendered while `isSubmitted` is `false`)
        - **Props:** `formData` [Object], `errors` [Object], `total` [Number] (shown on the submit button)
        - **Callbacks:** `onChange(e)` (receives `handleChange`), `onSubmit(e)` (receives `handleSubmit`)
        - **State:** none (inputs are controlled by `formData`, which CheckoutPage owns)
      - **`<OrderSummary>`** → `src/components/OrderSummary.jsx` (rendered while `isSubmitted` is `false`)
        - **Props:** `cart` [Array<CartItem>], `subtotal` [Number], `tax` [Number], `total` [Number]
        - **State:** none (totals come from CheckoutPage so the summary and submit button always match)
      - **`<OrderConfirmation>`** → `src/components/OrderConfirmation.jsx` (rendered when `isSubmitted` is `true`)
        - **Props:** `fullName` [String] (from `formData`, because the cart is already cleared at this point)
        - **State:** none; includes a `<Link to="/">` to keep shopping

  - **`<CartDrawer>`** → `src/components/CartDrawer.jsx` (rendered outside `<Routes>` so it's available on every page)
    - **Props:** `cart` [Array<CartItem>], `isOpen` [Boolean], `cartCount` [Number]
    - **Callbacks:** `onClose()`, `onUpdateQuantity(albumId, delta)`, `onRemove(albumId)`
    - **Hooks:** `useNavigate()` for "Proceed to Checkout" (`onClose()` then `navigate("/checkout")`)
    - **Derived:** `subtotal` [Number] = Σ `price × quantity`
    - Always rendered; an `open` class slides the panel in with a CSS transform, and clicking the overlay calls `onClose()`
    - **`<CartItem>`** (one per cart item via `.map()`) → `src/components/CartItem.jsx`
      - **Props:** `item` [Object<CartItem>]
      - **Callbacks:** `onUpdateQuantity(item.id, ±1)`, `onRemove(item.id)`
      - **State:** none; the + button is disabled when `quantity` reaches `stock`

### State Flow Summary
`cart` and `isCartOpen` are in `App` because several components that aren't parent and child need them at once: the Navbar badge, the CartDrawer, the catalog and detail pages, and the checkout page. Lifting that state to the nearest common ancestor gives everyone a single source so the badge and drawer can never disagree. Data flows down as props, and events flow up through callbacks. A callback is a function defined in the parent and passed to a child, which calls it to report an action. The parent then updates its own state with operations (`.map()`, `.filter()`, spread), and React re-renders every component that depends on that state.