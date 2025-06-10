import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from '@/components/ui/button';

export default function ConnectWalletButton() {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => (
        <Button
          variant="outline"
          size="sm" // или "md" — подбери нужный размер
          className="rounded-xl px-5 py-2 font-bold shadow text-primary min-w-[150px] max-w-[200px] transition-all duration-200 hover:shadow-lg hover:bg-primary/5 focus-visible:shadow-lg focus-visible:bg-primary/5 focus-visible:outline-none"
          onClick={openConnectModal}
        >
          Connect Wallet
        </Button>
      )}
    </ConnectButton.Custom>
  );
}
