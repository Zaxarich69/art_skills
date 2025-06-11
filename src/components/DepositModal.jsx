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
      setError('Пожалуйста, введите корректную сумму.');
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'stripe') {
        // Simulate Stripe Checkout/Elements
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        console.log('Stripe Deposit successful for amount:', amount);
        toast({
          title: "Успешно пополнено через Stripe!",
          description: `Вы пополнили баланс на ${amount} ₽.`,
        });
        onDepositSuccess(parseFloat(amount));
      } else if (paymentMethod === 'web3') {
        if (!isConnected) {
          toast({
            title: "Кошелек не подключен",
            description: "Пожалуйста, подключите свой Web3-кошелек для продолжения.",
            variant: "destructive"
          });
          onConnectWallet(); // Suggest connecting wallet
          setLoading(false);
          return;
        }

        // Simulate Web3 transaction (e.g., sending 0 ETH to self or a placeholder address)
        // In a real app, this would involve sending tokens or interacting with a smart contract
        const valueInEther = parseFloat(amount) / 1000; // Convert amount to a smaller ETH value for simulation
        if (ethBalanceData && parseFloat(ethBalanceData.formatted) < valueInEther) {
            setError(`Недостаточно ETH для оплаты комиссии. Ваш баланс: ${ethBalanceData.formatted} ETH`);
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
            title: "Пополнение через Web3 успешно!",
            description: `Транзакция отправлена. Сумма: ${amount} ₽`,
          });
          onDepositSuccess(parseFloat(amount));
        } catch (txError) {
          console.error("Web3 transaction failed:", txError);
          setError(txError.message || "Ошибка Web3 транзакции.");
          toast({
            title: "Ошибка Web3 транзакции",
            description: txError.message || "Не удалось отправить транзакцию.",
            variant: "destructive"
          });
        }
      }
    } catch (err) {
      console.error("Deposit error:", err);
      setError(err.message || "Произошла ошибка при пополнении.");
      toast({
        title: "Ошибка пополнения",
        description: err.message || "Что-то пошло не так.",
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
          <DialogTitle>Пополнить баланс</DialogTitle>
          <DialogDescription>
            Выберите способ пополнения и введите сумму.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Сумма (₽)</Label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Введите сумму"
              inputMode="decimal"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="grid gap-2">
            <Label>Способ пополнения</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Stripe (Кредитная карта, Apple Pay, Google Pay)
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
              Web3 кошелек не подключен. <Button variant="link" onClick={onConnectWallet} className="p-0 h-auto">Подключить кошелек</Button>
            </div>
          )}
           {paymentMethod === 'web3' && isConnected && ethBalanceData && (
            <div className="text-center text-sm text-muted-foreground">
              Подключен: {address.substring(0, 6)}...{address.substring(address.length - 4)}. Баланс: {ethBalanceData.formatted} {ethBalanceData.symbol}
            </div>
          )}
        </div>
        <Button onClick={handleDeposit} disabled={loading || !amount || parseFloat(amount) <= 0}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowUpRight className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Обработка...' : 'Пополнить'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal; 