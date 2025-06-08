import React from "react";

const CryptoWallets = ({ wallets }) => (
  <div>
    <h3>Your Crypto Wallets</h3>
    <ul>
      {wallets && wallets.length
        ? wallets.map((w, i) => <li key={i}>{w.address}</li>)
        : <li>No wallets connected</li>
      }
    </ul>
  </div>
);

export default CryptoWallets;
