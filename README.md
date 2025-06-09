# Art Skills Frontend

## Запуск

```bash
pnpm install
pnpm run dev
```

## Настройка Stripe
- Вставьте свой publishable key в `src/components/stripe/StripeButton.jsx`:
  ```js
  const stripePromise = loadStripe("pk_test_...your_publishable_key...");
  ```
- Убедитесь, что backend доступен по `/api/create-payment-intent`. 