import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initializeTelegramWebApp } from './utils/telegram';
import { useUserStore } from './stores/userStore';
import RequireAuth from './components/auth/RequireAuth';
import LoginPage from './components/auth/LoginPage';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Games from './pages/Games';
import Puzzle from './pages/games/Puzzle';
import Earn from './pages/Earn';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineAlert from './components/OfflineAlert';

const App = () => {
  const { initializeUser, initialized } = useUserStore();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Starting app initialization...');
        
        // Initialize Telegram Web App
        if (import.meta.env.DEV) {
          console.log('Running in development mode');
        }
        await initializeTelegramWebApp();
        console.log('Telegram Web App initialized');

        // Initialize user
        await initializeUser();
        console.log('User initialized');

        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing app:', err);
        setError(err as Error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [initializeUser]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Failed to load application</h1>
          <p className="text-gray-400 mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white">
          <OfflineAlert />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              } />
              <Route path="/games" element={
                <RequireAuth>
                  <Games />
                </RequireAuth>
              } />
              <Route path="/games/puzzle" element={
                <RequireAuth>
                  <Puzzle />
                </RequireAuth>
              } />
              <Route path="/earn" element={
                <RequireAuth>
                  <Earn />
                </RequireAuth>
              } />
              <Route path="/leaderboard" element={
                <RequireAuth>
                  <Leaderboard />
                </RequireAuth>
              } />
              <Route path="/profile" element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              } />
              <Route path="/admin" element={
                <RequireAuth requireAdmin>
                  <AdminDashboard />
                </RequireAuth>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Navigation />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
