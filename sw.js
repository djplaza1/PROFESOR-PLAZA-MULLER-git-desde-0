// Service Worker v4 - sin navegación forzada en activate para evitar "message channel closed"
var CACHE_NAME = 'muller-cache-v4';
self.addEventListener('install', function() {
  self.skipWaiting();
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
    })
  );
});
self.addEventListener('fetch', function(e) {
  try {
    e.respondWith(fetch(e.request).catch(function() {
      return new Response('', { status: 204 });
    }));
  } catch(err) {
    // Ignorar errores por cierre de canal al desregistrarse
  }
});