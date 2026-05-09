import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Initialize MAX Web App if available
const webApp = (window as any).WebApp;
if (webApp) {
  if (typeof webApp.expand === 'function') webApp.expand();
  if (typeof webApp.ready === 'function') webApp.ready();
}

// Hide loading screen
const hideLoading = () => {
  const el = document.getElementById('loading');
  if (el) el.classList.add('hidden');
};

// Render app
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

setTimeout(hideLoading, 100);
