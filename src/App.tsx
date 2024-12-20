import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProgramPage from './pages/ProgramPage';
import ProfilePage from './pages/ProfilePage';
import TermsPage from './pages/TermsPage';
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminPage from './pages/AdminPage';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './lib/firebase';
import { useLessonProgress } from './hooks/useLessonProgress';
import LessonPage from './pages/LessonPage';

function App() {
  const [user] = useAuthState(auth);
  const { loadProgress } = useLessonProgress();

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user, loadProgress]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="program" element={<ProgramPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="lesson/1.1" element={<LessonPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;