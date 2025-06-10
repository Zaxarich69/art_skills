import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51QwnIJIBwHgFRmzKwQgZXyHf5Kbmef7U694qVxRRx7dvfjlAD9A7T2LR0bHuGie1UDC75C3uEsfcugFyPItqfRpB00s1RDYCCv"); // Замените на свой ключ

export default function StripeButton() {
  const [open, setOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000, currency: "usd" }), // 1000 = $10.00
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
      setOpen(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="rounded-xl px-5 py-2 font-bold shadow text-primary min-w-[150px] max-w-[200px] transition-all duration-200 hover:shadow-lg hover:bg-primary/5 focus-visible:shadow-lg focus-visible:bg-primary/5 focus-visible:outline-none"
        onClick={handleOpen}
        disabled={loading}
        tabIndex={0}
      >
        Connect Card
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance: { theme: "night" } }}
            >
              <CheckoutForm onClose={() => setOpen(false)} />
            </Elements>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 