import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Bitcoin, Loader2, Banknote, ArrowDownLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAccount, useConnect, useSendTransaction, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { parseEther, isAddress } from 'viem';

const WithdrawModal = ({ isOpen, setIsOpen, onWithdrawSuccess, onConnectWallet }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: injected(),
  });
  const { sendTransactionAsync } = useSendTransaction();
  const { data: ethBalanceData } = useBalance({ address: address, unit: 'ether' });

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleRecipientAddressChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const handleWithdraw = async () => {
    setError(null);
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'stripe') {
        // --- Stripe (Web2) Integration ---
        // Implement your Stripe Connect or Payout logic here.
        // This would typically involve calling your backend API.
        // Example: const response = await fetch('/api/create-stripe-payout', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ amount: parseFloat(amount) * 100, currency: 'rub', destination: 'acct_your_connected_account_id' }),
        // });
        // const result = await response.json();
        // After initiating payout, your backend should notify your app
        // to update the user's balance and transaction history with a 'pending' status.
        // For this simulation, we'll directly call onWithdrawSuccess.

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        console.log('Stripe Withdrawal initiated for amount:', amount);
        toast({
          title: "Stripe Withdrawal Request Sent!",
          description: `Withdrawal of ${amount} ₽ will start soon.`,
        });
        onWithdrawSuccess(parseFloat(amount));
      } else if (paymentMethod === 'web3') {
        // --- Web3 (Crypto) Integration ---
        if (!isConnected) {
          toast({
            title: "Wallet Not Connected",
            description: "Please connect your Web3 wallet to proceed.",
            variant: "destructive"
          });
          onConnectWallet();
          setLoading(false);
          return;
        }

        if (!recipientAddress || !isAddress(recipientAddress)) {
          setError('Please enter a valid Web3 recipient wallet address.');
          setLoading(false);
          return;
        }

        // For USDT/USDC or other tokens, you would interact with their ERC-20 contract methods to transfer tokens.
        // Current simulation uses native coin (ETH) transaction for simplicity.
        const valueInEther = parseFloat(amount) / 1000; // Convert amount to a smaller ETH value for simulation
        if (ethBalanceData && parseFloat(ethBalanceData.formatted) < valueInEther) {
            setError(`Insufficient ETH balance for gas fees. Your balance: ${ethBalanceData.formatted} ${ethBalanceData.symbol}`);
            setLoading(false);
            return;
        }

        try {
          const tx = await sendTransactionAsync({
            to: recipientAddress,
            value: parseEther(valueInEther.toString()),
          });
          console.log('Web3 withdrawal transaction sent:', tx);
          await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate transaction confirmation
          
          toast({
            title: "Web3 Withdrawal Successful!",
            description: `Transaction sent. Amount: ${amount} ₽`,
          });
          onWithdrawSuccess(parseFloat(amount));
        } catch (txError) {
          console.error("Web3 withdrawal transaction failed:", txError);
          setError(txError.message || "Web3 withdrawal transaction error.");
          toast({
            title: "Web3 Transaction Error",
            description: txError.message || "Failed to send withdrawal transaction.",
            variant: "destructive"
          });
        }
      }
    } catch (err) {
      console.error("Withdrawal error:", err);
      setError(err.message || "An error occurred during withdrawal.");
      toast({
        title: "Withdrawal Error",
        description: err.message || "Something went wrong.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setAmount('');
      setRecipientAddress('');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Select a withdrawal method and enter the amount.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (₽)</Label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              inputMode="decimal"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="grid gap-2">
            <Label>Withdrawal Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> To Bank Card (Stripe)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="web3" id="web3" />
                <Label htmlFor="web3" className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" /> To Crypto Wallet (Web3)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === 'web3' && (
            <div className="grid gap-2">
              <Label htmlFor="recipientAddress">Recipient Wallet Address</Label>
              <Input
                id="recipientAddress"
                type="text"
                value={recipientAddress}
                onChange={handleRecipientAddressChange}
                placeholder="0x..."
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          )}

          {paymentMethod === 'web3' && !isConnected && (
            <div className="text-center text-sm text-muted-foreground">
              Web3 wallet not connected. <Button variant="link" onClick={onConnectWallet} className="p-0 h-auto">Connect Wallet</Button>
            </div>
          )}
          {paymentMethod === 'web3' && isConnected && ethBalanceData && (
            <div className="text-center text-sm text-muted-foreground">
              Connected: {address.substring(0, 6)}...{address.substring(address.length - 4)}. Balance: {ethBalanceData.formatted} {ethBalanceData.symbol}
            </div>
          )}
        </div>
        <Button onClick={handleWithdraw} disabled={loading || !amount || parseFloat(amount) <= 0 || (paymentMethod === 'web3' && !isAddress(recipientAddress))}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowDownLeft className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Processing...' : 'Withdraw'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal; 