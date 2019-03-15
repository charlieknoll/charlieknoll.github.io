var CACHE_NAME = 'bctools-cache-v1';
var urlsToCache = [
  './',
  'index.html?v5',
  'sw.js?v5',
  'manifest.json?v5',
  './img/postage-stamp-avy.jpg?v5',
  'main.css?v5',
  'main.js?v5',
  'launcher-icon-4x.png?v5',
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