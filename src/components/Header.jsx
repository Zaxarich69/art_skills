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
            variant="outline"
            size="sm"
            className="rounded-xl px-5 py-2 font-bold shadow text-primary min-w-[150px] max-w-[200px]"
            onClick={openConnectModal}
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
