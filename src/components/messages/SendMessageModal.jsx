import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

export default function SendMessageModal({
  open,
  onClose,
  professional,
  isAuthenticated,
  onLogin,
  onRegister,
  onMessageSent
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) setMessage("");
  }, [open, professional?.id]);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: professional.id,
          messageText: message
        })
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Message sent!", description: "Your message was delivered." });
        setMessage("");
        onClose();
        if (onMessageSent) onMessageSent(data.chatId);
      } else {
        toast({ title: "Error", description: "Failed to send message.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Network error.", variant: "destructive" });
    }
    setSending(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-background rounded-xl shadow-2xl animate-in">
        <DialogHeader>
          <DialogTitle>Send a Message</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={professional.image} alt={professional.name} />
            <AvatarFallback>{professional.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{professional.name}</div>
            <div className="text-muted-foreground text-sm">{professional.title}</div>
          </div>
        </div>
        {!isAuthenticated ? (
          <div className="text-center py-8">
            <div className="mb-4 text-lg font-semibold">Please login to send messages</div>
            <div className="flex gap-2 justify-center">
              <Button onClick={onLogin} variant="default">Login</Button>
              <Button onClick={onRegister} variant="outline">Register</Button>
            </div>
          </div>
        ) : (
          <>
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              className="mb-4"
              autoFocus
            />
            <DialogFooter>
              <Button
                onClick={handleSend}
                disabled={sending || !message.trim()}
                className="w-full"
              >
                {sending ? "Sending..." : "Send"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
} 