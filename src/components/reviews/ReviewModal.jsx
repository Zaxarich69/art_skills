import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export default function ReviewModal({ open, onClose, onSubmit, professional, sessionId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === "") return;
    setSubmitting(true);
    await onSubmit({ professionalId: professional.id, sessionId, rating, comment });
    setSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оставить отзыв о {professional.name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2 mb-4">
          {[1,2,3,4,5].map((star) => (
            <Star
              key={star}
              className={`h-7 w-7 cursor-pointer ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <Textarea
          placeholder="Ваш комментарий..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={4}
          required
        />
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={submitting || rating === 0 || !comment.trim()}>
            {submitting ? "Отправка..." : "Отправить отзыв"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 