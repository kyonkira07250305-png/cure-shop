'use strict';

const CACHE = 'cure-shop-mask-photo-v1';
const SHELL = [
  './',
  './index.html',
  './shop.js',
  './manifest.json',
  './assets/cure-logo.jpg',
  './assets/cure-home-aqua.jpg',
  './assets/serum.png',
  './assets/mask.png',
  './assets/cure-glass-192.png',
  './assets/cure-glass-512.png',
  './assets/cure-glass-180.png',
  './assets/cure-glass-32.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
  );
});
