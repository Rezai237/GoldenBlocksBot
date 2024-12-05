import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { hapticFeedback } from '../utils/telegram';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    console.error('Error caught by ErrorBoundary:', error);
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error details:', {
      error,
      componentStack: errorInfo.componentStack
    });
  }

  private handleReset = () => {
    console.log('Attempting to reset application...');
    try {
      hapticFeedback.impact('light');
      this.setState({ hasError: false, error: undefined, errorInfo: undefined });
      window.location.reload();
    } catch (error) {
      console.error('Error during reset:', error);
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-black">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 max-w-md w-full text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-red-400/20">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2 text-white">Oops, something went wrong!</h1>
            <p className="text-gray-400 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={this.handleReset}
              className="flex items-center justify-center space-x-2 w-full glass-panel p-4 text-yellow-400 font-medium"
            >
              <RefreshCw size={20} />
              <span>Try Again</span>
            </motion.button>

            {import.meta.env.DEV && this.state.errorInfo && (
              <details className="mt-4 text-left">
                <summary className="text-sm text-gray-400 cursor-pointer">Error Details</summary>
                <pre className="mt-2 text-xs text-red-400 overflow-auto p-2 glass-panel">
                  {this.state.error?.stack}
                  {'\n\nComponent Stack:\n'}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
