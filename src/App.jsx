import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import ProfilePage from '@/pages/ProfilePage';
import ProfessionalPage from '@/pages/ProfessionalPage';
import MessagesPage from '@/pages/MessagesPage';
import PaymentPage from '@/pages/PaymentPage';
import FavoritesPage from '@/pages/FavoritesPage'; // <--- добавил
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="professional/:id" element={<ProfessionalPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="payment/:id" element={<PaymentPage />} />
          <Route path="favorites" element={<FavoritesPage />} /> {/* Новая страница избранного */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
