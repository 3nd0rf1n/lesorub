self.addEventListener('install', event => {
  console.log('Service Worker установлен');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker активирован');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Просто пропускаем все запросы дальше без кеширования
});
