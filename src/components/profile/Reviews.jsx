import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const Reviews = ({ reviews, averageRating }) => {
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'rating'

  const sortedReviews = useMemo(() => {
    if (sortBy === 'rating') {
      return [...reviews].sort((a, b) => b.rating - a.rating);
    } else {
      return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }, [reviews, sortBy]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Student Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-bold">{averageRating}</span>
              <span className="text-muted-foreground">/5</span>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              ({reviews.length} reviews)
            </span>
            <div className="ml-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={review.student.avatar} />
                      <AvatarFallback>
                        {review.student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{review.student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </div>
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

export default Reviews; 