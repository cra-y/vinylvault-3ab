// review of the cart. totals are calculated once in CheckoutPage and passed in so the summary and the submit button always show the same number
function OrderSummary({ cart, subtotal, tax, total }) {
  return (
    <aside className="order-summary">
      <h2>Order Summary</h2>
      <ul className="summary-list">
        {cart.map((item) => (
          <li key={item.id} className="summary-row">
            <span>
              {item.title} <span className="muted">× {item.quantity}</span>
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Tax (6%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="summary-row summary-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </aside>
  );
}

export default OrderSummary;
