const CACHE_NAME = "hikmet-pwa-v13";
const PRECACHE_URLS = [
  "/",
  "/download",
  "/styles.css",
  "/app.js",
  "/languages.js",
  "/manifest.webmanifest",
  "/favicon.svg?v=5",
  "/favicon-32.png?v=5",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(PRECACHE_URLS);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("hikmet-") && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    const page = url.pathname === "/index.html" ? "/" : url.pathname.replace(/\/$/, "") || "/";
    if (page !== "/" && page !== "/download") return;
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(page, response.clone());
        }
        return response;
      } catch {
        return (await caches.match(page)) || Response.error();
      }
    })());
    return;
  }

  if (!PRECACHE_URLS.includes(url.pathname + url.search)) return;

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch {
      return Response.error();
    }
  })());
});
