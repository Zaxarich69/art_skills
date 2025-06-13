import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, MapPin, PlayCircle, Star, Zap, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const LessonCard = ({ lesson, isUpcoming, onLeaveReview }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const handleJoinLesson = () => {
    if (lesson.jitsiLink) {
      // Открываем Jitsi Meet в новом окне/вкладке
      window.open(lesson.jitsiLink, '_blank');
    } else {
      // Если ссылки нет, то можно показать тост или другую индикацию
      toast({
        title: "Ошибка",
        description: "Ссылка на видеоконференцию недоступна.",
        variant: "destructive",
      });
    }
  };

  const handleOpenReviewForm = () => {
    setIsReviewFormOpen(true);
  };

  const handleSubmitReview = () => {
    if (reviewRating === 0 || reviewComment.trim() === '') {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите оценку и напишите комментарий.",
        variant: "destructive",
      });
      return;
    }
    onLeaveReview(lesson.id, reviewRating, reviewComment);
    setIsReviewFormOpen(false);
    setReviewRating(0);
    setReviewComment('');
    toast({
      title: "Отзыв отправлен",
      description: "Спасибо за ваш отзыв!",
    });
  };

  const statusColors = {
    'онлайн': 'text-green-500',
    'завершено': 'text-gray-500',
    'в записи': 'text-blue-500',
    'отмена': 'text-red-500',
    'ожидается': 'text-yellow-500',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{lesson.title}</h3>
            <p className="text-sm text-muted-foreground">Преподаватель: {lesson.teacher}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(lesson.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({lesson.date && new Date(lesson.date).toLocaleDateString()})
              </div>
              <div className={`flex items-center gap-1 ${statusColors[lesson.status.toLowerCase()]}`}>
                {lesson.status.toLowerCase() === 'онлайн' && <Zap className="h-4 w-4 animate-pulse text-red-500" />}
                {lesson.status}
              </div>
              {lesson.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {lesson.location}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2 mt-2 md:mt-0">
            {isUpcoming ? (
              <Button onClick={handleJoinLesson} className="w-full md:w-auto">
                <Video className="mr-2 h-4 w-4" />
                Начать
              </Button>
            ) : (
              <>
                {lesson.hasRecording && lesson.recordUrl && (
                  <Button variant="outline" size="sm" asChild className="w-full md:w-auto">
                    <a href={lesson.recordUrl} target="_blank" rel="noopener noreferrer">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Посмотреть запись
                    </a>
                  </Button>
                )}
                {lesson.status.toLowerCase() === 'завершено' && !lesson.feedbackLeft && (
                  <Button variant="secondary" size="sm" onClick={handleOpenReviewForm} className="w-full md:w-auto">
                    <Star className="mr-2 h-4 w-4" />
                    Оставить отзыв
                  </Button>
                )}
                {lesson.feedbackLeft && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1 w-full md:w-auto px-4 py-2 border rounded-md bg-secondary">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Отзыв оставлен
                  </span>
                )}
              </>
            )}
            {/* Опционально: доступ к чату/материалам урока */}
            {lesson.hasChat && (
              <Button variant="ghost" size="icon" className="w-full md:w-auto" title="Открыть чат урока">
                <MessageSquare className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <Dialog open={isReviewFormOpen} onOpenChange={setIsReviewFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Оставить отзыв о занятии "{lesson.title}"</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="rating" className="text-right">Оценка:</Label>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${star <= reviewRating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                  onClick={() => setReviewRating(star)}
                />
              ))}
            </div>
            <div>
              <Label htmlFor="comment" className="sr-only">Комментарий</Label>
              <Textarea
                id="comment"
                placeholder="Ваш комментарий о занятии..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmitReview}>Отправить отзыв</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const Lessons = ({ upcomingLessons, pastLessons, onLeaveReview }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Ближайшие занятия
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingLessons?.length > 0 ? (
              upcomingLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} isUpcoming={true} />
              ))
            ) : (
              <p className="text-muted-foreground">Пока нет предстоящих занятий.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>История занятий</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastLessons?.length > 0 ? (
              pastLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} isUpcoming={false} onLeaveReview={onLeaveReview} />
              ))
            ) : (
              <p className="text-muted-foreground">Пока нет завершенных занятий.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lessons; 