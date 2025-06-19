import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CreditCard, Bitcoin, Calendar, Clock, ArrowRight, 
  Check, AlertCircle, Info, ChevronRight, Lock
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { mockProfessionalsData } from '@/data/professionals';


const cryptoOptions = [
  { value: 'bitcoin', label: 'Bitcoin (BTC)' },
  { value: 'ethereum', label: 'Ethereum (ETH)' },
  { value: 'usdc', label: 'USD Coin (USDC)' },
  { value: 'usdt', label: 'Tether (USDT)' },
  { value: 'bnb', label: 'Binance Coin (BNB)' },
];

const CardPaymentForm = ({ cardName, setCardName, cardNumber, handleCardNumberChange, cardExpiry, handleExpiryChange, cardCvc, setCardCvc, saveCard, setSaveCard, isProcessing }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">Name on Card</Label>
      <Input id="name" placeholder="John Smith" value={cardName} onChange={(e) => setCardName(e.target.value)} required disabled={isProcessing} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="number">Card Number</Label>
      <Input id="number" placeholder="4242 4242 4242 4242" value={cardNumber} onChange={handleCardNumberChange} maxLength={19} required disabled={isProcessing} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="expiry">Expiry Date</Label>
        <Input id="expiry" placeholder="MM/YY" value={cardExpiry} onChange={handleExpiryChange} maxLength={5} required disabled={isProcessing} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cvc">CVC</Label>
        <Input id="cvc" placeholder="123" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} maxLength={3} required disabled={isProcessing} />
      </div>
    </div>
    <div className="flex items-center space-x-2 pt-2">
      <Checkbox id="save-card" checked={saveCard} onCheckedChange={setSaveCard} disabled={isProcessing} />
      <Label htmlFor="save-card">Save card for future payments</Label>
    </div>
  </div>
);

const CryptoPaymentForm = ({ selectedCrypto, setSelectedCrypto, totalAmount, walletAddress, toast, isProcessing, onConnectWallet }) => (
  <div className="space-y-4">
    <Button variant="outline" className="w-full" onClick={onConnectWallet} disabled={isProcessing}>
      <Bitcoin className="mr-2 h-4 w-4" /> Connect Wallet
    </Button>
    <div className="space-y-2">
      <Label htmlFor="crypto-currency">Select Cryptocurrency (after connecting wallet)</Label>
      <Select value={selectedCrypto} onValueChange={setSelectedCrypto} disabled={isProcessing}>
        <SelectTrigger><SelectValue placeholder="Select cryptocurrency" /></SelectTrigger>
        <SelectContent>
          {cryptoOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div className="p-4 bg-secondary/20 rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Send payment to (example address):</span>
        <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(walletAddress); toast({ title: "Address copied", description: "Wallet address copied to clipboard" }); }} disabled={isProcessing}>Copy</Button>
      </div>
      <div className="p-3 bg-background rounded border border-border break-all text-sm font-mono">{walletAddress}</div>
      <div className="flex items-start text-sm text-muted-foreground">
        <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
        <p>Once your wallet is connected, send exactly {totalAmount} USD worth of {selectedCrypto === 'bitcoin' ? 'BTC' : selectedCrypto === 'ethereum' ? 'ETH' : selectedCrypto.toUpperCase()} to the provided address for this transaction.</p>
      </div>
    </div>
    <div className="flex items-center space-x-2 pt-2">
      <Checkbox id="confirm-send" required disabled={isProcessing} />
      <Label htmlFor="confirm-send">I confirm that I have sent the payment (after wallet connection and transaction)</Label>
    </div>
  </div>
);

const SessionDetailsForm = ({ selectedDay, handleDayChange, selectedSlot, handleSlotChange, hours, handleHoursChange, professional, availableSlots, isProcessing }) => (
  <div className="mt-6 space-y-4">
    <h3 className="text-lg font-semibold">Session Details</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="day">Select Day</Label>
        <Select value={selectedDay} onValueChange={handleDayChange} disabled={isProcessing}>
          <SelectTrigger><SelectValue placeholder="Select day" /></SelectTrigger>
          <SelectContent>
            {professional.availability.map((avail) => (
              <SelectItem key={avail.day} value={avail.day}>{avail.day}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="time">Select Time</Label>
        <Select value={selectedSlot} onValueChange={handleSlotChange} disabled={isProcessing || availableSlots.length === 0}>
          <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
          <SelectContent>
            {availableSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="hours">Number of Hours</Label>
      <Input id="hours" type="number" min="1" max="8" value={hours} onChange={handleHoursChange} disabled={isProcessing} />
    </div>
  </div>
);

const OrderSummary = ({ professional, selectedDay, selectedSlot, hours, totalAmount }) => (
  <Card className="sticky top-24">
    <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">{professional.name}</h4>
            <p className="text-sm text-muted-foreground">{professional.title}</p>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex items-center text-sm"><Calendar className="h-4 w-4 mr-2 text-muted-foreground" /><span>{selectedDay}</span></div>
          <div className="flex items-center text-sm"><Clock className="h-4 w-4 mr-2 text-muted-foreground" /><span>{selectedSlot}</span></div>
        </div>
        <Separator />
        <div className="space-y-1">
          <div className="flex justify-between"><span className="text-muted-foreground">Hourly Rate</span><span>${professional.hourlyRate.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Hours</span><span>× {hours}</span></div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium text-lg"><span>Total</span><span>${totalAmount.toFixed(2)}</span></div>
        </div>
        <div className="pt-4 text-sm text-muted-foreground flex items-start">
          <Lock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <p>Your payment information is encrypted and secure. We never store your full card details.</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const SuccessMessage = ({ professionalName }) => (
  <Card className="glass-card">
    <CardContent className="pt-6">
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Your session with {professionalName} has been successfully booked. You will receive a confirmation email shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild><a href="/messages">Go to Messages <ChevronRight className="ml-2 h-4 w-4" /></a></Button>
          <Button variant="outline" asChild><a href="/explore">Find More Professionals</a></Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [hours, setHours] = useState(1);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  
  const [walletAddress] = useState('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'); // Example address
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundProfessional = mockProfessionalsData.find(p => p.id === parseInt(id));
      setProfessional(foundProfessional);
      if (foundProfessional && foundProfessional.availability.length > 0) {
        setSelectedDay(foundProfessional.availability[0].day);
        setAvailableSlots(foundProfessional.availability[0].slots);
        setSelectedSlot(foundProfessional.availability[0].slots[0]);
      } else if (foundProfessional) {
        setSelectedDay('N/A');
        setSelectedSlot('N/A');
      }
      setLoading(false);
    }, 500);
  }, [id]);
  
  useEffect(() => {
    if (professional && selectedDay && professional.availability.length > 0) {
      const dayAvailability = professional.availability.find(a => a.day === selectedDay);
      if (dayAvailability) {
        setAvailableSlots(dayAvailability.slots);
        setSelectedSlot(dayAvailability.slots[0]);
      } else {
        setAvailableSlots([]);
        setSelectedSlot('');
      }
    }
  }, [selectedDay, professional]);
  
  const handleDayChange = (day) => setSelectedDay(day);
  const handleSlotChange = (slot) => setSelectedSlot(slot);
  
  const handleHoursChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 8) setHours(value);
  };
  
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) parts.push(match.substring(i, i + 4));
    return parts.length ? parts.join(' ') : value;
  };
  
  const handleCardNumberChange = (e) => setCardNumber(formatCardNumber(e.target.value));
  
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    return v.length >= 2 ? `${v.substring(0, 2)}/${v.substring(2, 4)}` : v;
  };
  
  const handleExpiryChange = (e) => setCardExpiry(formatExpiry(e.target.value));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      toast({ title: "Payment Successful (Simulated)", description: `Your session with ${professional.name} has been booked.`, duration: 5000 });
      setTimeout(() => navigate('/messages'), 3000);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-10 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading payment page...</p>
        </div>
      </div>
    );
  }
  
  if (!professional) {
    return (
      <div className="pt-24 pb-10 container mx-auto px-4">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Professional Not Found</h2>
          <p className="text-muted-foreground mb-6">The professional you're looking for doesn't exist or has been removed.</p>
          <Button asChild><a href="/explore">Back to Explore</a></Button>
        </div>
      </div>
    );
  }
  
  const totalAmount = professional.hourlyRate * hours;
  
  return (
    <div className="pt-24 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Book a Session</h1>
          <p className="text-muted-foreground mb-8">Complete your booking with {professional.name}</p>
          
          {isSuccess ? <SuccessMessage professionalName={professional.name} /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>Choose your preferred payment method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <Tabs defaultValue={professional.acceptsCrypto ? "card" : "card"} value={paymentMethod} onValueChange={setPaymentMethod}>
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                          <TabsTrigger value="card" disabled={isProcessing}><CreditCard className="mr-2 h-4 w-4" />Credit Card</TabsTrigger>
                          <TabsTrigger value="crypto" disabled={!professional.acceptsCrypto || isProcessing}><Bitcoin className="mr-2 h-4 w-4" />Cryptocurrency</TabsTrigger>
                        </TabsList>
                        <TabsContent value="card">
                          <CardPaymentForm {...{cardName, setCardName, cardNumber, handleCardNumberChange, cardExpiry, handleExpiryChange, cardCvc, setCardCvc, saveCard, setSaveCard, isProcessing}} />
                        </TabsContent>
                        <TabsContent value="crypto">
                          <CryptoPaymentForm {...{selectedCrypto, setSelectedCrypto, totalAmount, walletAddress, toast, isProcessing, onConnectWallet: () => {}}} />
                        </TabsContent>
                      </Tabs>
                      <SessionDetailsForm {...{selectedDay, handleDayChange, selectedSlot, handleSlotChange, hours, handleHoursChange, professional, availableSlots, isProcessing}} />
                      <Button type="submit" className="w-full mt-6" disabled={isProcessing}>
                        {isProcessing ? <><div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground"></div>Processing...</> : <>Complete Booking <ArrowRight className="ml-2 h-4 w-4" /></>}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              <div><OrderSummary {...{professional, selectedDay, selectedSlot, hours, totalAmount}} /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;