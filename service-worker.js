const CACHE_NAME = 'lesorub-cache-v1';
const urlsToCache = [
  '/',  // Главная страница игры
  '/index.html',  // Главная страница
  '/admin.html',  // Админ-панель
  '/styles.css',  // Общий стиль
  '/script.js',   // Скрипты для игры и админки
  '/manifest.json', // Манифест
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/bg-music.mp3'  // Пример для музыки, если используете
];

// Событие установки (кэшируем все нужные файлы)
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Событие активации (удаляем старые кэши, если нужно)
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Событие fetch (отдаём кэш, если файл в кэше, или делаем запрос)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Если файл не в кэше, делаем обычный fetch
        return fetch(event.request).then((response) => {
          // Кэшируем новый файл (не для всех запросов, а только для нужных)
          if (event.request.url.includes('/admin.html')) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
            });
          }
          return response;
        });
      })
  );
});
