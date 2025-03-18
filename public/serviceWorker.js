const CACHE_NAME = "streamlist-cache-v1";
const urlsToCache = [
  "/",  
  "/index.html",
  "/manifest.json",
  "/serviceWorker.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/src/main.jsx",
  "/src/App.jsx",
  "/src/components/NavBar.jsx"
];

// Install event - Cache critical files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache and storing files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - Serve cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match("/index.html"));
    })
  );
});

// Activate event - Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});