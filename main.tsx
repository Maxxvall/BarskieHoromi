import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

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

// Run initialization (including MAX WebApp validation) BEFORE rendering React
const hideLoading = () => {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.classList.add('hidden');
  }
};

 (async () => {
  // Разрегистрация старого Service Worker (если был установлен ранее)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
        console.log('Service Worker разрегистрирован:', registration.scope);
      }
    });
    // Очистить все кэши SW
    if ('caches' in window) {
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name);
        }
      });
    }
  }

  // Инициализация MAX Web App (если доступен) и синхронная валидация
  if ((window as any).WebApp) {
    const mw = (window as any).WebApp;

    if (typeof mw.expand === 'function') mw.expand();
    if (typeof mw.ready === 'function') mw.ready();

    console.log('MAX Web App initialized:', {
      version: mw.version,
      platform: mw.platform,
    });

    try {
      let webAppData: string | null = null;

      // Способ 1: из URL hash (некоторые платформы передают данные так)
      const hash = window.location.hash ? window.location.hash.slice(1) : '';
      if (hash) {
        const params = new URLSearchParams(hash);
        webAppData = params.get('WebAppData') || null;
      }

      // Способ 2: из MAX WebApp SDK initData
      if (
        !webAppData &&
        mw.initData &&
        typeof mw.initData === 'string' &&
        mw.initData.length > 0
      ) {
        webAppData = mw.initData;
      }

      // Диагностика — поможет понять, откуда приходят данные
      console.log('WebAppData debug:', {
        hashPresent: !!hash,
        hashWebAppData: hash ? !!new URLSearchParams(hash).get('WebAppData') : false,
        initData: mw.initData ? (typeof mw.initData === 'string' ? mw.initData.substring(0, 80) + '...' : '[non-string]') : null,
        initDataUnsafe: mw.initDataUnsafe,
        webAppDataFound: !!webAppData,
      });

      if (webAppData) {
        const resp = await fetch('/api/validate-init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ webAppData }),
        });
        const json = await resp.json().catch(() => ({}));
        console.log('validate-init result:', json);

        try {
          (window as any).__MAX_WEBAPP_USER = json.user || null;
          (window as any).__IS_ADMIN = !!json.isAdmin;
          if (json.isAdmin) sessionStorage.setItem('isAdmin', '1');
          else sessionStorage.removeItem('isAdmin');
        } catch (e) {
          // ignore
        }
      }
    } catch (err) {
      console.error('validate-init error', err);
    }

    console.log('Admin status after validation:', {
      isAdmin: (window as any).__IS_ADMIN,
      sessionIsAdmin: sessionStorage.getItem('isAdmin'),
      user: (window as any).__MAX_WEBAPP_USER,
    });
  }

  // Render AFTER validation is complete
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Скрываем загрузчик после монтирования
  setTimeout(hideLoading, 100);
})();
