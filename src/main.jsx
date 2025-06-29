import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import "@/index.css";
import { ReviewsProvider } from '@/data/reviewsStore';

// RainbowKit + wagmi + react-query
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";

// RainbowKit setup with WalletConnect Project ID
const config = getDefaultConfig({
  appName: "Art Skills",
  projectId: "41a4762b14be30174b4529ad7cf3698a", 
  chains: [mainnet, polygon, optimism, arbitrum],
  ssr: false,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider theme={lightTheme()}>
          <BrowserRouter>
            <ReviewsProvider>
              <App />
            </ReviewsProvider>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
