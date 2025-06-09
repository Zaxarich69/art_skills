
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe("pk_test_51QwnIJIBwHgFRmzKwQgZXyHf5Kbmef7U694qVxRRx7dvfjlAD9A7T2LR0bHuGie1UDC75C3uEsfcugFyPItqfRpB00s1RDYCCv");

export default function StripeButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="md"
        className="rounded-xl px-5 py-2 font-bold shadow text-primary min-w-[150px] max-w-[200px]"
        onClick={() => setOpen(true)}
      >
        Connect Card
      </Button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-white rounded-xl p-8 min-w-[350px]">
            <Elements stripe={stripePromise}>
              <CheckoutForm onClose={() => setOpen(false)} />
            </Elements>
          </div>
        </div>
      )}
    </>
  );
}
