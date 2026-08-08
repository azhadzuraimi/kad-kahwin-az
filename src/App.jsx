import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CardProvider } from './context/CardContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import AuthPages from './pages/AuthPages';
import CustomerDashboard from './pages/CustomerDashboard';
import CardEditor from './pages/CardEditor';
import AdminDashboard from './pages/AdminDashboard';
import PublicCardView from './pages/PublicCardView';

// Auto redirect handler after Supabase OAuth login
function AuthRedirectHandler() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasOAuthHash = window.location.hash.includes('access_token=') || location.hash.includes('access_token=');
    
    if (user && (hasOAuthHash || location.pathname === '/auth')) {
      // Clean up hash from browser address bar
      if (hasOAuthHash) {
        window.history.replaceState(null, '', window.location.pathname);
      }

      if (user.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, navigate, location]);

  return null;
}

function Layout() {
  const location = useLocation();
  const isPublicCardPage = location.pathname.startsWith('/card/');

  return (
    <div className="flex flex-col min-h-screen">
      <AuthRedirectHandler />
      {!isPublicCardPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPages />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/editor" element={<CardEditor />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/card/:slug" element={<PublicCardView />} />
        </Routes>
      </main>
      {!isPublicCardPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CardProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </CardProvider>
    </AuthProvider>
  );
}
