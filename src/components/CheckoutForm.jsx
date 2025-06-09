
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

export default function CheckoutForm({ onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("http://localhost:8080/api/create-payment-intent", { method: "POST" });
    const { clientSecret } = await res.json();
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setSuccess(true);
      setTimeout(onClose, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <CardElement options={{ hidePostalCode: true }} />
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success ? (
        <div className="text-green-600">Payment Successful!</div>
      ) : (
        <Button type="submit" disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay"}
        </Button>
      )}
      <Button variant="ghost" onClick={onClose} type="button" className="ml-2">
        Cancel
      </Button>
    </form>
  );
}
