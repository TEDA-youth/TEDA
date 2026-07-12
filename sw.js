// TEDA service worker, enables offline access and PWA installability
const CACHE_NAME = 'teda-cache-v1';

// Core pages and assets cached on install so the site works offline
// and so the "Add to Home Screen" install prompt (like BetPawa) can fire.
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/focus-areas.html',
  '/opportunities.html',
  '/youth-forum.html',
  '/events.html',
  '/gallery.html',
  '/resources.html',
  '/news.html',
  '/get-involved.html',
  '/join.html',
  '/apply.html',
  '/contact.html',
  '/donate.html',
  '/terms.html',
  '/privacy-policy.html',
  '/thank-you.html',
  '/404.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/js/forms.js',
  '/assets/js/gallery.js',
  '/assets/js/mobile-menu.js',
  '/assets/images/logo.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // addAll fails hard if any single asset 404s, use allSettled so a
      // missing placeholder image doesn't break the whole install step.
      return Promise.allSettled(CORE_ASSETS.map((url) => cache.add(url)));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Network-first for HTML (so content updates show quickly),
// cache-first for everything else (css/js/images load instantly).
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const isHTML = req.headers.get('accept')?.includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('/404.html')))
    );
  } else {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        });
      })
    );
  }
});
