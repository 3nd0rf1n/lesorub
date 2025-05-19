self.addEventListener('install', event => {
  console.log('[Admin SW] Установлен');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[Admin SW] Активирован');
});

self.addEventListener('fetch', event => {
  // Кеширование запросов, если хочешь
  console.log('[Admin SW] Запрос:', event.request.url);
});
