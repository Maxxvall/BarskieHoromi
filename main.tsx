import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Only run Telegram init if we're actually in Telegram (not MAX)
if ((window as any).Telegram?.WebApp && !(window as any).WebApp) {
  const tg = (window as any).Telegram.WebApp;

  if (typeof tg.expand === 'function') tg.expand();
  if (typeof tg.ready === 'function') tg.ready();

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

  // Detect the correct WebApp object
  // Prefer MAX's window.WebApp, but verify it's not just the Telegram alias
  let mw: any = null;

  if ((window as any).WebApp) {
    mw = (window as any).WebApp;
  } else if ((window as any).Telegram?.WebApp) {
    mw = (window as any).Telegram.WebApp;
  }

  if (mw) {
    if (typeof mw.expand === 'function') mw.expand();
    if (typeof mw.ready === 'function') mw.ready();

    console.log('WebApp detected:', {
      initData: mw.initData,
      initDataUnsafe: mw.initDataUnsafe,
      version: mw.version,
      platform: mw.platform,
    });

    let adminDetected = false;

    // === Path 1: Try HMAC-validated initData (secure) ===
    try {
      let webAppData: string | null = null;

      if (mw.initData && typeof mw.initData === 'string' && mw.initData.length > 0) {
        webAppData = mw.initData;
      }

      if (!webAppData) {
        const hash = window.location.hash ? window.location.hash.slice(1) : '';
        if (hash) {
          const params = new URLSearchParams(hash);
          webAppData = params.get('WebAppData') || null;
        }
      }

      if (webAppData) {
        const resp = await fetch('/api/validate-init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ webAppData }),
        });
        const json = await resp.json().catch(() => ({}));
        console.log('validate-init result:', json);

        (window as any).__MAX_WEBAPP_USER = json.user || null;
        (window as any).__IS_ADMIN = !!json.isAdmin;
        if (json.isAdmin) sessionStorage.setItem('isAdmin', '1');
        else sessionStorage.removeItem('isAdmin');
        adminDetected = true;
      }
    } catch (err) {
      console.error('validate-init error', err);
    }

    // === Path 2: Fallback — use initDataUnsafe.user.id + /api/check-admin ===
    if (!adminDetected) {
      console.warn('initData is empty, trying fallback via initDataUnsafe...');
      try {
        const unsafeUser = mw.initDataUnsafe?.user;
        if (unsafeUser && unsafeUser.id) {
          console.log('Found user from initDataUnsafe:', unsafeUser);
          (window as any).__MAX_WEBAPP_USER = unsafeUser;

          const resp = await fetch('/api/check-admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: String(unsafeUser.id) }),
          });
          const json = await resp.json().catch(() => ({}));
          console.log('check-admin result:', json);

          (window as any).__IS_ADMIN = !!json.isAdmin;
          if (json.isAdmin) sessionStorage.setItem('isAdmin', '1');
          else sessionStorage.removeItem('isAdmin');
        } else {
          console.warn('No user data available from initDataUnsafe either');
        }
      } catch (err) {
        console.error('check-admin fallback error', err);
      }
    }

    console.log('Admin status after validation:', {
      isAdmin: (window as any).__IS_ADMIN,
      sessionIsAdmin: sessionStorage.getItem('isAdmin'),
      user: (window as any).__MAX_WEBAPP_USER,
    });
  } else {
    console.warn('No WebApp object found (neither MAX nor Telegram)');
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
