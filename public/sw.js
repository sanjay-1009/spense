const CACHE_NAME = "spense-cache-v1";
const OFFLINE_URL = "/index.html";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/login.html",
  "/admin-login.html",
  "/register.html",
  "/css/style.css",
  "/images/logo-192.png",
  "/images/logo-512.png"
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// FETCH
self.addEventListener("fetch", (event) => {

  const requestUrl = event.request.url;

  if (event.request.method !== "GET") return;

  if (requestUrl.startsWith("chrome-extension://")) return;

  if (!requestUrl.startsWith("http")) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {

      return fetch(event.request)
        .then((networkResponse) => {

          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }

          return networkResponse;
        })
        .catch(() => cachedResponse || caches.match(OFFLINE_URL));
    })
  );
});