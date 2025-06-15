import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Bitcoin, Wallet, Loader2, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAccount, useConnect, useSendTransaction, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { parseEther } from 'viem';

const DepositModal = ({ isOpen, setIsOpen, onDepositSuccess, onConnectWallet }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
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
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleDeposit = async () => {
    setError(null);
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'stripe') {
        // --- Stripe (Web2) Integration ---
        // Implement your Stripe checkout.session or paymentIntent logic here.
        // Example: Call your backend API to create a Stripe Checkout Session
        // const response = await fetch('/api/create-stripe-checkout-session', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ amount: parseFloat(amount) * 100, currency: 'rub' }), // Convert to cents
        // });
        // const { sessionId } = await response.json();
        // const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        // await stripe.redirectToCheckout({ sessionId });
        // After successful payment on Stripe, your backend should notify your app
        // (e.g., via a webhook) to update the user's balance and transaction history.
        // For this simulation, we'll directly call onDepositSuccess.

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        console.log('Stripe Deposit successful for amount:', amount);
        toast({
          title: "Successfully topped up via Stripe!",
          description: `You have topped up your balance by ${amount} ₽.`,
        });
        onDepositSuccess(parseFloat(amount));
      } else if (paymentMethod === 'web3') {
        // --- Web3 (Crypto) Integration ---
        if (!isConnected) {
          toast({
            title: "Wallet Not Connected",
            description: "Please connect your Web3 wallet to proceed.",
            variant: "destructive"
          });
          onConnectWallet(); // Suggest connecting wallet
          setLoading(false);
          return;
        }

        // For USDT/USDC or other tokens, you would interact with their ERC-20 contract methods.
        // Example for ERC-20 (assuming you have the contract ABI and address):
        // const erc20Contract = getContract({
        //   address: '0xYourTokenContractAddress',
        //   abi: erc20ABI, // Your ERC-20 ABI
        //   walletClient: wagmi.getWalletClient(), // Use a wallet client
        // });
        // const tx = await erc20Contract.write.transfer(['0xRecipientAddress', parseUnits(amount, tokenDecimals)]);

        // Current simulation uses native coin (ETH) transaction
        const valueInEther = parseFloat(amount) / 1000; // Convert amount to a smaller ETH value for simulation
        if (ethBalanceData && parseFloat(ethBalanceData.formatted) < valueInEther) {
            setError(`Insufficient ETH balance. Your balance: ${ethBalanceData.formatted} ${ethBalanceData.symbol}`);
            setLoading(false);
            return;
        }

        try {
          const tx = await sendTransactionAsync({
            to: '0x70997970C51812dc3A0108C7F96CEb22B14605c3', // Placeholder address for simulation
            value: parseEther(valueInEther.toString()),
          });
          console.log('Web3 transaction sent:', tx);
          await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate transaction confirmation
          
          toast({
            title: "Web3 Top-up Successful!",
            description: `Transaction sent. Amount: ${amount} ₽`,
          });
          onDepositSuccess(parseFloat(amount));
        } catch (txError) {
          console.error("Web3 transaction failed:", txError);
          setError(txError.message || "Web3 transaction error.");
          toast({
            title: "Web3 Transaction Error",
            description: txError.message || "Failed to send transaction.",
            variant: "destructive"
          });
        }
      }
    } catch (err) {
      console.error("Deposit error:", err);
      setError(err.message || "An error occurred during top-up.");
      toast({
        title: "Top-up Error",
        description: err.message || "Something went wrong.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setAmount('');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Top Up Balance</DialogTitle>
          <DialogDescription>
            Select a payment method and enter the amount.
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
            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Stripe / Bank Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="web3" id="web3" />
                <Label htmlFor="web3" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" /> Web3 (Metamask, WalletConnect)
                </Label>
              </div>
            </RadioGroup>
          </div>

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
        <Button onClick={handleDeposit} disabled={loading || !amount || parseFloat(amount) <= 0}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowUpRight className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Processing...' : 'Top Up'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal; 