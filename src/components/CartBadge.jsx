// display-only. the count comes from App so it stays correct on every route
function CartBadge({ count, onClick }) {
  return (
    <button
      type="button"
      className="cart-badge-btn"
      onClick={onClick}
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <span aria-hidden="true">🛒</span>
      <span className="cart-badge">{count}</span>
    </button>
  );
}

export default CartBadge;
