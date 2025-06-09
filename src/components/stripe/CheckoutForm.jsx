import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function CheckoutForm({ onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });
    setLoading(false);
    if (error) {
      toast({ title: "Ошибка оплаты", description: error.message, variant: "destructive" });
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast({ title: "Оплата прошла успешно!" });
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: "tabs" }} />
      <Button type="submit" disabled={!stripe || loading} className="mt-4 w-full">
        {loading ? "Оплата..." : "Оплатить"}
      </Button>
    </form>
  );
} 