import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

const renderApp = () => {
  try {
    console.log('Starting application initialization...');
    
    const root = document.getElementById('root');
    if (!root) {
      throw new Error('Root element not found');
    }

    // Clear any existing content
    root.innerHTML = '';

    // Add development mode indicator
    if (import.meta.env.DEV) {
      console.log('Running in development mode');
      const devIndicator = document.createElement('div');
      devIndicator.className = 'dev-mode-indicator';
      devIndicator.textContent = 'DEV MODE';
      document.body.appendChild(devIndicator);
    }

    // Create root and render app
    console.log('Creating root and rendering app...');
    createRoot(root).render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Fatal error during app initialization:', error);
    
    // Show error message
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div style="
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: black;
          color: white;
          text-align: center;
          padding: 20px;
          font-family: system-ui, -apple-system, sans-serif;
        ">
          <div>
            <h1 style="margin-bottom: 16px; font-size: 24px; font-weight: bold;">
              Unable to load application
            </h1>
            <p style="color: #666; margin-bottom: 20px;">
              ${error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
            <button onclick="window.location.reload()" style="
              background: #facc15;
              color: black;
              padding: 8px 16px;
              border-radius: 8px;
              border: none;
              font-weight: 500;
              cursor: pointer;
            ">
              Try Again
            </button>
            ${import.meta.env.DEV ? `
              <pre style="
                margin-top: 20px;
                padding: 16px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                font-size: 12px;
                color: #ef4444;
                text-align: left;
                overflow-x: auto;
              ">${error instanceof Error ? error.stack : ''}</pre>
            ` : ''}
          </div>
        </div>
      `;
    }
  }
};

// Start the application
renderApp();
