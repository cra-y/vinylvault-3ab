import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

function CartDrawer({ cart, isOpen, cartCount, onClose, onUpdateQuantity, onRemove }) {
  const navigate = useNavigate();

  // taken from props on every render so its always in sync with the cart
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    onClose();
    navigate("/checkout"); // client-side navigation, no page reload
  };

  /* the drawer is always rendered. the "open" class slides it in with CSS. `inert` stops people tabbing into the drawer while it's hidden off screen */
  return (
    <div className={`drawer-root ${isOpen ? "open" : ""}`} inert={!isOpen}>
      <div className="drawer-overlay" onClick={onClose} />

      <aside className="drawer-panel" aria-label="Shopping cart">
        <div className="drawer-header">
          <h2>Your Cart ({cartCount})</h2>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close cart">
            &times;
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
