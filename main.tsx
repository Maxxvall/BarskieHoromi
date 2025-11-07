import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Инициализация Telegram Web App
if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  
  // Разворачиваем приложение на весь экран
  tg.expand();
  
  // Готовы к показу
  tg.ready();
  
  console.log('Telegram Web App initialized:', {
    version: tg.version,
    platform: tg.platform,
    colorScheme: tg.colorScheme,
    viewportHeight: tg.viewportHeight,
    viewportStableHeight: tg.viewportStableHeight,
  });
}

// Скрываем загрузочный экран после инициализации React
const hideLoading = () => {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.classList.add('hidden');
  }
};

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Скрываем загрузчик после монтирования
setTimeout(hideLoading, 100);
