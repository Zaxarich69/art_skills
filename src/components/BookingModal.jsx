import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const durations = [30, 60, 90];
const mockSlots = [
  { date: '2024-06-23', times: ['10:00', '14:00', '18:00'] },
  { date: '2024-06-24', times: ['09:00', '13:00', '17:00'] },
  { date: '2024-06-25', times: ['11:00', '15:00'] },
];

function BookingModal({ open, onClose, professional }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [comment, setComment] = useState('');
  const [paymentType, setPaymentType] = useState('stripe');
  const [isPaying, setIsPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  const pricePerHour = professional?.hourlyRate || 100;
  const price = ((pricePerHour / 60) * duration).toFixed(2);

  const availableDates = mockSlots.map(slot => slot.date);
  const availableTimes = mockSlots.find(slot => slot.date === selectedDate)?.times || [];

  const handleNext = () => {
    if (step === 1 && (!selectedDate || !selectedTime)) {
      toast({ title: 'Select a slot', description: 'Please select date and time.' });
      return;
    }
    setStep(step + 1);
  };

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      toast({ title: 'Select date and time', description: 'Please select both date and time.' });
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setSuccess(true);
      toast({ title: 'Session booked successfully!', description: 'Your session has been booked and paid.' });
    }, 1200);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setDuration(60);
    setComment('');
    setPaymentType('stripe');
    setIsPaying(false);
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book a Session with {professional?.name}</DialogTitle>
        </DialogHeader>
        {success ? (
          <div className="py-8 text-center">
            <div className="text-3xl mb-4">🎉</div>
            <div className="font-bold text-lg mb-2">Booking Confirmed!</div>
            <div className="text-muted-foreground mb-4">You will receive a confirmation email soon.</div>
            <Button onClick={handleClose} className="w-full">Close</Button>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-1">Select Date</div>
                  <select className="w-full border rounded p-2" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}>
                    <option value="">Choose a date</option>
                    {availableDates.map(date => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="font-medium mb-1">Select Time</div>
                  <select className="w-full border rounded p-2" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} disabled={!selectedDate}>
                    <option value="">Choose a time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="font-medium mb-1">Session Duration</div>
                  <select className="w-full border rounded p-2" value={duration} onChange={e => setDuration(Number(e.target.value))}>
                    {durations.map(d => (
                      <option key={d} value={d}>{d} min</option>
                    ))}
                  </select>
                </div>
                <DialogFooter>
                  <Button onClick={handleNext} className="w-full">Next</Button>
                </DialogFooter>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-1">Comment (optional)</div>
                  <Textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="What would you like to discuss?" />
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant={paymentType === 'stripe' ? 'default' : 'outline'} onClick={() => setPaymentType('stripe')} className="flex-1">Pay with Card</Button>
                  <Button variant={paymentType === 'crypto' ? 'default' : 'outline'} onClick={() => setPaymentType('crypto')} className="flex-1">Pay with Crypto</Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="font-medium">Total Price:</div>
                  <div className="font-bold">${price} USD</div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => setStep(3)}>Proceed to Payment</Button>
                </DialogFooter>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div className="font-medium mb-2">Payment</div>
                <div className="border rounded p-4 mb-2 text-center">
                  <Button className="w-full" onClick={handleBook} disabled={isPaying}>
                    {isPaying ? 'Processing...' : 'Book & Pay'}
                  </Button>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                </DialogFooter>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default BookingModal;
