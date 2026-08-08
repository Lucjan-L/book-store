import { useNavigate } from "react-router-dom";

export default function CheckoutForm({
  error,
  setError,
  formData,
  setFormData,
}) {
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setError("Please fill in required fields");
      return;
    }
    // Prevent users from accessing the success page directly
    navigate("/success", {
      state: { fromCheckout: true },
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="form-fields">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
}
