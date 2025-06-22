# Art Skills Backend

## Getting Started

```bash
npm install
npm start
```

## Stripe Setup
- Insert your secret key into `server.js`:
  ```js
  const stripe = Stripe("sk_test_...your_secret_key...");
  ```
- Make sure port 3001 is open and accessible for the frontend. 