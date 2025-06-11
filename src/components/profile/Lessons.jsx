import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';

const Lessons = ({ upcomingLessons, pastLessons }) => {
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
            {upcomingLessons?.map((lesson) => (
              <Card key={lesson.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {lesson.student.name}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Video className="mr-2 h-4 w-4" />
                        Начать
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(lesson.date).toLocaleTimeString()}
                      </div>
                      {lesson.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {lesson.location}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>История занятий</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastLessons?.map((lesson) => (
              <Card key={lesson.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {lesson.student.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(lesson.date).toLocaleDateString()}
                      </p>
                    </div>
                    {!lesson.hasReview && (
                      <Button variant="outline" size="sm">
                        Оставить отзыв
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lessons; 