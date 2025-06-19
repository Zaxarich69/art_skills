import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Bitcoin, Wallet, Loader2, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSendTransaction, useBalance } from "wagmi";
import { parseEther } from "viem";
import ConnectWalletButton from './ConnectWalletButton';

const DepositModal = ({ isOpen, setIsOpen, onDepositSuccess }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('web3');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const { address, isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const { data: ethBalanceData } = useBalance({ address: address, unit: 'ether' });

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleDeposit = async () => {
    setError(null);
    if (!amount || parseFloat(amount) <= 0) {
      setError('Введите корректную сумму.');
      return;
    }
    setLoading(true);
    try {
      if (paymentMethod === 'stripe') {
        toast({
          title: 'В разработке',
          description: 'Пополнение через карту временно недоступно.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      } else if (paymentMethod === 'web3') {
        if (!isConnected) {
          toast({
            title: 'Кошелек не подключен',
            description: 'Сначала подключите Web3-кошелек.',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }
        const valueInEther = parseFloat(amount) / 1000;
        if (ethBalanceData && parseFloat(ethBalanceData.formatted) < valueInEther) {
          setError(`Недостаточно средств. Ваш баланс: ${ethBalanceData.formatted} ${ethBalanceData.symbol}`);
          setLoading(false);
          return;
        }
        try {
          const tx = await sendTransactionAsync({
            to: '0x70997970C51812dc3A0108C7F96CEb22B14605c3', // Замените на свой адрес
            value: parseEther(valueInEther.toString()),
          });
          await new Promise(resolve => setTimeout(resolve, 2000));
          toast({
            title: 'Успешно!',
            description: `Транзакция отправлена. Сумма: ${amount} ₽`,
          });
          onDepositSuccess(parseFloat(amount));
        } catch (txError) {
          setError(txError.message || 'Ошибка Web3-транзакции.');
          toast({
            title: 'Ошибка Web3',
            description: txError.message || 'Не удалось отправить транзакцию.',
            variant: 'destructive',
          });
        }
      }
    } catch (err) {
      setError(err.message || 'Ошибка пополнения.');
      toast({
        title: 'Ошибка',
        description: err.message || 'Что-то пошло не так.',
        variant: 'destructive',
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
              disabled={paymentMethod === 'stripe'}
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
                  <Wallet className="h-4 w-4 animate-pulse text-purple-600" /> Web3 (Metamask, WalletConnect)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === 'web3' && (
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <ConnectButton />
              {isConnected && ethBalanceData && (
                <div>
                  Баланс: {ethBalanceData.formatted} {ethBalanceData.symbol}
                </div>
              )}
            </div>
          )}
        </div>
        <Button
          onClick={handleDeposit}
          disabled={loading || !amount || parseFloat(amount) <= 0 || (paymentMethod === 'stripe') || (paymentMethod === 'web3' && !isConnected)}
          className={paymentMethod === 'web3' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowUpRight className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Processing...' : paymentMethod === 'stripe' ? 'В разработке' : 'Top Up'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal; 