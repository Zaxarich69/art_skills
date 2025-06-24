import React, { createContext, useContext, useState, useCallback } from 'react';
import mockUserProfile from './mockUserProfile';

const UserStoreContext = createContext();

export function UserStoreProvider({ children }) {
  const [user, setUser] = useState(mockUserProfile);

  // Add message to chat
  const sendMessage = useCallback((chatId, text) => {
    setUser(prev => {
      const conversations = prev.conversations.map(conv => {
        if (conv.id === chatId) {
          const newMsg = {
            id: `m${Date.now()}`,
            text,
            time: new Date().toISOString(),
            isOwn: true
          };
          return {
            ...conv,
            lastMessage: text,
            lastMessageTime: newMsg.time,
            messages: [...conv.messages, newMsg]
          };
        }
        return conv;
      });
      return { ...prev, conversations };
    });
  }, []);

  // Leave a review for a session
  const leaveReview = useCallback((lessonId, rating, comment) => {
    setUser(prev => {
      const pastLessons = prev.pastLessons.map(lesson =>
        lesson.id === lessonId ? { ...lesson, feedbackLeft: true } : lesson
      );
      const newReview = {
        id: `r${Date.now()}`,
        student: { name: prev.name, avatar: prev.profilePicture },
        rating,
        comment,
        date: new Date().toISOString()
      };
      return {
        ...prev,
        pastLessons,
        reviews: [...prev.reviews, newReview],
        averageRating: parseFloat(((prev.averageRating * prev.reviews.length + rating) / (prev.reviews.length + 1)).toFixed(1))
      };
    });
  }, []);

  // Book a new session (upcoming)
  const bookSession = useCallback((session) => {
    setUser(prev => ({
      ...prev,
      upcomingLessons: [...prev.upcomingLessons, session]
    }));
  }, []);

  // Exported data and methods
  const value = {
    user,
    sendMessage,
    leaveReview,
    bookSession,
    setUser // for complex updates
  };

  return <UserStoreContext.Provider value={value}>{children}</UserStoreContext.Provider>;
}

export function useUserStore() {
  return useContext(UserStoreContext);
} 