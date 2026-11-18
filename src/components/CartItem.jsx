// one line in the cart. just reports clicks up to App.
function CartItem({ item, onUpdateQuantity, onRemove }) {
  const lineTotal = item.price * item.quantity;
  const atStockLimit = item.quantity >= item.stock;

  return (
    <li className="cart-item">
      <img src={item.image} alt="" className="cart-item-img" />

      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p className="artist">{item.artist}</p>
        <p className="cart-item-price">
          ${item.price.toFixed(2)} × {item.quantity} = <strong>${lineTotal.toFixed(2)}</strong>
        </p>

        <div className="qty-controls">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, -1)}
            aria-label={`Decrease quantity of ${item.title}`}
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, 1)}
            disabled={atStockLimit}
            aria-label={`Increase quantity of ${item.title}`}
          >
            +
          </button>
          <button
            type="button"
            className="btn-remove"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>

        {atStockLimit && <p className="stock-note">Max available: {item.stock}</p>}
      </div>
    </li>
  );
}

export default CartItem;
