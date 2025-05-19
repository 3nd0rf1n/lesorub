const CACHE_NAME = 'admin-cache-v1';
const urlsToCache = [
  './admin.html',
  './manifest-admin.json',
  './icons/admin-icon-192.png',
  './icons/admin-icon-512.png',
];

// При установке - кешируем нужные файлы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// При активации - удаляем старые кеши
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      ))
  );
});

// При запросах - отдаём из кеша или из сети
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});
