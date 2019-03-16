var CACHE_NAME = 'bctools-cache-v1';
var urlsToCache = [
  './',
  'index.html?v6',
  'sw.js?v6',
  'manifest.json?v6',
  './img/postage-stamp-avy.jpg?v6',
  './img/icon.png',
  'main.css?v6',
  'main.js?v6',
  'launcher-icon-4x.png?v6',
  'https://fonts.googleapis.com/css?family=Ubuntu'
];
console.log('loading sw');

self.addEventListener('install', function (event) {
  // Perform install steps
  console.log('installing sw');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        var x = cache.addAll(urlsToCache);
        console.log('cache added');
        return x;
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
      )
  );
});