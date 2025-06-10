import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from '@/components/ui/button';



export default function Header() {
  return (
    <div className="flex items-center gap-3">
      {/* Кнопка кошелька */}
      <ConnectButton.Custom>
        {({ openConnectModal }) => (
          <Button
            variant="default"
            size="sm"
            className="rounded-xl px-5 py-2 font-bold shadow min-w-[150px] max-w-[200px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            onClick={openConnectModal}
            tabIndex={0}
          >
            Connect Wallet
          </Button>
        )}
      </ConnectButton.Custom>
      {/* Кнопка карты от Stripe */}
      <StripeButton />
    </div>
  );
}
