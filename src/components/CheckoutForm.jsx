// field config so we dont repeat the same <label>/<input>/<error> markup like 7 times
const SHIPPING_FIELDS = [
  { name: "fullName", label: "Full Name", autoComplete: "name" },
  { name: "address", label: "Street Address", autoComplete: "street-address" },
  { name: "city", label: "City", autoComplete: "address-level2" },
  { name: "postalCode", label: "Postal Code", autoComplete: "postal-code", inputMode: "numeric", maxLength: 5 },
];

const PAYMENT_FIELDS = [
  { name: "cardNumber", label: "Card Number", autoComplete: "cc-number", inputMode: "numeric", maxLength: 19, placeholder: "1234 5678 9012 3456" },
  { name: "expiry", label: "Expiry (MM/YY)", autoComplete: "cc-exp", maxLength: 5, placeholder: "MM/YY" },
  { name: "cvv", label: "CVV", autoComplete: "cc-csc", inputMode: "numeric", maxLength: 4 },
];

// no state here: CheckoutPage has formData/errors and passes them down
function CheckoutForm({ formData, errors, total, onChange, onSubmit }) {
  const renderField = ({ name, label, ...inputProps }) => (
    <div className="form-group" key={name}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="text"
        value={formData[name]}   // value comes from state
        onChange={onChange}      // every keystroke goes back to state
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        className={errors[name] ? "input-error" : ""}
        {...inputProps}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="field-error">{errors[name]}</p>
      )}
    </div>
  );

  // noValidate turns off the browsers popups so our validation runs instead
  return (
    <form className="checkout-form" onSubmit={onSubmit} noValidate>
      <fieldset>
        <legend>Shipping</legend>
        {SHIPPING_FIELDS.map(renderField)}
      </fieldset>

      <fieldset>
        <legend>Payment</legend>
        <p className="form-note">Demo store: don&apos;t enter a real card number.</p>
        <div className="payment-grid">{PAYMENT_FIELDS.map(renderField)}</div>
      </fieldset>

      <button type="submit" className="btn btn-primary btn-block">
        Place Order (${total.toFixed(2)})
      </button>
    </form>
  );
}

export default CheckoutForm;
