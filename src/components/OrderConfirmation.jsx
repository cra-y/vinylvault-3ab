import { Link } from "react-router-dom";

// shown after a successful order. uses the name from the form because the cart is already empty
function OrderConfirmation({ fullName }) {
  return (
    <div className="order-confirmation" role="status">
      <h1>Order placed!</h1>
      <p>Thanks, {fullName}. Your records are being packed and will ship soon.</p>
      <Link to="/" className="btn btn-primary">Keep shopping</Link>
    </div>
  );
}

export default OrderConfirmation;
