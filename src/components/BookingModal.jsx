import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useConnectModal } from '@rainbow-me/rainbowkit';

function getNearestDates(count = 5) {
  const result = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    result.push(date.toISOString().slice(0, 10));
  }
  return result;
}

function getNearestTimes(count = 5) {
  const slots = [];
  const now = new Date();
  let hour = Math.max(9, now.getHours() + 1);
  for (let i = 0; i < count; i++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    hour++;
    if (hour > 20) hour = 9;
  }
  return slots;
}

const durations = [30, 60, 90];

export default function BookingModal({ open, onClose, professional }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [comment, setComment] = useState('');
  const [paymentType, setPaymentType] = useState('crypto');
  const [isPaying, setIsPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const { openConnectModal } = useConnectModal();

  const availableDates = getNearestDates(5);
  const availableTimes = getNearestTimes(5);

  const pricePerHour = professional?.hourlyRate || 100;
  const price = ((pricePerHour / 60) * duration).toFixed(2);

  function handleCryptoPay() {
    openConnectModal && openConnectModal();
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setSuccess(true);
    }, 1500);
  }

  function handleStripePay() {
    toast({
      title: 'Stripe (Card) скоро!',
      description: 'Оплата банковской картой будет доступна при подключении Stripe.',
      variant: "default",
    });
  }

  function handleNext() {
    if (step === 1 && (!selectedDate || !selectedTime)) {
      toast({ title: 'Выберите дату и время', description: 'Нужно выбрать оба значения.' });
      return;
    }
    setStep(step + 1);
  }

  function handleClose() {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setDuration(60);
    setComment('');
    setPaymentType('crypto');
    setIsPaying(false);
    setSuccess(false);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-md bg-[rgba(30,30,60,0.92)] border-none shadow-2xl"
        style={{
          backdropFilter: 'blur(16px)',
          color: '#f3f3fa',
          fontSize: '15px',
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">
            Book a Session with {professional?.name}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center animate-fade-in">
            <div className="text-4xl mb-4">🎉</div>
            <div className="font-bold text-lg mb-2" style={{color: '#fff'}}>Booking Confirmed!</div>
            <div className="text-muted-foreground mb-4">You will receive a confirmation email soon.</div>
            <Button onClick={handleClose} className="w-full mt-4 bg-primary text-white">Close</Button>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <div className="font-semibold mb-1 text-base" style={{color: '#f7f7ff'}}>Select Date</div>
                  <select
                    className="w-full rounded p-2 bg-[#19192d] text-white border border-[#715bf7]"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                  >
                    <option value="">Choose a date</option>
                    {availableDates.map(date => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="font-semibold mb-1 text-base" style={{color: '#f7f7ff'}}>Select Time</div>
                  <select
                    className="w-full rounded p-2 bg-[#19192d] text-white border border-[#715bf7]"
                    value={selectedTime}
                    onChange={e => setSelectedTime(e.target.value)}
                    disabled={!selectedDate}
                  >
                    <option value="">Choose a time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="font-semibold mb-1 text-base" style={{color: '#f7f7ff'}}>Session Duration</div>
                  <select
                    className="w-full rounded p-2 bg-[#19192d] text-white border border-[#715bf7]"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                  >
                    {durations.map(d => (
                      <option key={d} value={d}>{d} min</option>
                    ))}
                  </select>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-[#715bf7] to-[#3eb4fa] hover:brightness-125 text-base"
                  >Next</Button>
                </DialogFooter>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <div className="font-semibold mb-1 text-base" style={{color: '#f7f7ff'}}>Comment (optional)</div>
                  <Textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="What would you like to discuss?"
                    className="bg-[#19192d] text-white border border-[#715bf7]"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={paymentType === 'stripe' ? 'default' : 'outline'}
                    className={`flex-1 ${paymentType === 'stripe' ? 'bg-primary text-white' : 'text-white'}`}
                    onClick={() => setPaymentType('stripe')}
                  >
                    Pay with Card
                  </Button>
                  <Button
                    variant={paymentType === 'crypto' ? 'default' : 'outline'}
                    className={`flex-1 ${paymentType === 'crypto' ? 'bg-[#19cf95] text-white' : 'text-white border-[#19cf95]'}`}
                    onClick={() => setPaymentType('crypto')}
                  >
                    Pay with Crypto
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 text-base">
                  <span className="font-semibold">Total Price:</span>
                  <span className="font-bold text-accent" style={{color:'#fff'}}>${price} USD</span>
                </div>
                <DialogFooter>
                  <Button variant="outline" className="text-white" onClick={() => setStep(1)}>Back</Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="bg-gradient-to-r from-[#715bf7] to-[#3eb4fa] hover:brightness-125 text-base"
                  >Proceed to Payment</Button>
                </DialogFooter>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <div className="font-semibold text-base mb-2" style={{color: '#f7f7ff'}}>Payment</div>
                {paymentType === 'crypto' ? (
                  <Button
                    className="w-full bg-[#19cf95] hover:brightness-110 text-base"
                    onClick={handleCryptoPay}
                    disabled={isPaying}
                  >{isPaying ? 'Processing...' : 'Pay with Web3 Wallet'}</Button>
                ) : (
                  <Button
                    className="w-full bg-primary hover:brightness-110 text-base"
                    onClick={handleStripePay}
                  >Pay with Card (Coming soon)</Button>
                )}
                <DialogFooter>
                  <Button variant="outline" className="text-white" onClick={() => setStep(2)}>Back</Button>
                </DialogFooter>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
