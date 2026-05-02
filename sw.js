// Service Worker v2 - se autodesinstala, limpia caché y recarga
var CACHE_NAME = 'muller-cache-v2';
self.addEventListener('install', function() {
  self.skipWaiting();
  // Limpiar cachés antiguas
  caches.keys().then(function(names) {
    return Promise.all(names.map(function(n) {
      if (n !== CACHE_NAME) return caches.delete(n);
    }));
  });
});
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(n) {
        if (n !== CACHE_NAME) return caches.delete(n);
      }));
    }).then(function() {
      return self.registration.unregister();
    }).then(function() {
      return self.clients.matchAll({ type: 'window' });
    }).then(function(clients) {
      clients.forEach(function(c) { c.navigate(c.url); });
    })
  );
});
self.addEventListener('fetch', function(e) {
  // No cachear nada, siempre red fetch
  e.respondWith(fetch(e.request).catch(function() {
    return new Response('Offline', { status: 503 });
  }));
});
