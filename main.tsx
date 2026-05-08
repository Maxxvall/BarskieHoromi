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

// Инициализация MAX Web App (если доступен)
if ((window as any).WebApp) {
  const mw = (window as any).WebApp;

  if (typeof mw.expand === 'function') mw.expand();
  if (typeof mw.ready === 'function') mw.ready();

  console.log('MAX Web App initialized:', {
    version: mw.version,
    platform: mw.platform,
  });

  // Попытка отправить WebAppData на сервер для валидации подписи
  (async () => {
    try {
      const hash = window.location.hash ? window.location.hash.slice(1) : '';
      if (!hash) return;
      const params = new URLSearchParams(hash);
      const webAppData = params.get('WebAppData');
      if (!webAppData) return;
      const resp = await fetch('/api/validate-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webAppData }),
      });

      const json = await resp.json();
      console.log('validate-init result:', json);

      // Expose user / admin information to the client app (safe to store transiently)
      try {
        (window as any).__MAX_WEBAPP_USER = json.user || null;
        (window as any).__IS_ADMIN = !!json.isAdmin;
        if (json.isAdmin) {
          sessionStorage.setItem('isAdmin', '1');
        } else {
          sessionStorage.removeItem('isAdmin');
        }
      } catch (e) {
        // ignore
      }
    } catch (err) {
      console.error('validate-init error', err);
    }
  })();
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
