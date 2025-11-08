import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { cleanupOldCache, getCacheStats } from './lib/imageCache';

// Инициализация Telegram Web App
if ((window as any).Telegram?.WebApp) {
  const tg = (window as any).Telegram.WebApp;
  
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

// Очистка старого кэша изображений при запуске
cleanupOldCache();
const cacheStats = getCacheStats();
console.log('Статистика кэша изображений:', cacheStats);

// Регистрация Service Worker для кэширования
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker зарегистрирован:', registration.scope);
      })
      .catch((error) => {
        console.log('Ошибка регистрации Service Worker:', error);
      });
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
