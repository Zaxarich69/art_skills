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
import { UserStoreProvider } from './data/userStore';
import AboutPage from '@/pages/AboutPage';
import CareersPage from '@/pages/CareersPage';
import HelpPage from '@/pages/HelpPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import CookiesPage from '@/pages/CookiesPage';

function App() {
  return (
    <UserStoreProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="professional/:id" element={<ProfessionalPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="payment/:id" element={<PaymentPage />} />
          <Route path="favorites" element={<FavoritesPage />} /> {/* Новая страница избранного */}
          <Route path="about" element={<AboutPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="cookies" element={<CookiesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </UserStoreProvider>
  );
}

export default App;
