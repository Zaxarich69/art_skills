# Art Skills Backend

## Запуск

```bash
npm install
npm start
```

## Настройка Stripe
- Вставьте свой secret key в `server.js`:
  ```js
  const stripe = Stripe("sk_test_...your_secret_key...");
  ```
- Убедитесь, что порт 3001 открыт и доступен для фронтенда. 