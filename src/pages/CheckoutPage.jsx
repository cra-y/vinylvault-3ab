import { useState } from "react";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import OrderConfirmation from "../components/OrderConfirmation";

const TAX_RATE = 0.06; // Michigan sales tax

const EMPTY_FORM = {
  fullName: "",
  address: "",
  city: "",
  postalCode: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

/* returns an object of error messages keyed by field name. an empty object means the form is valid */
function validate(data) {
  const errors = {};

  if (data.fullName.trim().length < 2) errors.fullName = "Enter your full name.";
  if (data.address.trim() === "") errors.address = "Enter a street address.";
  if (data.city.trim() === "") errors.city = "Enter a city.";
  if (!/^\d{5}$/.test(data.postalCode.trim())) {
    errors.postalCode = "Postal code must be 5 digits.";
  }

  // allows spaces in the card number like "1234 5678 9012 3456" then check digits only
  const cardDigits = data.cardNumber.replace(/\s/g, "");
  if (!/^\d{16}$/.test(cardDigits)) errors.cardNumber = "Card number must be 16 digits.";

  const expiryMatch = data.expiry.trim().match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
  if (!expiryMatch) {
    errors.expiry = "Use MM/YY format.";
  } else {
    // card is valid through the end of its expiry month
    const month = Number(expiryMatch[1]);
    const year = 2000 + Number(expiryMatch[2]);
    const firstDayAfterExpiry = new Date(year, month, 1);
    if (firstDayAfterExpiry <= new Date()) errors.expiry = "This card has expired.";
  }

  if (!/^\d{3,4}$/.test(data.cvv.trim())) errors.cvv = "CVV must be 3 or 4 digits.";

  return errors;
}

function CheckoutPage({ cart, onClearCart }) {
  // controlled form, every inputs value lives here
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // one handler for every input. the inputs `name` attribute picks which field to update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear that fields error as soon as the user starts fixing it
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name]; // deleting from a copy so state is still immutable
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browsers full-page reload

    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // invalid: keep the cart and show errors

    onClearCart(); // lifted state in App goes back to []
    setIsSubmitted(true);
  };

  // check this before the empty cart check. the cart is already empty after a successful order
  if (isSubmitted) {
    return <OrderConfirmation fullName={formData.fullName.trim()} />;
  }

  if (cart.length === 0) {
    return (
      <div className="not-found">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary">Browse the catalog</Link>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <CheckoutForm
          formData={formData}
          errors={errors}
          total={total}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <OrderSummary cart={cart} subtotal={subtotal} tax={tax} total={total} />
      </div>
    </div>
  );
}

export default CheckoutPage;
