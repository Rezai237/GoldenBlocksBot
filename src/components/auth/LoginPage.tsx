import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import { getTelegramUser } from '../../utils/telegram';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { initializeUser, user } = useUserStore();
  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    const initUser = async () => {
      try {
        console.log('Initializing user...');
        
        // In development, immediately initialize user
        if (import.meta.env.DEV) {
          console.log('Development mode: Auto-initializing user');
          await initializeUser();
          return;
        }

        // In production, wait for Telegram user
        const telegramUser = getTelegramUser();
        if (telegramUser) {
          console.log('Telegram user found, initializing...');
          await initializeUser();
        } else {
          console.log('No Telegram user found');
        }
      } catch (error) {
        console.error('Error initializing user:', error);
      }
    };

    initUser();
  }, [initializeUser]);

  useEffect(() => {
    if (user) {
      console.log('User initialized, navigating to:', from);
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="glass-panel p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Golden Blocks</h1>
        
        {import.meta.env.DEV ? (
          <>
            <p className="text-gray-400 mb-6">
              Development Mode - Auto Login
            </p>
            <div className="animate-pulse text-gray-400">
              Logging in...
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Debug: Auto-initializing user for development
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-400 mb-6">
              Please log in with your Telegram account to continue
            </p>
            <div className="animate-pulse text-gray-400">
              Connecting to Telegram...
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default LoginPage;
