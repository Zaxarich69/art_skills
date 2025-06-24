import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockProfessionalsData } from './professionals';

// Helper to calculate average rating
function calcAverage(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  return parseFloat((sum / reviews.length).toFixed(1));
}

// Build initial reviews state from mockProfessionalsData
const initialReviews = {};
mockProfessionalsData.forEach(prof => {
  initialReviews[prof.id] = Array.isArray(prof.testimonials) ? [...prof.testimonials] : [];
});

const ReviewsContext = createContext();

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState(initialReviews);

  // Add a new review for a professional
  const addReview = useCallback((professionalId, review) => {
    setReviews(prev => {
      const prevList = prev[professionalId] || [];
      return {
        ...prev,
        [professionalId]: [...prevList, review]
      };
    });
  }, []);

  // Get all reviews for a professional
  const getReviews = useCallback((professionalId) => {
    return reviews[professionalId] || [];
  }, [reviews]);

  // Get average rating for a professional
  const getAverageRating = useCallback((professionalId) => {
    return calcAverage(reviews[professionalId] || []);
  }, [reviews]);

  // Get total reviews count
  const getReviewsCount = useCallback((professionalId) => {
    return (reviews[professionalId] || []).length;
  }, [reviews]);

  const value = {
    reviews,
    addReview,
    getReviews,
    getAverageRating,
    getReviewsCount
  };

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviewsStore() {
  return useContext(ReviewsContext);
} 