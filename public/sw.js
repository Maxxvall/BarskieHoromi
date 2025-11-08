// Service Worker для кэширования статических ресурсов
// CACHE_NAME будет заменён на этапе сборки (placeholder) — это гарантирует
// смену имени кеша при каждом релизе и позволит клиентам получать обновлённую версию.
const CACHE_NAME = '__CACHE_NAME__';
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 дней в миллисекундах

// Ресурсы для кэширования
const STATIC_ASSETS = [
  '/',
  '/index.html',
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Кэшируем только GET запросы
  if (request.method !== 'GET') {
    return;
  }

  // Стратегия для изображений: Cache First с проверкой времени жизни
  if (
    url.pathname.startsWith('/photo/') ||
    url.pathname.startsWith('/assets/') ||
    /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
          // Проверяем время жизни кэша
          const cachedTime = cachedResponse.headers.get('sw-cached-time');
          if (cachedTime) {
            const age = Date.now() - parseInt(cachedTime, 10);
            if (age < CACHE_DURATION) {
              return cachedResponse;
            }
          }
        }

        // Если кэша нет или он устарел, загружаем из сети
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            // Клонируем ответ и добавляем метку времени
            const responseToCache = networkResponse.clone();
            const headers = new Headers(responseToCache.headers);
            headers.set('sw-cached-time', Date.now().toString());
            
            const modifiedResponse = new Response(responseToCache.body, {
              status: responseToCache.status,
              statusText: responseToCache.statusText,
              headers: headers,
            });

            cache.put(request, modifiedResponse);
          }
          return networkResponse;
        } catch (error) {
          // Если сеть недоступна, возвращаем закэшированный ответ даже если он устарел
          if (cachedResponse) {
            return cachedResponse;
          }
          throw error;
        }
      })
    );
    return;
  }

  // Для остальных ресурсов: Network First
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Кэшируем успешные ответы
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Если сеть недоступна, пробуем вернуть из кэша
        return caches.match(request);
      })
  );
});
