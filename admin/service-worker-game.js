self.addEventListener('install', event => {
  console.log('Service Worker для игры установлен');
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
