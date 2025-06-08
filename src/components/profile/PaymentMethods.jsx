import React from "react";

const PaymentMethods = ({ methods }) => (
  <div>
    <h3>Your Payment Methods</h3>
    <ul>
      {methods && methods.length
        ? methods.map((m, i) => <li key={i}>{m.type}: {m.value}</li>)
        : <li>No payment methods added</li>
      }
    </ul>
  </div>
);

export default PaymentMethods;
