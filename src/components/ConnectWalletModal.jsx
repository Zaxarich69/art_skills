import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ethers } from 'ethers';

const ConnectWalletModal = ({ isOpen, setIsOpen }) => {
  const { toast } = useToast();

  // Реальное подключение MetaMask
  const handleMetaMaskConnect = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask extension in your browser",
        variant: "destructive",
      });
      return;
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      toast({
        title: "MetaMask connected!",
        description: `Your adress: ${address}`,
        variant: "default",
      });
      setIsOpen(false);
    } catch (e) {
      toast({
        title: "Connecting Error",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  // Заглушка для WalletConnect
  const handleWalletConnect = () => {
    toast({
      title: "WalletConnect",
      description: "Подключение WalletConnect пока не реализовано.",
      variant: "default",
    });
  };

  // Заглушка для Coinbase Wallet
  const handleCoinbaseConnect = () => {
    toast({
      title: "Coinbase Wallet",
      description: "Подключение Coinbase Wallet пока не реализовано.",
      variant: "default",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Crypto Wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect. This will allow you to make and receive crypto payments.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="w-full justify-start text-left py-6"
            onClick={handleMetaMaskConnect}
          >
            <img alt="MetaMask logo" className="w-6 h-6 mr-3" src="https://images.unsplash.com/photo-1642403711604-3908e90960ce" />
            MetaMask
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-left py-6"
            onClick={handleWalletConnect}
          >
            <img alt="WalletConnect logo" className="w-6 h-6 mr-3" src="https://images.unsplash.com/photo-1626682561113-d1db402cc866" />
            WalletConnect
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-left py-6"
            onClick={handleCoinbaseConnect}
          >
            <img alt="Coinbase Wallet logo" className="w-6 h-6 mr-3" src="https://images.unsplash.com/photo-1568092715422-fff34eabbe84" />
            Coinbase Wallet
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletModal;