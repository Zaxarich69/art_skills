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
      setError('Пожалуйста, введите корректную сумму.');
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'stripe') {
        // Simulate Stripe Connect withdrawal
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        console.log('Stripe Withdrawal successful for amount:', amount);
        toast({
          title: "Запрос на вывод через Stripe отправлен!",
          description: `Вывод ${amount} ₽ начнется в ближайшее время.`,
        });
        onWithdrawSuccess(parseFloat(amount));
      } else if (paymentMethod === 'web3') {
        if (!isConnected) {
          toast({
            title: "Кошелек не подключен",
            description: "Пожалуйста, подключите свой Web3-кошелек для продолжения.",
            variant: "destructive"
          });
          onConnectWallet();
          setLoading(false);
          return;
        }

        if (!recipientAddress || !isAddress(recipientAddress)) {
          setError('Пожалуйста, введите корректный адрес Web3 кошелька получателя.');
          setLoading(false);
          return;
        }

        const valueInEther = parseFloat(amount) / 1000; // Convert amount to a smaller ETH value for simulation
        if (ethBalanceData && parseFloat(ethBalanceData.formatted) < valueInEther) {
            setError(`Недостаточно ETH для оплаты комиссии. Ваш баланс: ${ethBalanceData.formatted} ETH`);
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
            title: "Вывод через Web3 успешно!",
            description: `Транзакция отправлена. Сумма: ${amount} ₽`,
          });
          onWithdrawSuccess(parseFloat(amount));
        } catch (txError) {
          console.error("Web3 withdrawal transaction failed:", txError);
          setError(txError.message || "Ошибка Web3 транзакции вывода средств.");
          toast({
            title: "Ошибка Web3 транзакции",
            description: txError.message || "Не удалось отправить транзакцию вывода средств.",
            variant: "destructive"
          });
        }
      }
    } catch (err) {
      console.error("Withdrawal error:", err);
      setError(err.message || "Произошла ошибка при выводе средств.");
      toast({
        title: "Ошибка вывода средств",
        description: err.message || "Что-то пошло не так.",
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
          <DialogTitle>Вывести средства</DialogTitle>
          <DialogDescription>
            Выберите способ вывода и введите сумму.
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
            <Label>Способ вывода</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Stripe Connect (На карту/Банковский счет)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="web3" id="web3" />
                <Label htmlFor="web3" className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" /> Web3 Transfer (На адрес кошелька)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === 'web3' && (
            <div className="grid gap-2">
              <Label htmlFor="recipientAddress">Адрес кошелька получателя</Label>
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
              Web3 кошелек не подключен. <Button variant="link" onClick={onConnectWallet} className="p-0 h-auto">Подключить кошелек</Button>
            </div>
          )}
          {paymentMethod === 'web3' && isConnected && ethBalanceData && (
            <div className="text-center text-sm text-muted-foreground">
              Подключен: {address.substring(0, 6)}...{address.substring(address.length - 4)}. Баланс: {ethBalanceData.formatted} {ethBalanceData.symbol}
            </div>
          )}
        </div>
        <Button onClick={handleWithdraw} disabled={loading || !amount || parseFloat(amount) <= 0 || (paymentMethod === 'web3' && !isAddress(recipientAddress))}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowDownLeft className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Обработка...' : 'Вывести'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal; 