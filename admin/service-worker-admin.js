const CACHE_NAME = 'admin-cache-v2'; // увеличь версию, чтобы сбросить старый кэш
const urlsToCache = [
  './admin.html',
  './admin.css', // добавляем css сюда
  './manifest-admin.json',
  './icons/admin-icon-192.png',
  './icons/admin-icon-512.png',
];

// Установка и кеширование файлов
self.addEventListener('install', (event) => {
  console.log('[SW] Установка...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Кешируем файлы...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Активация и удаление старых кешей
self.addEventListener('activate', (event) => {
  console.log('[SW] Активация...');
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Удаляем старый кеш:', name);
            return caches.delete(name);
          })
      )
    )
  );
  self.clients.claim();
});

// Перехват fetch-запросов
self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);

  // Для CSS делаем стратегию "Network First"
  if (requestURL.pathname.endsWith('.css')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Обновляем кэш
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Если сеть недоступна — возвращаем из кэша
          return caches.match(event.request);
        })
    );
  } else {
    // Для остальных — Cache First
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => cachedResponse || fetch(event.request))
    );
  }
});
