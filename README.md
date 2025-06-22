# Art Skills Frontend

## Getting Started

```bash
pnpm install
pnpm run dev
```

## Stripe Setup
- Insert your publishable key into `src/components/stripe/StripeButton.jsx`:
  ```js
  const stripePromise = loadStripe("pk_test_...your_publishable_key...");
  ```
- Make sure the backend is available at `/api/create-payment-intent`. 