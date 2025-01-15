// public/service-worker.js
const CACHE_NAME = "GRSL-VMS";
const urlsToCache = [
  "/",
  "/favicon.ico",
  "/assets/favi-192x192.png",
  "/assets/favi-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
